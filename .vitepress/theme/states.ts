import type { integer } from '@vue/language-server'
import { reactive } from 'vue'
import { data, type Post } from './pages.data'


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
export const annuals = reactive(new Map<integer, Post[]>())


/**
 * 过滤（以“或”连接）包含的特定标签的博客，然后按年份分组。会确保年份倒序、博客按最后修改时间倒序。
 */
export function filterPosts() {
    const group = new Map<integer, Post[]>()
    const tags = new Set<string>(
        Object.entries(switches).filter(pair => pair[1]).map(pair => pair[0])
    )
    data.posts.forEach(post => {
        const year = post.year
        if (tags.size && !post.tags.filter(t => tags.has(t)).length)
            return
        if (!group.has(year))
            group.set(year, [])
        group.get(year)!.push(post)
    })
    annuals.clear()
    for (const year of [ ...group.keys() ].sort().reverse()) {
        annuals.set(year, group.get(year)!.sort((a, b) => b.changed - a.changed))
    }
}
