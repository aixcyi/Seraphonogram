---
title: Python
lang: zh-CN
outline: deep
publishAt: 2025-01-25 03:48
reviseAt: 2025-04-10 00:16
expires: 365
order: 5
excerpt:
---

<SeeAlsoBar flavor="neck" :refs="[
    { text: '官方文档', link: 'https://docs.python.org/zh-cn/3/index.html' },
    { text: '官方网站', link: 'https://www.python.org/' },
    { text: 'PEP 索引', link: 'https://peps.python.org/' },
    { text: 'Python Cheatsheet', link: 'https://cheatsheets.zip/python' },
    { text: 'Python 备忘清单', link: 'https://quickref.cn/docs/python.html' },
]"/>

## 教程 {#tutorial}

<LinkCard href="https://docs.python.org/zh-cn/3/tutorial/index.html" text="Python 教程" />

> 命令行交互 → 简单数学计算 → 控制流 → 数据结构 → 模块 → 输入输出 → 文件读写 → 错误与异常 → 类与对象。

## 术语对照表 {#glossary}

<LinkCard href="https://docs.python.org/zh-cn/3/glossary.html" text="术语对照表" />

> 当你清楚一个英文术语，却不了解它在 Python 中对应的概念或翻译时，可以参考此表。并且，可能会出现在代码中的 `...` 在此亦有解释。

## 语法 {#grammar}

### 类型与标注 {#typing}

<LinkCard href="https://typing.python.org/en/latest/spec/" text="Python 类型系统规范（英文）" />

> 讲述 Python 的类型系统设计、语法规范，对了解未知的语法颇有帮助。

### 运算符优先级 {#operator-precedence}

<LinkCard href="https://docs.python.org/zh-cn/3/reference/expressions.html#operator-precedence" text="运算符优先级">
    <el-space wrap style="row-gap: 0" spacer="»">
        <span>Python 语言参考手册</span>
        <span>6. 表达式</span>
        <span>17. 运算符优先级</span>
    </el-space>
</LinkCard>

> 老司机必备备查表格。

### 特殊方法（魔术方法） {#special-methods}

<LinkCard href="https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names" text="特殊方法名称">
    <el-space wrap style="row-gap: 0" spacer="»">
        <span>Python 语言参考手册</span>
        <span>3. 数据模型</span>
        <span>3. 特殊方法名称</span>
    </el-space>
</LinkCard>

> 在这里，你可以找到绝大部分以 **双下划线** 开头结尾的 `__init__` 风格命名的 **方法** 和 **属性** 的解释。

### 源文件编码 {#environment}

<LinkCard href="https://docs.python.org/zh-cn/3/tutorial/interpreter.html#the-interpreter-and-its-environment" text="源文件的字符编码">
    <el-space wrap style="row-gap: 0" spacer="»">
        <span>Python 教程</span>
        <span>2. 使用 Python 的解释器</span>
        <span>2. 解释器的运行环境</span>
    </el-space>
</LinkCard>

> 源代码文件默认使用 UTF-8 编码，使用其它编码时参考这里进行声明。另外，shebang 也可以参考此处进行设置。

### reStructuredText

<LinkCard href="https://devguide.python.org/documentation/markup/"
          text="reStructuredText markup"
          note="Python Developer's Guide" />

> reStructuredText 是一种文本格式标记语言（类比于 Markdown，但二者语法不相似），常用于编写 Python 内（函数／方法／类）的文档。

## 开发 {#developing}

### 标准库 {#standlib}

<LinkCard href="https://docs.python.org/zh-cn/3/library/index.html" text="Python 标准库" />

> “标准库”指安装 Python 后即可使用的库（library），它们按照使用领域进行归类，一般在浏览器中直接 Ctrl+F 查找库名。
> 
> 这个页面也包含了内置的函数／异常／类型等，“内置”指无须导入即可使用的符号。

### 异常层次结构 {#exception-hierarchy}

<LinkCard href="https://docs.python.org/zh-cn/3/library/exceptions.html#exception-hierarchy" text="异常层次结构">
    <el-space wrap style="row-gap: 0" spacer="»">
        <span>Python 标准库</span>
        <span>内置异常</span>
    </el-space>
</LinkCard>

> 内置的异常的层次结构，用于快速确定异常们的 **包含** 与 **被包含** 关系。

### 格式化 {#formatspec}

<LinkCard href="https://docs.python.org/zh-cn/3/library/string.html#formatspec" text="格式规格迷你语言">
    <el-space wrap style="row-gap: 0" spacer="»">
        <span>Python 标准库</span>
        <span><code>string</code> 常见的字符串操作</span>
    </el-space>
</LinkCard>

## 深入 {#learn-more}

<LinkCard href="https://docs.python.org/zh-cn/3/reference/index.html"
          text="Python 语言参考手册" />

### 版本及现状 {#version}

<LinkCard href="https://devguide.python.org/versions/"
          text="Status of Python versions"
          note="Python Developer's Guide" />
<LinkCard href="https://devguide.python.org/developer-workflow/development-cycle/index.html"
          text="Development cycle"
          note="Python Developer's Guide" />

> 可以看到各个版本的支持情况（是开发中？还是已结束支持？）以及开发周期，用于读懂版本号、以及技术选型时敲定开发版本。

### Design and History FAQ

<LinkCard href="https://docs.python.org/3/faq/design.html"
          text="Design and History FAQ" />

> Python 设计的历史与问答。例如“异常捕获有多快”、“为什么 lambda 不能包含语句”、“为什么 `list.sort()` 不返回列表”等等。

### 打包指南 {#packaging}

<LinkCard href="https://packaging.python.org/en/latest/overview/"
          text="Overview of Python Packaging"
          note="Python Packaging User Guide" />

> - `.py`、sdist、wheel 三者有什么关系？
> - 如何打包成 Python 库以供他人复用？
> - 我应该使用什么语言编写 Python 库？

## 生态 {#ecosystem}

<LinkCard href="https://awesome-python.com/"
          text="Awesome Python"
          note="A curated list of awesome Python frameworks, libraries, software and resources." />
<LinkCard href="https://github.com/uhub/awesome-python"
          text="uhub／awesome-python"
          note="A curated list of awesome Python frameworks, libraries and software." />
