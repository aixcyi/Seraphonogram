"""
编码相关的常量和工具类。

Author: aixcyi
Version: 2022.8
"""

# 注意：Base64的码表的顺序应该是[A-Z][a-z][0-9]\+\\
BASE8 = '012345678'
BASE16 = '0123456789ABCDEF'
BASE36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
BASE94 = BASE62 + "!\"#$%&'()*,-.:;<=>?@[\\]^_`{|}~"
BASE64 = BASE62 + '+/'
BASE64SAFE = BASE62 + '-_'


def n2dec(x: int | str, charset: str) -> int:
    """
    将N进制整数转换为十进制。

    :param x: N进制整数。
    :param charset: 字符集。其长度决定了整数x是多少进制。
                    比如八进制对应 "01234567" ，十六进制对应 "0123456789ABCDEF" 。
    :return: 十进制整数。
    :raise TypeError:
    :raise ValueError:
    """
    if isinstance(x, int):
        return int(x)
    if not isinstance(x, str):
        raise TypeError('参数 x 只能是 int 或 str 及其子类。')

    base = len(charset)
    if base < 2:
        raise ValueError('最低支持二进制。')

    negative = x.startswith('-')
    __x = x[1:] if negative else x[:]
    # if base <= 36:
    #     __x = __x.upper()
    if len(set(__x) - set(charset)) > 0:
        raise ValueError('N进制整数 x 的部分字符未出现在字符集中。')

    # x="D0A1D2ED", charset="0123456789ABCDEF"
    # -> [13, 0, 10, 1, 13, 2, 14, 13]
    # -> [13, 14, 2, 13, 1, 10, 0, 13]
    # -> [(13,0), (14,1), (2,2), (13,3), (1,4), (10,5), (0,6), (13,7)]
    # -> [13*base**0, 14*base**1, 2*base**2, 13*base**3, 1*base**4, ...]
    # -> summary(...)
    # -> 3500266221

    __x = __x[::-1]
    pairs = zip((charset.index(char) for char in __x), range(len(__x)))
    i = sum(map(lambda pair: pair[0] * base ** pair[1], pairs))
    return -i if negative else i


def dec2n(x: int, charset: str) -> str:
    """
    将十进制正整数转换为N进制整数。

    :param x: 十进制正整数。
    :param charset: 字符集。其长度决定了整数x是多少进制。
                    比如八进制对应 "01234567" ，十六进制对应 "0123456789ABCDEF" 。
    :return: N进制正整数。
    """

    # i=3500266221, base=16, charset="0123456789ABCDEF"
    # -> [13, 14, 2, 13, 1, 10, 0, 13]
    # -> ['D', 'E', '2', 'D', '1', 'A', '0', 'D']
    def dec2seq(i: int, base: int):
        while i >= base:
            yield charset[i % base]
            i //= base
        yield charset[i]

    # x=3500266221, charset="0123456789ABCDEF"
    # -> ['D', 'E', '2', 'D', '1', 'A', '0', 'D']
    # -> "DE2D1A0D"
    # -> "D0A1D2ED"
    return ''.join(dec2seq(int(x), len(charset)))[::-1]


class IPv4(object):
    __slots__ = '_ip', '_int', '_class'

    def __init__(self, address: tuple[int]):
        if address.__class__ is not tuple:
            raise TypeError
        if len(address) != 4 or not all(0 <= octet <= 255 for octet in address):
            raise ValueError
        self._ip = address
        self._int = self.to_int()
        self._class = self._get_network_class()

    @classmethod
    def from_str(cls, string: str):
        parts = tuple(int(part) for part in string.split('.'))
        return cls(parts)

    @classmethod
    def from_bytes(cls, data: bytes):
        return cls(tuple(data[:4]))

    @classmethod
    def from_int(cls, integer: int, signed: bool = False):
        bs = integer.to_bytes(4, byteorder='big', signed=signed)
        return cls(tuple(bs[:4]))

    @property
    def network_class(self) -> str:
        return self._class

    def __eq__(self, o) -> bool:
        if isinstance(o, IPv4):
            return self._ip == o._ip
        raise False

    def __lt__(self, o) -> bool:
        if isinstance(o, IPv4):
            return self._ip < o._ip
        raise False

    def __le__(self, o) -> bool:
        if isinstance(o, IPv4):
            return self._ip <= o._ip
        raise False

    def __gt__(self, o) -> bool:
        if isinstance(o, IPv4):
            return self._ip > o._ip
        raise False

    def __ge__(self, o) -> bool:
        if isinstance(o, IPv4):
            return self._ip >= o._ip
        raise False

    def _get_network_class(self) -> str:
        match head := self._ip[0]:
            case 0b00000000 if head & 0b10000000:
                return 'A'
            case 0b10000000 if head & 0b11000000:
                return 'B'
            case 0b11000000 if head & 0b11100000:
                return 'C'
            case 0b11100000 if head & 0b11110000:
                return 'D'
            case 0b11110000 if head & 0b11110000:
                return 'E'
            case _:
                raise ValueError

    def to_str(self) -> str:
        return '.'.join(str(octet) for octet in self._ip)

    __str__ = to_str

    def to_bytes(self) -> bytes:
        return bytes(self._ip)

    __bytes__ = to_bytes

    def to_int(self, signed: bool = False) -> int:
        return int.from_bytes(bytes(self._ip), byteorder='big', signed=signed)

    def to_tuple(self) -> tuple:
        return self._ip


if __name__ == '__main__':
    assert n2dec("D0A1D2ED", BASE16) == 3500266221
    assert dec2n(3500266221, BASE16) == "D0A1D2ED"
