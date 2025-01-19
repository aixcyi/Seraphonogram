<script lang="ts" setup>
import { onMounted } from "vue";
import { data } from "../.vitepress/theme/posts.data.ts";


/**
 * 标签的预设样式。
 */
const styles = new Map<string, { type: string }>([
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
    [ 'Windows', { type: 'primary' } ],
    [ 'Ubuntu', { type: 'primary' } ],
    [ 'CentOS', { type: 'primary' } ],
    [ 'PyPI', { type: 'primary' } ],
    [ 'npm', { type: 'primary' } ],

    // 其它特定主题
    [ 'IntelliJ IDE', { type: 'success' } ],
    [ 'LeetCode', { type: 'success' } ],
    [ '蓝桥杯', { type: 'success' } ],
    [ 'NOIP', { type: 'success' } ],
    [ '微信', { type: 'success' } ],
])

/**
 * 标签开关。
 */
const switches = defineModel<Map<string, boolean>>('switches', { required: true })

/**
 * 处理标签点击事件。
 */
function handleSwitch(tagName: string) {
    const _switches = switches.value as Map<string, boolean>
    const url = new URL(window.location.href)
    const query = new URLSearchParams(url.search)

    query.delete('tag')
    _switches
        .set(tagName, !_switches.get(tagName)!)
        .forEach((switched, tag) => switched ? query.append('tag', tag) : {})

    url.search = query.toString()
    window.history.pushState({}, "", url)
}

onMounted(() => {
    const _switches = switches.value as Map<string, boolean>
    const queryTags = new Set(new URLSearchParams(window.location.search).getAll('tag'))

    for (const _tag in data.tags) {
        _switches.set(_tag, queryTags.has(_tag))
    }
})
</script>

<template>
    <el-space wrap>
        <el-button v-for="(quantity, tag) in data.tags"
                   :key="tag"
                   :plain="switches.get(tag)"
                   :text="!switches.get(tag)"
                   :type="styles.has(tag) ? styles.get(tag)!.type : 'info'"
                   round
                   @click="handleSwitch(tag)">
            {{ tag }}&nbsp;
            <el-badge :value="quantity" color="#303030"></el-badge>
        </el-button>
    </el-space>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
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
    --el-button-text-color: #47caff;
    --el-button-bg-color: #174354;
    --el-button-border-color: #38A0C9;
    --el-button-hover-text-color: var(--vp-c-bg);
    --el-button-hover-bg-color: #47caff;
    --el-button-hover-border-color: #47caff;
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
    --el-button-text-color: var(--vp-c-red-1);
    --el-button-bg-color: var(--vp-c-red-soft);
    --el-button-border-color: var(--vp-c-red-3);
    --el-button-hover-text-color: var(--vp-c-bg);
    --el-button-hover-bg-color: var(--vp-c-red-1);
    --el-button-hover-border-color: var(--vp-c-red-1);
    --el-button-active-text-color: var(--vp-c-bg);
}
</style>
