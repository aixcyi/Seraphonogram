<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const props = defineProps<{ href: string, multi?: boolean }>()
</script>

<template>
    <template v-if="multi">
        <a :href="props.href" style="display: inline; text-decoration: none" target="_blank">
            <span><slot/></span>
            <Icon icon="ep:top-right" style="display: inline; vertical-align: middle; margin-left: 5px"/>
        </a>
    </template>
    <template v-else>
        <p style="text-align: end">
            <a :href="props.href" style="display: inline; text-decoration: none" target="_blank">
                <span><slot/></span>
                <Icon icon="ep:top-right" style="display: inline; vertical-align: middle; margin-left: 5px"/>
            </a>
        </p>
    </template>
</template>

<style scoped>
</style>
