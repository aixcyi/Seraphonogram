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
            { icon: 'qq', link: 'https://qm.qq.com/q/ZqCGqpMXy8' },
            { icon: 'telegram', link: 'https://t.me/ayuucc' },
        ],
        langMenuLabel: '切换语言',
        sidebarMenuLabel: '栏目页面',
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

const sidebar = new PageHandler(configs).scan()
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
    '/posts/': sidebar.buildSidebar('./src/posts/', true, true, hooks),
    '/refs/': sidebar.buildSidebar('./src/refs/', false, true, hooksNav),
}
configs.themeConfig.nav = [
    { text: '博客', link: '/posts/catalog', activeMatch: '/posts/' },
    sidebar.buildNav('./src/refs/', true, hooksNav),
    { text: '关于', link: '/about' },
    { text: '主站', link: 'https://ayuu.cc/' },
]

export default defineConfig(configs)
