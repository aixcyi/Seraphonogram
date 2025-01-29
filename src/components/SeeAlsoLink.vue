<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const { href, pure } = defineProps<{ href: string, pure?: boolean }>()
</script>

<template>
    <a :href="href" class="see-also-link" target="_blank">
        <span><slot/></span>
        <Icon v-if="!pure" class="see-also-icon" icon="ep:top-right"/>
    </a>
</template>

<style scoped>
.see-also-link {
    display: inline;
    text-decoration: none;
}

.see-also-icon {
    display: inline;
    vertical-align: middle;
    margin-left: 3px;
}
</style>
