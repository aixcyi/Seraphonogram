import { resolve } from "path";
import { defineConfig } from "vite";
import { DefaultTheme, loadEnv, UserConfig } from "vitepress";
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
    srcExclude: [
        './drafts/**/*.md',
    ],
    head: [
        [ 'link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' } ],
    ],
    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        logo: '/favicon.ico',
        nav: [],
        sidebar: [],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/aixcyi', ariaLabel: 'GitHub 主页' },
            { icon: 'gitee', link: 'https://gitee.com/aixcyi', ariaLabel: '码云主页' },
            { icon: 'qq', link: 'https://qm.qq.com/q/ZqCGqpMXy8', ariaLabel: 'QQ 群' },
            { icon: 'telegram', link: 'https://t.me/ayuucc', ariaLabel: 'Telegram 群组' },
        ],
        langMenuLabel: '切换语言',
        sidebarMenuLabel: '目录',
        darkModeSwitchLabel: '颜色主题',
        darkModeSwitchTitle: '切换到深色主题',
        lightModeSwitchTitle: '切换到浅色主题',
        returnToTopLabel: '回到顶部',
        outline: { label: '大纲' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        footer: {
            message: env.VITE_FOOTER_MSG,
            copyright: `Copyright © 2016-${now} <a href="https://ayuu.cc/">阿羽</a>`,
        },
    },
    cleanUrls: true,
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

if (process.env.VP_DEBUG)
    configs.srcExclude = []

const sidebar = new PageHandler(configs).scan()
const hookPosts: PageHooks = {
    compareFolder: (a, b) => a.frontmatter.order - b.frontmatter.order,
    compareFile: (a, b) => (
        +(b.frontmatter.reviseAt ?? b.frontmatter.publishAt ?? 0)
        - +(a.frontmatter.reviseAt ?? a.frontmatter.publishAt ?? 0)
    ),
}
const hookRefs: PageHooks = {
    compareFolder: (a, b) => b.frontmatter.order - a.frontmatter.order,
    compareFile: (a, b) => b.frontmatter.order - a.frontmatter.order,
    compareItem: () => -1,
}
configs.themeConfig.sidebar = process.env.VP_DEBUG ? {
    '/posts/': sidebar.buildSidebar('./src/posts/', true, true, hookPosts),
    '/refs/': sidebar.buildSidebar('./src/refs/', false, true, hookRefs),
    '/drafts/': sidebar.buildSidebar('./src/drafts/', false, true, hookPosts),
} : {
    '/posts/': sidebar.buildSidebar('./src/posts/', true, true, hookPosts),
    '/refs/': sidebar.buildSidebar('./src/refs/', false, true, hookRefs),
}
configs.themeConfig.nav = process.env.VP_DEBUG ? [
    { text: '博客', link: '/posts/catalog', activeMatch: '/posts/' },
    sidebar.buildNav('./src/refs/', true, hookRefs),
    sidebar.buildNav('./src/drafts/', true, hookPosts),
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
] : [
    { text: '博客', link: '/posts/catalog', activeMatch: '/posts/' },
    sidebar.buildNav('./src/refs/', true, hookRefs),
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
]

export default defineConfig(configs)
