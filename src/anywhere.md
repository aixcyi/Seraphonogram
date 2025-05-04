---
title: 随便逛逛
lang: zh-CN
prev: false
next: false
aside: false
outline: false
hideRevisionInfo: true
---

<script setup lang="ts">
import { onMounted } from 'vue' 
import { data } from '@/theme/pages.data.ts'

onMounted(() => {
    window.location.replace(data.pages[
        window.crypto.getRandomValues(new Uint32Array(1))[0] % data.pages.length
    ].url)
})
</script>
