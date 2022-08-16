# -*- coding: utf-8 -*-

__all__ = [
    'deduplicate',
    'classify',
    'save_as_uigf_xlsx',
    'ggk_migrate',
]

import json
from typing import IO, Union, Callable

from xlsxwriter import Workbook

from gacha.models import Shelf, GachaType


def deduplicate(records: list) -> None:
    i = 1
    while i < len(records):
        last = records[i - 1]
        curr = records[i]
        if last['id'] != curr['id']:
            i += 1
            continue
        if 'gacha_type' in last and 'gacha_type' in curr:
            last_gt = last['gacha_type']
            curr_gt = curr['gacha_type']
            if (
                    last_gt == GachaType.CHARACTER_EVENT_WISH.value and
                    curr_gt == GachaType.CHARACTER_EVENT_WISH_2.value
            ):
                records.pop(i - 1)
                i -= 1
                continue
        records.pop(i)


def classify(seq: list[dict], *keys: Union[str, Callable]):
    if len(keys) < 1:
        return seq
    key = keys[0]
    topdict = dict()
    for item in seq:
        k = key(item) if callable(key) else item[key]
        if k not in topdict:
            topdict[k] = list()
        topdict[k].append(item)

    if len(keys) > 1:
        for k in topdict:
            topdict[k] = classify(topdict[k], *keys[1:])

    return topdict


def save_as_uigf_xlsx(
        shelf: Shelf,
        file_path: str,
        font_name: str = '微软雅黑'
) -> None:
    """
    将祈愿记录数据加工存储为带有颜色标记的xlsx文件。

    所存储的信息有：

    - 祈愿时间
    - 角色/武器的名称
    - 类别（角色还是武器）
    - 角色/武器的星级
    - 祈愿所在卡池的名称
    - 总第几次祈愿
    - 保底内第几次祈愿

    :param shelf: 所有卡池。
    :param file_path: xlsx文件地址。
    :param font_name: 所用字体的名称。
    :return: 无。
    """
    book = Workbook(filename=file_path)
    columns = [
        {'width': (0, 0, 24), 'en': 'Time', 'cn': '时间'},
        {'width': (1, 1, 14), 'en': 'Item', 'cn': '名称'},
        {'width': (2, 2, 7), 'en': 'Type', 'cn': '类别'},
        {'width': (3, 3, 7), 'en': 'Rank', 'cn': '星级'},
        {'width': (4, 4, 16), 'en': 'Pool', 'cn': '祈愿卡池'},
        {'width': (5, 5, 9), 'en': 'No. ', 'cn': '总第几抽'},
        {'width': (6, 6, 14), 'en': '[No.]', 'cn': '保底内第几抽'},
    ]
    if str(shelf.language).lower() in ('cn', 'zh-cn', 'zh-tw'):
        lang = 'cn'
    else:
        lang = 'en'
    style_head = book.add_format({  # 表格头部
        "align": "left",
        "font_name": font_name,
        "bg_color": "#dbd7d3",
        "border_color": "#c4c2bf",
        "border": 1,
        "color": "#757575",
        "bold": True
    })
    style_rank3 = book.add_format({  # 行内容样式-三星
        "align": "left",
        "font_name": font_name,
        "bg_color": "#ebebeb",
        "border_color": "#c4c2bf",
        "border": 1,
        "color": "#8e8e8e"
    })
    style_rank4 = book.add_format({  # 行内容样式-四星
        "align": "left",
        "font_name": font_name,
        "bg_color": "#ebebeb",
        "border_color": "#c4c2bf",
        "border": 1,
        "color": "#a256e1",
        "bold": True
    })
    style_rank5 = book.add_format({  # 行内容样式-五星
        "align": "left",
        "font_name": font_name,
        "bg_color": "#ebebeb",
        "border_color": "#c4c2bf",
        "border": 1,
        "color": "#bd6932",
        "bold": True
    })
    for _type, pool in shelf.items():
        # 按卡池创建表：
        sheet = book.add_worksheet(str(_type))

        # 设置样式：
        sheet.freeze_panes(1, 0)  # 冻结首行
        sheet.write_row(  # 设置首行的内容（表头）
            row=0, col=0, cell_format=style_head,
            data=[col[lang] for col in columns],
        )
        for config in columns:  # 设置各个列宽：
            sheet.set_column(*config['width'])

        # 写入祈愿记录：
        total = 0  # 总计祈愿多少次
        last5 = 0  # 距离上次抽出五星角色/武器多少次（从1开始算）
        for record in pool:
            total += 1
            last5 += 1
            sheet.write_row(
                row=total, col=0,
                data=[
                    record['time'], record['name'],
                    record['item_type'], int(record['rank_type']),
                    str(GachaType(record['gacha_type'])),
                    total, last5
                ],
                cell_format={
                    '3': style_rank3,
                    '4': style_rank4,
                    '5': style_rank5,
                }[record['rank_type']]
            )
            if record['rank_type'] == '5':
                last5 = 0
    book.close()


def ggk_migrate(fp: IO) -> Shelf:
    """
    将旧项目导出的JSON文件转换为 Wish 。

    [genshin-gacha-kit](https://github.com/aixcyi/genshin-gacha-kit)

    :param fp:
    :return:
    """
    content = json.load(fp)
    wish = list()
    shelf = Shelf()
    shelf.uid = content['infos'].get('uid', '')
    shelf.region = content['infos'].get('region', '')
    shelf.language = content['infos'].get('lang', '')

    def mapping(r) -> dict:
        r['gacha_type'] = _wish
        r['item_id'] = ''
        r['count'] = '1'
        r['uigf_gacha_type'] = _wish
        return r

    for _wish in content['records']:
        wish += list(map(mapping, content['records'][_wish]))
    wish.sort(key=lambda r: (r['uigf_gacha_type'], r['time'], r['id']))

    shelf.serial = wish
    return shelf


if __name__ == '__main__':
    _records = [
        {"category": "角色", "label": "凝光", "id": "0724799f20fd49d573e194969f5e4525"},
        {"category": "角色", "label": "魈", "id": "08328d24b3138d592e8c3ba6511efa3f"},
        {"category": "角色", "label": "钟离", "id": "ed775b4c9068e775498d269b6a3fd574"},
        {"category": "武器", "label": "狼的末路", "id": "b7dafedeb0d7ee91f5a8c7a056f840dd"},
        {"category": "武器", "label": "阿莫斯之弓", "id": "a31375933480173daeecbaaeb30ea2ae"},
        {"category": "武器", "label": "护摩之杖", "id": "11e6459038b35faaa6c7d616cd238e34"},
        {"category": "武器", "label": "祭礼弓", "id": "471b64bad844042db84cf1764d90b903"},
    ]
    print(classify(_records, 'category'))
    print(classify(_records, lambda _record: _record.pop('category')))
