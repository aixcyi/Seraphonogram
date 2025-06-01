---
title: 文本标记语言 Text Markup Language
navTitle: 文本标记语言
outline: deep
createAt: 2025-03-04 16:17
expires: 365
order: 1
---

## reStructuredText

> 缩写为 reST，文件后缀为 rst。

<LinkCard href="https://docutils.sourceforge.io/rst.html"
          text="reStructuredText"
          note="Markup Syntax and Parser Component of Docutils" />
<LinkCard href="https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html"
          text="reStructuredText Primer"
          note="reStructuredText is the default plaintext markup language used by Sphinx. This section is a brief introduction to reStructuredText (reST) concepts and syntax, intended to provide authors with enough information to author documents productively." />
<LinkCard href="https://devguide.python.org/documentation/markup/"
          text="reStructuredText markup"
          note="This document describes the custom reStructuredText markup introduced by Sphinx to support Python documentation and how it should be used." />

## AsciiDoc

<LinkCard href="https://docs.asciidoctor.org/asciidoc/latest/"
          text="AsciiDoc Language Documentation" />

## LaTeX

<LinkCard href="https://quickref.cn/docs/latex.html"
          text="LaTeX 备忘清单"
          note="本备忘单总结了 LaTeX 常用显示数学符号的参考列表和一些 KaTeX 的应用示例。" />
<LinkCard href="https://cheatsheets.zip/latex"
          text="LaTeX cheatsheet"
          note="This cheat sheet summarizes a reference list of LaTeX commonly used display math notation and some application examples of KaTeX." />

## Markdown

> [!WARNING] 注意
> Markdown 在不同环境下语法会有细微差别，实际渲染效果也不完全相同，请根据所在环境查找相应文档。

### 基础语法

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
          text="基本撰写和格式语法"
          note="使用简单的语法在 GitHub 上为您的散文和代码创建复杂的格式。" />
<LinkCard href="https://quickref.cn/docs/markdown.html"
          text="Markdown 备忘清单" />
<LinkCard href="https://cheatsheets.zip/markdown"
          text="Markdown cheatsheet" />

### 待办任务列表

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/about-task-lists"
          text="关于任务列表"
          note="您可以使用任务列表将议题或拉取请求的工作分解为较小的任务，然后跟踪要完成的整套工作。" />

### 表格

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables"
          text="使用表格组织信息"
          note="您可以创建表格来组织评论、议题、拉取请求和 wiki 中的信息。" />

### 提示

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts"
          text="警报"
          note="警报是基于块引用语法的 Markdown 扩展，可用于强调关键信息。 在 GitHub 上，它们以独特的颜色和图标显示，以指示内容的显著性。" />
<LinkCard href="https://vitepress.dev/zh/guide/markdown#custom-containers"
          text="自定义容器"
          note="自定义容器可以通过它们的类型、标题和内容来定义。" />

### 折叠

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections"
          text="使用折叠部分组织信息"
          note="可创建带 <details> 标记的折叠部分来简化 Markdown。" />
<LinkCard href="https://vitepress.dev/zh/guide/markdown#custom-containers"
          text="自定义容器"
          note="自定义容器可以通过它们的类型、标题和内容来定义。" />

### 代码块

#### 1、VitePress 相关衍生

<LinkCard href="https://vitepress.dev/zh/guide/markdown#syntax-highlighting-in-code-blocks"
          text="代码块中的语法高亮"
          note="按照特定的语法对代码块中的文本进行着色。" />
<LinkCard href="https://vitepress.dev/zh/guide/markdown#line-highlighting-in-code-blocks"
          text="在代码块中实现行高亮"
          note="提升某一些行的亮度，以与其它行形成鲜明对比。" />
<LinkCard href="https://vitepress.dev/zh/guide/markdown#focus-in-code-blocks"
          text="代码块中聚焦"
          note="默认情况下模糊其它行，只保留某一些行的正常显示；在鼠标移动上去时显示所有的行。" />
<LinkCard href="https://vitepress.dev/zh/guide/markdown#colored-diffs-in-code-blocks"
          text="代码块中的颜色差异"
          note="使用红色、绿色表示代码中某一些行的增删改动，类似于 git 的展示效果。" />
<LinkCard href="https://vitepress.dev/zh/guide/markdown#line-numbers"
          text="代码块中的行号" />
<LinkCard href="https://shiki.style/languages"
          text="Bundled Languages - Shiki" />

#### 2、GitHub

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks"
          text="创建和突显代码块"
          note="通过围栏代码块和启用语法突显来分享代码样本。" />

### 关系图

<LinkCard href="https://mermaid.js.org/intro/"
          text="Mermaid" />
<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams"
          text="创建 Mermaid 关系图"
          note="Mermaid 是一款受 Markdown 启发的工具，可将文本呈现为关系图。 例如，Mermaid 可以呈现流程图、序列图、饼图等。" />

### 数学公式

> [!TIP] 提示
> 本质上是 LaTex 代码，参考其语法来编写即可，导航见本文[LaTeX](#latex)。

#### 1、VitePress 配置

<LinkCard href="https://vitepress.dev/zh/guide/markdown#math-equations"
          text="LaTeX cheatsheet" />

#### 2、GitHub 指引

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions"
          text="编写数学表达式"
          note="使用 Markdown 在 GitHub 上显示数学表达式。" />

### 自动链接（仅GitHub）

<LinkCard href="https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls"
          text="自动链接引用和 URL"
          note="对 URL、议题、拉取请求和提交的引用会自动缩短并转换为链接。" />

### 参考

<LinkCard href="https://github.github.com/gfm/"
          text="GitHub Flavored Markdown Spec" />


<style scoped>
.LinkCard {
    margin-top: 15px;
}
</style>
