import type { integer } from "@vue/language-server";
import { parse } from "date-fns";
import * as glob from "glob";
import matter from "gray-matter";
import fs from "node:fs";
import * as pathlib from "path";
import { compile, match } from "path-to-regexp";
import { normalizePath } from "vite";
import { type DefaultTheme, type UserConfig } from "vitepress";


/**
 * 编译 `UserConfig<DefaultTheme.Config>['rewrites']` 并返回重写函数。
 */
function compileRewrites(rewrites: UserConfig['rewrites']) {
    switch (typeof rewrites) {
        case "object":
            const rewriteRules = Object.entries(rewrites || {}).map(
                ([ from, to ]) => {
                    return {
                        toPath: compile(to),
                        matchUrl: match(from),
                    }
                }
            )
            return (page: string) => {
                for (const { matchUrl, toPath } of rewriteRules) {
                    const res = matchUrl(page)
                    if (res) {
                        return toPath(res.params)
                    }
                }
                return page
            }
        case "function":
            return rewrites
        default:
            return (page: string) => page
    }
}


/**
 * Markdown 文件解析得到的页面信息。
 */
export class Page {

    constructor(public readonly url: string,
                public readonly filepath: string,
                public readonly frontmatter: Record<string, any>,
                public depth: integer = 0,
                public isIndex: boolean = false) {
        this.frontmatter = { ...frontmatter }
        this.frontmatter.created = Page.parseTime(this.frontmatter.created)
        this.frontmatter.updated = Page.parseTime(this.frontmatter.updated)
    }

    public static parseTime(t?: string): Date | undefined {
        return t ? parse(t, 'yyyy-MM-dd HH:mm', new Date()) : undefined
    }
}


/**
 * 根据配置，扫描项目下的所有页面。
 *
 * @param configs VitePress 配置。
 * @param excludes 额外排除的文件，同 `UserConfig<DefaultTheme.Config>['srcExclude']`。
 */
export function scan(configs: UserConfig<DefaultTheme.Config>, excludes: string[] = []) {
    const rewrite = compileRewrites(configs.rewrites)
    const base = configs.srcDir ?? '.'
    const pages: Page[] = []
    const files: string[] = glob.sync([ '**/**.md' ], {
        cwd: configs.srcDir ?? '.',
        nodir: true,
        absolute: true,
        ignore: [
            '**/node_modules/**',
            '**/dist/**',
            ...(configs.srcExclude ?? []),
            ...excludes,
        ],
    })
    for (const file of files) {
        const url = normalizePath(
            rewrite(
                pathlib.relative(base, file).replace(/\\/g, '/')
            )
        ).replace(
            /(^|\/)index\.md$/, '$1'
        ).replace(
            /\.md$/, configs.cleanUrls ? '' : '.html'
        )
        const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
        if (!('title' in frontmatter))
            continue
        pages.push(new Page(url, file, frontmatter))
    }
    return pages
}


/**
 * 侧边栏构建器。
 *
 * 使用前请务必确保 **所有页面** 的 [frontmatter](https://vitepress.dev/zh/guide/frontmatter) 都具有 `title` 字段。
 */
export class SidebarBuilder {
    private pages: Page[] = []

    /**
     * 比较文件与文件夹（即 xxx/index.md）。
     */
    public compareItem = (a: Page, b: Page) => {
        return a.frontmatter.title.localeCompare(b.frontmatter.title)
    }

    /**
     * 比较所有文件（除了 xxx/index.md）。
     */
    public compareFile = (a: Page, b: Page) => {
        return +(b.frontmatter.updated ?? b.frontmatter.created ?? 0)
            - +(a.frontmatter.updated ?? a.frontmatter.created ?? 0)
    }

    /**
     * 比较所有文件夹（即所有 xxx/index.md）。
     */
    public compareFolder = (a: Page, b: Page) => {
        return a.frontmatter.order - b.frontmatter.order
    }

    /**
     * 扫描项目下的所有 Markdown 文件。
     *
     * @param configs VitePress 配置。
     * @param excludes 额外排除的文件，同 `UserConfig<DefaultTheme.Config>['srcExclude']`。
     */
    public scan(configs: UserConfig<DefaultTheme.Config>, excludes: string[] = []) {
        this.pages = scan(configs, excludes)
        return this
    }

    /**
     * 构建某一级别侧边栏。
     *
     * @param dir 需要展示哪个目录下的 Markdown。
     * @param deep 是否递归搜索该目录。
     * @param collapsed 是否收起当前目录。子目录会使用当前目录的设置。
     */
    public build(dir: string, deep = false, collapsed = false): DefaultTheme.SidebarItem[] {
        if (this.pages.length === 0)
            return []

        const directory = pathlib.join(pathlib.resolve(dir), '/')
        const dirLength = directory.length
        const pages = this.pages.filter(page => page.filepath.startsWith(directory))
        for (const page of pages) {
            const parts = page.filepath.slice(dirLength).split(/[\\/]/)
            page.depth = parts.length - 1
            page.isIndex = parts[page.depth].match(/^index\.md$/) !== null
        }

        const files = pages.filter(page => page.depth === 0 && !page.isIndex).sort(this.compareFile)
        const folders = pages.filter(page => page.depth === 1 && page.isIndex).sort(this.compareFolder)

        if (!deep)
            return files.map(v => ({ text: v.frontmatter.title, link: `/${v.url}` }))

        const items: DefaultTheme.SidebarItem[] = []
        for (const page of [ ...folders, ...files ].sort(this.compareItem)) {
            if (!page.isIndex)
                items.push({
                    text: page.frontmatter.title,
                    link: `/${page.url}`,
                })
            else
                items.push({
                    text: page.frontmatter.title,
                    items: this.build(pathlib.join(page.filepath, '../'), deep, collapsed),
                    collapsed: collapsed,
                })
        }
        return items
    }
}
