import type { integer } from "@vue/language-server";
import { format, parse } from "date-fns";
import { createContentLoader } from "vitepress";


const blogsPattern = [
    'summary/**/*.md',
    'record/**/*.md',
    'thinking/**/*.md',
    'problem/**/*.md',
]

export interface Post {
    url: string;
    title: string;
    changed: number;
    tags: string[];
    year: number;
    date: string;
}

export interface Data {
    posts: Post[];
    tags: { [key: string]: integer };
}

declare const data: Data
export { data }

export default createContentLoader(blogsPattern, {
    excerpt: true,
    transform(contents): Data {
        const posts = contents
            .filter(a => 'created' in a.frontmatter)
            .map(
                ({ url, frontmatter }) => ({
                    url,
                    title: frontmatter.title,
                    changed: parse(frontmatter.updated ?? frontmatter.created, "yyyy-MM-dd HH:mm", new Date()),
                    tags: [ ...new Set<string>(frontmatter.tags ?? []) ],
                })
            )
            .sort((a, b) => +b.changed - +a.changed)
            .map<Post>(raw => ({
                ...raw,
                changed: raw.changed.getTime(),
                year: raw.changed.getFullYear(),
                date: format(raw.changed, 'MM-dd'),
            }))

        const tags: { [key: string]: number } = {}
        posts.forEach(post => {
            post.tags.forEach(tag => {
                if (!(tag in tags)) tags[tag] = 0
                tags[tag]++
            })
        })

        return { posts, tags }
    }
})
