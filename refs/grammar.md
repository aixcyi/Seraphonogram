---
title: Python 语法更新摘要
outline: deep
createAt: 2023-12-23 23:59
updateAt: 2025-04-27 17:10
expires: 365
order: 1
excerpt: 
    本文包含 Python 3.0 以来语法上的更新，主要包括类型标注系统以及一些语句语法的变动。
---

> [!WARNING] 仅供粗略参考
> 本文仅仅只是粗略摘要，具体请参阅[自 2.0 以来的全部新变化](https://docs.python.org/zh-cn/3/whatsnew/index.html)或下文附上的每个版本的所有变化。

<SeeAlsoBar flavor="foot" :refs="[
    { text: 'Status of Python Versions', link: 'https://devguide.python.org/versions/' },
]"/>

## 3.14 版本（草稿） {#314}

<LinkCard href="https://docs.python.org/zh-cn/3.14/whatsnew/3.14.html" text="Python 3.14 有什么新变化（草稿）" />

### t-字符串

t-字符串是 [f-字符串](#f-字符串) 的泛化（generalization），基于后者的语法和规则构建，产生
[`string.templatelib.Template`](https://docs.python.org/zh-cn/3/library/string.html#string.Template)
类型的对象（而非 `str`）；通过这种类型，可以访问包含原始信息的模板属性：静态字符串、插值表达式，以及来自原始作用域的值。

> [!TIP] 提醒
> `Template` 类型早在 Python 3.0 就已经存在了，不必担心其向下兼容的能力。

### `except` 与 `except*` 可不带括号

```python:line-numbers {9}
import requests

try:
    resp = requests.get('https://127.0.0.1:8000/server-status/').json()
    code = resp['code']
    data = resp['data']['RunningTime']
except requests.exceptions.JSONDecodeError:
    pass
except KeyError, TypeError:
    pass
```

### `finally` 块中禁用 `return` `break` `continue`

从这个版本开始，再在 `finally` 块中使用 `return`、`break` 或 `continue` 会抛出
[SyntaxWarning](https://docs.python.org/zh-cn/3/library/exceptions.html#SyntaxWarning)
异常。详见 [**PEP 765**](https://peps.python.org/pep-0765/)。

> [!NOTE] 相关信息
> [Python 3.8](#finally-块中使用-continue) 开始允许在 `finally` 块中使用 `continue`。

## 3.13 版本 {#313}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.13.html" text="Python 3.13 有什么新变化" />

无语法层面变动。

## 3.12 版本 {#312}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.12.html" text="Python 3.12 有什么新变化" />

### 泛型标注

类和函数现在支持通过 `[]` 来标注泛型。

```python
def max[T](numbers: list[T]) -> T:
    ...

class CustomList[T]:

    def __getitem__(self, index: int, /) -> T:
        ...

    def append(self, element: T) -> None:
        ...
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: 'Python 类型系统规范', link: 'https://typing.python.org/en/latest/spec/generics.html' },
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.12.html#pep-695-type-parameter-syntax' },
]"/>

### `type` 语句

现在可以这样创建类型别名：

```python
type Point = tuple[float, float]
```

对于[泛型](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#generic-type-aliases)可以这样创建：

```python
type Point[T] = tuple[T, T]
```

> [!NOTE] 向下兼容
> ```python
> Vector = list[float]
> ```
> 或者
> ```python
> from typing import TypeAlias
> 
> Vector: TypeAlias = list[float]
> ```

而 `type` 语句可以创建更为复杂的类型别名，比如声明
[`TypeVarTuple`](https://docs.python.org/zh-cn/3/library/typing.html#typing.TypeVarTuple)
和 [`ParamSpec`](https://docs.python.org/zh-cn/3/library/typing.html#typing.ParamSpec)
形参，以及带边界或约束的 [`TypeVar`](https://docs.python.org/zh-cn/3/library/typing.html#typing.TypeVar) 形参：

```python
type IntFunc[**P] = Callable[P, int]  # ParamSpec
type LabeledTuple[*Ts] = tuple[str, *Ts]  # TypeVarTuple
type HashableSequence[T: Hashable] = Sequence[T]  # 带边界的 TypeVar
type IntOrStrSequence[T: (int, str)] = Sequence[T]  # 带约束的 TypeVar
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.12.html#pep-695-type-parameter-syntax' },
]"/>

### f-字符串嵌套

1、允许重复使用引号

```python
print(f"{f"{f"{f"{f"{f"{1+1}"}"}"}"}"}")  # 打印 '2'
```

2、允许嵌入多行表达式和注释

```python
print(f"This is the playlist: {", ".join([
    'Take me back to Eden',  # My, my, those eyes like fire
    'Alkaline',              # Not acid nor alkaline
    'Ascensionism'           # Take to the broken skies at last
])}")
# 打印 'This is the playlist: Take me back to Eden, Alkaline, Ascensionism'
```

3、允许使用反斜框和 unicode 字符

```python
songs = ['Take me back to Eden', 'Alkaline', 'Ascensionism']

print(f"This is the playlist: {"\n".join(songs)}")
# 打印：
# This is the playlist: Take me back to Eden
# Alkaline
# Ascensionism

print(f"This is the playlist: {"\N{BLACK HEART SUIT}".join(songs)}")
# 打印：
# This is the playlist: Take me back to Eden♥Alkaline♥Ascensionism
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.12.html#pep-701-syntactic-formalization-of-f-strings' },
]"/>

## 3.11 版本 {#311}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.11.html" text="Python 3.11 有什么新变化" />

### 异常组与 `except*`

> 程序能够同时引发和处理多个不相关的异常。内置类型
> [`ExceptionGroup`](https://docs.python.org/zh-cn/3/library/exceptions.html#ExceptionGroup)
> 和 [`BaseExceptionGroup`](https://docs.python.org/zh-cn/3/library/exceptions.html#BaseExceptionGroup)
> 使得将异常划分成组并一起引发成为可能，新添加的
> [`except*`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#except-star)
> 是对 [`except`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#except)
> 的泛化语法，这一语法能够匹配异常组的子组。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.11.html#pep-654-exception-groups-and-except' },
]"/>

## 3.10 版本 {#310}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.10.html" text="Python 3.10 有什么新变化" />

### 类型联合

现在可以通过 `X | Y` 的方式代替 `typing.Union[X, Y]` 来表示类型联合。

比如表示参数和返回值可能是一个整数或一个浮点数，之前需要：

```python
from typing import Union

def square(number: Union[int, float]) -> Union[int, float]:
    return number ** 2
```

现在只需要：

```python
def square(number: int | float) -> int | float:
    return number ** 2
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.10.html#pep-604-new-type-union-operator' },
]"/>

### match-case 语句

`match` 会命中至多一个 `case` 并且只会执行该 `case` 的内容，也就是说 **不会** 继续执行后续的
`case`；如果都未命中则查找 `case _` 来执行，如果其未定义则不执行任何代码。

```python
from typing import Optional

class Furry:
    gender: Optional[bool]

    def get_gender_display() -> str:
        match self.gender:
            case True:
                return "雄性"
            case False:
                return "雌性"
            case _:
                return "(未知)"
```

`case` 仅有变量名时，会强制解析为变量，因此若需要匹配内置类型时，应当使用标准库
[`builtins`](https://docs.python.org/zh-cn/3/library/builtins.html)：

```python
import builtins

match type(obj):
    case builtins.int:
        print("对象是一个整数")
    case builtins.float:
        print("对象是一个浮点数")
    case builtins.complex:
        print("对象是一个复数")
    case _:
        print("对象类型未知")
```

可以像类型联合那样通过 `|` 同时匹配多个值：

```python
def http_error(status):
    match status:
        case 401 | 403 | 404:
            return "Not allowed"
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"
```

匹配模式允许解包使用，以及在 `case` 中定义变量：

```python
from typing import Tuple

def show(point: Tuple[float, float]):
    match point:
        case (0, 0):
            print("处于原点")
        case (0, y):
            print(f"处于Y轴上，刻度为 {y}")
        case (x, 0):
            print(f"处于X轴上，刻度为 {x}")
        case (x, y):
            print(f"坐标为：X={x}，Y={y}")
        case _:
            raise ValueError("参数不是一个点")
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.10.html#pep-634-structural-pattern-matching' },
]"/>

### 带圆括号的上下文管理器

> 支持使用外层圆括号来使多个上下文管理器可以连续多行地书写。这允许将过长的上下文管理器集能够以与之前
> import 语句类似的方式格式化为多行的形式。

```python
with (
    CtxManager1() as example1,
    CtxManager2() as example2,
    CtxManager3() as example3,
):
    ...

with (CtxManager() as example):
    ...

with (
    CtxManager1(),
    CtxManager2()
):
    ...

with (CtxManager1() as example,
      CtxManager2()):
    ...

with (CtxManager1(),
      CtxManager2() as example):
    ...

with (
    CtxManager1() as example1,
    CtxManager2() as example2
):
    ...
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.10.html#parenthesized-context-managers' },
]"/>

## 3.9 版本 {#39}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.9.html" text="Python 3.9 有什么新变化" />

### 多项集泛型

标注 `list`、`dict`、`set`、`queue.Queue` 等标准库的多项集类型时不再需要从
`typing` 导入对应的大写形式类型名如 `List`、`Dict`、`Set`。

```python
def choice(numbers: list[int]) -> int:
    ...
```

如果需要兼容旧版本，可以考虑导入 `__future__`：

```python
from __future__ import annotations

def choice(numbers: list[int]) -> int:
    ...
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.9.html#type-hinting-generics-in-standard-collections' },
]"/>

## 3.8 版本 {#38}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.8.html" text="Python 3.8 有什么新变化" />

### 赋值表达式

新增了赋值表达式符号 `:=` ，又叫海象运算符。

```python{7}
from datetime import date

def parse_date(string: str) -> date:
    """
    解析六位或八位的日期。
    """
    if (length := len(string)) not in (8, 6):
        raise ValueError

    if length == 8:
        year, month, day = string[:4], string[4:6], string[6:8]
    else:
        year, month, day = string[:2], string[2:4], string[4:6]
        year = f'19{year}' if year > '50' else f'20{year}'

    return date(int(year), int(month), int(day))

parse_date('20120520')
```

语句比较简单时不必加括号：

```python
string = input()

if length := len(string):  # 使用 length 作为条件判断
    raise ValueError("输入不能为空")
```

赋值后可以立即使用：

```python
username = 'aixcyi'
password = '摸一凹喵'

if (user := check(username, password)) is None or user.delete_at is not None:
    raise ValueError('用户不存在或密码错误')
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.8.html#assignment-expressions' },
]"/>

### 仅限位置形参

新增了一个函数形参 `/` 用来分隔其它形参。

| 参数位置                        | 值类型  | 拥有默认值 | 按位置传参 | 按关键字传参 |
|-----------------------------|:----:|:-----:|:-----:|:------:|
| `def func(arg, /, *, **):`  | 实参类型 |  允许   |  允许   |  不允许   |
| `def func(/, arg, *, **):`  | 实参类型 |  允许   |  允许   |   允许   |
| `def func(/, *args, **):`   |  元组  |  不允许  |  允许   |  不允许   |
| `def func(/, *, arg, **):`  | 实参类型 |  允许   |  不允许  |   允许   |
| `def func(/, *, **kwargs):` |  字典  |  不允许  |  不允许  |   允许   |

> [!TIP] 约定俗成
> `args` 和 `kwargs` 是约定俗成的形参命名。

```python
def serialize(data, /, many=False, *, raise_exception=False, **others):
    pass
```

> [!NOTE] 备注
> 由于 `/` 前面的参数不会被公开为可用关键字，这些形参名仍可在 `**kwargs` 中使用。
>
> ```python{5}
> def serialize(data, /, many=False, *, raise_exception=False, **others):
>     print("收到的数据", data)
>     print("额外的数据", others["data"])
> 
> serialize({"weblog": "blog.navifox.net"}, data={"author": "aixcyi"})
> # 打印：
> # 收到的数据 {'weblog': 'blog.navifox.net'}
> # 额外的数据 {'author': 'aixcyi'}
> ```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.8.html#positional-only-parameters' },
]"/>

### f-字符串因变量

允许用 `f"{expr=}"` 形式的 [f-字符串](https://docs.python.org/zh-cn/3/glossary.html#term-f-string) 为表达式的求值结果添加因变量名称。

```python
from datetime import date, timedelta

a = 355
b = 113
y = a / b
print(f'{y=}')
# y=3.1415929203539825

today = date(2023, 12, 22)
tomorrow = today + timedelta(days=1)
print(f'{tomorrow=:%Y-%m-%d}')
# tomorrow=2023-12-23
```

> [!NOTE] 注意
> 带有作用域时，会连同作用域一起输出，比如 `self`：
> 
> ```python{9,13}
> from dataclasses import dataclass
> 
> @dataclass
> class Order:
>     pk: int
>     tracking_no: str
> 
>     def __repr__(self):
>         return f'<Order({self.pk}) {self.tracking_no=}>'
> 
> 
> repr(Order(pk=1, tracking_no='1703292327000'))
> # "<Order(1) self.tracking_no='1703292327000'>"
> ```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging' },
]"/>

### `finally` 块中使用 `continue`

> 在之前版本中 [`continue`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#continue)
> 语句不允许在 [`finally`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#finally)
> 子句中使用，这是因为具体实现存在一个问题。在 Python 3.8 中此限制已被取消。

> [!NOTE] 相关信息
> [Python 3.14](#finally-块中禁用-return-break-continue) 开始禁止在 `finally` 块中使用 `continue`。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.8.html#other-language-changes' },
]"/>

## 3.7 版本 {#37}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.7.html" text="Python 3.7 有什么新变化" />

### 类型标注延迟求值

意思是可以将未定义的符号作为标注。

> [!CAUTION] 特性从未被实现
> 该特性于 [Python 3.7](https://docs.python.org/zh-cn/3/whatsnew/3.7.html#pep-563-postponed-evaluation-of-annotations)
> 提出支持，[Python 3.11](https://docs.python.org/zh-cn/3/whatsnew/3.11.html#pep-563-may-not-be-the-future)
> 表示无限期搁置，因此从始至终都需要 `from __future__ import annotations`（截至 2024 年底）。

```python
from __future__ import annotations

class Book:
    def copy(self) -> Book:
        pass
```

如果不希望导入 `__future__`，那么可以：

```python
class Book:
    def copy(self) -> "Book":
        pass
```

### 允许过量参数

> 现在可以将超过 255 个的参数传递给一个函数，而现在一个函数也可以拥有超过 255 个形参。

换句话说就是现在可以放心地解包一个超长列表 `foo(*big_list)` 。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.7.html#other-language-changes' },
]"/>

### `async` 与 `await`

> [!WARNING] 不能向后兼容
> [`async`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async)
> 和 [`await`](https://docs.python.org/zh-cn/3/reference/expressions.html#await)
> 现在是保留的[关键字](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#identifiers)，这意味着这两个单词
> **无法** 作为一个单独的变量名、函数名、类名、包名。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.7.html#summary-release-highlights' },
]"/>

## 3.6 版本 {#36}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.6.html" text="Python 3.6 有什么新变化" />

### f-字符串

又称[格式化字符串字面值](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings)。添加前缀 `f` 的字符串字面值可以内嵌表达式，来对值进行格式化和无感拼接。

> [!TIP] 提示
> 嵌套的表达式内，字符串使用的引号不能与表达式外面的字符串相同。[Python 3.12](#f-字符串嵌套) 开始没有这个限制。

- `f"{obj!s}"` 相当于 `str(obj)`；
- `f"{obj!r}"` 相当于 `repr(obj)`；
- `f"{qty:x}"`  相当于 `"{x}".format(qty)`；
- `f"{now:%H:%M:%S}"` 相当于 `now.strftime("%H:%M:%S")`。

```python
from datetime import date

today = date(2023, 12, 24)
level = 'DEBUG'
message = '喵' * 9
print(f'[{level}] [{today:%Y-%m-%d}]: {message}')
# 打印
# [DEBUG] [2023-12-24]: 喵喵喵喵喵喵喵喵喵
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '格式规格迷你语言', link: 'https://docs.python.org/zh-cn/3/library/string.html#format-specification-mini-language' },
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-498-formatted-string-literals' },
]"/>

### 变量标注

现在可以对 **当前** 作用域的变量进行类型标注。

> [!NOTE] 备注
> 对变量进行标注后，只要还没有赋值，都无法使用这个变量，不过可以被检测到。

全局作用域示例：

```python
from typing import List, Set

primes: List[int] = []
factories: Set[int]     # 标注但不赋值这种行为是允许的
print(__annotations__)  # {'primes': typing.List[int], 'factories': typing.Set[int]}
print(factories)
# NameError: name 'factories' is not defined
```

类作用域示例：

```python
from datetime import date, timedelta

class Cat:
    dead: bool
    birth: date = date(1935, 11, 1)

    def __init__(self, today: date):
        self.age: int = (today - self.birth) // timedelta(days=365)
        self.height: float
        print(self.__annotations__)  # {'dead': <class 'bool'>, 'birth': <class 'datetime.date'>}
        print(self.dead)

Cat(date.today())
# AttributeError: 'Cat' object has no attribute 'dead'
```

函数作用域中，未赋值但有标注的变量需要通过[`Signature`](https://docs.python.org/zh-cn/3/library/inspect.html#introspecting-callables-with-the-signature-object)检测。

```python
def calc(a: int, b: int):
    result: int = a + b
    summary: float
    print(calc.__annotations__)  # {'a': <class 'int'>, 'b': <class 'int'>}
    print(summary)
    return result

meow(1, 2)
# UnboundLocalError: cannot access local variable 'summary' where it is not associated with a value
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: 'typing 模块 (Python 3.6)', link: 'https://docs.python.org/zh-cn/3.6/library/typing.html' },
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-526-syntax-for-variable-annotations' },
]"/>

### 数字下划线

可以在数字字面值中使用下划线，以改善阅读体验。

```python
assert 21_0000_0000 == 2100000000
assert 0x_0314_1592 == 0x03141592
```

> [!TIP] 下划线不能
> 连续使用
> ```python
> print(210000___0000)
> ```
> 在小数点两侧
> ```python
> print(3_.14)
> print(3._14)
> ```
> 在字面值开头、结尾。
> ```python
> print(_2100000000)
> print(2100000000_)
> ```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-515-underscores-in-numeric-literals' },
]"/>

## 3.5 版本 {#35}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.5.html" text="Python 3.5 有什么新变化" />

### 协程 `async` 和 `await` 语句

> [**PEP 492**](https://peps.python.org/pep-0492/) 通过添加
> [可等待对象](https://docs.python.org/zh-cn/3/glossary.html#term-awaitable)
> 、[协程函数](https://docs.python.org/zh-cn/3/glossary.html#term-coroutine-function)
> 、[异步迭代](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-iterable)
> 和 [异步上下文管理器](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-context-manager)
> 极大地改善了 Python 对异步编程的支持。
>
> 协程函数是使用新的
> [`async def`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async-def)
> 语法来声明的：
> 
> ```python
> async def coro():
>     return 'spam'
> ```
> 
> 在协程函数内部，新的
> [`await`](https://docs.python.org/zh-cn/3/reference/expressions.html#await)
> 表达式可用于挂起协程的执行直到其结果可用。任何对象都可以被 **等待**，只要它通过定义 `__await__()` 方法实现了
> [awaitable](https://docs.python.org/zh-cn/3/glossary.html#term-awaitable)
> 协议。

> [!TIP] 提醒
> `async` 和 `await` 到 [Python 3.7](#async-与-await)
> 才成为[关键字](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#identifiers)。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-492-coroutines-with-async-and-await-syntax' },
]"/>

### 更多解包

可以在函数调用中使用任意多个 `*` 和 `**` 解包：

```python
print(*[1], *[2], 3, *[4, 5])
# 打印
# 1 2 3 4 5
```

列表、元组、集合与字典的 **字面值** 表达式也分别可以使用任意多个 `*` 与 `**` 解包：

```python
*range(4), 4
# 打印 (0, 1, 2, 3, 4)

[*range(4), 4]
# 打印 [0, 1, 2, 3, 4]

{*range(4), 4, *(5, 6, 7)}
# 打印 {0, 1, 2, 3, 4, 5, 6, 7}

{'x': 1, **{'y': 2}}
# 打印 {'x': 1, 'y': 2}
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-448-additional-unpacking-generalizations' },
]"/>

### 矩阵运算符

二元运算符 `@` 目前（截至 2024 年底）只为第三方库 **矩阵乘法** 的计算而设计，Python
内置的类型并不支持该运算，开发者可以定义对应的魔术方法 `__matmul__()` 、`__rmatmul__()` 、`__imatmul__()`
来为自定义对象模拟该运算。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '魔术方法', link: 'https://docs.python.org/zh-cn/3/reference/datamodel.html#emulating-numeric-types' },
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-465-a-dedicated-infix-operator-for-matrix-multiplication' },
]"/>

### 类型标注 标准化

引入了 [typing](https://docs.python.org/zh-cn/3.5/library/typing.html) 模块提供类型标注的 **标准定义** 和工具，以及一些对于注释不可用的情况的约定。

> [!NOTE] 备注
> 标注存储在
> [`__annotations__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#function.__annotations__)
> 属性中。

> [!TIP] 提示
> `List[str]` 指列表中的元素都是 `str` 类型；  
> `Tuple[int, str]` 指元组中第一个元素是 `int` 类型，第二个元素是 `str` 类型；  
> `Tuple[str, ...]` 指元组中所有元素都是 `str` 类型。

```python
from typing import List, Tuple, Union

def register(username: str, password: str, age: int, gender: bool) -> dict:
    # 提示 username 和 password 应该是一个字符串
    # 提示 age 应该是一个整数
    # 提示 gender 应该是一个布尔值
    # 提示函数返回值应该是一个字典
    ...

def choice(numbers: List[int]) -> int:
    # 提示 numbers 是一个由整数组成的列表
    # 提示函数返回值应该是一个整数
    ...

def login(certificate: Union[str, Tuple[int, str]]:
    # 提示 certificate
    # 可能是一个字符串，
    # 也可能是一个由一个整数和一个字符串组成的元组
    ...

login('1a4384bbdb91756e66f8abdfde8a0075')
login((1, 'admin'))
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-484-type-hints' },
]"/>

## 3.4 版本 {#34}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.4.html" text="Python 3.4 有什么新变化" />

无语法层面变动。

## 3.3 版本 {#33}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.3.html" text="Python 3.3 有什么新变化" />

无语法层面变动。

### 委托子生成器

> [!TIP] 提示
> 对于简单的迭代器，`yield from iterable` 本质上只是 `for item in iterable: yield item` 的简写。

就是将自己的 `yield` 操作委托给自己内部的子生成器进行。

```python
def generate(x):
    yield from range(x, 0, -1)
    yield from range(x)
    yield x

list(generate(5))
# 打印
# [5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5]
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.3.html#pep-380-syntax-for-delegating-to-a-subgenerator' },
]"/>

## 3.2 版本 {#32}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.2.html" text="Python 3.2 有什么新变化" />

无语法层面变动。

## 3.1 版本 {#31}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.1.html" text="Python 3.1 有什么新变化" />

无语法层面变动。

## 3.0 版本 {#30}

<LinkCard href="https://docs.python.org/zh-cn/3/whatsnew/3.0.html" text="Python 3.0 有什么新变化" />

> [!NOTE] 备注
> Python 3.0 是第一个故意不向后兼容的版本，更新太多，由于我没有玩过 Python
> 2.x，所以这一段概括得并不准确甚至很多缺漏，也欢迎提 issue 告知，或者提 pull-request 协助增补。

### 移除打印语句

改用 `print()` 函数调用，不再支持 `print` 语句。

一般情况的传参都可以直接加个括号，而对于输出应该通过参数传递：

```python
print "出生年月", 1970, 1
print (1970, 1)
print >>sys.stderr, "断言：API接口缺少参数"
```

新版写法：

```python
print("出生年月", 1970, 1)
print((1970, 1))
print("断言：API接口缺少参数", file=sys.stderr)
```

<SeeAlsoBar flavor="foot" :refs="[
    { text: '更新详情', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.0.html#print-is-a-function' },
]"/>

### 简化比较、改用新不等号

移除了内置函数 `cmp()` 及对魔术方法 `__cmp__()` 的支持，移除不等号 `<>`，改用 `!=`。

虽然可以通过 `(a > b) - (a < b)` 得到原来 `cmp(a, b)` 的结果，但更建议使用语义更为明确的 `<` `<=` `!=` `==` `>=` `>` 直接比较。

定制对象时，可以通过 `__lt__()` 实现 `<`，通过 `__eq__()` 实现 `==` 和 `!=`，两者配合可以实现 `<` `<=` `!=` `==` `>=` `>`；另外，通过 `__hash__()` 可以判断两个对象是否为同一个。

<SeeAlsoBar flavor="foot" :refs="[
    { text: '魔术方法', link: 'https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__lt__' },
    { text: '排序比较', link: 'https://docs.python.org/zh-cn/3/whatsnew/3.0.html#ordering-comparisons' },
]"/>

### 类型标注

[**PEP 3107**](https://peps.python.org/pep-3107/)
提议对参数和返回值进行标注，不过该提案直到 [Python 3.5](#类型标注-标准化) 才有标准语义。

> [!NOTE] 备注
> 标注存储在
> [`__annotations__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#function.__annotations__)
> 属性中。

对参数的标注：

```python
def foo(a: expression, b: expression = 5, c=None):
    # a 标注为 expression；
    # b 标注为 expression 同时默认值为 5；
    # c 没有标注，默认值为 None。
    ...

def foo(*args: expression, **kwargs: expression):
    # 元组 args 中的每个元素都标注为 expression；
    # 字典 kwargs 中的每个值都标注为 expression。
    ...
```

对返回值的标注：

```python
def foo() -> expression:
    ...
```

### 元类（Meta 类）

之前的写法不再支持：

```python
class Cat:
    __metaclass__ = Animal
    ...

class Husky(Dog):
    __metaclass__ = Animal
    ...
```

现在元类的用法是：

```python
class Cat(metaclass=Animal):
    ...

class Husky(Dog, metaclass=Animal):
    ...
```

### 列表推导式

以下推导式会产生歧义，因此不再支持：

```python
[... for var in item1, item2, ...]
```

如果需要枚举元组产生列表，应当：

```python
[... for var in (item1, item2, ...)]
```

而如果希望将推导出的元素嵌入列表，则：

```python
[*(... for var in items), item2, ...]
```

### 不再允许元组参数解包

普通函数也受到影响，但对于匿名函数影响更大，比如这种方式不再可用：

```python
births = [(1997, 7), (1999, 12)]
birthday = map(lambda (y, m): str(y) + '.' + str(m), births)
```

而要写成

```python
births = [(1997, 7), (1999, 12)]
birthday = map(lambda d: str(d[0]) + '.' + str(d[1]), births)
```

### 字面值前缀与后缀

- 整数文字 *不再支持* 尾随 `l` 或者 `L`，现在 `int` 支持无限长度，直至内存溢出。
- 字符串文字 *不再需要* 前缀 `u` 或者 `U`，但仍可以保留该前缀。
