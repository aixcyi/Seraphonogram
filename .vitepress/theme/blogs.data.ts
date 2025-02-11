import { pinyin } from "@napi-rs/pinyin";
import type { integer } from "@vue/language-server";
import { format, parse } from "date-fns";
import matter from "gray-matter";
import * as fs from "node:fs";
import pathlib from "path";
import { normalizePath } from "vite";
import type { SiteConfig } from "vitepress";


const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG


/**
 * src深度，用于匹配文件夹作为标签。./src/* 为 0，./src/blogs/* 为 1，以此类推。
 */
const depth = 1


/**
 * 博客文件路径通配符。
 */
const patterns = [
    './blogs/**/*.md',
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
export interface Blog {
    url: string
    title: string
    changed: number
    tags: string[]
    year: number
    date: string
}


/**
 * 博客数据结构。
 */
export interface Data {
    posts: Blog[]
    tags: { [key: string]: integer }
}


declare const data: Data
export { data }


export default {
    watch: patterns,
    async load(files: string[]) {
        const maps = config.rewrites['map']
        const folders = new Map<string, string>()
        const data: Data = { posts: [], tags: {} }

        // 提取文件夹名称
        for (const file of files) {
            if (!file.endsWith('/index.md')) {
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
            folders.set(
                pathlib.dirname(file).split('/').reverse()[0],
                frontmatter.title
            )
        }

        // 提取文件信息
        for (const file of files) {
            if (!file.endsWith('.md')) {
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
            if (!('created' in frontmatter)) {
                // 过滤掉文件夹（因为没有为 文件夹/index.md 配置 frontmatter.created 属性）
                continue
            }

            // 提取路径中的文件夹，转换为名称，添加到标签
            const srcPath = pathlib.relative(config.srcDir!, file).replace(/\\/g, '/')
            const tags = [
                folders.get(srcPath.split('/')[depth])!,
                ...new Set<string>(frontmatter.tags ?? [])
            ].sort((a, b) => {
                // 按照字节长度从小到大排序，是因为标签们附加在标题后面，这样排比较好看
                const lenA = Buffer.byteLength(a, 'utf8')
                const lenB = Buffer.byteLength(b, 'utf8')
                return lenA - lenB
            })

            const mappedPath = srcPath in maps ? maps[srcPath] : srcPath
            if (!mappedPath)
                continue
            const url = normalizePath(mappedPath)
                .replace(/(^|\/)index\.md$/, '$1')
                .replace(/\.md$/, config.cleanUrls ? '' : '.html')

            const changed = parse(
                frontmatter.updated ?? frontmatter.created,
                'yyyy-MM-dd HH:mm',
                new Date()
            )

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
                changed: changed.getTime(),
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
