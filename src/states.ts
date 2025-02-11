import type { integer } from "@vue/language-server";
import { reactive } from "vue";
import { type Blog, data } from "../.vitepress/theme/blogs.data.ts";


/**
 * 标签开关。
 */
export const switches = reactive(
    Object.keys(data.tags).reduce(
        (acc, key) => {
            acc[key] = false
            return acc
        },
        {} as { [k: string]: boolean }
    )
)


/**
 * 按年分组的博客。
 */
export const annuals = reactive(new Map<integer, Blog[]>())


/**
 * 过滤（以“或”连接）包含的特定标签的博客，然后按年份分组。会确保年份倒序、博客按最后修改时间倒序。
 */
export function filterBlogs() {
    const group = new Map<integer, Blog[]>()
    const tags = new Set<string>(
        Object.entries(switches).filter(pair => pair[1]).map(pair => pair[0])
    )
    data.posts.forEach(blog => {
        const year = blog.year
        if (tags.size && !blog.tags.filter(t => tags.has(t)).length)
            return
        if (!group.has(year))
            group.set(year, [])
        group.get(year)!.push(blog)
    })
    annuals.clear()
    for (const year of [ ...group.keys() ].sort().reverse()) {
        annuals.set(year, group.get(year)!.sort((a, b) => b.changed - a.changed))
    }
}
