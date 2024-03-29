# 标注集合与映射

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2024年1月31日](https://img.shields.io/badge/Release-2024.01.31-purple.svg)

typing 模块的文档在[标注元组](https://docs.python.org/zh-cn/3/library/typing.html#annotating-tuples)一节中已经指明列表、元组和字典的正确标注，但对于集合、不可变集合等的标注，需要参见 [**PEP 484**](https://peps.python.org/pep-0484/#the-typing-module) 关于 typing 模块一节的概述。

> [!NOTE]  
> Python 3.9 之前，内置数据类型不支持下标操作，像 `list[]` 要用 `typing.List[]` 代替，其余类型同理。但如果需要跨版本，可以用 `from __future__ import annotations` 实现向前兼容。

## 列表、集合、不可变集合

标注时只提供一个参数：

```python
list01: list[int] = []
list02: list[int] = [0]
list03: list[int] = [0, 1, 2, -1]

set01: set[int] = set()
set02: set[int] = {0}
set03: set[int] = {0, 1, 2, -1}
```

对于多种类型，需要通过 `typing.Union[A, B]` 或者 `A | B` 的形式进行联合：

```python
list04: list[int | str] = []
list05: list[int | str] = [0]
list06: list[int | str] = ["meow"]
list07: list[int | str] = [0, "meow", 1, 2]

set04: set[int | str] = set()
set05: set[int | str] = {0}
set06: set[int | str] = {"meow"}
set07: set[int | str] = {0, "meow", 1, 2}
```

对于任意类型，两种标注是等价的：

```python
import typing

list08: list = [0, "meow", 1, 2]
list09: list[typing.Any] = [0, "meow", 1, 2]

set08: set = {0, "meow", 1, 2}
set09: set[typing.Any] = {0, "meow", 1, 2}
```

## 字典

字典的标注只使用两个参数，第一个表示键的类型，第二个表示值的类型。

```python
dict01: dict[int, str] = {}
dict02: dict[int, str] = {200: "OK"}
dict03: dict[int, str] = {200: "OK", 404: "Not Found"}
```

对于多种类型，需要通过 `typing.Union[A, B]` 或者 `A | B` 的形式进行联合，类似于[列表](#列表)。

对于任意键值类型，以下两种标注是等价的：

```python
import typing

dict04: dict = {200: "OK", "OK": 200}
dict05: dict[typing.Any, typing.Any] = {200: "OK", "OK": 200}
```

## 元组

元组的标注与实际值需要一一对应：

```python
tuple01: tuple[()] = ()
tuple02: tuple[int] = (0,)
tuple03: tuple[int, int] = (0, 1)
tuple04: tuple[int, int, str] = (0, 1, "meow")
tuple05: tuple[int, int, str, int] = (0, 1, "meow", 2)
```

对于任意长度的值，需要按照 `tuple[TYPE, ...]` 的形式进行标注：

> [!NOTE]  
> 注意，这里不是表示 `tuple[TYPE, TYPE, TYPE, ……]`，`...` 本身就是一个字面值。

```python
tuple06: tuple[int, ...] = ()
tuple07: tuple[int, ...] = (0, 1)
tuple08: tuple[int, ...] = (0, 1, 2)
```

对于多种类型的任意长度元组，需要通过 `typing.Union[A, B]` 或者 `A | B` 的形式进行联合：

```python
tuple09: tuple[int | str, ...] = (0, 1, "meow", 2)
```

对于任意类型的任意长度元组，以下两种标注是等价的：

```python
import typing

tuple0A: tuple = (0, 1, "meow", 2)
tuple0B: tuple[typing.Any, ...] = (0, 1, "meow", 2)
```

