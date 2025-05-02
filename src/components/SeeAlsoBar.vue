<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const { flavor, refs } = defineProps<{ flavor: 'foot' | 'neck', refs: { text: string, link: string }[] }>()
</script>


<template>
    <template v-if="flavor == 'neck'">
        <p class="neck">
            <el-space alignment="center" spacer="·" wrap>
                <a v-for="ref in refs" :href="ref.link" class="link" target="_blank">
                    <span>{{ ref.text }}</span>
                </a>
            </el-space>
        </p>
    </template>
    <template v-else>
        <p class="foot">
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
.neck {
    text-align: center;
    margin: 48px auto;

    & > .el-space {
        justify-content: center;
    }
}

.foot {
    text-align: end;
}

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
