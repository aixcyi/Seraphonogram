<script lang="ts" setup>
import type { integer } from "@vue/language-server";
import { reactive, watch } from "vue";
import { data, type Post } from "../../.vitepress/theme/posts.data.ts";
import CatalogLabeler from "./CatalogLabeler.vue";


/**
 * 按年分组的博客。
 */
const annuals = reactive(new Map<integer, Post[]>())

/**
 * 标签开关。
 */
const switches = reactive(new Map<string, boolean>())

/**
 * 按照标签过滤博客，然后按年份分组（会确保倒序）。
 */
function filterPosts(tags: Set<string>) {
    const group = new Map<integer, Post[]>()
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

watch(switches, () => {
    const _tags = new Set<string>();
    switches.forEach((v, k) => {
        if (v)
            _tags.add(k)
    })
    filterPosts(_tags)
})
</script>

<template>
    <CatalogLabeler v-model:switches="switches" class="labeler"/>

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
                            <el-space wrap>
                                <el-tag v-for="tag in post.tags" size="small" type="info">{{ tag }}</el-tag>
                            </el-space>
                        </el-space>
                    </a>
                </li>
            </menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// https://github.com/L33Z22L11/blog-v3/

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
        margin: 0 0 -0.5em 0;
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
