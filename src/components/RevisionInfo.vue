<script lang="ts" setup>
import { percentageRound } from "@/utils/math.ts";
import type { integer } from "@vue/language-server";
import { add, differenceInDays, format, parse } from "date-fns";

const props = defineProps<{ created: string, updated?: string, expired: integer | string }>()
const current = Date.now()
const createAt = parse(props.created, "yyyy-MM-dd HH:mm", new Date())
const updateAt = props.updated ? parse(props.updated, "yyyy-MM-dd HH:mm", new Date()) : null
const expireAt =
    typeof props.expired === 'string'
        ? props.expired
        : updateAt !== null
            ? format(add(updateAt, { days: props.expired }), "yyyy-MM-dd")
            : format(add(createAt, { days: props.expired }), "yyyy-MM-dd")

const freshness =
    typeof props.expired === 'string'
        ? null
        : updateAt !== null
            ? 100 - percentageRound(Math.round(differenceInDays(current, updateAt) / props.expired * 100))
            : 100 - percentageRound(Math.round(differenceInDays(current, createAt) / props.expired * 100))

function getFreshnessColor(percentage: number) {
    if (percentage >= 50)
        return '#67c23a'
    if (percentage >= 10)
        return '#e6a23c'
    return '#f56c6c'
}
</script>

<template>
    <table style="display: inline-flex; width: 100%; justify-content: end">
        <tbody>
        <tr>
            <td>
                <el-text type="info">首次发布</el-text>
            </td>
            <td>
                <el-text type="info">{{ props.created }}</el-text>
            </td>
        </tr>
        <tr v-if="props.updated">
            <td>
                <el-text type="info">最后编辑</el-text>
            </td>
            <td>
                <el-text type="info">{{ props.updated }}</el-text>
            </td>
        </tr>
        <tr>
            <td>
                <el-text type="info">新鲜程度</el-text>
            </td>
            <td>
                <el-text type="info">{{ expireAt }}</el-text>
                <el-progress v-if="freshness !== null"
                             :color="getFreshnessColor"
                             :percentage="freshness"
                             style="min-width: 100px"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    margin: 0;
    overflow-x: visible;
    border-collapse: collapse;
}

th, tr, td {
    border: none;
}

tr {
    background-color: inherit !important;
}

td {
    padding: 0 4px;
}
</style>
