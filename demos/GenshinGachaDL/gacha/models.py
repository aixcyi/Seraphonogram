# -*- coding: utf-8 -*-

__all__ = [
    'GenshinResponse',
    'GachaType',
    'Pool',
    'Shelf',
    'GachaCollector',
]

import json
from datetime import datetime, timedelta
from enum import Enum
from pathlib import Path
from typing import Any, Callable, KeysView, ValuesView, ItemsView, IO
from urllib.parse import parse_qs, urlparse

from requests import get as http_get, Response

from gacha.throwables import *


class GenshinResponse:
    """
    原神HTTP响应。
    """
    __slots__ = 'retcode', 'message', 'data'

    def __init__(self, resp: Response):
        """
        :param resp: requests 的 Response
        """
        try:
            content: dict = resp.json()
        except ValueError as e:
            raise RawRespDecodeError() from e
        try:
            self.retcode: int = content['retcode']
            self.message: str = content['message']
            self.data: Any = content['data']
        except KeyError as e:
            raise RawRespTypeError(e.args[0]) from e

    # Example of HTTP response content
    __example = {
        "retcode": 0,
        "message": "OK",
        "data": {
            "page": "0",
            "size": "20",
            "total": "0",
            "list": [
                {
                    "uid": "玩家id",
                    "gacha_type": "200",
                    "item_id": "",
                    "count": "1",
                    "time": "yyyy-MM-dd HH:mm:ss",
                    "name": "芭芭拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "祈愿历史的ID，19位阿拉伯数字"
                },
                ...
            ],
            "region": "cn_gf01"
        }
    }


class GachaType(Enum):
    """
    祈愿类型。
    """
    BEGINNERS_WISH = '100'
    WANDERLUST_INVOCATION = '200'
    CHARACTER_EVENT_WISH = '301'
    CHARACTER_EVENT_WISH_2 = '400'
    WEAPON_EVENT_WISH = '302'

    def __str__(self):
        return {
            self.BEGINNERS_WISH: '新手祈愿',
            self.WANDERLUST_INVOCATION: '常驻祈愿',
            self.CHARACTER_EVENT_WISH: '角色活动祈愿',
            self.CHARACTER_EVENT_WISH_2: '角色活动祈愿-2',
            self.WEAPON_EVENT_WISH: '武器活动祈愿',
        }[self]

    def __abs__(self) -> 'GachaType':
        # 转换为实际可以请求的卡池类型
        return {
            self.BEGINNERS_WISH: self.BEGINNERS_WISH,
            self.WANDERLUST_INVOCATION: self.WANDERLUST_INVOCATION,
            self.CHARACTER_EVENT_WISH: self.CHARACTER_EVENT_WISH,
            self.CHARACTER_EVENT_WISH_2: self.CHARACTER_EVENT_WISH,
            self.WEAPON_EVENT_WISH: self.WEAPON_EVENT_WISH,
        }[self]


class Pool(list):
    """
    祈愿卡池。用于存放单一一个卡池的祈愿记录。
    """
    __slots__ = '_type',

    def __init__(self, types: GachaType, seq=()):
        """
        :param types: 祈愿卡池类型。
        :param seq: 初始数据。
        """
        assert types in GachaType, '未知的祈愿卡池类型'
        self._type = types
        super().__init__(seq)

    def __repr__(self):
        return '<%s.%s(%s) x%i>' % (
            self.__class__.__module__,
            self.__class__.__qualname__,
            str(self._type),
            self.__len__(),
        )

    def __add__(self, other) -> 'Pool':
        self.extend(other)
        return self

    __iadd__ = __add__

    @property
    def gacha_type(self) -> GachaType:
        """祈愿卡池类型。"""
        return self._type

    def maps(self, mapping: Callable) -> None:
        """
        Make an iterator that computes the function using arguments from
        each of the iterables.  Stops when the shortest iterable is exhausted.
        """
        seq = map(mapping, self)
        self.clear()
        self.extend(seq)

    def extract(self, index: int = -1) -> tuple:
        """
        使用卡池中的某一条祈愿记录获取以下属性：

        - uid
        - language

        :param index: 所使用的祈愿记录的下标。负数表示倒数第几条。
        :return: 默认返回空字符串。
        """
        uid, region, language = '', '', ''
        try:
            uid = self[index]['uid']
            language = self[index]['lang']
        except KeyError:
            pass
        return uid, region, language


