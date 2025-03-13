<script lang="ts" setup>
import { useData } from "vitepress";

const $frontmatter = useData().frontmatter
</script>

<template>
    <div v-if="$frontmatter.catalog" class="ai-columns VPDoc">
        <p class="card">
            <span class="title">捕蛇者说</span>
            <span class="colon">／</span>
            <span>围绕 Python 和 Django 及它们的生态撰写的博客。<s>Python 何尝不是一种蛇呢？</s></span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">技术漫谈</span>
            <span class="colon">／</span>
            <span>其它与技术有关的博客。Kotlin、TypeScript、Vue 虽是主力，但目前博客较少，所以归到漫谈。</span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">题解札</span>
            <span class="colon">／</span>
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
