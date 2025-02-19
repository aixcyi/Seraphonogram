import { resolve } from "path";
import { DefaultTheme, defineConfig, loadEnv, UserConfig } from "vitepress";
import { PageHandler, PageHooks } from "../src/utils/vitepress";


const env = loadEnv('', process.cwd())
const now = new Date().getFullYear()

// https://vitepress.dev/reference/site-config
const configs: UserConfig<DefaultTheme.Config> = {
    lang: 'zh-CN',
    title: 'Seraphonogram',
    description: '阿羽的树洞',
    srcDir: './src',
    outDir: './dist',
    cacheDir: './cache',
    head: [
        [ 'link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' } ],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.ico',
        nav: [],
        sidebar: [],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/aixcyi' },
            { icon: 'gitee', link: 'https://gitee.com/aixcyi' },
        ],
        langMenuLabel: '切换语言',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '颜色主题',
        darkModeSwitchTitle: '切换到深色模式',
        lightModeSwitchTitle: '切换到浅色模式',
        returnToTopLabel: '回到顶部',
        outline: { label: '目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        // lastUpdated: { text: '最后更新于' },
        // editLink: { text: '源代码', pattern: 'https://github.com/username/repository-name/blame/main/docs/:path' },
        footer: {
            message: 'VITE_FOOTER_MSG' in env ? `${env.VITE_FOOTER_MSG}` : undefined,
            copyright: `Copyright © 2016-${now} <a href="https://ayuu.cc/">阿羽</a>`,
        },
    },
    cleanUrls: true,
    rewrites(id: string): string {
        return id.replace(/^posts\/(.*)/, '$1')
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
}

const sidebar = new PageHandler(configs).scan()
const hooks: PageHooks = {
    compareFolder(a, b) {
        return a.frontmatter.order - b.frontmatter.order
    },
    compareFile(a, b) {
        return +(b.frontmatter.updated ?? b.frontmatter.created ?? 0)
            - +(a.frontmatter.updated ?? a.frontmatter.created ?? 0)
    },
}
const hooksNav: PageHooks = {
    ...hooks,
    compareItem() {
        return -1
    },
}
configs.themeConfig.sidebar = {
    '/': sidebar.build('./src/posts/', true, true, hooks),
}
configs.themeConfig.nav = [
    { text: '目录', link: '/catalog' },
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
    {
        text: '快速参考',
        items: sidebar.build('./src/posts/cheatsheet/', true, true, hooksNav) as DefaultTheme.NavItemWithLink[],
    },
    {
        text: '交流',
        items: [
            { text: 'QQ 群', link: 'https://qm.qq.com/q/ZqCGqpMXy8' },
            { text: 'Telegram 群组', link: 'https://t.me/ayuucc' },
        ]
    },
]

export default defineConfig(configs)
