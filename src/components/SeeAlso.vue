<script lang="ts" setup>
import type { VNode } from "vue";

const { align, sep } = defineProps<{ sep?: string | VNode, align?: string }>()
</script>

<template>
    <p :style="{textAlign: align ?? 'end'}">
        <el-space :spacer="sep ?? ' '" wrap>
            <slot/>
        </el-space>
    </p>
</template>

<style scoped>
</style>