class Shelf(dict):
    """
    所有祈愿卡池。
    """
    UIGF_VERSION = '2.2'
    UIGF_EXPORT_APP = 'Seraphonogram'
    UIGF_EXPORT_VER = '3.0'  # 因为是第二次重构……

    gacha_type_field = 'uigf_gacha_type'
    """祈愿记录中表示卡池的字段。不写入 ``serial`` 属性则不需要理会此属性。"""

    def __init__(self):
        super().__init__({_t: Pool(_t) for _t in GachaType})

        self.uid: str = ''
        """玩家在原神中的账号号码。"""

        self.region: str = ''
        """游戏客户端所在地区。"""

        self.language: str = ''
        """祈愿记录的语言文字。"""

    def __repr__(self):
        return '<%s.%s(%s) region=%s, lang=%s, pools=[%s]>' % (
            self.__class__.__module__,
            self.__class__.__qualname__,
            self.uid,
            self.region,
            self.language,
            ', '.join(repr(pool) for pool in self.values()),
        )

    def __getitem__(self, k) -> Pool:
        return super().__getitem__(k)

    def __setitem__(self, k, v) -> None:
        if k not in self:
            raise KeyError('不允许创建新的卡池')
        super().__setitem__(k, v)

    def __iadd__(self, o):
        if not isinstance(o, Shelf):
            raise NotImplementedError
        for k in self.keys():
            self[k] += o[k]
        self.uid = o.uid if self.uid == '' else self.uid
        self.region = o.region if self.region == '' else self.region
        self.language = o.language if self.language == '' else self.language
        return self

    __add__ = __iadd__

    @property
    def serial(self) -> list:
        """
        装在一个列表里的所有卡池的祈愿记录。
        """
        _data = []
        for v in self.values():
            _data += v
        return _data

    @serial.setter
    def serial(self, records: list[dict]) -> None:
        [self[k].clear() for k in self]
        for record in records:
            _type = record[self.gacha_type_field]
            _type = GachaType(_type)
            self[_type].append(record)

    # 关于 UIGF
    # https://github.com/DGP-Studio/Snap.Genshin/wiki/StandardFormat

    @property
    def uigf_data(self) -> dict:
        """
        一个包含UIGF约定的JSON数据的字典。
        """
        now = datetime.now()
        return {
            "info": {
                "uid": self.uid,
                "lang": self.language,
                "region": self.region,
                "export_time": now.strftime('%Y-%m-%d %H:%M:%S'),
                "export_timestamp": int(now.timestamp()),
                "export_timezone": 'UTC+08:00:00',
                "export_app": self.UIGF_EXPORT_APP,
                "export_app_version": self.UIGF_EXPORT_VER,
                "uigf_version": self.UIGF_VERSION,
            },
            "list": self.serial,
        }

    @uigf_data.setter
    def uigf_data(self, raw: dict) -> None:
        self.uid = raw['info'].get('uid', '')
        self.region = raw['info'].get('region', '')
        self.language = raw['info'].get('lang', '')
        self.serial = raw['list']

    def dump(self, fp: IO[str]) -> None:
        """
        将所有祈愿记录导出以UIGF格式导出到文件中。

        :param fp: 可写的文件或其它IO对象。
        :return: 无。
        """
        content = self.uigf_data
        json.dump(
            content, fp, ensure_ascii=False, indent=None, separators=(',', ':')
        )

    def dumps(self, path: str) -> None:
        """
        将所有祈愿记录导出以UIGF格式导出到文件中。

        :param path: 文件地址。
        :return: 无。
        """
        with open(path, 'w', encoding='UTF-8') as f:
            self.dump(f)

    def load(self, fp: IO[str]) -> dict:
        """
        从文件中以UIGF格式载入所有祈愿记录。

        :param fp: 可读的文件或其它IO对象。
        :return: info 部分。
        :raise KeyError:
        """
        content = json.load(fp)
        if content.__class__ is not dict:
            raise TypeError
        self.uigf_data = content
        return content['info']

    def loads(self, path: str) -> dict:
        """
        从文件中以UIGF格式载入所有祈愿记录。

        :param path: 文件地址。
        :return: info 部分。
        """
        try:
            with open(path, 'r', encoding='UTF-8') as f:
                return self.load(f)
        except (FileNotFoundError, UnicodeDecodeError):
            return {}

    def keys(self) -> KeysView[GachaType]:
        return super().keys()

    def values(self) -> ValuesView[Pool]:
        return super().values()

    def items(self) -> ItemsView[GachaType, Pool]:
        return super().items()

    def total(self) -> int:
        """
        祈愿记录总计数目。
        """
        return sum(len(_wish) for _wish in self)

    def pad(self) -> None:
        """
        读取祈愿记录，并填充 uid、region、language 字段。
        """
        for v in self.values():
            if len(v) == 0:
                continue
            u, r, la = v.extract()
            self.uid = u
            self.region = r
            self.language = la
            break


