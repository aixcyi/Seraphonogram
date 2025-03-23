<script lang="ts" setup>
import { useData } from "vitepress";

const { page, frontmatter: $frontmatter } = useData()
</script>


<template>
    <div v-if="!page.relativePath.endsWith('index.md') && !$frontmatter.hideRevisionInfo" class="vp-doc">
        <div v-if="$frontmatter.tags" class="ai-tags">
            <el-space style="gap: .5rem" wrap>
                <a v-for="tag in $frontmatter.tags" :href="`/posts/?tag=${tag}`" class="tag">
                    <span>#</span>
                    <span class="tag-name">{{ tag }}</span>
                </a>
            </el-space>
        </div>
        <h1>{{ $frontmatter.title }}</h1>
        <div v-if="$frontmatter.excerpt" class="ai-excerpt" v-html="$frontmatter.excerpt"/>
    </div>
</template>


<style lang="scss" scoped>
.ai-excerpt {
    color: var(--el-color-info);
}

.ai-tags {
    margin-bottom: .75rem;

    .tag {
        padding: 1px 12px;
        font-size: 14px;
        text-decoration: unset;
        color: var(--vp-c-text-3);
        border: 2px solid transparent;
        border-radius: 4px;
        background-color: var(--vp-c-bg-alt);

        &:hover {
            background-color: var(--vp-c-text-3);
        }
    }

    .tag.selected {
        background-color: var(--vp-c-text-3);

        &:hover {
            border: 2px solid var(--vp-c-text-3);
            background-color: var(--vp-c-bg-alt);
        }
    }

    .tag-name {
        color: var(--vp-c-text-1);
    }
}
</style>
