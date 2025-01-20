import { resolve } from "path";
import { DefaultTheme, defineConfig, loadEnv, UserConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { VitePressSidebarOptions } from "vitepress-sidebar/dist/types";
import { rewriteSidebar } from "../src/utils/vpt";


const env = loadEnv('', process.cwd())
const now = new Date().getFullYear()

// https://vitepress.dev/reference/site-config
const configsVitePress: UserConfig<DefaultTheme.Config> = {
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
        nav: [
            {
                text: '博客',
                items: [
                    { text: '目录索引', link: '/catalog' },
                    {
                        items: [
                            { text: '总结／摘要', activeMatch: '/summary/', link: '/catalog?tag=总结／摘要' },
                            { text: '经验／踩坑／备忘', activeMatch: '/record/', link: '/catalog?tag=经验／踩坑／备忘' },
                            { text: '思考／碎碎念', activeMatch: '/thinking/', link: '/catalog?tag=思考／碎碎念' },
                            { text: '解题集', activeMatch: '/problem/', link: '/catalog?tag=解题集' },
                        ]
                    },
                    { text: '关于', link: '/about' },
                ]
            },
            {
                text: '快速参考',
                items: [
                    { text: '镜像源', link: '/mirror' },
                    { text: '时间戳对照表', link: '/timestamp' },
                    { text: 'Python 语法更新摘要', link: '/grammar' },
                ]
            },
            {
                text: '题库',
                items: [
                    { text: 'Python', link: '/problemset/python' },
                ]
            },
            { text: '主站', link: 'https://aixcyi.cn/' },
        ],
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
            message: `${env.VITE_FOOTER_MSG}`,
            copyright: `Copyright © 2016-${now} <a href="https://aixcyi.cn/">砹小翼</a>`,
        },
    },
    cleanUrls: true,
    rewrites: {
        'blogs/summary/mirror.md': 'mirror.md',
        'blogs/summary/timestamp.md': 'timestamp.md',
        'blogs/summary/grammar.md': 'grammar.md',
        'blogs/:file': ':file',
        'blogs/:style/:file': ':style/:file',
        'blogs/:style/:topic/:file': ':style/:topic/:file',
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

// https://vitepress-sidebar.cdget.com/zhHans/guide/options
const configsVitePressSidebar: VitePressSidebarOptions[] = [
    {
        // 路由、包含、排除
        documentRootPath: '/',
        scanStartPath: 'src/blogs/',
        excludePattern: [
            'catalog.md',
        ],
        // 分组、菜单标题
        collapsed: true,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        // 排序
        sortFolderTo: 'top',
        sortMenusByFrontmatterOrder: true,
        sortMenusOrderByDescending: true,
    },
    {
        // 路由、包含、排除
        documentRootPath: '/',
        scanStartPath: 'src/problemset/',
        resolvePath: '/problemset/',
        basePath: '/problemset/',
        // 分组、菜单标题
        collapsed: false,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        // 排序
        sortFolderTo: 'top',
        sortMenusOrderNumericallyFromLink: true,
    },
]

export default defineConfig(
    rewriteSidebar(
        withSidebar(configsVitePress, configsVitePressSidebar)
    )
)
