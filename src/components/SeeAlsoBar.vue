<script lang="ts" setup>
import { spacer } from "@/commons.ts";
import { Icon } from "@iconify/vue";

const { flavor, refs } = defineProps<{ flavor: 'foot' | 'neck', refs: { text: string, link: string }[] }>()
</script>


<template>
    <template v-if="flavor == 'neck'">
        <p style="text-align: center">
            <el-space :spacer="spacer" alignment="center" style="justify-content: center" wrap>
                <a v-for="ref in refs" :href="ref.link" class="link" target="_blank">
                    <span>{{ ref.text }}</span>
                </a>
            </el-space>
        </p>
    </template>
    <template v-else>
        <p style="text-align: end">
            <el-space spacer=" " wrap>
                <a v-for="ref in refs" :href="ref.link" class="link" target="_blank">
                    <span>{{ ref.text }}</span>
                    <Icon class="icon" icon="ep:top-right"/>
                </a>
            </el-space>
        </p>
    </template>
</template>


<style scoped>
.link {
    display: inline;
    text-decoration: none;
}

.icon {
    display: inline;
    margin-left: 3px;
    vertical-align: middle;
}
</style>
