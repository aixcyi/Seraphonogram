<script lang="ts" setup>
import { ElInput } from "element-plus";
import { ref } from "vue";

// 参数、字段内容容器
const props = defineProps<{ text?: string, multiple: boolean }>()

// ---- 控制复制按钮 ----
const coped = ref(false)
const restoreCoped = () => {
    coped.value = false
}
const copyCode = (event: PointerEvent) => {
    if (props.text) {
        if (event.target instanceof HTMLButtonElement || event.target instanceof SVGSVGElement) {
            navigator.clipboard.writeText(props.text)
            coped.value = true
            setTimeout(restoreCoped, 3000)
        }
    }
}

// ---- 聚焦时自动全选 ----
const handleFocus = (event: FocusEvent) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        event.target.select()
    }
}
</script>

<template>
    <el-input v-model="props.text" :type="multiple ? 'textarea' : 'text'" autosize readonly @focus="handleFocus">
        <template #append>
            <el-button :icon="coped ? 'Check' : 'CopyDocument'" @click="copyCode"/>
        </template>
    </el-input>
</template>

<style scoped>
.el-input :deep(.el-input__inner) {
    font-family: var(--vp-font-family-mono);
}

.el-textarea :deep(.el-textarea__inner) {
    font-family: var(--vp-font-family-mono);
}
</style>
