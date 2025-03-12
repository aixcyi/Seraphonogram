import { pinyin } from "@napi-rs/pinyin";
import type { integer } from "@vue/language-server";
import { format, parse } from "date-fns";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import * as fs from "node:fs";
import pathlib from "path";
import { normalizePath } from "vite";
import type { SiteConfig } from "vitepress";


const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG


/**
 * 博客文件路径通配符。
 */
const patterns = [
    './posts/**/*.md',
    ...(config.userConfig.srcExclude?.map(p => `!${p}`) ?? []),
].map(p =>
    // https://github.com/micromatch/micromatch#extended-globbing
    p.match(/^[\/\w.].*$/)
        ? normalizePath(pathlib.join(config.srcDir!, p))
        : p[0] + normalizePath(pathlib.join(config.srcDir!, p.substring(1)))
)


/**
 * 博客信息结构。
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
 * 博客数据结构。
 */
export interface Data {

    /** 所有博客 */
    posts: Post[]

    /** 标签及相应博客的数量 */
    tags: Record<string, integer>
}


declare const data: Data
export { data }


export default {
    watch: patterns,
    async load(files: string[]) {
        const md = MarkdownIt()
        const maps = config.rewrites['map']
        const data: Data = { posts: [], tags: {} }

        // 提取文件夹名称
        let folders = new Map<string, Record<string, any>>()
        for (const file of files) {
            if (!file.endsWith('/index.md')) {
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
            folders.set(
                pathlib.dirname(file).split('/').reverse()[0],
                frontmatter
            )
        }
        folders = new Map(
            Array
                .from(folders.entries())
                .sort(([ , af ], [ , bf ]) => af.order - bf.order)
        )

        // 提取文件信息
        for (const file of files) {
            if (!file.endsWith('.md')) {
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'), { excerpt: true })
            if (!('publishAt' in frontmatter)) {
                // 过滤掉文件夹（因为没有为 文件夹/index.md 配置 frontmatter.publishAt 属性）
                continue
            }

            // 提取路径中的文件夹，转换为名称
            const srcPath = pathlib.relative(config.srcDir!, file).replace(/\\/g, '/')
            // 下标表示src深度：./src/* => 0，./src/posts/* => 1，以此类推。
            const column = folders.get(srcPath.split('/')[1])?.title
            const tags = [ ...new Set(frontmatter.tags as string[] ?? []) ].sort((a, b) => {
                // 按照字节长度从小到大排序，是因为标签们附加在标题后面，这样排比较好看
                const lenA = Buffer.byteLength(a, 'utf8')
                const lenB = Buffer.byteLength(b, 'utf8')
                return lenA - lenB
            })

            // 计算页面真实 URL
            const mappedPath = srcPath in maps ? maps[srcPath] : srcPath
            if (!mappedPath)
                continue
            const url = normalizePath(mappedPath)
                .replace(/(^|\/)index\.md$/, '$1')
                .replace(/\.md$/, config.cleanUrls ? '' : '.html')

            // 获取最近修改时间
            const changed = parse(
                frontmatter.reviseAt ?? frontmatter.publishAt,
                'yyyy-MM-dd HH:mm',
                new Date()
            )

            // 渲染页面摘要
            const renderedExcerpt = frontmatter.excerpt ? md.renderInline(frontmatter.excerpt) : ''

            // 按标签统计博客数目
            tags.forEach(tag => {
                if (!(tag in data.tags)) {
                    data.tags[tag] = 0
                }
                data.tags[tag]++
            })

            data.posts.push({
                url: `/${url}`,
                title: frontmatter.title,
                excerpt: renderedExcerpt,
                changed: changed.getTime(),
                column,
                tags,
                year: changed.getFullYear(),
                date: format(changed, 'MM-dd'),
            })
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
