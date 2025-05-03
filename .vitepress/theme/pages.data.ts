import { pinyin } from '@napi-rs/pinyin'
import type { integer } from '@vue/language-server'
import { format, parse } from 'date-fns'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import * as fs from 'node:fs'
import pathlib from 'path'
import { normalizePath } from 'vite'
import type { SiteConfig } from 'vitepress'


const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG

/**
 * ```javascript
 * console.log(
 *     configBased('/disk/to/project/src/<zone>/<column>/page.md')
 * )
 * // <zone>/<column>/page.md
 * ```
 *
 * ```javascript
 * console.log(
 *     configBased('/disk/to/project/src/<zone>/<column>/page.md', '../')
 * )
 * // <zone>/<column>
 * ```
 *
 * @param path 基于 `SiteConfig.srcDir` 的地址。
 * @param paths 对 `path` 的相对转换。
 */
function configBased(path: string, ...paths: string[]): string {
    return pathlib.relative(config.srcDir!, pathlib.resolve(path, ...paths)).replace(/\\/g, '/')
}

enum Zone {
    POSTS = 'posts',
    REFS = 'refs',
    DRAFTS = 'drafts',
}

/**
 * 博客文件路径通配符。
 */
const patterns = [
    './posts/**/*.md',
    './refs/**/*.md',
    ...(config.userConfig.srcExclude ?? []).map(p => `!${p}`),
].map(p =>
    // https://github.com/micromatch/micromatch#extended-globbing
    p.match(/^[\/\w.].*$/)
        ? normalizePath(pathlib.join(config.srcDir!, p))
        : p[0] + normalizePath(pathlib.join(config.srcDir!, p.substring(1)))
)

/**
 * 页面信息。
 */
export interface Page {
    url: string
    title: string
}

/**
 * 博客信息。
 */
export interface Post {
    url: string
    title: string
    excerpt: string
    changed: number
    column: string
    tags: string[]
    year: number
    date: string
}

/**
 * 栏目信息。
 */
export interface Column {
    index: number
    title: string
    excerpt: string
}

/**
 * 导出数据。
 */
export interface Data {

    /** 所有页面。 */
    pages: Page[]

    /** 所有博客。 */
    posts: Post[]

    /** 标签及相应博客的数量。 */
    tags: Record<string, integer>

    /** 标签含义。 */
    tagDesc: Record<string, string>

    /** 所有栏目。 */
    columns: Column[]
}

declare const data: Data
export { data }

export default {
    watch: patterns,
    async load(files: string[]) {
        const md = MarkdownIt()
        const maps = config.rewrites['map']
        const data: Data = {
            pages: [], posts: [], tags: {}, columns: [],
            tagDesc: {
                'AIGC': '人工智能生成内容，AI-Generated Content<br/>其中 AI 为 Artificial intelligence',
                'API': '应用程序编程接口<br/>Application Programming Interface',
                'COM': '组件对象模型<br/>Component Object Model',
                'DRF': 'Django REST Framework',
                'i18n': '国际化<br/>internationalization',
                'I/O': '输入/输出<br/>Input/Output',
                'L10N': '本土化<br/>Localization',
                'NOIP': '全国青少年信息学奥林匹克竞赛<br/>National Olympiad in Informatics in Provinces',
                'ORM': '对象关系映射<br/>Object-Relational Mapping',
            }
        }

        // 提取 posts 下的栏目名称
        const columns = new Map<string, Record<string, any>>()
        for (const file of files) {
            if (!file.endsWith('/index.md')) {
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
            const [ zone, column, child, ] = configBased(file, '../').split('/')
            if (zone === Zone.POSTS && column !== undefined && child === undefined) {
                frontmatter.excerpt = frontmatter.excerpt ? md.renderInline(frontmatter.excerpt) : ''
                columns.set(column, frontmatter)
            }
        }
        data.columns = Array
            .from(columns.entries())
            .sort(([ , af ], [ , bf ]) => af.order - bf.order)
            .map(([ , f ]) => {
                return {
                    index: f.order,
                    title: f.title,
                    excerpt: f.excerpt,
                }
            })

        // 提取文件信息
        for (const file of files) {
            if (!file.endsWith('.md')) {
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'), { excerpt: true })
            if (!('publishAt' in frontmatter)) {
                // 过滤掉文件夹（因为不会为 ./<folder>/index.md 配置 frontmatter.publishAt 属性）
                continue
            }

            const srcPath = configBased(file)
            let [ zone, column, ] = configBased(file, '../').split('/')
            if (zone === Zone.POSTS && column !== undefined) {
                column = columns.has(column) ? columns.get(column)!.title : ''
            } else {
                column = ''  // 向前兼容，避免报错
            }

            // 计算页面 URL
            const mappedPath = srcPath in maps ? maps[srcPath] : srcPath
            if (!mappedPath)
                continue
            const url = normalizePath(mappedPath)
                .replace(/(^|\/)index\.md$/, '$1')
                .replace(/\.md$/, config.cleanUrls ? '' : '.html')

            data.pages.push({
                url: `/${url}`,
                title: frontmatter.title,
            })

            // @ts-ignore
            if (zone === Zone.POSTS) {
                // 渲染页面摘要
                frontmatter.excerpt = frontmatter.excerpt ? md.renderInline(frontmatter.excerpt) : ''
                // 获取最近修改时间
                const changed = parse(
                    frontmatter.reviseAt ?? frontmatter.publishAt,
                    'yyyy-MM-dd HH:mm',
                    new Date()
                )
                // 按标签统计博客数目
                frontmatter.tags.forEach((tag: string) => {
                    if (!(tag in data.tags)) {
                        data.tags[tag] = 0
                    }
                    data.tags[tag]++
                })
                data.posts.push({
                    url: `/${url}`,
                    title: frontmatter.title,
                    excerpt: frontmatter.excerpt,
                    changed: changed.getTime(),
                    column,
                    tags: frontmatter.tags,
                    year: changed.getFullYear(),
                    date: format(changed, 'MM-dd'),
                })
            }
        }

        // 对标签按照拼音排序
        const labels = Object.keys(data.tags).sort((a, b) =>
            pinyin(a).join('').localeCompare(pinyin(b).join(''))
        )
        const tags: Data['tags'] = {}
        for (const label of labels) {
            tags[label] = data.tags[label]
        }
        data.tags = tags

        return data
    }
}
