<script lang="ts" setup>
import { Duration } from '@/utils/duration.ts'
import type { integer } from '@vue/language-server'
import TimestampTable from './TimestampTable.vue'

const zz = (n: integer) => n > 9 ? '' : '0'
const zzz = (n: integer) => n > 99 ? '' : n > 9 ? '0' : '00'
const configs = {
    millisecond: {
        lowerLmt: 1n,
        upperLmt: 1n << 54n,
        duration: (stamp: bigint) => Duration.fromMilliseconds(stamp - 1n),
        dateFmt: "yyyy-MM-dd　HH:mm:ss. SSS",
        dateLmt: (d: Duration) => [
            `${d.year} 年 `,
            `${d.day} 天　${zz(d.hour)}`,
            `${d.hour}:${zz(d.minute)}`,
            `${d.minute}:${zz(d.second)}`,
            `${d.second}. ${zzz(d.millisecond)}`,
            `${d.millisecond}`,
        ].slice(
            Math.min(4, d.getLeadingZeroQty()),
        ).join(
            ''
        ),
    },
    second: {
        lowerLmt: 1n,
        upperLmt: 1n << 45n,
        duration: (stamp: bigint) => Duration.fromSeconds(stamp - 1n),
        dateFmt: "yyyy-MM-dd　HH:mm:ss",
        dateLmt: (d: Duration) => [
            `${d.year} 年 `,
            `${d.day} 天　${zz(d.hour)}`,
            `${d.hour}:${zz(d.minute)}`,
            `${d.minute}:${zz(d.second)}`,
            `${d.second}`,
        ].slice(
            Math.min(3, d.getLeadingZeroQty()),
        ).join(
            ''
        ),
    },
    day: {
        lowerLmt: 1n,
        upperLmt: 36n ** 5n,
        duration: (stamp: bigint) => Duration.fromDays(stamp - 1n),
        dateFmt: "yyyy-MM-dd",
        dateLmt: (d: Duration) => d.year > 0 ? `${d.year} 年 ${d.day} 天` : `${d.day} 天`,
    },
}
</script>

<template>
    <el-tabs style="margin-top: 20px; width: 100%" type="card">
        <el-tab-pane label="毫秒戳" lazy>
            <span>以毫秒为单位的时间戳，一般是整数。1 秒＝1000 毫秒，1 毫秒＝0.001 秒。</span>
            <TimestampTable v-bind="configs.millisecond"/>
        </el-tab-pane>
        <el-tab-pane label="秒戳" lazy>
            <span>以秒为单位的时间戳，一般是整数或小数。1 天＝86400 秒。</span>
            <TimestampTable v-bind="configs.second"/>
        </el-tab-pane>
        <el-tab-pane label="日戳" lazy>
            <span>以天为单位的时间戳，一般是整数。</span>
            <TimestampTable v-bind="configs.day"/>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
.el-tabs--card :deep(.el-tabs__item.is-active) {
    color: var(--vp-c-indigo-1);
    border-bottom: 2px solid var(--vp-c-bg);
}

.el-tabs--card :deep(.el-tabs__item:hover) {
    color: var(--vp-c-indigo-2);
}
</style>
