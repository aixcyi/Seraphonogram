"""
二进制相关的常量和工具类。

Author: aixcyi
Version: 2022.7
"""


class FiniteMeta(type):
    """用于构造有限精度整数类型的元类。"""

    def __new__(
            mcs, cls_name: str, bases: tuple,
            attrs: dict, *args, **kwargs
    ):
        attrs['BITS'] = attrs['BYTES'] * 8
        if attrs['SIGNED']:
            attrs['MIN_VALUE'] = -1 << (attrs['BITS'] - 1)
            attrs['MAX_VALUE'] = (1 << (attrs['BITS'] - 1)) - 1
        else:
            attrs['MIN_VALUE'] = 0
            attrs['MAX_VALUE'] = (1 << attrs['BITS']) - 1

        # # 前六个局部变量是方法定义的参数
        # for attr, value in locals()[6:]:
        #     attrs[attr] = value

        return type(cls_name, bases, attrs)


class Integer(int):
    """32位有符号整数。"""

    BYTES = 4
    SIGNED = True
    BIG_ENDIAN = False
    BITS = BYTES * 8
    if SIGNED:
        MIN_VALUE = -1 << (BITS - 1)
        MAX_VALUE = (1 << (BITS - 1)) - 1
    else:
        MIN_VALUE = 0
        MAX_VALUE = (1 << BITS) - 1

    def __new__(cls, x):
        if isinstance(x, (bytes, bytearray)):
            return cls.from_bytes(x, cls.BIG_ENDIAN)
        if not isinstance(x, int):
            x = int(x)
        full = (1 << cls.BITS) - 1  # 所有位空间
        flag = (1 << cls.BITS - 1)  # 符号位空间（最高位）
        data = (1 << cls.BITS - 1) - 1  # 数据位空间
        if cls.SIGNED:
            # 有符号的话，只保留 BITS-1 位，并将第 BITS 位转换为符号位
            i = x & data if x & flag == 0 else (x & data) - flag
        else:
            # 无符号的话，只保留 BITS 位
            i = x & full
        return int.__new__(cls, i)

    # 同时提供默认字节序序列化和自定义字节序序列化两种方式。

    def __bytes__(self):
        return self.to_bytes(self.BIG_ENDIAN)

    @classmethod
    def from_bytes(cls, byte_list, big_endian=False, *_):
        return cls.__new__(cls, int.from_bytes(
            bytes=byte_list[:cls.BYTES], signed=cls.SIGNED,
            byteorder='big' if big_endian else 'little',
            # 如果源码使用 Literal["little", "big"] 标注byteorder
            # 那么上面这一行将会被 IDE 警告，但这并无错误，不必担心。
        ))

    def to_bytes(self, big_endian=False, *_):
        return int.to_bytes(
            self, length=self.BYTES, signed=self.SIGNED,
            byteorder='big' if big_endian else 'little',
            # 如果源码使用 Literal["little", "big"] 标注byteorder
            # 那么上面这一行将会被 IDE 警告，但这并无错误，不必担心。
        )

    # int是不可变类型，运算会生成新的int对象，因此需要
    # 使用自定义的类构造器重新构造出一个当前类的对象。

    def __neg__(self):
        x = super().__neg__()
        return self.__new__(self.__class__, x)

    def __pos__(self):
        x = super().__pos__()
        return self.__new__(self.__class__, x)

    def __abs__(self):
        x = super().__abs__()
        return self.__new__(self.__class__, x)

    # 加减法只可能会出现上溢和下溢，只需按照正常算术加减，再用
    # __new__() 进行裁剪即可得到符合要求的有限精度整数类对象。

    def __add__(self, other):
        x = super().__add__(other)
        return self.__new__(self.__class__, x)

    def __sub__(self, other):
        x = super().__sub__(other)
        return self.__new__(self.__class__, x)

    def __radd__(self, other):
        x = super().__radd__(other)
        return self.__new__(self.__class__, x)

    def __rsub__(self, other):
        x = super().__rsub__(other)
        return self.__new__(self.__class__, x)

    # Python整数的位运算结果与有限精度整数的位运算结果
    # 是一致的，因此只需要确保第二个操作数符合类型的规定，
    # 然后使用类型进行封装即可。

    def __and__(self, other):
        o = self.__new__(self.__class__, other)
        x = super().__and__(o)
        return self.__new__(self.__class__, x)

    def __xor__(self, other):
        o = self.__new__(self.__class__, other)
        x = super().__xor__(o)
        return self.__new__(self.__class__, x)

    def __or__(self, other):
        o = self.__new__(self.__class__, other)
        x = super().__or__(o)
        return self.__new__(self.__class__, x)

    def __invert__(self):
        x = super().__invert__()
        return self.__new__(self.__class__, x)


class Long(Integer, metaclass=FiniteMeta):
    """64位有符号整数。"""

    BYTES = 8
    SIGNED = True
    BIG_ENDIAN = False


class Short(Integer, metaclass=FiniteMeta):
    """16位有符号整数。"""

    BYTES = 2
    SIGNED = True
    BIG_ENDIAN = False


class Byte(Integer, metaclass=FiniteMeta):
    """8位无符号整数。"""

    BYTES = 1
    SIGNED = False
    BIG_ENDIAN = False


def split_bits(i: int) -> list[int]:
    """
    将一个整数用N个2的整数倍表示。

    >>> split_bits(22)
    [2, 4, 16]
    >>> split_bits(0)
    [0]
    >>> split_bits(-23)  # Python中整数的负号不影响二进制位
    [1, 2, 4, 16]

    :param i: 任意整数。
    :return: 一个列表。
    """
    if i < 0:
        return split_bits(-i)
    if i == 0:
        return [0]
    return [1 << f for f in range(i.bit_length()) if i & (1 << f) != 0]


if __name__ == '__main__':
    print('Byte\t', Byte.MIN_VALUE, '~', Byte.MAX_VALUE)
    print('Short\t', Short.MIN_VALUE, '~', Short.MAX_VALUE)
    print('Integer\t', Integer.MIN_VALUE, '~', Integer.MAX_VALUE)
    print('Long\t', Long.MIN_VALUE, '~', Long.MAX_VALUE)

    assert type(Integer.from_bytes(b'\xD0\xA1\xD2\xED')) is Integer
    assert type(Integer(3500266221)) is Integer
    assert type(-Integer(3500266221)) is Integer
    assert type(+Integer(3500266221)) is Integer
    assert type(abs(Integer(3500266221))) is Integer
    assert type(Integer(233) + 666) is Integer
    assert type(Integer(233) - 666) is Integer
    assert type(666 + Integer(233)) is Integer
    assert type(666 - Integer(233)) is Integer
    assert type(Integer(233) & 666) is Integer
    assert type(Integer(233) ^ 666) is Integer
    assert type(Integer(233) | 666) is Integer
    assert type(~Integer(233)) is Integer

    be_int = b'\xD0\xA1\xD2\xED'
    assert Integer(3500266221) == -794701075
    assert Integer(be_int[::-1]) == -794701075
    assert bytes(Integer(3500266221)) == be_int[::-1]
    assert Integer.from_bytes(be_int, True) == -794701075
    assert Integer(-794701075).to_bytes() == be_int[::-1]

    assert Integer(233) & 666 == 136
    assert Integer(-233) & 666 == 530
    assert Integer(233) & -666 == 96
    assert Integer(-233) & -666 == -762
