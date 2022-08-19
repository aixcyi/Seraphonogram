"""
日期时间相关的常量和工具类。

Author: aixcyi
Version: 2022.8
"""
from datetime import date, timedelta


def get_last_day(year: int, month: int, *_) -> date:
    """
    求某个月的最后一天。

    :param year: 年份。
    :param month: 月份。值必须在1到12之间。
    :return: 当年当月的最后一天。
    :raise IndexError: 提供了错误的月份。
    """
    # 月份  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12
    day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]

    if month == 2 and (
            # 四年一闰；百年不闰，四百年再闰
            year % 400 == 0 or
            year % 100 != 0 and year % 4 == 0
    ):
        day = 29
    return date(year, month, day)


class DateInterval:
    """日期范围（闭区间）。"""

    __slots__ = '_start', '_stop', '_days'
    _ONE_DAY = timedelta(days=1)

    def __init__(self, start: date, stop: date):
        """
        :param start: 开始日期。
        :param stop: 结束日期。
        """
        if not start < stop:
            raise ValueError('开始日期必须早于结束日期。')
        self._start = start
        self._stop = stop
        self._days = (stop - start).days + 1

    def __iter__(self):
        return (self._start + self._ONE_DAY * d for d in range(self._days))

    # ---------------- 转换器 ----------------

    def __repr__(self) -> str:
        return '<%s.%s [%s, %s]>' % (
            self.__class__.__module__,
            self.__class__.__qualname__,
            self._start.strftime('%Y-%m-%d'),
            self._stop.strftime('%Y-%m-%d')
        )

    def __len__(self) -> int:
        return self._days

    def __bool__(self) -> bool:
        return True

    # ---------------- 比较器 ----------------

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self._start == other.start and self._stop == other.stop
        return False

    def after(self, other) -> bool:
        """日期范围整体在 other 之前？"""
        if isinstance(other, DateInterval):
            return self._start < other.start and self._stop < other.start
        if isinstance(other, date):
            return self._start < other and self._stop < other
        raise NotImplementedError

    __lt__ = after

    def before(self, other) -> bool:
        """日期范围整体在 other 之后？"""
        if isinstance(other, DateInterval):
            return self._start > other.start and self._start > other.stop
        if isinstance(other, date):
            return self._start > other and self._stop > other
        raise NotImplementedError

    __gt__ = before

    # ---------------- 成员运算 ----------------

    def __contains__(self, _day) -> bool:
        if isinstance(_day, date):
            return self._start <= _day <= self._stop
        raise NotImplementedError

    def __getitem__(self, _index):
        def _limited(left, right, var):
            if var < left:
                return left
            if right < var:
                return var
            return var

        # 获取日期范围内的第几天
        if isinstance(_index, int):
            if not 0 <= _index < self._days:
                raise IndexError
            return self._start + self._ONE_DAY * _index

        # 获取日期们的切片，返回迭代器
        elif isinstance(_index, slice):
            start = 0 if _index.start is None else _index.start
            step = 1 if _index.step is None else _index.step
            stop = self._days if _index.stop is None else _index.stop
            if not (isinstance(start, int) and
                    isinstance(stop, int) and
                    isinstance(step, int)):
                raise IndexError
            start = _limited(0, self._days, start)
            stop = _limited(0, self._days, stop)
            if not start < stop:
                raise IndexError
            return (
                self._start + self._ONE_DAY * d
                for d in range(start, stop, step)
            )

        # 其它类型的下标不作操作
        raise NotImplementedError

    # ---------------- 集合运算 ----------------

    def __and__(self, other):
        if not isinstance(other, DateInterval):
            raise TypeError(
                '不支持与 %s 对象进行交集运算。' % type(other).__name__
            )

        if self._start == other.start:
            return type(self)(
                max(self._start, other.start),
                min(self._stop, other.stop)
            )

        # 以较早的区间为锚点，观测另一个区间 stop 的位置
        if self._start < other.start:
            one, another = self, other
        else:
            one, another = other, self

        if another.start == one.stop:  # 交于一点
            return one.stop
        if another.start < one.stop:  # 有交集
            return type(self)(
                max(self._start, other.start),
                min(self._stop, other.stop)
            )
        return None  # 没有交集（one 整体早于 another）

    def __or__(self, other):
        if not isinstance(other, DateInterval):
            raise TypeError(
                '不支持与 %s 对象进行并集运算。' % type(other).__name__
            )
        return type(self)(
            min(self._start, other.start),
            max(self._stop, other.stop)
        )

    # ---------------- 属性访问方法 ----------------

    @property
    def start(self) -> date:
        """开始日期。"""
        return self._start

    @property
    def stop(self) -> date:
        """结束日期。"""
        return self._stop

    @property
    def endpoints(self) -> tuple:
        """开始与结束的日期。"""
        return self._start, self._stop

    # ---------------- 普通方法 ----------------

    @classmethod
    def from_month(cls, year: int, month: int):
        start = date(year, month, 1)
        stop = get_last_day(year, month)
        return cls(start, stop)


if __name__ == '__main__':
    from datetime import date, timedelta

    today = date.today()

    yesterday = today - timedelta(days=1)
    tomorrow = today + timedelta(days=1)
    days = DateInterval(yesterday, tomorrow)
    assert today in days
    assert days[1] == today
    assert tuple(days[::]) == (yesterday, today, tomorrow)
    assert tuple(days[1:]) == (today, tomorrow)
    assert tuple(days[:2]) == (yesterday, today)
    assert tuple(days) == (yesterday, today, tomorrow)

    begin = today - timedelta(days=15)
    end = today + timedelta(days=15)
    holiday = DateInterval(begin, end)
    assert type(holiday & days) is DateInterval
    end = today - timedelta(days=7)
    assert type(holiday & days) is DateInterval

    holiday = DateInterval(begin, yesterday)
    assert holiday & days == yesterday
    assert holiday | days == DateInterval(begin, tomorrow)
