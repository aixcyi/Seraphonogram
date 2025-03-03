<script lang="ts" setup>
import { favicons } from "@/commons.ts";

const { href, text, note, logo } = defineProps<{ href?: string, text?: string, note?: string, logo?: string }>()
const image = new Image()
if (href) {
    let cursor = 0
    const root = new URL(href).origin
    const paths = [
        ...(logo ? [ logo ] : []),
        ...(root in favicons ? [ favicons[root] ] : []),
        `${root}/favicon.ico`,
        `${root}/favicon.svg`,
        `${root}/favicon.png`,
        `${root}/favicon.jpg`,
        `${root}/favicon.jpeg`,
        `${root}/icons/favicon.ico`,
        `${root}/images/favicon.ico`,
        `${root}/icon/favicon.ico`,
        `${root}/image/favicon.ico`,
    ]
    image.src = paths[cursor]
    image.onerror = () => {
        if (cursor >= paths.length)
            return
        image.src = paths[++cursor]
    }
}
</script>


<template>
    <div class="LinkCard">
        <a :href="href" target="_blank">
            <p class="desc">
                <b class="title">{{ text }}</b>
                <br>
                <span v-if="note" class="note">{{ note }}</span>
                <span v-else class="link">{{ href }}</span>
            </p>
            <div class="logo">
                <img :src="image.src" alt="logo" height="64px" onerror="this.style.display='none'" width="64px"/>
            </div>
        </a>
    </div>
</template>


<style lang="scss" scoped>
/* https://vitepress.yiov.top/components.html#%E9%93%BE%E6%8E%A5%E5%8D%A1%E7%89%87 */

.LinkCard {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    padding: 8px 16px 8px 8px;
    transition: color 0.5s, background-color 0.5s;
    margin-top: 15px;

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
    object-fit: contain;

    @media (max-width: 500px) {
        display: none;
    }
}
</style>
