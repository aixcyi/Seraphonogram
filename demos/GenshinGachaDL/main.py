# -*- coding: utf-8 -*-
from datetime import datetime
from random import random
from time import sleep

from gacha.models import *
from gacha.tools import save_as_uigf_xlsx


def log(text) -> None:
    """
    打印日志。
    """
    # fmt = '%Y-%m-%d %H:%M:%S.%f'
    fmt = '%H:%M:%S.%f'
    time = datetime.now().strftime(fmt)
    print(f'[{time}] {text}')


def page_cb(collector, gacha_type, size, page, end_id) -> None:
    """
    回调函数。每下载完一页祈愿记录就会调用一次。一般用于延时和跟踪下载进度。

    :param collector: 发起回调的 `GachaCollector` 的实例。
    :param gacha_type: 祈愿卡池类型。
    :param size: 页大小。即一页有多少条抽卡记录。
    :param page: 第几页。从1开始。
    :param end_id: 最后一条抽卡记录的id。
    :return: 无。
    """
    log(f'{gacha_type!s}: 第{page}页获取完毕。')
    sleep(random() * 1.414)


def main():
    collector = GachaCollector()
    collector.page_callback = page_cb
    collector.pool_callback = lambda **kwargs: log('-' * 16)
    collector.check()
    log(collector.earliest().strftime('最早可以获取到 %Y-%m-%d 的记录。'))

    # -------- 获取半年内的抽卡记录 --------
    branch = collector.collect_all()
    file = f'./records_{branch.uid}_%Y%m%d_%H%M%S.json'
    file = datetime.now().strftime(file)
    branch.dumps(file)
    log('写入文件 ' + file)

    # -------- 读取之前汇总的记录 --------
    file = f'./records_{branch.uid}.json'
    master = Shelf()
    master.loads(file)
    log('读取文件 ' + file)

    # -------- 合并到之前汇总的记录 --------
    master += branch
    master.dumps(file)
    log('写入文件 ' + file)

    # -------- 生成表格 --------
    file = f'./records_{branch.uid}.xlsx'
    save_as_uigf_xlsx(master, file)
    log('写入文件 ' + file)


if __name__ == '__main__':
    main()
