<script lang="ts" setup>
import { data } from '%/theme/pages.data.ts'
import { ElDivider } from 'element-plus'
import { useData } from 'vitepress'
import { h } from 'vue'

const $frontmatter = useData().frontmatter
const spacer = h(ElDivider, { style: 'margin: 0 32px; width: unset' })
</script>

<template>
    <div v-if="$frontmatter.catalog" class="ai-columns VPDoc">
        <el-space :spacer="spacer" direction="vertical">
            <p v-for="column in data.columns" class="card">
                <span class="title">{{ column.title }}</span>
                <span class="colon"> · </span>
                <span v-html="column.excerpt"></span>
            </p>
        </el-space>
    </div>
</template>

<style scoped>
.card {
    padding: .5rem .8rem;
    font-size: 14px;
    border-radius: 8px;
}

.card {
    color: var(--el-color-info);
}

.title {
    color: var(--vp-c-text-1);
}

.colon {
    padding: 0 .25rem;
}

hr {
    border: none;
    border-top: 1px solid var(--vp-c-divider);
}
</style>
