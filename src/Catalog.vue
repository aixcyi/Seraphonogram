<script lang="ts" setup>
import type { integer } from "@vue/language-server";
import { format } from "date-fns";
import { reactive } from "vue";
import { data, type RawPost } from "../.vitepress/theme/posts.data.ts";


interface Post extends RawPost {
    year: number;
    date: string;
    shown: boolean;
}

const url = new URL(window.location.href);
const query = new URLSearchParams(url.search)
const queryTags = new Set<string>(query.getAll('tag'))

/**
 * 所有博客。
 */
const posts = (data as RawPost[]).map<Post>(post => {
    const posted = new Date(post.changed)
    return {
        ...post,
        year: posted.getFullYear(),
        date: format(posted, 'MM-dd'),
        shown: true,
    }
})

/**
 * 按年分组的博客。
 */
const annuals = posts.reduce((map, post) => {
    const year = post.year
    if (queryTags.size && !post.tags.filter(t => queryTags.has(t)).length)
        return map
    if (!map.has(year))
        map.set(year, [])
    map.get(year)!.push(post)
    return map
}, new Map<integer, Post[]>())

/**
 * 按标签统计的博客数量。
 */
const labels = posts.reduce((map, post) => {
    post.tags.forEach(tag => {
        map.set(tag, map.has(tag) ? (map.get(tag)! + 1) : 1)
    })
    return map
}, new Map<string, number>())

/**
 * 标签样式（少部分）。
 */
const tagsStyle = new Map<string, { type: string }>([
    // 大类
    [ '开发', { type: 'danger' } ],
    [ '测试', { type: 'danger' } ],
    [ '运维', { type: 'danger' } ],
    [ '算法', { type: 'danger' } ],
    [ '设计', { type: 'danger' } ],

    // 技术栈
    [ 'Python', { type: 'warning' } ],
    [ 'Kotlin', { type: 'warning' } ],
    [ 'Golang', { type: 'warning' } ],
    [ 'Java', { type: 'warning' } ],
    [ 'IntelliJ 插件', { type: 'warning' } ],
    [ 'datetime', { type: 'warning' } ],
    [ 'Django', { type: 'warning' } ],
    [ 'Django REST Framework', { type: 'warning' } ],
    [ 'Django OAuth Toolkit', { type: 'warning' } ],

    // 系统、工具、脚手架、依赖包
    [ 'Windows', { type: 'success' } ],
    [ 'Ubuntu', { type: 'success' } ],
    [ 'CentOS', { type: 'success' } ],
    [ 'PyPI', { type: 'success' } ],
    [ 'npm', { type: 'success' } ],
])

/**
 * 标签开关。
 */
const toggles = reactive(new Map(Array.from(labels.keys(), key => [ key, queryTags.has(key) ])))

/**
 * 处理标签点击事件。
 *
 * @param tag 标签。
 */
function handleToggle(tag: string) {
    switch (toggles.get(tag)!) {
        case true:
            query.delete('tag', tag)
            toggles.set(tag, false)
            break
        case false:
            query.append('tag', tag)
            toggles.set(tag, true)
            break
    }
    url.search = query.toString()
    window.history.pushState({}, "", url.toString())
    window.location.reload()  // TODO: 改成页面内热更新
}
</script>

<template>
    <div class="labeler">
        <el-space wrap>
            <el-check-tag v-for="[tag, quantity] in labels"
                          :key="tag"
                          :checked="toggles.get(tag)!"
                          :type="tagsStyle.has(tag) ? tagsStyle.get(tag)!.type : 'primary'"
                          @change="handleToggle(tag)">
                {{ tag }}
                <el-badge :value="quantity" color="#303030"></el-badge>
            </el-check-tag>
        </el-space>
    </div>

    <div class="catalog">
        <div v-for="[year, posts] in annuals" :key="year" class="catalog-group">
            <div class="catalog-title">
                <h2 class="catalog-year">{{ year }}</h2>
                <div class="catalog-info">
                    <span>{{ posts.length }} 篇</span>
                </div>
            </div>
            <menu class="article-list">
                <li v-for="post in posts" class="article-item">
                    <pre>{{ post.date }}</pre>
                    <a :href="post.url" class="article-link gradient-card">
                        <el-space wrap>
                            {{ post.title }}
                            <el-tag v-for="tag in post.tags" size="small" type="info">{{ tag }}</el-tag>
                        </el-space>
                    </a>
                </li>
            </menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// https://github.com/L33Z22L11/blog-v3/blob/main/app/pages/archive.vue

.labeler {
    margin-bottom: 3rem;
}

.catalog {
    margin: 1rem;
    mask: linear-gradient(#fff 50%, #fff5);
}

.catalog-group {
    margin: 1rem 0 3rem;
}

.catalog-title {
    display: flex;
    border-top: unset;

    justify-content: space-between;
    gap: 1em;
    position: sticky;
    opacity: 0.5;
    top: 0;
    font-size: min(1.5em, 5vw);
    color: transparent;
    transition: color 0.2s;

    :hover > & {
        color: var(--el-color-info);
    }

    > .catalog-year {
        margin: 0 0 -0.4em 0;
        padding: 0;
        border-top: 0;
        mask: linear-gradient(#fff 50%, transparent);
        font: 800 3em/1 "Inter", "Helvetica", "Arial", system-ui, sans-serif;
        z-index: -1;
        -webkit-text-stroke: 1px var(--el-color-info);
    }

    > .catalog-info {
        display: flex;
        justify-content: flex-end;
        column-gap: 0.5em;
        flex-wrap: wrap;
    }
}

.article-list {
    margin: unset;
    padding: unset;
}

.article-item {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin: 0.2em 0;
    transition: all 0.2s;
    animation: float-in 0.2s 0s backwards;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }

    pre {
        margin: 0;
        display: inline-block;
        opacity: 0.4;

        // 缓解移动端 Edge 字体尺寸不准导致的换行溢出
        white-space: nowrap;
        transition: opacity 0.2s;
    }

    &:hover > pre {
        opacity: 1;
    }
}

.article-link {
    text-decoration: none;
    flex-grow: 1;
    overflow: hidden;
    padding: 0.3em 0.6em;
    color: var(--vp-c-text-1);
}

.gradient-card {
    position: relative;
    border-radius: 0.5rem;
    background-color: transparent;
    transition: all 0.25s;
    z-index: 0;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 0.5rem;
        transition: all 1.5s;
        z-index: -1;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 3px;
        border-radius: calc(0.5rem - 3px);
        transition: all 2s;
        background-color: transparent;
        z-index: -1;
    }

    &:hover, &.active {
        background-position: 0;
        color: white;

        &::before {
            background: no-repeat 100% / 400%;
            background-image: linear-gradient(-45deg, #bd34fe, #47caff 40%, transparent 50%);
        }

        &::after {
            background-color: var(--vp-c-bg);
        }
    }
}
</style>
