import type { integer } from '@vue/language-server'
import { parse } from 'date-fns'
import * as glob from 'glob'
import matter from 'gray-matter'
import fs from 'node:fs'
import * as pathlib from 'path'
import { compile, match } from 'path-to-regexp'
import { normalizePath } from 'vite'
import { type DefaultTheme, type UserConfig } from 'vitepress'


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
        this.frontmatter.createAt = Page.parseTime(this.frontmatter.createAt)
        this.frontmatter.updateAt = Page.parseTime(this.frontmatter.updateAt)
    }

    public static parseTime(t?: string): Date | undefined {
        return t ? parse(t, 'yyyy-MM-dd HH:mm', new Date()) : undefined
    }
}


/**
 * 页面信息处理的相关钩子。
 */
export type PageHooks = {

    /**
     * 比较所有文件夹（即所有 xxx/index.md）。
     */
    compareFolder?: (a: Page, b: Page) => number,

    /**
     * 比较所有文件（除了 xxx/index.md）。
     */
    compareFile?: (a: Page, b: Page) => number,

    /**
     * 比较文件与文件夹（即 xxx/index.md）。
     */
    compareItem?: (a: Page, b: Page) => number,
}


/**
 * 页面处理器。
 *
 * 使用前请务必确保 **所有页面** 的 [frontmatter](https://vitepress.dev/zh/guide/frontmatter) 都具有 `title` 字段。
 */
export class PageHandler {
    private pages: Page[] = []

    constructor(private configs: UserConfig<DefaultTheme.Config>) {
    }

    /**
     * 根据配置，扫描项目下的所有 Markdown 文件。
     *
     * @param excludes 额外排除的文件，同 `UserConfig<DefaultTheme.Config>['srcExclude']`。
     */
    public scan(...excludes: string[]) {
        const rewrite = compileRewrites(this.configs.rewrites)
        const base = this.configs.srcDir ?? '.'
        const pages: Page[] = []
        const files: string[] = glob.sync([ '**/**.md' ], {
            cwd: this.configs.srcDir ?? '.',
            nodir: true,
            absolute: true,
            ignore: [
                '**/node_modules/**',
                '**/dist/**',
                ...(this.configs.srcExclude ?? []),
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
                /\.md$/, this.configs.cleanUrls ? '' : '.html'
            )
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
            if (!('title' in frontmatter))
                continue
            pages.push(new Page(url, file, frontmatter))
        }
        this.pages = pages
        return this
    }

    /**
     * 构建某一级别侧边栏。
     *
     * @param dir 需要展示哪个目录下的 Markdown。
     * @param collapsed 是否收起当前目录。子目录会使用当前目录的设置。
     * @param deep 是否递归搜索该目录。
     * @param hooks 排序钩子。
     */
    public buildSidebar(dir: string, collapsed = false, deep = false, hooks?: PageHooks): DefaultTheme.SidebarItem[] {
        this.check()
        const soup = this.extract(dir)
        const files = soup.filter(page => page.depth === 0 && !page.isIndex).sort(hooks?.compareFile)
        const folders = soup.filter(page => page.depth === 1 && page.isIndex).sort(hooks?.compareFolder)

        if (!deep)
            return files.map(v => ({ text: v.frontmatter.title, link: `/${v.url}` }))

        const items: DefaultTheme.SidebarItem[] = []
        for (const page of [ ...folders, ...files ].sort(hooks?.compareItem)) {
            if (!page.isIndex)
                items.push({
                    text: page.frontmatter.navTitle ?? page.frontmatter.title,
                    link: `/${page.url}`,
                })
            else
                items.push({
                    text: page.frontmatter.title,
                    items: this.buildSidebar(pathlib.join(page.filepath, '../'), collapsed, deep, hooks),
                    collapsed: collapsed,
                })
        }
        return items
    }

    /**
     * 构建一项导航菜单。
     *
     * @param dir 需要搜索哪个目录下的 Markdown。
     * @param deep 是否递归搜索该目录。
     * @param hooks 排序钩子。
     */
    public buildNav(dir: string, deep = false, hooks?: PageHooks): DefaultTheme.NavItemWithChildren {
        this.check()
        const soup = this.extract(dir)
        const index = soup.filter(page => page.depth === 0 && page.isIndex)[0]
        const text = index?.frontmatter?.navTitle ?? index?.frontmatter?.title ?? '(未命名)'
        const files = soup.filter(page => page.depth === 0 && !page.isIndex).sort(hooks?.compareFile)
        const folders = soup.filter(page => page.depth === 1 && page.isIndex).sort(hooks?.compareFolder)

        if (!deep)
            return {
                text,
                items: files.map(v => ({
                    text: v.frontmatter.navTitle ?? v.frontmatter.title,
                    link: `/${v.url}`
                }))
            }

        const items: DefaultTheme.NavItemChildren['items'] = []
        for (const page of [ ...folders, ...files ].sort(hooks?.compareItem)) {
            if (!page.isIndex)
                items.push({
                    text: page.frontmatter.navTitle ?? page.frontmatter.title,
                    link: `/${page.url}`,
                })
            else
                items.push(
                    // @ts-ignore
                    this.buildNav(pathlib.join(page.filepath, '../'), deep, hooks)
                )
        }
        return { text, items }
    }

    /**
     * 提取目录下的子孙 Markdown 文件。
     *
     * @param dir 被搜索的目录。
     * @private
     */
    private extract(dir: string) {
        const directory = pathlib.join(pathlib.resolve(dir), '/')
        const dirLength = directory.length
        const pages = this.pages.filter(page => page.filepath.startsWith(directory))
        for (const page of pages) {
            const parts = page.filepath.slice(dirLength).split(/[\\/]/)
            page.depth = parts.length - 1
            page.isIndex = parts[page.depth].match(/^index\.md$/) !== null
        }
        return pages
    }

    private check() {
        if (this.pages.length === 0) {
            throw new Error('项目下找不到任何 Markdown 文件。')
        }
    }
}
