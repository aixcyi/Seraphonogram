import type { integer } from "@vue/language-server";
import type { DefaultTheme } from "vitepress";

enum Style {
    Summary = '总结／摘要',
    Record = '经验／备忘',
    Thoughts = '思考／碎碎念',
    Problem = '题集',
}

type Revision = {
    revised: Date,
    title: string,
}
type Index = {
    link: string,
    path: [ Style, ...string[] ],
    title: string,
    created: Date,
    updated: Date | null,
    expired: integer | string | null,
    versions: Revision[],
}

const indexes: Index[] = [
    {
        link: '/article/dot-token-generation',
        path: [ Style.Summary, 'Python' ],
        title: 'Django OAuth Toolkit 令牌机制',
        created: new Date('2024-02-20T11:55:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/annotating-standard-collections',
        path: [ Style.Summary, 'Python' ],
        title: '标准多项集的标注方式',
        created: new Date('2024-01-31T17:13:00.000+08:00'),
        updated: null,
        expired: 365 * 10,
        versions: [],
    },
    {
        link: '/grammar',
        path: [ Style.Summary, 'Python' ],
        title: '语法更新摘要',
        created: new Date('2023-12-23T23:59:00.000+08:00'),
        updated: new Date('2024-12-27T17:54:00.000+08:00'),
        expired: 365,
        versions: [],
    },
    {
        link: '/article/dict-key-ordering',
        path: [ Style.Summary, 'Python' ],
        title: '字典中键的顺序',
        created: new Date('2023-12-21T10:02:00.000+08:00'),
        updated: null,
        expired: 365 * 10,
        versions: [],
    },
    {
        link: '/article/briefing-of-django-view-and-viewset',
        path: [ Style.Summary, 'Python' ],
        title: 'Django & DRF 类视图浅析',
        created: new Date('2022-10-11T11:52:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/comprehension',
        path: [ Style.Summary, 'Python' ],
        title: '推导式',
        created: new Date('2021-11-05T00:00:00.000+08:00'),
        updated: null,
        expired: 365 * 10,
        versions: [],
    },
    {
        link: '/article/file-open-mode',
        path: [ Style.Summary, 'Python' ],
        title: '文件打开模式',
        created: new Date('2021-10-21T00:00:00.000+08:00'),
        updated: null,
        expired: 365 * 10,
        versions: [],
    },
    {
        link: '/mirror',
        path: [ Style.Summary, ],
        title: '镜像源',
        created: new Date('2024-11-13T00:08:00.000+08:00'),
        updated: new Date('2024-12-26T00:11:00.000+08:00'),
        expired: 365 * 10,
        versions: [],
    },
    {
        link: '/article/wechat-pay-barcode-response',
        path: [ Style.Record, ],
        title: '微信扫码支付的响应',
        created: new Date('2024-01-24T15:41:00.000+08:00'),
        updated: null,
        expired: 365,
        versions: [],
    },
    {
        link: '/timestamp',
        path: [ Style.Summary, ],
        title: '时间戳对照表',
        created: new Date('2023-12-21T10:02:00.000+08:00'),
        updated: new Date('2025-01-02T10:24:00.000+08:00'),
        expired: '永远新鲜~',
        versions: [],
    },
    {
        link: '/article/virtualenv-encoding-in-win',
        path: [ Style.Record, 'Python' ],
        title: 'virtualenv 在 Windows 中无法激活',
        created: new Date('2024-02-28T16:29:00.000+08:00'),
        updated: null,
        expired: 365,
        versions: [],
    },
    {
        link: '/article/manage-django-settings',
        path: [ Style.Record, 'Python' ],
        title: '管理 Django Settings',
        created: new Date('2023-12-21T11:48:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/datetime-formatting',
        path: [ Style.Record, 'Python' ],
        title: 'date 格式化失败',
        created: new Date('2023-11-14T23:32:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/run-script-directly',
        path: [ Style.Record, 'Python' ],
        title: '直接运行 Python 脚本',
        created: new Date('2023-09-05T23:32:00.000+08:00'),
        updated: new Date('2024-01-03T09:44:00.000+08:00'),
        expired: 365,
        versions: [],
    },
    {
        link: '/article/define-copy-method-for-object-self',
        path: [ Style.Record, 'Python' ],
        title: '为自身定义 copy 方法',
        created: new Date('2022-08-17T00:04:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/deepcopy-and-multiplication',
        path: [ Style.Record, 'Python' ],
        title: '使用乘号复制变量引起的问题',
        created: new Date('2020-12-20T23:29:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/key-of-nested-dictionaries',
        path: [ Style.Record, 'Python' ],
        title: '字典添加二级键值的问题',
        created: new Date('2020-12-19T17:19:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/jetbrains-ide-language',
        path: [ Style.Record, ],
        title: '设置 JetBrains IDE 的语言',
        created: new Date('2024-12-30T00:55:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/config-django-console-in-pycharm',
        path: [ Style.Record, ],
        title: 'PyCharm 配置 Django 控制台',
        created: new Date('2024-01-24T16:28:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/use-bundle-in-intellij-plugin-developing',
        path: [ Style.Record, ],
        title: 'IntelliJ 插件中使用 Bundle',
        created: new Date('2023-09-06T23:32:00.000+08:00'),
        updated: null,
        expired: 365,
        versions: [],
    },
    {
        link: '/article/convert-decimal-to-any-radix-with-yield',
        path: [ Style.Record, ],
        title: '十进制转任意进制与 yield',
        created: new Date('2022-08-18T00:10:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/any-radix-convert-to-decimal',
        path: [ Style.Record, ],
        title: '任意进制转十进制',
        created: new Date('2022-08-17T16:39:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/calculation-precision',
        path: [ Style.Problem, ],
        title: 'Java 运算精度',
        created: new Date('2019-11-20T21:26:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/leetcode-20-valid-parentheses',
        path: [ Style.Problem, 'LeetCode' ],
        title: 'LeetCode 20. 有效的括号',
        created: new Date('2024-01-10T00:04:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/leetcode-12-integer-to-roman',
        path: [ Style.Problem, 'LeetCode' ],
        title: 'LeetCode 12. 整数转罗马数字',
        created: new Date('2024-01-09T17:37:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/leetcode-13-roman-to-integer',
        path: [ Style.Problem, 'LeetCode' ],
        title: 'LeetCode 13. 罗马数字转整数',
        created: new Date('2024-01-09T17:37:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/noip-380',
        path: [ Style.Problem, 'NOIP' ],
        title: 'NOIP 380：校门外的树',
        created: new Date('2020-03-12T17:24:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/lanqiao-2012-gzgz-java-finals-4',
        path: [ Style.Problem, '蓝桥杯' ],
        title: 'Excel 地址转换',
        created: new Date('2020-01-20T15:09:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/sum-of-consecutive-natural-numbers',
        path: [ Style.Problem, ],
        title: '连续自然数之和',
        created: new Date('2020-04-06T12:53:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/integer-maximum-splicing',
        path: [ Style.Problem, ],
        title: '多个整数连接为最大整数问题',
        created: new Date('2020-03-13T15:08:00.000+08:00'),
        updated: null,
        expired: null,
        versions: [],
    },
    {
        link: '/article/parameter-default-value',
        path: [ Style.Thoughts, ],
        title: '默认值导致抽象泄漏',
        created: new Date('2024-01-30T23:42:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
    {
        link: '/article/class-and-type',
        path: [ Style.Thoughts, ],
        title: '类与类型',
        created: new Date('2023-12-22T11:03:00.000+08:00'),
        updated: null,
        expired: 365 * 3,
        versions: [],
    },
]
indexes.sort(
    (a, b) => (b.updated ?? b.created).getTime() - (a.updated ?? a.created).getTime()
)


export class Vitepress {

    /**
     * 全局菜单『导览』
     */
    static navGuideline() {
        // 提取每个分类（Style）下最新的一篇文章
        let navItems = new Map<Style, string>()
        for (const index of indexes) {
            const indexStyle = index.path[0] as Style
            if (navItems.has(indexStyle))
                continue
            navItems.set(indexStyle, index.link)
        }
        return Object.values(Style).map(style => {
            return { text: style.toString(), link: navItems.get(style)! }
        })
    }

    /**
     * 全局菜单『快速参考』
     */
    static navQuickRef() {
        return [
            { text: '镜像源', link: '/mirror' },
            { text: '时间戳对照表', link: '/timestamp' },
            { text: 'Python 语法更新摘要', link: '/grammar' },
        ]
    }

    /**
     * 侧边栏
     */
    static sidebar(): DefaultTheme.Sidebar {
        // 聚合每个分类（Style）下每个二级路径的所有文章
        // TODO: 映射任意层级（vitepress最多支持6层）
        return Object.values(Style).map(style => {
            return {
                text: style.toString(),
                collapsed: true,
                items: indexes.filter(v => v.path[0] == style).map(index => {
                    return { text: index.title, link: index.link }
                })
            }
        })
    }
}
