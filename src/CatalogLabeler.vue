<script lang="ts" setup>
import { onMounted } from "vue";
import { data } from "../.vitepress/theme/posts.data.ts";


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
    [ 'Windows', { type: 'success' } ],
    [ 'Ubuntu', { type: 'success' } ],
    [ 'CentOS', { type: 'success' } ],
    [ 'PyPI', { type: 'success' } ],
    [ 'npm', { type: 'success' } ],
])
</script>

<template>
    <el-space wrap>
        <el-button v-for="(quantity, tag) in data.tags"
                   :key="tag"
                   :plain="switches.get(tag)"
                   :text="!switches.get(tag)"
                   :type="styles.has(tag) ? styles.get(tag)!.type : 'primary'"
                   round
                   @click="handleSwitch(tag)">
            {{ tag }}&nbsp;
            <el-badge :value="quantity" color="#303030"></el-badge>
        </el-button>
    </el-space>
</template>

<style lang="scss" scoped>
</style>
