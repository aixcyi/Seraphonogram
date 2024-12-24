import { defineConfig } from 'vitepress'

import { copyright, message } from "../customizations";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "zh-CN",
    title: "Seraphonogram",
    description: "砹小翼的博客",
    srcDir: './src',
    outDir: './dist',
    cacheDir: './cache',
    head: [
        [ 'link', { rel: 'icon', href: '/favicon.png', type: 'image/png' } ],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.png',
        nav: [
            { text: '博客', link: '/' },
            {
                text: '快速参考',
                items: [
                    { text: '镜像源', link: '/cheatsheet/mirror' },
                    { text: '时间戳对照表', link: '/cheatsheet/timestamp' },
                    { text: 'Python 语法更新摘要', link: '/cheatsheet/grammar' },
                ]
            },
        ],
        sidebar: [
            {
                text: 'Python',
                collapsed: false,
                items: []
            },
            {
                text: 'Java',
                collapsed: false,
                items: []
            },
            {
                text: '问题集',
                collapsed: false,
                items: []
            },
            {
                text: '杂项',
                collapsed: false,
                items: []
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/aixcyi' },
            { icon: 'gitee', link: 'https://gitee.com/aixcyi' },
        ],
        footer: {
            message: message,
            copyright: copyright,
        },
    },
})
