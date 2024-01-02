# 实现任意进制转十进制

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2022年8月17日](https://img.shields.io/badge/Release-2022.08.17-purple.svg)

仅用[内置函数](https://docs.python.org/zh-cn/3/library/functions.html)及列表推导式完成任意进制（文本）转到十进制（整数）。这里先分析“从十六进制到十进制”，然后推广到“任意进制到十进制”。

## 0x01：十六进制转十进制

### 思路

分析一下十六进制转十进制的过程。以十六进制整数`D0A1D2ED`为例，

| 字符位置 |       0        |       1        |       2        |       3        |       4        |       5        |       6        |       7        |
| -------: | :------------: | :------------: | :------------: | :------------: | :------------: | :------------: | :------------: | :------------: |
| 十六进制 |       D        |       0        |       A        |       1        |       D        |       2        |       E        |       D        |
|   十进制 |       13       |       0        |       10       |       1        |       13       |       2        |       14       |       13       |
|     权重 | 16<sup>7</sup> | 16<sup>6</sup> | 16<sup>5</sup> | 16<sup>4</sup> | 16<sup>3</sup> | 16<sup>2</sup> | 16<sup>1</sup> | 16<sup>0</sup> |

用每一位的十进制乘以权重后的和就是对应的十进制整数。

$$
\begin{aligned}
3500266221=13 \times 16^7 +0 \times 16^6 +10 \times 16^5 +1 \times 16^4 +\\
13 \times 16^3+2 \times 16^2+14 \times 16^1+13 \times 16^0
\end{aligned}
$$

其中，每一位的十进制，刚好是每一位的十六进制字符，在字符集`0123456789ABCDEF`中出现的位置，

|      |  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  A   |  B   |  C   |  D   |  E   |  F   |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|      |  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  10  |  11  |  12  |  13  |  14  |  15  |
|  D   |      |      |      |      |      |      |      |      |      |      |      |      |      |  13  |      |      |
|  0   |  0   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
|  A   |      |      |      |      |      |      |      |      |      |      |  10  |      |      |      |      |      |
|  1   |      |  1   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
|  D   |      |      |      |      |      |      |      |      |      |      |      |      |      |  13  |      |      |
|  2   |      |      |  2   |      |      |      |      |      |      |      |      |      |      |      |      |      |
|  E   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  14  |      |
|  D   |      |      |      |      |      |      |      |      |      |      |      |      |      |  13  |      |      |

### 实现

十六进制整数`D0A1D2ED`长度为8，权重的幂是0~7，因此可以使用[`range(n)`](https://docs.python.org/zh-cn/3/library/functions.html#func-range)生成一个`[0,n)`的递增数列作为权重的幂。

```python
integer = "D0A1D2ED"
length = len(integer)  # length == 8
powers = range(length)  # list(powers) == [0, 1, 2, 3, 4, 5, 6, 7]
```

十六进制对应的十进制，刚好是字符在字符集中的位置，比如`0`在第0个位置，`A`在第10个位置。使用字符串的方法[`index()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.index)即可实现。

```python
integer = "D0A1D2ED"
charset = "0123456789ABCDEF"
digits = [charset.index(char) for char in integer]
# digits == [13, 0, 10, 1, 13, 2, 14, 13]
# 对应的字符：  D  0   A  1   D  2   E   D
```

接下来需要将十进制和权重使用[`zip()`](https://docs.python.org/zh-cn/3/library/functions.html#zip)组合在一起，方便后续计算。注意权重和十进制的顺序是相反的。因为权重的底数是固定值，所以这里不添加到组合中。

```python
integer = "D0A1D2ED"
charset = "0123456789ABCDEF"
digits = [charset.index(char) for char in integer][::-1]
# digits = [13, 14, 2, 13, 1, 10, 0, 13]

powers = range(len(integer))
# list(powers) == [0, 1, 2, 3, 4, 5, 6, 7]

pairs = zip(digits, powers)
# list(pairs) == [(13,0), (14,1), (2,2), (13,3), (1,4), (10,5), (0,6), (13,7)]
```

每个`pair`需要按照以下关系进行计算，然后对所有`product`进行求和，即可得到最终结果。

$$
product_p = pair_0 \times 16^{pair_1}
$$

使用Python表达如下：

```python
def multiply(pair):
    product = pair[0] * 16 ** pair[1]
    return product
```

转译为匿名函数如下：

```python
lambda pair: pair[0] * 16 ** pair[1]
```

使用[`map()`](https://docs.python.org/zh-cn/3/library/functions.html#map)将`pair`求值为`product`。map作动词即为映射，这里便是将这个关系应用在每一个元素上，得到计算后的值。

```python
integer = "D0A1D2ED"
charset = "0123456789ABCDEF"
digits = [charset.index(char) for char in integer][::-1]
# digits = [13, 14, 2, 13, 1, 10, 0, 13]

powers = range(len(integer))
# list(powers) == [0, 1, 2, 3, 4, 5, 6, 7]

pairs = zip(digits, powers)
# list(pairs) == [(13,0), (14,1), (2,2), (13,3), (1,4), (10,5), (0,6), (13,7)]

products = map(lambda pair: pair[0] * 16 ** pair[1], pairs)
# list(products) == [13, 224, 512, 53248, 65536, 10485760, 0, 3489660928]

summary = sum(products)
# summary == 3500266221
```

最后使用[`sum()`](https://docs.python.org/zh-cn/3/library/functions.html#sum)求所有product的总和，即是结果。sum是summary的缩写，是对有限的数列进行求和。换句话说，它相当于使用了`+`对所有元素进行拼接，并计算拼接出来的表达式。

## 0x02：N进制转十进制

以`integer`为参数，将上述代码封装到函数中：

```python
def n2hex(integer):
    charset = "0123456789ABCDEF"
    digits = [charset.index(char) for char in integer][::-1]
    powers = range(len(integer))
    pairs = zip(digits, powers)
    products = map(lambda pair: pair[0] * 16 ** pair[1], pairs)
    summary = sum(products)
    return summary
```

不难看出，字符集`charset`长度为16，刚好对应了`integer`的进制。因此可以将以上代码推广为N进制转换为十进制，其中N进制取决于`charset`的长度。

```python
def n2dec(integer, charset):
    digits = [charset.index(char) for char in integer][::-1]
    powers = range(len(integer))
    pairs = zip(digits, powers)
    base = len(charset)
    products = map(lambda pair: pair[0] * base ** pair[1], pairs)
    summary = sum(products)
    return summary
```

精简代码后可以写成：

```python
def n2dec(x, charset):
    base = len(charset)
    return sum(map(
        lambda p: p[0] * base ** p[1],
        zip([charset.index(c) for c in x][::-1], range(len(x))),
    ))
```

## 0x03：负数进制转换

大于二进制的进制的负数一般用原码表示，即符号位+绝对值。因此在只考虑负号的情况下，只需：

```python
def n2dec(x, charset):
    base = len(charset)
    negative = x.startswith('-')  # 检测是否为负号开头
    x = x[1:] if negative else x  # 去掉开头的负号
    i = sum(map(
        lambda p: p[0] * base ** p[1],
        zip([charset.index(c) for c in x][::-1], range(len(x))),
    ))
    return -i if negative else i
```

