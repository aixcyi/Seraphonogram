---
title: 语言篇
lang: zh-CN
outline: deep
created: 2025-01-25 03:48
expires: 365
excerpt: '由相应技术栈的开发者编写的、面向具有一定经验的开发人员的、用于快速切换技术栈的书签集锦。'
tags:
    - 文档
    - 开发
    - 设计
    - Python
---

<script setup lang="ts">
import SeeAlso from "@/components/SeeAlso.vue";
import SeeAlsoLink from "@/components/SeeAlsoLink.vue";
</script>

# 即食文档 语言篇

<RevisionInfo />

## Python

<SeeAlso align="center" sep="›‹">
    <SeeAlsoLink pure href="https://docs.python.org/zh-cn/3/index.html">官方文档</SeeAlsoLink>
    <SeeAlsoLink pure href="https://www.python.org/">官方网站</SeeAlsoLink>
    <SeeAlsoLink pure href="https://peps.python.org/">PEP 索引</SeeAlsoLink>
</SeeAlso>

### 教程 {#tutorial}

https://docs.python.org/zh-cn/3/tutorial/index.html

> 命令行交互 → 简单数学计算 → 控制流 → 数据结构 → 模块 → 输入输出 → 文件读写 → 错误与异常 → 类与对象。

### 标准库 {#standlib}

https://docs.python.org/zh-cn/3/library/index.html

> “标准库”指安装 Python 后即可使用的库（library），它们按照使用领域进行归类，一般在浏览器中直接 Ctrl+F 查找库名。
> 
> 这个页面也包含了内置的函数／异常／类型等，“内置”指无须导入即可使用的符号。

### 术语对照表 {#glossary}

https://docs.python.org/zh-cn/3/glossary.html

> 当你清楚一个英文术语，却不了解它在 Python 中对应的概念或翻译时，可以参考此表。并且，可能会出现在代码中的 `...` 在此亦有解释。

### 运算符优先级 {#operator-precedence}

https://docs.python.org/zh-cn/3/reference/expressions.html#operator-precedence

> 老司机必备备查表格。

### 特殊方法（魔术方法） {#special-methods}

https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names

> 在这里，你可以找到绝大部分以 **双下划线** 开头结尾的 `__init__` 风格命名的 **方法** 和 **属性** 的解释。

### 异常层次结构 {#exception-hierarchy}

https://docs.python.org/zh-cn/3/library/exceptions.html#exception-hierarchy

> 内置的异常的层次结构，用于快速确定异常们的 **包含** 与 **被包含** 关系。

### 源文件编码 {#environment}

https://docs.python.org/zh-cn/3/tutorial/interpreter.html#the-interpreter-and-its-environment

> 源代码文件默认使用 UTF-8 编码，使用其它编码时参考这里进行声明。另外，shebang 也可以参考此处进行设置。

### reStructuredText

https://devguide.python.org/documentation/markup/

> reStructuredText 是一种文本格式标记语言（类比于 Markdown，但二者语法不相似），常用于编写 Python 内（函数／方法／类）的文档。

### 版本及现状 {#version}

https://devguide.python.org/versions/  
https://devguide.python.org/developer-workflow/development-cycle/index.html

> 可以看到各个版本的支持情况（是开发中？还是已结束支持？）以及开发周期，用于读懂版本号、以及技术选型时敲定开发版本。

### 打包指南 {#packaging}

https://packaging.python.org/en/latest/overview/

> - `.py`、sdist、wheel 三者有什么关系？
> - 如何打包成 Python 库以供他人复用？
> - 我应该使用什么语言编写 Python 库？
