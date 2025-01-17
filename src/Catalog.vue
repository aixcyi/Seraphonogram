<script lang="ts" setup>
import type { integer } from "@vue/language-server";
import { format } from "date-fns";
import { reactive } from "vue";
import { data, type RawPost } from "../.vitepress/theme/posts.data.ts";


interface Content extends RawPost {
    year: number;
    date: string;
    shown: boolean;
}

const tags = new Map<string, { type: string }>([
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

const posts = (data as RawPost[]).map<Content>(post => {
    const posted = new Date(post.changed)
    return {
        ...post,
        year: posted.getFullYear(),
        date: format(posted, 'MM-dd'),
        shown: true,
    }
})

const annuals = posts.reduce((map, post) => {
    const year = post.year
    if (!map.has(year)) {
        map.set(year, [])
    }
    map.get(year)!.push(post)
    return map;
}, new Map<integer, Content[]>())

const labels = posts.reduce((map, post) => {
    post.tags.forEach(tag => {
        if (!map.has(tag)) {
            map.set(tag, []);
        }
        map.get(tag)!.push(post);
    });
    return map;
}, new Map<string, Content[]>());

const toggles = reactive(new Map(Array.from(labels.keys(), key => [ key, false ])))

function handleToggle(tag: string) {
    toggles.set(tag, !toggles.get(tag)!)
}
</script>

<template>
    <div class="labeler">
        <el-space wrap>
            <el-check-tag v-for="[tag, posts] in labels"
                          :key="tag"
                          :checked="toggles.get(tag)!"
                          :type="tags.has(tag) ? tags.get(tag)!.type : 'primary'"
                          @change="handleToggle(tag)">
                {{ tag }}
                <el-badge :value="posts.length" color="#303030"></el-badge>
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
            <menu class="catalog-list">
                <li v-for="post in posts" class="catalog-item">
                    <pre class="catalog-date">{{ post.date }}</pre>
                    <a :href="post.url" class="catalog-link">{{ post.title }}</a>
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

.catalog-list {
    margin: unset;
    padding: unset;
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
        margin: 0 0 -0.3em 0;
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

.catalog-item {
    list-style: none;
    align-items: center;
    animation: float-in .2s 0s backwards;
    display: flex;
    gap: .5em;
    margin: .2em 0;
    transition: all .2s;
}

.catalog-date {
    color: var(--el-color-info);
    margin: unset;
    display: flex;

    :hover > & {
        color: inherit;
    }
}

.catalog-link {
    color: lightgray;
    text-decoration: none;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    padding: .3em .6em;

    :hover > & {
        color: white;
    }
}
</style>
