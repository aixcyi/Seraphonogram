<script lang="ts" setup>
import { annuals, filterPosts, switches } from "@/states.ts";
import { onMounted } from "vue";
import { data } from "../../.vitepress/theme/posts.data.ts";


function toggle(tag: string) {
    switches[tag] = !switches[tag]
    filterPosts()

    const url = new URL(window.location.href)
    const query = new URLSearchParams(url.search)
    query.delete('tag')
    for (const label in switches)
        if (switches[label])
            query.append('tag', label)

    url.search = query.toString()
    window.history.pushState({}, "", url)
}

onMounted(() => {
    const tags = new Set(
        new URLSearchParams(window.location.search).getAll('tag')
    )
    for (const tag in switches)
        switches[tag] = tags.has(tag)
    filterPosts()
})
</script>


<template>
    <div class="ai-head">
        <h1>羽音 • <i>Seraphonogram</i></h1>
    </div>

    <div class="ai-tags">
        <el-space style="gap: .5rem" wrap>
            <button v-for="(qty, tag) in data.tags"
                    :key="tag"
                    :class="['tag-btn', switches[tag] ? 'selected' : '']"
                    @click="toggle(tag)">
                <span>#</span>
                <span class="tag-name">{{ tag }}</span>
                <span v-if="qty > 1" class="tag-count">{{ data.tags[tag] }}</span>
            </button>
        </el-space>
    </div>

    <hr/>

    <div class="ai-catalog">
        <div v-for="[year, posts] in annuals" :key="year" class="catalog-group">
            <div class="catalog-title">
                <h2 class="catalog-year">{{ year }}</h2>
                <div class="catalog-info">
                    <span>{{ posts.length }} 篇</span>
                </div>
            </div>
            <menu class="article-list">
                <li v-for="post in posts" class="article-item">
                    <pre class="time">{{ post.date }}</pre>
                    <a :href="post.url" class="article-link gradient-card">
                        <p class="excerpt-paragraph">{{ post.title }}</p>
                        <p class="excerpt-paragraph">
                            <el-text type="info" v-html="post.excerpt"></el-text>
                        </p>
                    </a>
                    <el-tag class="column" type="info">{{ post.column }}</el-tag>
                </li>
            </menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// https://github.com/L33Z22L11/blog-v3/

.ai-head {
    text-align: center;
}

.ai-tags {
    margin: 3rem 0;

    .tag-btn {
        padding: 1px 12px;
        font-size: 14px;
        color: var(--vp-c-text-3);
        border: 2px solid transparent;
        border-radius: 4px;
        background-color: var(--vp-c-bg-alt);

        &:hover {
            background-color: var(--vp-c-text-3);
        }
    }

    .tag-btn.selected {
        background-color: var(--vp-c-text-3);

        &:hover {
            border: 2px solid var(--vp-c-text-3);
            background-color: var(--vp-c-bg-alt);
        }
    }

    .tag-name {
        color: var(--vp-c-text-1);
    }

    .tag-count {
        margin-left: .25rem;
    }
}

.ai-catalog {
    margin: 3rem 1rem;
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
    gap: 0.7em;
    margin: 0.2em 0;
    transition: all 0.2s;
    animation: float-in 0.2s 0s backwards;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }

    .column {
        @media (max-width: 768px) {
            display: none;
        }
        @media (min-width: 768px) {
            display: flex;
        }
    }

    .time {
        // 缓解移动端 Edge 字体尺寸不准导致的换行溢出
        white-space: nowrap;
        transition: opacity 0.2s;

        margin: 0;
        opacity: 0.4;

        @media (max-width: 500px) {
            display: none;
        }
        @media (min-width: 500px) {
            display: inline-block;
        }
    }

    &:hover > .time {
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

.excerpt-paragraph {
    margin: 0;
    line-height: 24px;
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

    @media (min-width: 768px) {
        &:hover, &.active {
            background-position: 0;
            color: var(--vp-c-text-1);

            &::before {
                background: no-repeat 100% / 400%;
                background-image: linear-gradient(-15deg, #bd34fe, #47caff 40%, transparent 50%);
            }

            &::after {
                background-color: var(--vp-c-bg);
            }
        }
    }
}
</style>
