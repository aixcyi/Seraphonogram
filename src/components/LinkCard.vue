<script lang="ts" setup>
import { getFavicon } from '@/commons.ts'
import { onMounted, ref } from 'vue'

const { href, text, note, logo } = defineProps<{ href?: string, text?: string, note?: string, logo?: string }>()
const logoSrc = ref('')

onMounted(() => {
    if (!href)
        return
    const url = new URL(href)
    const root = url.origin
    const paths = [
        logo,
        getFavicon(url),
        `${root}/favicon.ico`,
        `${root}/favicon.svg`,
        `${root}/favicon.png`,
        `${root}/favicon.jpg`,
        `${root}/favicon.jpeg`,
    ].filter(
        path => path != undefined
    )

    let cursor = 0
    const image = new Image()
    image.src = paths[cursor]
    image.onerror = () => {
        const path = paths[++cursor]
        if (path == undefined)
            return
        image.src = path
    }
    logoSrc.value = image.src
})
</script>


<template>
    <div class="LinkCard">
        <a :href="href" target="_blank">
            <p class="desc">
                <b class="title">{{ text }}</b>
                <br>
                <span v-if="note" class="note">{{ note }}</span>
                <span v-else-if="$slots.default" class="note"><slot/></span>
                <span v-else class="link">{{ href }}</span>
            </p>
            <div class="logo">
                <img :src="logoSrc" alt="logo" height="64px" onload="this.style.display='block'" width="64px"/>
            </div>
        </a>
    </div>
</template>


<style scoped>
/* https://vitepress.yiov.top/components.html#%E9%93%BE%E6%8E%A5%E5%8D%A1%E7%89%87 */

.LinkCard {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    padding: 8px 16px 8px 8px;
    transition: color 0.5s, background-color 0.5s;

    @media (max-width: 500px) {
        padding: 8px;
    }

    &:hover {
        background-color: var(--vp-c-purple-soft);
    }

    a {
        text-decoration: none;
    }
}

.LinkCard a {
    display: flex;
    align-items: center;
}

.LinkCard .desc {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
    line-height: 25px;
    margin: 16px;
    transition: color 0.5s;

    .title {
        color: var(--vp-c-text-1);
        font-size: 16px;
    }

    .note {
        color: var(--vp-c-text-2);
    }

    .link {
        color: var(--vp-c-brand-1);
    }
}

.LinkCard .logo img {
    width: 64px;
    margin: 16px;
    display: none;
    object-fit: contain;

    @media (max-width: 500px) {
        display: none !important;
    }
}
</style>
