---
title: 避免 Decimal 精度溢出
lang: zh-CN
order: 20250114
created: 2025-01-14 14:49
expires: 1096
excerpt: '省流：后端使用 Decimal 时前端应当配合传递 string 而非 number。'
tags:
    - 开发
    - 测试
    - Python
    - 十进制小数
    - 二进制小数
---

# 避免 Decimal 精度溢出

<RevisionInfo />

> [!IMPORTANT] 声明
> 以下将 `Decimal` 称为十进制小数、将 `float` 称为二进制小数，因为
> Python 中 `Decimal` 的小数点也是浮动的，所以不称定点数，也不使用浮点数这个说法，避免联想到定点数。

::: details 提示
从 Python 3.2 开始，`Decimal` 支持 `float` 类型的值作为入参，但无法将其还原为“字面值”。
```python
from decimal import Decimal

print(Decimal(0.3))
# 打印 Decimal('0.299999999999999988897769753748434595763683319091796875')
```
:::


str(3324*0.6)
'1994.3999999999999'
