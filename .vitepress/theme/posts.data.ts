import { pinyin } from "@napi-rs/pinyin";
import type { integer } from "@vue/language-server";
import { format, parse } from "date-fns";
import matter from "gray-matter";
import * as fs from "node:fs";
import pathlib from "path";
import { normalizePath } from "vite";
import type { SiteConfig } from "vitepress";


const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG

const comparePinyin = (a: string, b: string) => pinyin(a).join('').localeCompare(pinyin(b).join(''))


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
 * 标签分组。
 */
const groups: { [title: string]: string[] } = {
    '领域': [ '开发', '测试', '运维', '算法', '设计' ],
    '语言': [ 'Python', 'Kotlin', 'Golang', 'Java', '易语言' ],
    '系统、工具、集成开发环境': [ 'Windows', 'Ubuntu', 'CentOS', 'PyCharm', 'IntelliJ IDE', '宝塔面板' ],
    '包、库、框架': [
        'datetime', 'Django', 'Django REST Framework', 'Django OAuth Toolkit', 'Django Channels',
    ],
    '技术栈': [
        'pip', 'conda', 'virtualenv', 'venv', 'npm', 'IntelliJ 插件',
    ],
    '程序开发术语': [
        '对象', '浮点数', '格式化', '国际化', '类', '类型', '类型标注', '浅拷贝', '生成器', '推导式',
        '序列化', '运算', '转型', '标准多项集', '视图', '文件IO', '字节序', '组件对象模型 COM', '语法',
        '十进制小数',
    ].sort(comparePinyin),
    '运维部署': [
        '兼容', '镜像', '控制台', '命令行', '配置', '虚拟环境',
    ].sort(comparePinyin),
}


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
    tags: { [key: string]: integer }

    /** 标签分组 **/
    groups: { [key: string]: string[] }
}


declare const data: Data
export { data }


export default {
    watch: patterns,
    async load(files: string[]) {
        const maps = config.rewrites['map']
        const data: Data = { posts: [], tags: {}, groups }

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
            const { data: frontmatter } = matter(fs.readFileSync(file, 'utf-8'))
            if (!('publishAt' in frontmatter)) {
                // 过滤掉文件夹（因为没有为 文件夹/index.md 配置 frontmatter.publishAt 属性）
                continue
            }

            // 提取路径中的文件夹，转换为名称，添加到标签
            const srcPath = pathlib.relative(config.srcDir!, file).replace(/\\/g, '/')
            // 下标表示src深度：./src/* => 0，./src/posts/* => 1，以此类推。
            const column = folders.get(srcPath.split('/')[1])?.title
            const tags = [ ...new Set([ column, ...(frontmatter.tags ?? []) ]) ].sort((a, b) => {
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
                frontmatter.reviseAt ?? frontmatter.publishAt,
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
                excerpt: frontmatter.excerpt,
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

        // 提取栏目名称
        data.groups = {
            '栏目': [ ...new Set(data.posts.map(p => p.column)) ].sort(comparePinyin),
            ...data.groups,
        }

        // 统一存放未分组的标签
        data.groups['其它'] = []
        const groupedTags = new Set(Object.values(data.groups).flat())
        for (const label of labels) {
            if (groupedTags.has(label))
                continue
            data.groups['其它'].push(label)
        }

        return data
    }
}
