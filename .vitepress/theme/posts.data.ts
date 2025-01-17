import { parse } from "date-fns";
import { createContentLoader } from "vitepress";


const blogsPattern = [
    'summary/**/*.md',
    'record/**/*.md',
    'thinking/**/*.md',
    'problem/**/*.md',
]

export interface RawPost {
    url: string;
    title: string;
    changed: number;
    tags: string[];
}

export default createContentLoader(blogsPattern, {
    excerpt: true,
    transform(contents): RawPost[] {
        return contents
            .filter(a => 'created' in a.frontmatter)
            .map<RawPost>(
                ({ url, frontmatter }) => ({
                    url,
                    title: frontmatter.title,
                    changed: parse(frontmatter.updated ?? frontmatter.created, "yyyy-MM-dd HH:mm", new Date()).getTime(),
                    tags: [ ...new Set<string>(frontmatter.tags ?? []) ],
                })
            )
            .sort((a, b) => b.changed - a.changed)
    }
})
