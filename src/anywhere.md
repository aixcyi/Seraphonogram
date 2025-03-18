---
title: 随便逛逛
lang: zh-CN
prev: false
next: false
aside: false
outline: false
---

<script setup lang="ts">
import { data } from "../.vitepress/theme/pages.data.ts";

window.location.replace(data.pages[Math.floor(Math.random() * data.pages.length)].url)
</script>
