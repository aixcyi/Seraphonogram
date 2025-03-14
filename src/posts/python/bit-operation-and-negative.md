---
title: Python 中的负数与位运算
lang: zh-CN
publishAt: 2025-03-14 15:09
expires: 3650
tags:
    - Python
    - 运算
    - 开发
    - 设计
excerpt:
    在 Python 这种可以存储无限长度的整数的类型系统中，整数的比特位是如何表达的？又应该如何进行计算？
---

# Python 中的负数与位运算

<RevisionInfo />

## 比特

传统的补码需要依靠一个约定的比特位上限来标记符号位，例如 `-67` 使用 64 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-1)">1111 1111 1111 1111  1111 1111 1111 1111</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1111 1111  1111 1111 1011 1101</span>
</pre>

使用 32 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000  0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1111 1111  1111 1111 1011 1101</span>
</pre>

使用 16 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000  0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000  </span><span style="color: var(--vp-c-text-1)">1111 1111 1011 1101</span>
</pre>

使用 8 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000  0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000  0000 0000 </span><span style="color: var(--vp-c-text-1)">1011 1101</span>
</pre>

而与其它只能 **有限存储** 的类型系统不同，Python 中的整数是可以 **无限存储** 的，也就是说，只要内存足够大，就可以存储一个超大整数。

在这种情况下，补码显然很难表达（无限意味着没有约定的比特位上限），因此 Python 选择在 **原码** 的基础上直接增添符号位，来表达负整数的比特位。

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">                               </span><span style="color: var(--vp-c-text-1)">-100 0011</span>
</pre>

## 位运算

非负数与其它语言一样使用原码表达，因此非负数的位运算也与其它语言一致。

<pre style="text-align: center">
  0100 0011  (67)
& 0010 1011  (43)
————————————————————
= 0000 1011  ( 3)
</pre>

在负数范畴下，虽然 Python 用的是原码+符号位的方式表达负数的比特位，但在运算时，依然使用补码进行计算。

<pre style="text-align: center">
            -100 0011  ( -67)
&           -010 1011  ( -43)
————————————————————————————————
= 1111 1111 1011 1101  (补码)
& 1111 1111 1101 0101  (补码)
————————————————————————————————
= 1111 1111 1001 0101  (补码)
=           -110 1011  (-107)
</pre>
