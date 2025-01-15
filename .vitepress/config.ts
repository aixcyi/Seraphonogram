import { resolve } from "path";
import { DefaultTheme, defineConfig, loadEnv, UserConfig } from "vitepress";
import { withSidebar } from 'vitepress-sidebar';
import { VitePressSidebarOptions } from "vitepress-sidebar/dist/types";
import { rewriteSidebar } from "../src/utils/vpt";


const env = loadEnv('', process.cwd())
const now = new Date().getFullYear()

// https://vitepress.dev/reference/site-config
const configsVitePress: UserConfig<DefaultTheme.Config> = {
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
            {
                text: '博客',
                activeMatch: '^(/summary|/record|/thinking|/problem)',
                items: [
                    // TODO: 每个分类都加一个索引，并替换这里的链接
                    { text: '总结／摘要', activeMatch: '/summary', link: '/summary/python/dot-token-generation' },
                    { text: '经验／踩坑／备忘', activeMatch: '/record', link: '/record/jetbrains-ide-language' },
                    { text: '思考／碎碎念', activeMatch: '/thinking', link: '/thinking/parameter-default-value' },
                    { text: '题集', activeMatch: '/problem', link: '/problem/leetcode-20-valid-parentheses' }
                ]
            },
            {
                text: '快速参考',
                activeMatch: '^(/mirror|/timestamp|/grammar)',
                items: [
                    { text: '镜像源', link: '/mirror' },
                    { text: '时间戳对照表', link: '/timestamp' },
                    { text: 'Python 语法更新摘要', link: '/grammar' },
                ]
            },
            { text: '关于', link: '/about' },
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
        'summary/mirror.md': 'mirror.md',
        'summary/timestamp.md': 'timestamp.md',
        'summary/grammar.md': 'grammar.md',
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
const configsVitePressSidebar: VitePressSidebarOptions = {
    // 路由、包含、排除
    documentRootPath: '/',
    scanStartPath: 'src/',
    excludePattern: [
        'about.md',
    ],
    // 分组、菜单标题
    collapsed: true,
    useTitleFromFrontmatter: true,
    useFolderTitleFromIndexFile: true,
    // 排序
    sortFolderTo: 'top',
    sortMenusByFrontmatterOrder: true,
    sortMenusOrderByDescending: true,
};

export default defineConfig(
    rewriteSidebar(
        withSidebar(configsVitePress, configsVitePressSidebar)
    )
);
