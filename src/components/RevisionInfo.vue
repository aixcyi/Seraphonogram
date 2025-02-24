<script lang="ts" setup>
import { useData } from "vitepress";

const $frontmatter = useData().frontmatter
const props = defineProps<{ indent?: boolean }>()
</script>

<template>
    <div class="status-bar">
        <el-space spacer=" " wrap>
            <el-text class="label" type="info">标签</el-text>
            <a v-for="tag in $frontmatter.tags" :href="`/catalog?tag=${tag}`" class="tag label">{{ tag }}</a>
        </el-space>
    </div>
    <div class="status-bar excerpt">
        <el-text v-if="$frontmatter.excerpt"
                 :class="props.indent ? 'paragraph' : ''"
                 type="info"
                 v-html="$frontmatter.excerpt">
        </el-text>
    </div>
</template>

<style lang="scss" scoped>
.excerpt {
    align-items: center;
    display: flex;
    width: 100%;
}

.label {
    font-size: 14px !important;
    font-weight: unset !important;
}

.tag {
    color: var(--el-color-info);
    position: relative;
    text-decoration: none;
    transition: all 0.3s ease-in-out 0.15s;

    &::before {
        content: "";
        position: absolute;
        top: -3px;
        right: -3px;
        width: 0;
        height: 2px;
        transition: all 0.3s ease-in-out 0.15s;
        background-color: var(--vp-c-brand-2);

        :hover > & {
            width: calc(100% + 6px);
        }
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: -3px;
        width: 0;
        height: 2px;
        transition: all 0.3s ease-in-out 0.15s;
        background-color: var(--vp-c-brand-2);

        :hover > & {
            width: calc(100% + 6px);
        }
    }
}
</style>
