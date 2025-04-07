import MarkdownIt from "markdown-it";
import { resolve } from "path";
import { defineConfig } from "vite";
import { DefaultTheme, loadEnv, UserConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { PageHandler, PageHooks } from "../src/utils/vitepress";


const md = MarkdownIt()
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
        [ 'link', {
            rel: 'stylesheet',
            href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans_VF:VF:Chinese_Simplify,Latin&display=swap'
        } ],
    ],
    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        logo: '/favicon.ico',
        nav: [],
        sidebar: [],
        socialLinks: [
            { icon: 'qq', link: 'https://qm.qq.com/q/ZqCGqpMXy8', ariaLabel: 'QQ 群' },
            { icon: 'telegram', link: 'https://t.me/ayuucc', ariaLabel: 'Telegram 群组' },
            { icon: 'github', link: 'https://github.com/aixcyi/Seraphonogram', ariaLabel: 'GitHub 仓库' },
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
            copyright: `© 2016-${now} <a href="https://ayuu.cc/" target="_blank">阿羽</a> 版权所有. All Rights Reserved.`,
        },
    },
    cleanUrls: true,
    markdown: {
        math: true,
        container: {
            tipLabel: '提示',
            warningLabel: '注意',
            dangerLabel: '当心',
            infoLabel: '信息',
            detailsLabel: '详细信息',
        },
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
    transformPageData(pageData) {
        pageData.frontmatter.excerpt = pageData.frontmatter.excerpt ? md.render(pageData.frontmatter.excerpt) : ''
    },
    transformHead({ assets }) {
        const myFontFile = assets.find(() => /JetBrainsMono-\w+\.woff2/)
        if (myFontFile)
            return [
                [ 'link', { rel: 'preload', href: myFontFile, as: 'font', type: 'font/woff2', crossorigin: '' } ],
            ]
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
    '/drafts/': sidebar.buildSidebar('./src/drafts/', false, true, hookRefs),
} : {
    '/posts/': sidebar.buildSidebar('./src/posts/', true, true, hookPosts),
    '/refs/': sidebar.buildSidebar('./src/refs/', false, true, hookRefs),
}
configs.themeConfig.nav = process.env.VP_DEBUG ? [
    { text: '博客', link: '/posts', activeMatch: '/posts/' },
    sidebar.buildNav('./src/refs/', true, hookRefs),
    sidebar.buildNav('./src/drafts/', true, hookRefs),
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
] : [
    { text: '博客', link: '/posts', activeMatch: '/posts/' },
    sidebar.buildNav('./src/refs/', true, hookRefs),
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
]

export default defineConfig(configs)
