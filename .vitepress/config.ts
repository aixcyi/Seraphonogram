import { resolve } from "path";
import { DefaultTheme, defineConfig, loadEnv, UserConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { PageHandler, PageHooks } from "../src/utils/vitepress";


const env = loadEnv('', process.cwd())
const now = new Date().getFullYear()

// https://vitepress.dev/zh/reference/site-config
const configs: UserConfig<DefaultTheme.Config> = {
    lang: 'zh-CN',
    title: 'Seraphonogram',
    description: '羽音博客',
    titleTemplate: ':title • 羽音',
    srcDir: './src',
    outDir: './dist',
    cacheDir: './cache',
    head: [
        [ 'link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' } ],
    ],
    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        logo: '/favicon.ico',
        nav: [],
        sidebar: [],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/aixcyi' },
            { icon: 'gitee', link: 'https://gitee.com/aixcyi' },
        ],
        langMenuLabel: '切换语言',
        sidebarMenuLabel: '所有博客',
        darkModeSwitchLabel: '颜色主题',
        darkModeSwitchTitle: '切换到深色主题',
        lightModeSwitchTitle: '切换到浅色主题',
        returnToTopLabel: '回到顶部',
        outline: { label: '目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        footer: {
            message: env.VITE_FOOTER_MSG,
            copyright: `Copyright © 2016-${now} <a href="https://ayuu.cc/">阿羽</a>`,
        },
    },
    cleanUrls: true,
    rewrites(page: string): string {
        const path = page
            .replace(/^posts\/(.*)$/, '$1')
            .replace(/^cheatsheet\/(.*)$/, '$1')
        return path === 'index.md' && page !== 'index.md'
            ? page
            : path
    },
    markdown: {
        math: true,
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    vite: {
        plugins: [
            // @ts-ignore
            groupIconVitePlugin(),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, '../src'),
            },
        },
    },
}

const sidebar = new PageHandler(configs).scan('./posts/about.md', './posts/catalog.md')
const hooks: PageHooks = {
    compareFolder(a, b) {
        return a.frontmatter.order - b.frontmatter.order
    },
    compareFile(a, b) {
        return +(b.frontmatter.reviseAt ?? b.frontmatter.publishAt ?? 0)
            - +(a.frontmatter.reviseAt ?? a.frontmatter.publishAt ?? 0)
    },
}
const hooksNav: PageHooks = {
    ...hooks,
    compareItem() {
        return -1
    },
}
configs.themeConfig.sidebar = {
    '/': sidebar.buildSidebar('./src/posts/', true, true, hooks),
}
configs.themeConfig.nav = [
    { text: '目录', link: '/catalog' },
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
    sidebar.buildNav('./src/posts/cheatsheet/', true, hooksNav),
    {
        text: '交流',
        items: [
            { text: 'QQ 群', link: 'https://qm.qq.com/q/ZqCGqpMXy8' },
            { text: 'Telegram 群组', link: 'https://t.me/ayuucc' },
        ]
    },
]

export default defineConfig(configs)
