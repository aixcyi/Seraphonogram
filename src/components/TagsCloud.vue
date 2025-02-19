<script lang="ts" setup>
import { filterPosts, switches } from "@/states.ts";
import { CaretRight } from "@element-plus/icons-vue";
import { useData } from "vitepress";
import { data } from "../../.vitepress/theme/posts.data.ts";


const $frontmatter = useData().frontmatter

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
</script>

<template>
    <template v-if="$frontmatter.tagsCloud">
        <div class="outline-title">标签分组</div>
        <el-collapse>
            <el-collapse-item v-for="title in Object.keys(data.groups)"
                              :icon="CaretRight"
                              :name="title"
                              :title="title"
                              class="collapse-item">
                <el-space :size="0" wrap>
                    <el-button v-for="tag in data.groups[title]"
                               :key="tag"
                               :plain="switches[tag]"
                               :text="!switches[tag]"
                               round
                               type="warning"
                               @click="toggle(tag)">
                        {{ tag }}&nbsp;
                        <el-badge v-if="data.tags[tag] > 1"
                                  :badge-style="{color:'var(--vp-c-text-1)', backgroundColor:'var(--vp-c-gray-3)'}"
                                  :value="data.tags[tag]"></el-badge>
                    </el-button>
                </el-space>
            </el-collapse-item>
        </el-collapse>
    </template>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.outline-title {
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.collapse-item > :deep(.el-collapse-item__header) {
    --el-color-primary: var(--vp-c-indigo-1);
}

.el-button, .el-button.is-round {
    padding: 4px 11px;
    margin: 4px;
}

.el-button--info.is-link, .el-button--info.is-plain, .el-button--info.is-text {
    --el-button-text-color: #70808F;
    --el-button-bg-color: var(--vp-c-gray-soft);
    --el-button-border-color: var(--vp-c-gray-1);
    --el-button-hover-text-color: white;
    --el-button-hover-bg-color: var(--vp-c-gray-1);
    --el-button-hover-border-color: var(--vp-c-gray-1);
    --el-button-active-text-color: white;
}

.el-button--primary.is-link, .el-button--primary.is-plain, .el-button--primary.is-text {
    --el-button-text-color: var(--vp-c-purple-1);
    --el-button-bg-color: var(--vp-c-purple-soft);
    --el-button-border-color: var(--vp-c-purple-3);
    --el-button-hover-text-color: var(--vp-c-bg);
    --el-button-hover-bg-color: var(--vp-c-purple-1);
    --el-button-hover-border-color: var(--vp-c-purple-1);
    --el-button-active-text-color: var(--vp-c-bg);
}

.el-button--success.is-link, .el-button--success.is-plain, .el-button--success.is-text {
    --el-button-text-color: var(--vp-c-green-1);
    --el-button-bg-color: var(--vp-c-green-soft);
    --el-button-border-color: var(--vp-c-green-3);
    --el-button-hover-text-color: var(--vp-c-bg);
    --el-button-hover-bg-color: var(--vp-c-green-1);
    --el-button-hover-border-color: var(--vp-c-green-1);
    --el-button-active-text-color: var(--vp-c-bg);
}

.el-button--warning.is-link, .el-button--warning.is-plain, .el-button--warning.is-text {
    --el-button-text-color: var(--vp-c-yellow-1);
    --el-button-bg-color: var(--vp-c-yellow-soft);
    --el-button-border-color: var(--vp-c-yellow-3);
    --el-button-hover-text-color: var(--vp-c-bg);
    --el-button-hover-bg-color: var(--vp-c-yellow-1);
    --el-button-hover-border-color: var(--vp-c-yellow-1);
    --el-button-active-text-color: var(--vp-c-bg);
}

.el-button--danger.is-link, .el-button--danger.is-plain, .el-button--danger.is-text {
    --el-button-text-color: var(--vp-c-danger-1);
    --el-button-bg-color: var(--vp-c-danger-soft);
    --el-button-border-color: var(--vp-c-danger-3);
    --el-button-hover-text-color: var(--vp-c-bg);
    --el-button-hover-bg-color: var(--vp-c-danger-1);
    --el-button-hover-border-color: var(--vp-c-danger-1);
    --el-button-active-text-color: var(--vp-c-bg);
}
</style>
