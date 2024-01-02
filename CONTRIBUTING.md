
# 贡献指南／Contributing Guideline

## 如何开始？

- 对内容有些疑问，希望作者详述？
- 内容似乎有些问题，需要与作者或其他读者讨论？
- 发现了错误？

可以编写一个 [issue](https://github.com/aixcyi/Seraphonogram/issues) 来提出疑问、寻求帮助、指出错误、发起讨论等等。当然，使用恰当的[标签](https://github.com/aixcyi/Seraphonogram/labels)有利于明晰主旨，让问题更快解决。

- 希望补充内容？改进叙述？
- 希望协助改正错误？

可以发起 [Pull Request](https://github.com/aixcyi/Seraphonogram/pulls) 来协助订正、发布新内容。不过需要注意一点：对现有内容的修改需要遵循与现有内容相同的[传播许可协议](#许可／Licenses)。

## 提交格式

```
<type>: <message>

<description>
```

使用类似 [angular.js](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format) 的格式编写 git 的提交描述。

`<type>` 有以下几个：

- `post`，新增文章。
- `revise`，修订文章。对现有文章的大改。
- `update`，增补订正。包括对现有文章的小修小改，现有文章的图片的新增、更换、删除。
- `chore`，杂项。对除了文章和图片以外的任何修改。

`<message>` 中可以使用文章标题的缩句形式并且去掉书名号，或者不提及文章标题。常见格式如下：

- 添加xxx、xxx、xxx三篇文章
- 补充xxx的xxxx内容（新图片）
- 更换xxx中展示xxx的图片
- 更正xxx中的内容（图片、链接、表格等）

`<description>` 是可选的，可以在此作详细的修改描述。

## 徽章约定

文件以 Markdown 形式编写，以一级标题开头，隔行陈列与文章相关的徽章[^Badge]，而后接下文。头部的徽章约定如下格式和颜色：

### 著作权所有者

![著作权归xxx所有](https://img.shields.io/badge/Copyright-xxx-blue.svg)。每个所有者都 **单独** 用一个徽章表示。

#### Markdown

```markdown
![著作权归xxx所有](https://img.shields.io/badge/Copyright-xxx-blue.svg)
```

#### HTML

```html
<img alt="著作权归xxx所有" src="https://img.shields.io/badge/Copyright-xxx-blue">
```

### 首版日期

![初版于2024年1月1日](https://img.shields.io/badge/Release-2024.01.01-purple.svg)。首次发布的日期。以全网首次发布为准，其次以提交时间为准。

#### Markdown

```markdown
![首版于2024年1月1日](https://img.shields.io/badge/Release-2024.01.01-purple.svg)
```

#### HTML

```html
<img alt="首版于2024年1月1日" src="https://img.shields.io/badge/Release-2024.01.01-purple.svg">
```

### 修订日期

![修订于2024年1月1日](https://img.shields.io/badge/Revision-2024.01.01-orange.svg)。大改后视为修订，小修小改可以不看作修订，不然每次都改就太麻烦了。

#### Markdown

```markdown
![修订于2024年1月1日](https://img.shields.io/badge/Revise-2024.01.01-orange.svg)
```

#### HTML

```html
<img alt="首版于2024年1月1日" src="https://img.shields.io/badge/Revise-2024.01.01-orange.svg">
```

### 许可证

![在 CC 署名-非商业性使用-禁止演绎 4.0 协议下许可](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-darkgreen)。每个许可证都 **单独** 用一个徽章表示。

#### Markdown

```markdown
![在 CC 署名-非商业性使用-禁止演绎 4.0 协议下许可](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-darkgreen)
```

#### HTML

```html
<img alt="首版于2024年1月1日" src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-darkgreen">
```

[^Badge]: 徽章可以通过 https://shields.io/badges 获取。

