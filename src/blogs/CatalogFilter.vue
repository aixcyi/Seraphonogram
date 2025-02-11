<script lang="ts" setup>
import { filterBlogs, switches } from "@/states.ts";
import { data } from "../../.vitepress/theme/blogs.data.ts";


/**
 * 标签的预设样式。
 */
const styles = new Map<string, { type: string }>([
    // 领域
    [ '开发', { type: 'danger' } ],
    [ '测试', { type: 'danger' } ],
    [ '运维', { type: 'danger' } ],
    [ '算法', { type: 'danger' } ],
    [ '设计', { type: 'danger' } ],

    // 大类
    [ '总结／摘要', { type: 'primary' } ],
    [ '经验／踩坑／备忘', { type: 'primary' } ],
    [ '思考／碎碎念', { type: 'primary' } ],
    [ '题解集', { type: 'primary' } ],

    // 技术栈
    [ 'Python', { type: 'warning' } ],
    [ 'Kotlin', { type: 'warning' } ],
    [ 'Golang', { type: 'warning' } ],
    [ 'Java', { type: 'warning' } ],
    [ '易语言', { type: 'warning' } ],
    [ 'IntelliJ 插件', { type: 'warning' } ],
    [ 'datetime', { type: 'warning' } ],
    [ 'Django', { type: 'warning' } ],
    [ 'Django REST Framework', { type: 'warning' } ],
    [ 'Django OAuth Toolkit', { type: 'warning' } ],
    [ 'pip', { type: 'warning' } ],
    [ 'conda', { type: 'warning' } ],
    [ 'virtualenv', { type: 'warning' } ],
    [ 'venv', { type: 'warning' } ],
    [ 'npm', { type: 'warning' } ],

    // 其它特定主题
    [ 'Windows', { type: 'success' } ],
    [ 'Ubuntu', { type: 'success' } ],
    [ 'CentOS', { type: 'success' } ],
    [ 'IntelliJ IDE', { type: 'success' } ],
    [ 'PyCharm', { type: 'success' } ],
    [ 'LeetCode', { type: 'success' } ],
    [ '蓝桥杯', { type: 'success' } ],
    [ 'NOIP', { type: 'success' } ],
    [ '微信', { type: 'success' } ],
    [ 'win32api', { type: 'success' } ],
    [ '组件对象模型 COM', { type: 'success' } ],
    [ '宝塔面板', { type: 'success' } ],
    [ '注册表', { type: 'success' } ],
])


function toggle(tag: string) {
    switches[tag] = !switches[tag]
    filterBlogs()

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
    <el-space wrap>
        <el-button v-for="tag in Object.keys(switches)"
                   :key="tag"
                   :plain="switches[tag]"
                   :text="!switches[tag]"
                   :type="styles.has(tag) ? styles.get(tag)!.type : 'info'"
                   round
                   @click="toggle(tag)">
            {{ tag }}&nbsp;
            <el-badge v-if="data.tags[tag] > 1"
                      :badge-style="{color:'var(--vp-c-text-1)', backgroundColor:'var(--vp-c-gray-3)'}"
                      :value="data.tags[tag]"></el-badge>
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
