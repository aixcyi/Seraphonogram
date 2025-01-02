import { resolve } from "path";
import { defineConfig, loadEnv } from "vitepress";

const env = loadEnv('', process.cwd())
const now = Math.max(new Date().getFullYear(), Number(env.VITE_THIS_YEAR))

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "zh-CN",
    title: "Seraphonogram",
    description: "砹小翼的博客",
    srcDir: './src',
    outDir: './dist',
    cacheDir: './cache',
    head: [
        [ 'link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' } ],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.ico',
        outline: {
            label: '页面目录',
        },
        nav: [
            {
                text: '博客导览',
                items: [
                    { text: '总结／摘要／备忘', link: '/dot-token-generation' },
                    { text: '实践／踩坑', link: '/config-django-console-in-pycharm' },
                    { text: '题集', link: '/leetcode-20-valid-parentheses' },
                    { text: '思考／碎碎念', link: '/class-and-type' },
                    { text: '关于', link: '/about' },
                ]
            },
            {
                text: '快速参考',
                items: [
                    { text: '镜像源', link: '/cheatsheet/mirror' },
                    { text: '时间戳对照表', link: '/cheatsheet/timestamp' },
                    { text: 'Python 语法更新摘要', link: '/cheatsheet/grammar' },
                ]
            },
            { text: '主站', link: 'https://aixcyi.cn/' },
        ],
        sidebar: [
            {
                text: '总结／摘要／备忘',
                collapsed: true,
                items: [
                    {
                        text: 'Python',
                        collapsed: true,
                        items: [
                            { text: 'Django OAuth Toolkit 令牌机制', link: '/dot-token-generation' },
                            { text: '标准多项集的标注方式', link: '/annotating-standard-collections' },
                            { text: '语法更新摘要', link: '/cheatsheet/grammar' },
                            { text: '字典中键的顺序', link: '/dict-key-ordering' },
                            { text: 'Django & DRF 类视图浅析', link: '/briefing-of-django-view-and-viewset' },
                            { text: '推导式', link: '/comprehension' },
                            { text: '文件打开模式', link: '/file-open-mode' },
                        ]
                    },
                    { text: '镜像源', link: '/cheatsheet/mirror' },
                    { text: '微信扫码支付的响应', link: '/wechat-pay-barcode-response' },
                    { text: '时间戳对照表', link: '/cheatsheet/timestamp' },
                ]
            },
            {
                text: '实践／踩坑',
                collapsed: true,
                items: [
                    {
                        text: 'Python',
                        collapsed: true,
                        items: [
                            { text: 'virtualenv 在 Windows 中无法激活', link: '/virtualenv-encoding-in-win' },
                            { text: '管理 Django Settings', link: '/manage-django-settings' },
                            { text: 'date 格式化失败', link: '/datetime-formatting' },
                            { text: '直接运行 Python 脚本', link: '/run-script-directly' },
                            { text: '为自身定义 copy 方法', link: '/define-copy-method-for-object-self' },
                            { text: '使用乘号复制变量引起的问题', link: '/deepcopy-and-multiplication' },
                            { text: '字典添加二级键值的问题', link: '/key-of-nested-dictionaries' },
                        ]
                    },
                    { text: '设置 JetBrains IDE 的语言', link: '/jetbrains-ide-language' },
                    { text: 'PyCharm 配置 Django 控制台', link: '/config-django-console-in-pycharm' },
                    { text: 'IntelliJ 插件中使用 Bundle', link: '/use-bundle-in-intellij-plugin-developing' },
                    { text: '十进制转任意进制与 yield', link: '/convert-decimal-to-any-radix-with-yield' },
                    { text: '任意进制转十进制', link: '/any-radix-convert-to-decimal' },
                    { text: 'Java 运算精度', link: '/calculation-precision' },
                ]
            },
            {
                text: '题集',
                collapsed: true,
                items: [
                    {
                        text: 'LeetCode',
                        collapsed: true,
                        items: [
                            { text: '20. 有效的括号', link: '/leetcode-20-valid-parentheses' },
                            { text: '12. 整数转罗马数字', link: '/leetcode-12-integer-to-roman' },
                            { text: '13. 罗马数字转整数', link: '/leetcode-13-roman-to-integer' },
                        ]
                    },
                    {
                        text: 'NOIP',
                        collapsed: true,
                        items: [
                            { text: '380：校门外的树', link: '/noip-380' },
                        ]
                    },
                    {
                        text: '蓝桥杯',
                        collapsed: true,
                        items: [
                            { text: 'Excel 地址转换', link: '/lanqiao-2012-gzgz-java-finals-4' },
                        ]
                    },
                    { text: '连续自然数之和', link: '/sum-of-consecutive-natural-numbers' },
                    { text: '多个整数连接为最大整数问题', link: '/integer-maximum-splicing' },
                ]
            },
            {
                text: '思考／碎碎念',
                collapsed: true,
                items: [
                    { text: '默认值导致抽象泄漏', link: '/parameter-default-value' },
                    { text: '类与类型', link: '/class-and-type' },
                ]
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/aixcyi' },
            { icon: 'gitee', link: 'https://gitee.com/aixcyi' },
        ],
        footer: {
            message: `${env.VITE_ICP}`,
            copyright:
                `Copyright © 2019-${now} <a href="https://aixcyi.cn/">砹小翼</a>` +
                '<span class="divider">|</span>' +
                '使用 <a href="https://vitepress.dev/zh/">VitePress</a> 构建',
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
    },
    rewrites: {
        'blog/:file': ':file',
    },
    markdown: {
        lineNumbers: true,
        math: true,
    },
    vite: {
        resolve: {
            alias: {
                '@': resolve(__dirname, '../src'),
            },
        },
    },
})
