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

[时间戳对照表](./blogs/chores/timestamp-mapping.md)｜[Python 语法更新摘要](./blogs/python/new-grammars.md)

### Python

<ol>
    <li>
        <a href="./blogs/python/dot-token-generation.md">DOT 令牌相关机制</a>&nbsp;<sup>2024.02.20</sup>
        <br>
        <span>正常来说应该继承 <code>OAuthLibMixin</code> 写一个类视图，调用 <code>create_token_response()</code> 来生成和刷新令牌、调用 <code>create_revocation_response()</code> 来撤销令牌，但如果要手动实现某些过程，可以参考此篇帖子的伪代码。</span>
    </li>
    <li>
        <a href="./blogs/python/annotating-set-and-map.md">正确标注集合与映射</a>&nbsp;<sup>2024.01.31</sup>
        <br>
        <span>列出列表（list）、元组（tuple）、集合（set）、字典（dict）等常见集合与映射正确的类型标注，并且贴出来源文档和 PEP。</span>
    </li>
    <li>
        <a href="./blogs/python/parameter-default-value.md">默认值导致抽象泄漏</a>&nbsp;<sup>2024.01.30</sup>
        <br>
        <span>在一些情况下，函数参数的默认值与抽象的约定不一致，需要调用者参阅源码了解编写场景，导致抽象泄漏。</span>
    </li>
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
    <li>
        <a href="./blogs/python/deepcopy-and-multiplication.md">使用乘号复制变量引起的问题</a>&nbsp;<sup>2020.12.20</sup>
        <br>
        <span>有N个月的盈亏数据（每个月要么盈利要么亏损），按月份统计盈亏（分开统计是为了看到亏损了多少），使用字典列表 <code>List[Dict]</code> 存储，列表下标就是月份，发现结果的每个月的数据都相等。</span>
    </li>
    <li>
        <a href="./blogs/python/deepcopy-and-multiplication.md">字典添加二级键值的问题</a>&nbsp;<sup>2020.12.19</sup>
        <br>
        <span>Python 的字典允许在 <b>键</b> 不存在的情况下使用下标语法进行插入，但这种情况仅对最后一级生效，换言之就是不能一次性新建多个层级。这里描述了这个问题，并给出了比较省事的解决方法。</span>
    </li>
</ol>

### Java

<ol>
    <li>
        <a href="./blogs/java/use-bundle-in-intellij-plugin-developing.md">在 IntelliJ 插件开发中使用 bundle</a>&nbsp;<sup>2023.09.06</sup>
        <br>
        <span>展示以语言包的语言为主、系统语言为辅的 bundle 语音查找以及相应的 i18n 工具类代码。</span>
    </li>
    <li>
        <a href="./blogs/java/calculation-precision.md">运算精度</a>&nbsp;<sup>2019.11.20</sup>
        <br>
        <span>Java的 <code>+</code>、<code>-</code>、<code>*</code>、<code>/</code> 的最低运算精度是 <code>int</code> ，有些情况可能会导致上溢或下溢进而偏离预期。</span>
    </li>
</ol>

### 问题集

<ol>
    <li>
        <a href="./blogs/problems/leetcode-20-valid-parentheses.md">LeetCode 20：有效的括号</a>&nbsp;<sup>2024.01.10</sup>
        <br>
        <span>判断由纯括号组成的表达式是否正确。</span>
    </li>
    <li>
        <a href="./blogs/problems/leetcode-12-integer-to-roman.md">LeetCode 12：整数转罗马数字</a>&nbsp;<sup>2024.01.09</sup>
        <br>
        <span>将整数转换为诸如 <code>XII</code>、<code>IV</code> 的罗马数字。整数的取值范围是 <code>[1, 3999]</code>。</span>
    </li>
    <li>
        <a href="./blogs/problems/leetcode-13-roman-to-integer.md">LeetCode 13：罗马数字转整数</a>&nbsp;<sup>2024.01.08</sup>
        <br>
        <span>将诸如 <code>XII</code>、<code>IV</code> 的罗马数字转换为整数。输入的罗马数字的取值范围是 <code>[1, 3999]</code>。</span>
    </li>
    <li>
        <a href="./blogs/problems/sum-of-consecutive-natural-numbers.md">连续自然数之和</a>&nbsp;<sup>2020.04.06</sup>
        <br>
        <span>对一个给定的自然数M，求出所有的连续的自然数段（连续个数大于1），这些连续的自然数段中的全部数之和为M。实际是公差为1的等差数列求和，解法是将数列长度作为遍历变量，动态求出数列的第一个数和最后一个数，再使用数列求和公式求出总和，并与输入进行比较，决定是否输出。</span>
    </li>
    <li>
        <a href="./blogs/problems/integer-maximum-splicing.md">多个整数连接为最大整数问题</a>&nbsp;<sup>2020.03.13</sup>
        <br>
        <span>有n个正整数（n<=20），将它们对应的字符串连接成一排，组成一个最大的多位整数。文中对在 Java 中的作答作了分析。</span>
    </li>
    <li>
        <a href="./blogs/problems/noip-380.md">NOIP 380：校门外的树</a>&nbsp;<sup>2020.03.12</sup>
        <br>
        <span>分析了题目中迷惑了我的部分，并描述了“将所有区间抽象为起点和终点，叠加到一条线段上”，从而使运算时间更少的方法。</span>
    </li>
    <li>
        <a href="./blogs/problems/lanqiao-2012-gzgz-java-finals-4.md">Excel 地址转换</a>&nbsp;<sup>2020.01.20</sup>
        <br>
        <span>将一个整数转换为Excel的列号，整数范围为 [1, 2147483647]。Excel的列编号规则是用 A~Z 分别表示 1~26，超出后进一位，转换算法属于进制转换的变种。</span>
    </li>
</ol>

### 杂项

<ol>
    <li>
        <a href="./blogs/chores/config-django-console-in-pycharm.md">配置 Django 控制台</a>&nbsp;<sup>2024.01.24</sup>
        <br>
        <span>在 PyCharm 社区版中将 Python 控制台配置为 Django 控制台。当然，这个配置仅针对当前项目，不会影响其它项目。</span>
    </li>
    <li>
        <a href="./blogs/chores/wechat-pay-barcode-response.md">微信扫码支付的响应</a>&nbsp;<sup>2024.01.24</sup>
        <br>
        <span>本地调试返回的一些响应，不代表全部。不过之前的解析做得比较混乱，这里记个备忘。</span>
    </li>
    <li>
        <a href="./blogs/chores/timestamp-mapping.md">时间戳对照表</a>&nbsp;<sup>2023.09.07</sup>
        <br>
        <span>不同底数的指数按从大到小的顺序所对应的秒戳、毫秒戳、日戳的表格，用于快速确定时间戳的存储空间、特定大小的空间的时间戳存储上限等。</span>
    </li>
</ol>

## 贡献／Contributing

见[贡献指南](./CONTRIBUTING.md)。

## 许可／License

仓库中的内容默认允许在 [CC 署名-非商业性使用-禁止演绎 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans) 协议下传播，包括文字、图片、代码等，对于不遵循或不再遵循该协议的内容会在内容里或仓库中的其它位置另行约定。