class GachaCollector:
    """
    一个用于下载祈愿记录的类。
    """
    SIZE_PER_PAGE_MAX = 20
    PAGE_START = 0
    URL = 'https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog'
    LINE_PREFIX = 'OnGetWebViewPageFinish:'

    def __init__(self, log_encoding='UTF-8'):
        """
        :param log_encoding: 日志文件的编码。
        :raise AuthNotFound: 找不到日志或鉴权信息。
        """
        # 查找日志文件
        root = Path('~/AppData/LocalLow/miHoYo').expanduser()
        for folder in ('原神', 'Genshin Impact', 'YuanShen'):
            logfile = root / folder / 'output_log.txt'
            if logfile.is_file():
                break
        else:
            raise AuthNotFound()

        # 查找鉴权信息
        with open(logfile, 'r', encoding=log_encoding) as f:
            lines = f.readlines()[::-1]
        for line in lines:
            if line.startswith(self.LINE_PREFIX):
                url = line[len(self.LINE_PREFIX):]
                break
        else:
            raise AuthNotFound()

        self._query: dict[str, Any] = parse_qs(urlparse(url).query)
        self._shelf = Shelf()  # collect_all 的时候会重新创建，避免粘连

    @staticmethod
    def earliest() -> datetime:
        """
        原神只能获取最近六个月的祈愿历史记录。
        此方法用于计算最早可以获取到哪天的祈愿记录。

        :return: 一个datetime，表示可能获取到的最早记录的日期。
        """
        return datetime.now() - timedelta(days=6 * 30 - 1)

    def check(self) -> None:
        """
        检测鉴权信息是否可用。

        :raise AuthNotAvailable: 鉴权信息不可用。
        :raise RawRespDecodeError:
        :raise RawRespTypeError:
        """
        resp = http_get(self.URL, params=self._query)
        resp = GenshinResponse(resp)
        if resp.retcode != 0:
            raise AuthNotAvailable(resp.message)

    def collect(self, gacha_type: GachaType) -> Pool:
        """
        下载一个卡池的所有祈愿历史。

        :param gacha_type: 祈愿卡池类型。
        :return: 单个祈愿卡池。
        """
        self._query['gacha_type'] = gacha_type.value
        self._query['size'] = self.SIZE_PER_PAGE_MAX
        self._query['page'] = 1
        self._query['end_id'] = '0'
        while True:
            resp = GenshinResponse(http_get(self.URL, self._query))
            if resp.retcode != 0:
                raise RawResponseException(resp.message)
            records = resp.data['list']
            if not len(records):
                break
            # 将抽卡记录的 gacha_type 转换为 UIGF 的。对照表见下：
            # https://github.com/DGP-Studio/Snap.Genshin/wiki/StandardFormat#uigf_gacha_type-%E6%98%A0%E5%B0%84%E5%85%B3%E7%B3%BB
            for record in records:
                record[self._shelf.gacha_type_field] = \
                    abs(GachaType(record['gacha_type'])).value

            self._shelf.region = resp.data['region']
            self._shelf[gacha_type] += records
            self._query['end_id'] = records[-1]['id']
            self._query['page'] += 1
            self.page_callback(
                gacha_type=gacha_type,
                size=self._query['size'],
                page=self._query['page'],
                end_id=self._query['end_id'],
            )
        self._shelf.uid, self._shelf.language = self._shelf[gacha_type].extract()
        return self._shelf[gacha_type]

    def collect_all(self) -> Shelf:
        """
        下载所有卡池的祈愿历史。

        :return: 所有祈愿卡池。
        """
        self._shelf = Shelf()
        for _type in {abs(_type) for _type in GachaType}:
            self.collect(_type)
            self.pool_callback(_type)
        return self._shelf

    def page_callback(self, gacha_type: GachaType, size: int, page: int, end_id: str) -> None:
        """
        回调函数。每下载完一页祈愿记录就会调用一次。一般用于延时和跟踪下载进度。

        :param gacha_type: 祈愿卡池类型。
        :param size: 页大小。即一页有多少条抽卡记录。
        :param page: 第几页。从1开始。
        :param end_id: 最后一条抽卡记录的id。
        :return: 无。
        """
        pass

    def pool_callback(self, gacha_type: GachaType):
        """
        回调函数。每下载完一个卡池就会调用一次。一般用于延时和跟踪下载进度。

        :param gacha_type: 祈愿卡池类型。
        :return: 无。
        """
        pass
