# 运算精度

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2019年11月20日](https://img.shields.io/badge/Release-2019.11.20-purple.svg)

Java的 `+`、`-`、`*`、`/` 的最低运算精度是 `int` ，所以以下代码会报错：

```java
short s1 = 3;
short s2 = 5;
s1 = s1 + s2;
```

以上代码的错误原因是 s1 + s2 的结果是 `int` 类型，不能存入 `short` 类型变量。但如果是 `+=`、`-=`、`*=`、`/=` 就不会有这个问题，以下这段代码不会报错：

```java
short s1 = 3;
short s2 = 5;
s1 += s2;
```

运算的最高精度跟算式中最高精度（最大存储范围）的那个量有关系：

```java
int a = 2147483647;
System.out.print(a+2);  // 此时会输出-2147483647
```

因为a（`int` 类型）和2（默认为最低精度：`int` 类型）最高精度是 `int` ，但结果超过 `int`（32位有符号整数）的存储范围。

而改成 `long` 就能得到符合直观的结果：

```java
long a = 2147483647;
System.out.print(a+2);  // 此时会输出2147483649
```

