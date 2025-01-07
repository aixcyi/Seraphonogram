import { resolve } from "path";
import { defineConfig, loadEnv } from "vitepress";
import { Vitepress } from "../src/data";

const env = loadEnv('', process.cwd())
const now = Math.max(new Date().getFullYear(), Number(env.VITE_THIS_YEAR))

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'Seraphonogram',
    description: '砹小翼的博客',
    srcDir: './src',
    outDir: './dist',
    cacheDir: './cache',
    head: [
        [ 'link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' } ],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.ico',
        nav: [
            { text: '导览', items: Vitepress.navGuideline() },
            { text: '快速参考', items: Vitepress.navQuickRef() },
            { text: '关于', link: '/about' },
            { text: '主站', link: 'https://aixcyi.cn/' },
        ],
        sidebar: Vitepress.sidebar(),
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
        outline: { label: '页面目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新于' },
        // editLink: { text: '源代码', pattern: 'https://github.com/username/repository-name/blame/main/docs/:path' },
        footer: {
            message: `${env.VITE_FOOTER_MSG}`,
            copyright: `Copyright © 2016-${now} <a href="https://aixcyi.cn/">砹小翼</a>`,
        },
    },
    cleanUrls: true,
    rewrites: {
        'blog/:file': ':file',
        'cheatsheet/:file': ':file',
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
