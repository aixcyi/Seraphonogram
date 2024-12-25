---
title: Python 语法更新摘要
lang: zh-CN
outline: deep
---

# Python 语法更新摘要

> [!NOTE]
> Python 3.0 以来语法上的更新，大概有：
> - 类型标注：泛型、类型联合、多项集、延迟求值、变量标注等；
> - 语句和关键字：`match`-`case`、`except*`、`continue`、`with()`，`async` 和 `await`、`type`、`print` 等；
> - 其它零散的变动，请参阅[自 2.0 以来的全部新变化](https://docs.python.org/zh-cn/3/whatsnew/index.html)。

::: details 徽章说明
徽章记录每个版本的相关情况，详情请参阅[Status of Python Versions](https://devguide.python.org/versions/)。

- 绿色的是正式版首次发布日期；
- 红色的是实际终止支持的日期，或计划终止支持的年月；
- 橘红的是最终的版本号，也就是最后一版源码包；
- 黄色的是最终的二进制文件的版本号，也就是官网可下载的最后一版安装包。
:::

## 3.12 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2023.10.02-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2028.10-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-仍在支持-orange) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-仍在更新-FFD343)

### 泛型标注

> https://docs.python.org/zh-cn/3/whatsnew/3.12.html#pep-695-type-parameter-syntax  
> [**PEP 484**](https://peps.python.org/pep-0484/)下的泛型类和函数是使用详细语法声明的，这使得类型参数的范围不明确，并且需要显式声明变化。[**PEP 695**](https://peps.python.org/pep-0695/)引入了一种新的、更紧凑、更明确的方式来创建[泛型类](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#generic-classes)和[函数](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#generic-functions)。
> 
> ```python
> def max[T](args: Iterable[T]) -> T:
>     ...
> 
> class list[T]:
> 
>     def __getitem__(self, index: int, /) -> T:
>         ...
> 
>     def append(self, element: T) -> None:
>         ...
> ```

### 新增 type 语句

> https://docs.python.org/zh-cn/3/whatsnew/3.12.html#pep-695-type-parameter-syntax  
> 该 PEP 引入了一种新的方法来使用[`type`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#type)语句声明[类型别名](https://docs.python.org/zh-cn/3/library/typing.html#type-aliases)，该语句会创建[`TypeAliasType`](https://docs.python.org/zh-cn/3/library/typing.html#typing.TypeAliasType)的实例：

```python
type Point = tuple[float, float]
```

> 类型别名也可以是[generic](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#generic-type-aliases)：

```python
type Point[T] = tuple[T, T]
```

### f-字符串

> https://docs.python.org/zh-cn/3/whatsnew/3.12.html#pep-701-syntactic-formalization-of-f-strings  
> f-字符串内部的表达式部分现在可以是任何有效的 Python 表达式，包括重用了与标记 f-字符串本身相同的引号的字符串、多行表达式、注释、反斜杠以及 unicode 转义序列。更多细节请参见[**PEP 701**](https://peps.python.org/pep-0701/)。

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

## 3.11 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2022.10.24-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2027.10-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-仍在支持-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.11.9-FFD343)

### 异常组与 `except*`

> https://docs.python.org/zh-cn/3/whatsnew/3.11.html#pep-654-exception-groups-and-except  
> 程序能够同时引发和处理多个不相关的异常。内置类型[`ExceptionGroup`](https://docs.python.org/zh-cn/3/library/exceptions.html#ExceptionGroup)和[`BaseExceptionGroup`](https://docs.python.org/zh-cn/3/library/exceptions.html#BaseExceptionGroup)使得将异常划分成组并一起引发成为可能，新添加的[`except*`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#except-star)是对[`except`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#except)的泛化语法，这一语法能够匹配异常组的子组。

## 3.10 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2021.10.04-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2026.10-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-仍在支持-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.10.11-FFD343)

### 新增 match-case 语句

> https://docs.python.org/zh-cn/3/whatsnew/3.10.html#pep-634-structural-pattern-matching   
> 增加了采用模式加上相应动作的 *match 语句* 和 *case 语句* 的形式的结构化模式匹配。 模式由序列、映射、基本数据类型以及类实例构成。 模式匹配使得程序能够从复杂的数据类型中提取信息、根据数据结构实现分支，并基于不同的数据形式应用特定的动作。

语法非常多坑，墙裂建议通过上面的链接阅读全部文档。

```python
match subject:
    case <pattern_1>:
        <action_1>
    case <pattern_2>:
        <action_2>
    case <pattern_3>:
        <action_3>
    case _:
        <action_wildcard>
```

### 类型联合

> https://docs.python.org/zh-cn/3/whatsnew/3.10.html#pep-604-new-type-union-operator  
> 引入了一种用来表示 “类型 X 或类型 Y” 的语法 `X | Y` 的类型联合运算符，比起[`typing.Union`](https://docs.python.org/zh-cn/3/library/typing.html#typing.Union)这种声明更清晰，特别是在类型提示中。

```python
def square(number: int | float) -> int | float:
    return number ** 2
```

旧版本需要这样：

```python
from typing import Union

def square(number: Union[int, float]) -> Union[int, float]:
    return number ** 2
```

### 带圆括号的上下文管理器

> https://docs.python.org/zh-cn/3/whatsnew/3.10.html#parenthesized-context-managers  
> 支持使用外层圆括号来使多个上下文管理器可以连续多行地书写。这允许将过长的上下文管理器集能够以与之前 import 语句类似的方式格式化为多行的形式。

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

## 3.9 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2020.10.05-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2025.10-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-仍在支持-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.9.13-FFD343)

### 多项集泛型

> https://docs.python.org/zh-cn/3/whatsnew/3.9.html#type-hinting-generics-in-standard-collections  
> 在类型标注中现在你可以使用内置多项集类型例如 `list` 和 `dict` 作为通用类型而不必从 `typing` 导入对应的大写形式类型名（例如 `List` 和 `Dict`）。 标准库中的其他一些类型现在同样也是通用的，例如 `queue.Queue` 。

```python
def greet_all(names: list[str]):
    for name in names:
        print("Hello", name)
```

旧版本可以：

```python
from __future__ import annotations

def greet_all(names: list[str]):
    for name in names:
        print("Hello", name)
```

平替写法是：

```python
from typing import List

def greet_all(names: List[str]):
    for name in names:
        print("Hello", name)
```

## 3.8 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2019.10.14-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2024.10-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-仍在支持-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.8.10-FFD343)

### 赋值表达式

> https://docs.python.org/zh-cn/3/whatsnew/3.8.html#assignment-expressions  
> 新增了赋值表达式符号 `:=` ，又叫海象运算符。

```python
string = '20120520'
if (length := len(string)) not in (8, 6):
    raise ValueError

if length == 8:
    year, month, day = string[:4], string[4:6], string[6:8]
else:
    year, month, day = string[:2], string[2:4], string[4:6]
    year = f'19{year}' if year > '50' else f'20{year}'
```

### 仅限位置形参

> https://docs.python.org/zh-cn/3/whatsnew/3.8.html#positional-only-parameters

新增了一个函数形参 `/` 用来分隔只允许按位置传参的形参，避免后续修改形参名时影响到外部。

```python
def enumerate(_depth, /, verify=False, raise_exception=False, **kvs):
    pass
```

### f-字符串因变量

> https://docs.python.org/zh-cn/3/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging

允许用 `f'{expr=}'` 形式的[f-字符串](https://docs.python.org/zh-cn/3/glossary.html#term-f-string)为表达式的求值结果添加因变量名称。

```python
from datetime import date, timedelta

a = 355
b = 113
y = a / b
print(f'{y=}')  # 打印 y=3.1415929203539825

today = date(2023, 12, 22)
tomorrow = today + timedelta(days=1)
print(f'{tomorrow=:%Y-%m-%d}')  # 打印 tomorrow=2023-12-23
# 相当于
print(f'tomorrow={tomorrow:%Y-%m-%d}')
```

### 允许在 finally 中使用 continue

> https://docs.python.org/zh-cn/3/whatsnew/3.8.html#other-language-changes  
> 在之前版本中[`continue`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#continue)语句不允许在[`finally`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#finally)子句中使用，这是因为具体实现存在一个问题。在 Python 3.8 中此限制已被取消。

## 3.7 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2018.06.27-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2023.06.27-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.7.17-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.7.9-FFD343)

### 类型标注延迟求值

> 3.7 提出支持：  
> https://docs.python.org/zh-cn/3/whatsnew/3.7.html#pep-563-postponed-evaluation-of-annotations
>
> 3.11 表示可能不再实现：  
> https://docs.python.org/zh-cn/3/whatsnew/3.11.html#pep-563-may-not-be-the-future

意思是可以标注前面的、未定义的符号。

下面的例子中，类 `Meow` 在 `-> Meow` 这里还没完成全部定义，属于未定义符号，正常来说是不能引用的，而这个 feature 就是允许这样子引用、不必加引号。

```python
class Meow:
    def copy(self) -> Meow:
        pass
```

这个 feature 还未实现，在 3.7 ~ 3.9 需要导入 `__future__` ，3.10 开始才可以使用。然而可能不会再实现了，所以（截止 3.12）仍然需要导入 `__future__` 。*这里还要列出来就是防止知道新增了、但是不知道在高版本还没生效。*

不过，导入 `__future__` 后实际上就是将标注的类型 **整体** 作为字符串存储，所以

```python
from __future__ import annotations

class Meow:
    def copy(self) -> Meow:
        pass
```

其实就等价于：

```python
class Meow:
    def copy(self) -> "Meow":
        pass
```

### 允许过量参数

> https://docs.python.org/zh-cn/3/whatsnew/3.7.html#other-language-changes  
> 现在可以将超过 255 个参数传递给一个函数，而现在一个函数也可以拥有超过 255 个形参。

### 新增 async 和 await 关键字

> https://docs.python.org/zh-cn/3/whatsnew/3.7.html#summary-release-highlights  
> 向后不兼容的语法更改：[`async`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async)和[`await`](https://docs.python.org/zh-cn/3/reference/expressions.html#await)现在是保留的关键字。

## 3.6 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2016.12.23-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2021.12.23-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.6.15-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.6.8-FFD343)

### f-字符串

> https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-498-formatted-string-literals  
> [**PEP 498**](https://peps.python.org/pep-0498/)引入了一种新型的字符串字面值：*f-字符串*，或称[格式化字符串字面值](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings)。
>
> 格式化字符串字面值带有 `f` 前缀并且类似于[`str.format()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.format)所接受的格式字符串。其中包含由花括号包围的替换字段。替换字段属于表达式，它们会在运行时被求值，然后使用[`format()`](https://docs.python.org/zh-cn/3/library/functions.html#format)协议进行格式化

添加前缀 `f` 的字符串字面值可以内嵌表达式，来对值进行格式化和无感拼接。

- `f"{obj!s}"` 相当于 `str(obj)` ；
- `f"{obj!r}"` 相当于 `repr(obj)` ；
- `f"{qty:x}"`  相当于 `"{x}".format(qty)` ，参见[格式规格迷你语言](https://docs.python.org/zh-cn/3/library/string.html#format-specification-mini-language)；
- `f"{now:%H:%M:%S}"` 相当于 `now.strftime("%H:%M:%S")` 。

```python
from datetime import date

today = date(2023, 12, 24)
level = 'DEBUG'
message = '喵' * 9
print(f'[{level}] [{today:%Y-%m-%d}]: {message}')
# 打印
# [DEBUG] [2023-12-24]: 喵喵喵喵喵喵喵喵喵
```

注意：嵌套的表达式内，字符串使用的引号不能与表达式外面的字符串相同。3.12 开始没有这个限制。

### 变量标注

> https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-526-syntax-for-variable-annotations  
> [**PEP 484**](https://peps.python.org/pep-0484/)引入了函数形参类型标注（即类型提示）的标准。而现在，[**PEP 526**](https://peps.python.org/pep-0526/)添加了标注变量类型的语法，包括类变量和实例变量。

也就是可以对 **当前** 作用域的变量进行类型标注。标注后，只要还没有赋值，就无法使用这个变量，不过可以在全局或类作用域的 `__annotations__` 变量中检测到，而函数内的变量可以通过[`Signature`](https://docs.python.org/zh-cn/3/library/inspect.html#introspecting-callables-with-the-signature-object)检测。详见 Python 3.6 的[typing](https://docs.python.org/zh-cn/3.6/library/typing.html)模块。

全局作用域：

```python
from typing import List

primes: List[int] = []
factories: Set[int]     # 允许标注但不赋值
print(__annotations__)  # {'primes': typing.List[int], 'factories': typing.Set[int]}
print(factories)
# NameError: name 'factories' is not defined
```

函数作用域：

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

类作用域：

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

### 数字下划线

> https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-515-underscores-in-numeric-literals  
> [**PEP 515**](https://peps.python.org/pep-0515/)增加了在数字字面值中使用下划线的能力以改善可读性。

```python
assert 21_0000_0000 == 2100000000
assert 0x03_14_15_92 == 0x03141592
```

## 3.5 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2015.09.13-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2020.09.30-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.5.10-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.5.4-FFD343)

### 协程 async 和 await 语句

> https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-492-coroutines-with-async-and-await-syntax  
> [**PEP 492**](https://peps.python.org/pep-0492/)通过添加[可等待对象](https://docs.python.org/zh-cn/3/glossary.html#term-awaitable)、[协程函数](https://docs.python.org/zh-cn/3/glossary.html#term-coroutine-function)、[异步迭代](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-iterable)和[异步上下文管理器](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-context-manager)极大地改善了 Python 对异步编程的支持。
>
> 协程函数是使用新的[`async def`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#async-def)语法来声明的

```python
async def coro():
    return 'spam'
```

> 在协程函数内部，新的[`await`](https://docs.python.org/zh-cn/3/reference/expressions.html#await)表达式可用于挂起协程的执行直到其结果可用。任何对象都可以被 *等待*，只要它通过定义 `__await__()` 方法实现了[awaitable](https://docs.python.org/zh-cn/3/glossary.html#term-awaitable)协议。

注意：async 和 await 到 3.7 才成为[关键字](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#identifiers)。

### 更多解包

> https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-448-additional-unpacking-generalizations

可以在函数调用中使用任意多个 `*` 和 `**` 解包：

```python
print(*[1], *[2], 3, *[4, 5])
# 打印
# 1 2 3 4 5
```

列表、元组、集合和字典的字面值表达式也分别可以使用任意多个 `*` 和 `**` 解包：

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

### 矩阵运算符

> https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-465-a-dedicated-infix-operator-for-matrix-multiplication

矩阵乘法专用的运算符。目前只为第三方库而设计，Python 内置的类型并没有实现这个运算符对应的魔术方法 `__matmul__()` 、`__rmatmul__()` 、`__imatmul__()` 。

### 类型标注

> https://docs.python.org/zh-cn/3/whatsnew/3.5.html#pep-484-type-hints  
> 该版本通过[**PEP 484**](https://peps.python.org/pep-0484/)引入了一个暂定的[typing](https://docs.python.org/zh-cn/3.5/library/typing.html)模块提供类型标注的 **标准定义** 和工具以及一些对于注释不可用的情况的约定。

详情请参阅[对象注解属性的最佳实践](https://docs.python.org/zh-cn/3/howto/annotations.html)。类型标注从始自终都是一个被动的、人工的类型检查系统，就算标注了错误的类型，代码不会受到任何影响且仍然可以正确运行，它的作用是为类型检查器提供分析。

```python
def greeting(name: str) -> str:
    return 'Hello ' + name
```

类型标注存储在[`__annotations__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#function.__annotations__)属性中，但是不建议用来作强类型校验，因为强类型本身就不符合 Python 的发展理念，并且有时候非常反人类。

## 3.4 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2014.03.16-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2019.03.18-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.4.10-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.4.4-FFD343)

无。

## 3.3 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2012.09.29-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2017.09.29-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.3.7-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.3.5-FFD343)

### 委托子生成器

> https://docs.python.org/zh-cn/3/whatsnew/3.3.html#pep-380-syntax-for-delegating-to-a-subgenerator  
> 对于简单的迭代器，`yield from iterable` 本质上只是 `for item in iterable: yield item` 的简写。

就是将自己的 `yield` 操作委托给自己内部的子生成器进行。

```python
def generate(x):
    yield from range(x, 0, -1)
    yield from range(x)

list(generate(5))
# 打印
# [5, 4, 3, 2, 1, 0, 1, 2, 3, 4]
```

## 3.2 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2011.02.20-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2016.02.20-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.2.6-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.2.5-FFD343)

无。

## 3.1 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2009.06.27-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2012.04.09-darkred) ![最后一版的版本号](https://img.shields.io/badge/终版-3.1.5-E87423) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.1.4-FFD343)

无。

## 3.0 版本

![正式版首次发布日期](https://img.shields.io/badge/正式首发-2008.12.03-darkgreen) ![结束支持的日期](https://img.shields.io/badge/结束支持-2009.06.27-darkred) ![最后一版二进制的版本号](https://img.shields.io/badge/终版二进制-3.0.1-FFD343)

Python 3.0 是第一个故意不向后兼容的版本，更新太多，由于我没有玩过 Python 2.x，所以这一段概括得并不准确甚至很多缺漏，最好参阅[What's New in Python 3.0](https://docs.python.org/zh-cn/3/whatsnew/3.0.html)。也欢迎提 issue 告知，或者提 pull-request 协助增补。

### print 语句改为 print 函数调用

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#print-is-a-function

### 简化比较

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#ordering-comparisons

删除内置函数 `cmp()` 及对魔术方法 `__cmp__()` 的支持。可以通过 `(a > b) - (a < b)` 得到原来 `cmp(a, b)` 的结果。

### 类型标注非标语法

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#changed-syntax

借助[**PEP 3107**](https://peps.python.org/pep-3107/)可以对参数和返回值进行标注，不过该语法还没有标准语义。

对参数的标注：

```python
def foo(a: expression, b: expression = 5, c=None):
    # 仅有默认值的话，等号两边建议不写空格；
    # 带标注的参数的默认值，等号两边建议各留一个空格。
    ...

def foo(*args: expression, **kwargs: expression):
    ...
```

对返回值的标注：

```python
def sum() -> expression:
    ...
```

类型标注存储在[`__annotations__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#function.__annotations__)属性中，但是不建议用来作强类型校验，因为强类型本身就不符合 Python 的发展理念，并且有时候非常反人类。

### 元类

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#changed-syntax

现在元类的用法是：

```python
class MyClass(Parent, metaclass=MyMetaClass):
    # 如果有父类，需要写在前面，跟函数传参一样
    ...
```

之前的写法不再支持：

```python
class MyClass:
    __metaclass__ = MyMetaClass
    ...
```

### 列表推导式

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#changed-syntax

调整了推导式的解析，像下面这个示例

```python
[... for var in item1, item2, ...]
```

不再等效于

```python
[... for var in (item1, item2, ...)]
```

### 不再允许元组参数解包

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#removed-syntax

旧版本的

```python
def foo(a, (b, c)):
    ...
```

现在需要写成

```python
def foo(a, b_and_c):
    b, c = b_and_c
```

### 新的不等号

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#removed-syntax

删除了 `<>` ，改为使用 `!=` 。

### 字面值前缀和后缀

> https://docs.python.org/zh-cn/3/whatsnew/3.0.html#removed-syntax

- 整数文字不再支持尾随 `l` 或者 `L` 。
- 字符串文字不再支持前导 `u` 或者 `U` 。
