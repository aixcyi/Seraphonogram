import { defineConfig, loadEnv } from 'vitepress'

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
                collapsed: true,
                items: []
            },
            {
                text: 'Java',
                collapsed: true,
                items: []
            },
            {
                text: '问题集',
                collapsed: true,
                items: []
            },
            {
                text: '软件杂项',
                collapsed: true,
                items: [
                    { text: '镜像源', link: '/cheatsheet/mirror' },
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
                `Copyright © 2019-${now} <a href="https://github.com/aixcyi">砹小翼</a>` +
                '<span class="divider">|</span>' +
                '使用 <a href="https://vitepress.dev/zh/">VitePress</a> 构建',
        },
    },
})
