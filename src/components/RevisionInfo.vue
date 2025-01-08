<script lang="ts" setup>
import { limit } from "@/utils/math.ts";
import type { integer } from "@vue/language-server";
import { add, differenceInDays, format, parse } from "date-fns";
import { useData } from "vitepress";

const $frontmatter = useData().frontmatter.value
const props = defineProps<{ badge?: integer }>()

/**
 * 解析前端传入的日期。
 */
function resolve(dateString: string | undefined) {
    if (typeof dateString === 'string')
        return parse(dateString, "yyyy-MM-dd HH:mm", new Date())
    else
        return dateString
}

/**
 * 新鲜度（进度条）颜色。
 */
function getFreshnessColor(percentage: number) {
    if (percentage >= 25) return '#67c23a'
    if (percentage >= 10) return '#e6a23c'
    return '#f56c6c'
}

const current = Date.now()
const createAt = resolve($frontmatter.created)!
const updateAt = resolve($frontmatter.updated)
const reviseAt = resolve($frontmatter.revised)
const latestAt = [ reviseAt, updateAt, createAt ]
    .filter(v => v !== undefined)
    .sort((a, b) => b!.getTime() - a!.getTime())
    [0]

let expires: Date | string | undefined;
let freshness: number | undefined;
switch (typeof $frontmatter.expires) {
    case "number":
        expires = format(add(latestAt, { days: $frontmatter.expires }), "yyyy-MM")
        freshness = 100 - limit(0, Math.round(differenceInDays(current, latestAt) / $frontmatter.expires * 100), 100)
        break
    case "string":
        expires = $frontmatter.expires
        freshness = undefined
        break
    default:
        expires = undefined
        freshness = undefined
}

/**
 * 徽章插槽名。指定了几个 `badge` 就会遍历几个插槽。
 */
const slotsName =
    props.badge === undefined
        ? Array.of<string>()
        : Array.from({ length: props.badge }, (_, index) => index + 1).map(v => `badge${v}`)
</script>

<template>
    <table>
        <tbody style="width: 100%">
        <tr>
            <td rowspan="4" style="width: 100%">
                <template v-if="slotsName.length">
                    <table>
                        <tbody>
                        <tr>
                            <td v-for="name in slotsName">
                                <slot :name="name"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </template>
                <template v-else-if="$frontmatter.intro !== undefined">
                    <el-text type="info" v-html="$frontmatter.intro"></el-text>
                </template>
                <template v-else>
                    <el-text type="info">
                        <slot/>
                    </el-text>
                </template>
            </td>
            <td rowspan="4" style="border-left: 1px solid var(--vp-c-divider)"></td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ $frontmatter.revised ? '修订于' : '发布于' }}</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ $frontmatter.revised ?? $frontmatter.created }}</el-text>
            </td>
        </tr>
        <tr v-if="$frontmatter.updated !== undefined">
            <td style="text-wrap: nowrap">
                <el-text type="info">更新于</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ $frontmatter.updated }}</el-text>
            </td>
        </tr>
        <tr v-if="expires !== undefined">
            <td style="text-wrap: nowrap">
                <el-text type="info">保质期</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ expires }}</el-text>
            </td>
        </tr>
        <tr v-if="freshness !== undefined">
            <td style="text-wrap: nowrap">
                <el-text type="info">新鲜度</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-progress :color="getFreshnessColor" :percentage="freshness!" style="min-width: 100px"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    overflow-x: visible !important;
    border-collapse: collapse !important;
}

th, tr, td {
    border: none !important;
}

tr {
    background-color: inherit !important;
}

td {
    padding: 0 4px !important;
}
</style>
