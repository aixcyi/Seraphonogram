<script lang="ts" setup>
import { limit } from '@/utils/math'
import { add, differenceInDays, format, parse } from 'date-fns'
import { onContentUpdated, useData } from 'vitepress'
import { ref } from 'vue'


const $frontmatter = useData().frontmatter
const expires = ref<string | undefined>(undefined)
const freshness = ref<number | undefined>(undefined)

onContentUpdated(() => {
    const matter = $frontmatter.value
    const current = Date.now()
    const createAt = matter.createAt ? parse(matter.createAt, "yyyy-MM-dd HH:mm", new Date()) : undefined
    const updateAt = matter.updateAt ? parse(matter.updateAt, "yyyy-MM-dd HH:mm", new Date()) : undefined
    const changeAt = [ updateAt, createAt ].filter(v => v !== undefined).sort((a, b) => b!.getTime() - a!.getTime())[0]
    expires.value = matter.expires ? format(add(changeAt, { days: matter.expires }), "yyyy-MM") : undefined
    freshness.value = matter.expires ? 100 - limit(0, Math.round(differenceInDays(current, changeAt) / matter.expires * 100), 100) : undefined
})

/**
 * 新鲜度（进度条）颜色。
 */
function getFreshnessColor(percentage: number) {
    if (percentage >= 25) return '#67c23a'
    if (percentage >= 10) return '#e6a23c'
    return '#f56c6c'
}
</script>

<template>
    <div ref="container"
         :class="{ 'has-status': $frontmatter.createAt !== undefined }"
         class="AiDocAsideStatus"
    >
        <div class="container">
            <div class="title">信息</div>
            <el-container class="content">
                <el-main style="padding: 0">
                    <el-row align="middle" class="item">
                        <el-col :span="6">创建于</el-col>
                        <el-col :span="18">{{ $frontmatter.createAt }}</el-col>
                    </el-row>
                    <el-row v-if="$frontmatter.updateAt" align="middle" class="item">
                        <el-col :span="6">更新于</el-col>
                        <el-col :span="18">{{ $frontmatter.updateAt }}</el-col>
                    </el-row>
                    <el-row v-if="$frontmatter.expires" align="middle" class="item">
                        <el-col :span="6">保质期</el-col>
                        <el-col :span="18">{{ expires }}</el-col>
                    </el-row>
                    <el-row v-if="$frontmatter.expires" align="middle" class="item">
                        <el-col :span="6">新鲜度</el-col>
                        <el-col :span="18">
                            <el-progress :color="getFreshnessColor" :percentage="freshness!" :stroke-width="10"
                                         style="min-width: 100px"/>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<style scoped>
.AiDocAsideStatus {
    display: none;
}

.AiDocAsideStatus.has-status {
    display: block;
}

.container {
    border-left: 1px solid var(--vp-c-divider);
    padding-left: 16px;
    font-size: 13px;
    font-weight: 500;
}

.title {
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
}

.content {
    padding-bottom: 16px;
}

.item {
    font-size: 14px;
    font-weight: 400;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
}
</style>
