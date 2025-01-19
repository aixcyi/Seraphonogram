import type { integer } from "@vue/language-server";
import { format, parse } from "date-fns";
import matter from "gray-matter";
import * as fs from "node:fs";
import pathlib from "path";
import { normalizePath } from "vite";
import { type DefaultTheme, type UserConfig } from "vitepress";


// @ts-ignore
const config = global.VITEPRESS_CONFIG as UserConfig<DefaultTheme.Config>
if (!config) {
    throw new Error(
        "content loader invoked without an active vitepress process, or before vitepress config is resolved."
    )
}

const blogsPattern = [
    'summary/**/*.md',
    'record/**/*.md',
    'thinking/**/*.md',
    'problem/**/*.md',
].map((p) =>
    normalizePath(pathlib.join(config.srcDir!, p))
)

export interface Post {
    url: string
    title: string
    changed: number
    tags: string[]
    year: number
    date: string
}

export interface Data {
    posts: Post[]
    tags: { [key: string]: integer }
}

declare const data: Data
export { data }

export default {
    watch: blogsPattern,
    async load(files: string[]) {
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
            if (!file.endsWith('.md') || file.endsWith('/index.md')) {
                // 过滤掉文件夹（因为没有为 文件夹/index.md 配置 frontmatter.created 属性）
                continue
            }
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))

            // 提取路径中的文件夹，转换为名称，添加到标签
            const srcPath = pathlib.relative(config.srcDir!, file)
            const tags = [
                folders.get(srcPath.split(pathlib.sep)[0])!,
                ...new Set<string>(frontmatter.tags ?? [])
            ].sort((a, b) => {
                // 按照字节长度从小到大排序，是因为标签们附加在标题后面，这样排比较好看
                const lenA = Buffer.byteLength(a, 'utf8')
                const lenB = Buffer.byteLength(b, 'utf8')
                return lenA - lenB
            })

            const url = normalizePath(srcPath)
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
        return data
    }
}
