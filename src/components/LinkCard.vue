<script lang="ts" setup>
const { href, text, note, logo } = defineProps<{ href?: string, text?: string, note?: string, logo?: string }>()
const logoSrc = !logo && href ? (new URL(href).origin + '/favicon.ico') : logo
</script>


<template>
    <div class="LinkCard">
        <a :href="href" target="_blank">
            <p class="note">
                {{ text }}
                <br>
                <span v-if="note">{{ note }}</span>
                <span v-else class="VirtualLink">{{ href }}</span>
            </p>
            <div class="logo">
                <img :src="logoSrc" alt="logo" height="70px" width="70px"/>
            </div>
        </a>
    </div>
</template>


<style scoped>
/* https://vitepress.yiov.top/components.html#%E9%93%BE%E6%8E%A5%E5%8D%A1%E7%89%87 */

/* 卡片背景 */
.LinkCard {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    padding: 8px 16px 8px 8px;
    transition: color 0.5s, background-color 0.5s;
    margin-top: 15px;
}

/* 卡片鼠标悬停 */
.LinkCard:hover {
    background-color: var(--vp-c-purple-soft);
}

/* 链接样式 */
.LinkCard a {
    display: flex;
    align-items: center;
}

/* 描述链接文字 */
.LinkCard .note {
    flex: 1;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    color: var(--vp-c-text-1);
    margin: 0 0 0 16px;
    transition: color 0.5s;
}

/* 描述链接文字2 */
.LinkCard .note span {
    font-size: 14px;
}

/* logo图片 */
.LinkCard .logo img {
    width: 64px;
    margin: 16px;
    object-fit: contain;
}

/* 链接下划线去除 */
.VPDoc a {
    text-decoration: none;
}

.VirtualLink {
    color: var(--vp-c-brand-1);
}
</style>
