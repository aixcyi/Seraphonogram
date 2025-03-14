---
title: Python 导航
navTitle: 导航
lang: zh-CN
outline: deep
publishAt: 2025-01-25 03:48
expires: 365
order: 5
---

<script setup lang="ts">
import { spacer } from "@/commons.ts";
import SeeAlso from "@/components/SeeAlso.vue";
import SeeAlsoLink from "@/components/SeeAlsoLink.vue";
</script>

# Python 导航

<hr style="margin-top: 48px; margin-bottom: 16px"/>

<SeeAlso align="center" :sep="spacer">
    <SeeAlsoLink no-arrow href="https://docs.python.org/zh-cn/3/index.html">官方文档</SeeAlsoLink>
    <SeeAlsoLink no-arrow href="https://www.python.org/">官方网站</SeeAlsoLink>
    <SeeAlsoLink no-arrow href="https://peps.python.org/">PEP 索引</SeeAlsoLink>
    <SeeAlsoLink no-arrow href="https://cheatsheets.zip/python">Python Cheatsheet</SeeAlsoLink>
    <SeeAlsoLink no-arrow href="https://quickref.cn/docs/python.html">Python 备忘清单</SeeAlsoLink>
</SeeAlso>

<hr style="margin-top: 16px"/>

### 教程 {#tutorial}

<LinkCard href="https://docs.python.org/zh-cn/3/tutorial/index.html" text="Python 教程" />

> 命令行交互 → 简单数学计算 → 控制流 → 数据结构 → 模块 → 输入输出 → 文件读写 → 错误与异常 → 类与对象。

### 标准库 {#standlib}

<LinkCard href="https://docs.python.org/zh-cn/3/library/index.html" text="Python 标准库" />

> “标准库”指安装 Python 后即可使用的库（library），它们按照使用领域进行归类，一般在浏览器中直接 Ctrl+F 查找库名。
> 
> 这个页面也包含了内置的函数／异常／类型等，“内置”指无须导入即可使用的符号。

### 术语对照表 {#glossary}

<LinkCard href="https://docs.python.org/zh-cn/3/glossary.html" text="术语对照表" />

> 当你清楚一个英文术语，却不了解它在 Python 中对应的概念或翻译时，可以参考此表。并且，可能会出现在代码中的 `...` 在此亦有解释。

### 类型与标注{typing}

<LinkCard href="https://typing.python.org/en/latest/spec/" text="Python 类型系统规范（英文）" />

> 讲述 Python 的类型系统设计、语法规范，对了解未知的语法颇有帮助。

### 运算符优先级 {#operator-precedence}

<LinkCard href="https://docs.python.org/zh-cn/3/reference/expressions.html#operator-precedence" text="6.17. 运算符优先级" />

> 老司机必备备查表格。

### 特殊方法（魔术方法） {#special-methods}

<LinkCard href="https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names" text="3.3. 特殊方法名称" />

> 在这里，你可以找到绝大部分以 **双下划线** 开头结尾的 `__init__` 风格命名的 **方法** 和 **属性** 的解释。

### 异常层次结构 {#exception-hierarchy}

<LinkCard href="https://docs.python.org/zh-cn/3/library/exceptions.html#exception-hierarchy" text="异常层次结构" />

> 内置的异常的层次结构，用于快速确定异常们的 **包含** 与 **被包含** 关系。

### 源文件编码 {#environment}

<LinkCard href="https://docs.python.org/zh-cn/3/tutorial/interpreter.html#the-interpreter-and-its-environment"
          text="2.2.1. 源文件的字符编码" />

> 源代码文件默认使用 UTF-8 编码，使用其它编码时参考这里进行声明。另外，shebang 也可以参考此处进行设置。

### reStructuredText

<LinkCard href="https://devguide.python.org/documentation/markup/"
          text="reStructuredText markup - Python Developer's Guide" />

> reStructuredText 是一种文本格式标记语言（类比于 Markdown，但二者语法不相似），常用于编写 Python 内（函数／方法／类）的文档。

### 版本及现状 {#version}

<LinkCard href="https://devguide.python.org/versions/" text="Python 教程" />
<LinkCard href="https://devguide.python.org/developer-workflow/development-cycle/index.html"
          text="Status of Python versions - Python Developer's Guide" />

> 可以看到各个版本的支持情况（是开发中？还是已结束支持？）以及开发周期，用于读懂版本号、以及技术选型时敲定开发版本。

### 打包指南 {#packaging}

<LinkCard href="https://packaging.python.org/en/latest/overview/"
          text="Overview of Python Packaging - Python Packaging User Guide" />

> - `.py`、sdist、wheel 三者有什么关系？
> - 如何打包成 Python 库以供他人复用？
> - 我应该使用什么语言编写 Python 库？
