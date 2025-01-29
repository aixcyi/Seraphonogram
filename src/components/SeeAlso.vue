<script lang="ts" setup>
const { align, sep } = defineProps<{ sep?: string, align?: string }>()
</script>

<template>
    <p :style="{textAlign: align ?? 'end'}">
        <el-space :spacer="sep ?? ' '">
            <slot/>
        </el-space>
    </p>
</template>

<style scoped>
</style>
