<script lang="ts" setup>
import { useData } from "vitepress";

const $frontmatter = useData().frontmatter.value
</script>

<template>
    <el-space spacer=" " wrap>
        <el-text type="info">标签</el-text>
        <!-- TODO: 实现搜索链接 -->
        <a v-for="tag in $frontmatter.tags" href="">{{ tag }}</a>
    </el-space>
</template>

<style scoped>
a {
    color: var(--el-color-info);
    position: relative;
    text-decoration: none;
    transition: all 0.3s ease-in-out 0.15s;
}

a:before {
    content: "";
    position: absolute;
    top: -3px;
    right: -3px;
    width: 0;
    height: 2px;
    transition: all 0.3s ease-in-out 0.15s;
    background-color: var(--vp-c-brand-2);
}

a:hover:before {
    width: calc(100% + 6px);
}

a:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: -3px;
    width: 0;
    height: 2px;
    transition: all 0.3s ease-in-out 0.15s;
    background-color: var(--vp-c-brand-2);
}

a:hover:after {
    width: calc(100% + 6px);
}
</style>
