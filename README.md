<h1 align="center"><sup>『&nbsp;</sup>羽音<sub>&nbsp;』</sub></h1>

<div align="center">
    <img src="https://img.shields.io/badge/Copyright-砹小翼-blue.svg" alt="著作权归砹小翼所有"/>
    <img src="https://img.shields.io/badge/Departure-2021.03-purple.svg" alt="起航于2021年3月"/>
    <img src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-darkgreen" alt="在 CC 署名-非商业性使用-禁止演绎 4.0 协议下许可">
</div>
<div align="center">
    <i>风起而翼鸣，且听绝云间那不绝如缕的羽音</i>
</div>

(。・∀・)ノ

## 目录／Catalog

### Python

<ol>
    <li>
        <a href="./blogs/python/new-grammars.md">Python 语法更新摘要</a>&nbsp;<sup>2023.12.23</sup>
        <br>
        <span>Python 发展比较快，语法更新多而细碎。本文列出与语法有关的更新，并摘取部分示例代码罗列出来，有些会附加一些经验备注，权当备忘。版本在 3.0 到 3.12 之间。</span>
    </li>
    <li>
        <a href="./blogs/python/class-and-type.md">类与类型</a>&nbsp;<sup>2023.12.22</sup>
        <br>
        <span>通过内置函数 <code>isinstance</code> 、<code>issubclass</code> 、<code>type</code> 分析类型（type）、类（class）、对象（object）的关系。</span>
    </li>
    <li>
        <a href="./blogs/python/manage-django-settings.md">管理不同环境下的 Django Settings</a>&nbsp;<sup>2023.12.21</sup>
        <br>
        <span>使用 Django 原生方法和第三方库 django-environ 来管理和配置不同环境下的 Settings ，包括配置方式、文件架构、环境管理的简述。</span>
    </li>
    <li>
        <a href="./blogs/python/dict-key-ordering.md">字典中键的顺序</a>&nbsp;<sup>2023.12.21</sup>
        <br>
        <span>记录 <code>dict</code> 和 <code>OrderedDict</code> 的特性以及一般使用中值得注意的点。</span>
    </li>
    <li>
        <a href="./blogs/python/datetime-formatting.md">日期时间的格式化</a>&nbsp;<sup>2023.11.14</sup>
        <br>
        <span>Python 3.7 (Windows) 中，<code>date</code> 和 <code>datetime</code> 实例的 <code>strftime</code> 方法不支持中文，本文列出了想到和查到的四种解决方法，前三种需要依赖 Django REST Framework。</span>
    </li>
    <li>
        <a href="./blogs/python/run-script-directly.md">如何直接运行 Python 脚本</a>&nbsp;<sup>2023.09.05</sup>
        <br>
        <span>Python 3.3+ (Windows) 附带了一个名为 py.exe 的启动器，可以将调用转发到本地（包括虚拟环境）不同版本的 Python ，还可以识别脚本中的 shebang 行。</span>
    </li>
    <li>
        <a href="./blogs/python/briefing-of-django-view-and-viewset.md">浅析基于 Django 衍生的类视图</a>&nbsp;<sup>2023.08.10</sup>
        <br>
        <span>顺着 Django 的 <code>View</code> 、DRF 的 <code>APIView</code> 和 <code>GenericAPIView</code> 三个基类的脉络梳理了各种类视图的派生关系，以及与各种 Mixin 的交联。</span>
    </li>
    <li>
        <a href="./blogs/python/define-copy-method-for-object-self.md">为自身定义 copy 方法</a>&nbsp;<sup>2022.08.17</sup>
        <br>
        <span>一些类自带了能够复制自身的 <code>copy()</code> 方法，例如 <code>list</code> 、<code>dict</code> 、<code>Decimal</code> 等。文章列出了三种为类自身（不借助内置的 copy 库）实现这个方法的办法，以及之间的联系和优缺。</span>
    </li>
    <li>
        <a href="./blogs/python/any-radix-convert-to-decimal.md">任意进制转十进制</a>&nbsp;<sup>2022.08.17</sup>
        <br>
        <span>使用内置函数及列表推导式完成任意进制（文本）转到十进制（整数）的思路。</span>
    </li>
    <li>
        <a href="./blogs/python/convert-decimal-to-any-radix-with-yield.md">十进制转任意进制</a>&nbsp;<sup>2022.08.17</sup>
        <br>
        <span>使用关键字 <code>yield</code> 将普通的除N求余法函数改写为生成器函数，加快转换速度。</span>
    </li>
    <li>
        <a href="./blogs/python/comprehension.md">推导式</a>&nbsp;<sup>2021.11.05</sup>
        <br>
        <span>用简单的 ascii 拆分标注推导式语句的语法结构。</span>
    </li>
    <li>
        <a href="./blogs/python/file-open-mode.md">文件打开模式</a>&nbsp;<sup>2021.10.21</sup>
        <br>
        <span>以表格形式展示文件打开模式 <code>r</code> 、<code>w</code> 、<code>a</code> 、<code>x</code> 与 <code>+</code> 、<code>t</code> 、<code>b</code> 搭配的行为与含义。</span>
    </li>
</ol>

### Java

<ol>
    <li>
        <a href="./blogs/java/use-bundle-in-intellij-plugin-developing.md">在 IntelliJ 插件开发中使用 bundle</a>&nbsp;<sup>2023.09.06</sup>
        <br>
        <span>展示以语言包的语言为主、系统语言为辅的 bundle 语音查找以及相应的 i18n 工具类代码。</span>
    </li>
</ol>

### 杂项

<ol>
    <li>
        <a href="./blogs/tools/timestamp-mapping.md">时间戳对照表</a>&nbsp;<sup>2023.09.07</sup>
        <br>
        <span>不同底数的指数按从大到小的顺序所对应的秒戳、毫秒戳、日戳的表格，用于快速确定时间戳的存储空间、特定大小的空间的时间戳存储上限等。</span>
    </li>
</ol>

## 贡献／Contributing

见[贡献指南](./CONTRIBUTING.md)。

## 许可／Licenses

仓库中的内容默认允许在 [CC 署名-非商业性使用-禁止演绎 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans) 协议下传播，包括文字、图片、代码等，对于不遵循或不再遵循该协议的内容会在内容里或仓库中的其它位置另行约定。

