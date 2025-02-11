<script lang="ts" setup>
import { annuals, filterBlogs, switches } from "@/states.ts";
import { onMounted } from "vue";
import CatalogFilter from "./CatalogFilter.vue";

onMounted(() => {
    const tags = new Set(
        new URLSearchParams(window.location.search).getAll('tag')
    )
    for (const tag in switches)
        switches[tag] = tags.has(tag)
    filterBlogs()
})
</script>

<template>
    <CatalogFilter class="filter"/>

    <div class="catalog">
        <div v-for="[year, blogs] in annuals" :key="year" class="catalog-group">
            <div class="catalog-title">
                <h2 class="catalog-year">{{ year }}</h2>
                <div class="catalog-info">
                    <span>{{ blogs.length }} 篇</span>
                </div>
            </div>
            <menu class="article-list">
                <li v-for="blog in blogs" class="article-item">
                    <pre>{{ blog.date }}</pre>
                    <a :href="blog.url" class="article-link gradient-card">
                        <el-space class="article-link-inner" wrap>
                            {{ blog.title }}
                            <el-tag v-for="tag in blog.tags" size="small" type="info">{{ tag }}</el-tag>
                        </el-space>
                    </a>
                </li>
            </menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// https://github.com/L33Z22L11/blog-v3/

.filter {
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
    gap: 0.7em;
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

    & > .article-link-inner {
        gap: 2px 8px !important;
    }
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
</style>
