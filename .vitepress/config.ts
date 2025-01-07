import { resolve } from "path";
import { defineConfig, loadEnv } from "vitepress";
import { vitepressNavGuideline, vitepressNavQuickRef, vitepressSidebar } from "../src/data";

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
        outline: { label: '页面目录' },
        nav: [
            {
                text: '导览',
                items: vitepressNavGuideline,
            },
            {
                text: '快速参考',
                items: vitepressNavQuickRef,
            },
            { text: '关于', link: '/about' },
            { text: '主站', link: 'https://aixcyi.cn/' },
        ],
        sidebar: vitepressSidebar,
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观主题',
        darkModeSwitchTitle: '切换到夜间主题',
        lightModeSwitchTitle: '切换到日间主题',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/aixcyi' },
            { icon: 'gitee', link: 'https://gitee.com/aixcyi' },
        ],
        returnToTopLabel: '回到顶部',
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        footer: {
            message: `${env.VITE_FOOTER_MSG}`,
            copyright: `Copyright © 2016-${now} <a href="https://aixcyi.cn/">砹小翼</a>`,
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
