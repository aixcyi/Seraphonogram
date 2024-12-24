<script lang="ts" setup>
import TimestampTable from "@/cheatsheet/TimestampTable.vue";
import { Duration } from "@/utils/duration.ts";
import type { integer } from "@vue/language-server";

const zz = (n: integer) => n > 9 ? '' : '0'
const zzz = (n: integer) => n > 99 ? '' : n > 9 ? '0' : '00'
const configs = {
    millisecond: {
        exponents: [ 53, 17, 16, 13, 10, 9, 8 ],
        minimum: 1n,
        maximum: 1n << 54n,
        duration: (stamp: bigint) => Duration.fromMilliseconds(stamp),
        dateFormat: "yyyy 年 MM 月 dd 日 HH:mm:ss. SSS",
        deltaFormat: (d: Duration) => [
            `${d.year} 年 `,
            `${d.day} 天 ${zz(d.hour)}`,
            `${d.hour}:${zz(d.minute)}`,
            `${d.minute}:${zz(d.second)}`,
            `${d.second}. ${zzz(d.millisecond)}`,
            `${d.millisecond}`,
        ].slice(
            Math.min(4, d.getLeadingZeroQty()),
        ).join(
            ''
        ),
        widths: [ 270, 240 ],
    },
    second: {
        exponents: [ 42, 14, 12, 10, 8, 7, 7 ],
        minimum: 1n,
        maximum: 1n << 42n,
        duration: (stamp: bigint) => Duration.fromSeconds(stamp),
        dateFormat: "yyyy 年 MM 月 dd 日 HH:mm:ss",
        deltaFormat: (d: Duration) => [
            `${d.year} 年 `,
            `${d.day} 天 ${zz(d.hour)}`,
            `${d.hour}:${zz(d.minute)}`,
            `${d.minute}:${zz(d.second)}`,
            `${d.second}`,
        ].slice(
            Math.min(3, d.getLeadingZeroQty()),
        ).join(
            ''
        ),
        widths: [ 220, 200 ],
    },
    day: {
        exponents: [ 25, 8, 7, 6, 5, 4, 4 ],
        minimum: 1n,
        maximum: 36n ** 5n,
        duration: (stamp: bigint) => Duration.fromDays(stamp),
        dateFormat: "yyyy 年 MM 月 dd 日",
        deltaFormat: (d: Duration) => d.year > 0 ? `${d.year} 年 ${d.day} 天` : `${d.day} 天`,
        widths: [ 160, 140 ],
    },
}
</script>

<template>
    <el-tabs style="margin-top: 20px; width: 100%" type="card">
        <el-tab-pane label="毫秒戳" lazy>
            <el-text type="info">以毫秒为单位的时间戳，一般是整数。</el-text>
            <TimestampTable v-bind="configs.millisecond"/>
        </el-tab-pane>
        <el-tab-pane label="秒戳" lazy>
            <el-text type="info">以秒为单位的时间戳，一般是整数或小数。</el-text>
            <TimestampTable v-bind="configs.second"/>
        </el-tab-pane>
        <el-tab-pane label="日戳" lazy>
            <el-text type="info">以天为单位的时间戳，一般是整数。</el-text>
            <TimestampTable v-bind="configs.day"/>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
ul {
    margin-top: 0;
}
</style>
