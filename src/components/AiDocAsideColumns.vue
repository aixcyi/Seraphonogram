<script lang="ts" setup>
import { useData } from "vitepress";

const $frontmatter = useData().frontmatter
</script>

<template>
    <div v-if="$frontmatter.catalog" class="ai-columns VPDoc">
        <p class="card">
            <span class="title">捕蛇者说</span>
            <span class="colon"> · </span>
            <span>围绕 Python 和 Django 及它们的生态撰写的博客。<s>Python 何尝不是一种蛇呢？</s></span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">黑洞视界面</span>
            <span class="colon"> · </span>
            <span>用户可视的相关技术的博客，并不局限于前端，也包括插件、UI、UX 等。<s>听说黑洞的事件视界外能看到自己的后背，超有意思。</s></span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">技术漫谈</span>
            <span class="colon"> · </span>
            <span>其它与技术有关的博客。一些是因为技术栈不常用，比如 Java 和 Golang，一些是本身博客比较少，比如命令行。</span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">题解札</span>
            <span class="colon"> · </span>
            <span>在各个渠道的 Online Judge 刷题时的解题思路、解题方法，以及相关代码。<s>有点菜，别见怪。</s></span>
        </p>
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
