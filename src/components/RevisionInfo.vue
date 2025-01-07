<script lang="ts" setup>
import { limit } from "@/utils/math.ts";
import type { integer } from "@vue/language-server";
import { add, differenceInDays, format, parse } from "date-fns";

const props = defineProps<{
    created: string,
    updated?: string,
    revised?: string,
    expired?: integer | string,
    badge?: integer,
}>()

function latest(...days: (Date | null)[]): Date {
    return days.filter(v => v !== null).sort((a, b) => b!.getTime() - a!.getTime())[0]
}

function percentageRound(n: number): number {
    return limit(0, n, 100)
}

function getFreshnessColor(percentage: number) {
    if (percentage >= 25)
        return '#67c23a'
    if (percentage >= 10)
        return '#e6a23c'
    return '#f56c6c'
}

const current = Date.now()
const createAt = parse(props.created, "yyyy-MM-dd HH:mm", new Date())
const updateAt = props.updated ? parse(props.updated, "yyyy-MM-dd HH:mm", new Date()) : null
const reviseAt = props.revised ? parse(props.revised, "yyyy-MM-dd HH:mm", new Date()) : null
const expireAt = latest(updateAt, reviseAt, createAt)
const expires =
    typeof props.expired !== 'number'
        ? props.expired ?? null
        : format(add(expireAt, { days: props.expired }), "yyyy-MM")
const freshness =
    typeof props.expired !== 'number'
        ? null
        : 100 - percentageRound(Math.round(differenceInDays(current, expireAt) / props.expired * 100))

const slotsName =
    props.badge == undefined
        ? Array.of<string>()
        : Array.from({ length: props.badge }, (_, index) => index + 1).map(v => `badge${v}`)
</script>

<template>
    <table>
        <tbody style="width: 100%">
        <tr>
            <td rowspan="4" style="width: 100%">
                <template v-if="props.badge">
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
                <template v-else>
                    <el-text type="info">
                        <slot/>
                    </el-text>
                </template>
            </td>
            <td rowspan="4" style="border-left: 1px solid var(--vp-c-divider)"></td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ props.revised == undefined ? '发布于' : '修订于' }}</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ props.revised == undefined ? props.created : props.revised }}</el-text>
            </td>
        </tr>
        <tr v-if="props.updated != undefined">
            <td style="text-wrap: nowrap">
                <el-text type="info">更新于</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ props.updated }}</el-text>
            </td>
        </tr>
        <tr v-if="expires != null">
            <td style="text-wrap: nowrap">
                <el-text type="info">保质期</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-text type="info">{{ expires }}</el-text>
            </td>
        </tr>
        <tr v-if="freshness != null">
            <td style="text-wrap: nowrap">
                <el-text type="info">新鲜度</el-text>
            </td>
            <td style="text-wrap: nowrap">
                <el-progress :color="getFreshnessColor" :percentage="freshness" style="min-width: 100px"/>
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
