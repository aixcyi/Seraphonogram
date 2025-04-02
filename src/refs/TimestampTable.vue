<script lang="ts" setup>
import { Duration } from "@/utils/duration.ts";

const props = defineProps<{
    lowerLmt: bigint,
    upperLmt: bigint,
    duration: (stamp: bigint) => Duration,
    dateFmt: string,
    dateLmt: (delta: Duration) => string,
}>()

type Data = { stamp: bigint, powers: Map<bigint, bigint>, delta: string, datetime: string }

const bases = [ 2n, 8n, 10n, 16n, 32n, 36n, 62n, 64n, 85n ]
const table = new Map<bigint, Data>()
let power = 0n
for (const base of bases) {
    let stamp = base ** power
    let duration = props.duration(stamp)
    while (stamp <= props.upperLmt) {
        if (stamp < props.lowerLmt) {
            continue
        }
        if (table.has(stamp)) {
            table.get(stamp)!.powers.set(base, power)
        } else {
            table.set(stamp, {
                stamp: stamp,
                powers: new Map([ [ base, power ] ]),
                delta: props.dateLmt(duration),
                datetime: duration.toUTCDateString(props.dateFmt, '-'),
            })
        }
        stamp = base ** ++power
        duration = props.duration(stamp)
    }
    power = 0n
}
const data = [ ...table.values() ].sort(
    (a, b) => a.stamp < b.stamp ? 1 : a.stamp == b.stamp ? 0 : -1
)
</script>

<template>
    <table>
        <thead>
        <tr>
            <th v-for="() in bases" style="text-align: center"></th>
            <th style="text-align: right">存储上限</th>
            <th style="text-align: right">时间上限</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in data">
            <td v-for="base in bases" style="text-align: center">
                <span v-if="row.powers.get(base) !== undefined">
                    {{ base }}<sup>{{ row.powers.get(base) }}</sup>
                </span>
            </td>
            <td nowrap="nowrap" style="text-align: right">{{ row.delta }}</td>
            <td nowrap="nowrap" style="text-align: right">{{ row.datetime }}</td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>
