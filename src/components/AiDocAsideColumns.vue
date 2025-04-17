<script lang="ts" setup>
import { useData } from 'vitepress'

const $frontmatter = useData().frontmatter
</script>

<template>
    <div v-if="$frontmatter.catalog" class="ai-columns VPDoc">
        <p class="card">
            <span class="title">捕蛇者说</span>
            <span class="colon"> · </span>
            <span>围绕 Python 及生态（包括各种库与框架）撰写的博客。<s>Python 何尝不是一种蛇呢？</s></span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">黑洞视界面</span>
            <span class="colon"> · </span>
            <span>用户可视的相关技术的博客，并不局限于前端，也包括插件、UI、UX 等。<s>听说黑洞的事件视界外能看到自己的后背，超有意思。</s></span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">题解札</span>
            <span class="colon"> · </span>
            <span>在各个渠道的 Online Judge 刷题时的解题思路、解题方法，以及相关代码。<s>有点菜，别见怪。</s></span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">技术漫谈</span>
            <span class="colon"> · </span>
            <span>其它零零散散、与技术相关的博客，比如命令行、Golang、注册表，以及一些教程。</span>
        </p>
        <hr/>
        <p class="card">
            <span class="title">狼人生存爪迹</span>
            <span class="colon"> · </span>
            <span>来自「地球 Online」老玩家的经验，记述在残酷的地球 Online 生存中苟活的雪泥鸿爪。<s>真是用爪子记的！</s></span>
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
