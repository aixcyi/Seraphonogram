<h1 align="center">「羽音」</h1>

<div align="center">
    <img src="https://img.shields.io/badge/Copyright-砹小翼-blue.svg" alt="版权：砹小翼"/>
    <img src="https://img.shields.io/badge/Departure-2021.03-purple.svg" alt="起航日期：2021年3月"/>
    <img src="https://img.shields.io/badge/简体中文_|_正體中文_|_English-gray" alt="语言：中文|English"/>
    <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png" alt="遵守知识共享协议" height=20 />
</div>
<div align="center">
    <i>风起而翼鸣，且听绝云间那不绝如缕的羽音</i>
</div>

(。・∀・)ノ

## 目录／Catalog

### Python

<ol>
    <li>
        <a href="./blogs/python/dict-key-ordering.md">字典中键的顺序</a>
        <br>
        <span>记录 <code>dict</code> 和 <code>OrderedDict</code> 的特性以及一般使用中值得注意的点。</span>
    </li>
    <li>
        <a href="./blogs/python/datetime-formatting.md">日期时间的格式化</a>
        <br>
        <span>Python 3.7 (Windows) 中，<code>date</code> 和 <code>datetime</code> 实例的 <code>strftime</code> 方法不支持中文，本文列出了想到和查到的四种解决方法，前三种需要依赖 Django REST Framework。</span>
    </li>
    <li>
        <a href="./blogs/python/run-script-directly.md">如何直接运行 Python 脚本</a>
        <br>
        <span>Python 3.3+ (Windows) 附带了一个名为 py.exe 的启动器，可以将调用转发到本地（包括虚拟环境）不同版本的 Python ，还可以识别脚本中的 shebang 行。</span>
    </li>
    <li>
        <a href="./blogs/python/define-copy-method-for-object-self.md">为自身定义 copy 方法</a>
        <br>
        <span>一些类自带了能够复制自身的 <code>copy()</code> 方法，例如 <code>list</code> 、<code>dict</code> 、<code>Decimal</code> 等。文章列出了三种为类自身（不借助内置的 copy 库）实现这个方法的办法，以及之间的联系和优缺。</span>
    </li>
    <li>
        <a href="./blogs/python/any-radix-convert-to-decimal.md">任意进制转十进制</a>
        <br>
        <span>使用内置函数及列表推导式完成任意进制（文本）转到十进制（整数）的思路。</span>
    </li>
    <li>
        <a href="./blogs/python/convert-decimal-to-any-radix-with-yield.md">十进制转任意进制</a>
        <br>
        <span>使用关键字 <code>yield</code> 将普通的除N求余法函数改写为生成器函数，加快转换速度。</span>
    </li>
</ol>

### Django & DRF

<ol>
    <li>
        <a href="./blogs/python/manage-django-settings.md">管理不同环境下的 Django Settings</a>
        <br>
        <span>使用 Django 原生方法和第三方库 django-environ 来管理和配置不同环境下的 Settings ，包括配置方式、文件架构、环境管理的简述。</span>
    </li>
    <li>
        <a href="./blogs/python/briefing-of-django-view-and-viewset.md">浅析基于 Django 衍生的类视图</a>
        <br>
        <span>顺着 Django 的 <code>View</code> 、DRF 的 <code>APIView</code> 和 <code>GenericAPIView</code> 三个基类的脉络梳理了各种类视图的派生关系，以及与各种 Mixin 的交联。</span>
    </li>
</ol>

### IntelliJ IDE Plugin

<ol>
    <li>
        <a href="./blogs/java/use-bundle-in-intellij-plugin-developing.md">在 IntelliJ 插件开发中使用 bundle</a>
        <br>
        <span>展示以语言包的语言为主、系统语言为辅的 bundle 语音查找以及相应的 i18n 工具类代码。</span>
    </li>
</ol>

### 工具

<ol>
    <li>
        <a href="./blogs/tools/timestamp-mapping.md">时间戳对照表</a>
        <br>
        <span>不同底数的指数按从大到小的顺序所对应的秒戳、毫秒戳、日戳的表格，用于快速确定时间戳的存储空间、特定大小的空间的时间戳存储上限等。</span>
    </li>
</ol>

## 许可／Licenses

- [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans)

