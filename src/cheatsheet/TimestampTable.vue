<script lang="ts" setup>
import { Duration } from "@/utils/duration.ts";
import { getLogarithm, isInteger } from "@/utils/math.ts";
import type { integer } from "@vue/language-server";

const bases = [ 2, 8, 10, 16, 36, 62, 64 ]
const props = defineProps<{
    exponents: integer[],
    minimum: bigint,
    maximum: bigint,
    duration: (stamp: bigint) => Duration,
    dateFormat: string,
    deltaFormat: (delta: Duration) => string,
    widths: integer[],
}>()

if (props.exponents.length !== bases.length) {
    throw new Error("exponents must be an array of length 7")
}

const range = (end: integer) => Array.from({ length: end + 1 }, (_, i) => BigInt(i))
const picks = (n: number) => (isInteger(n, 0.0000001)) ? Math.round(n) : null
const table = [
    ...new Set([
        ...bases.map((base, index, _) => [
            ...range(props.exponents[index]).map(power => BigInt(base) ** power)
        ])
    ].reduce(
        (prev, curr) => prev.concat(curr)
    ))
].sort(
    (a, b) => (a < b) ? 1 : ((a > b) ? -1 : 0)
).filter(
    stamp => props.minimum <= stamp && stamp <= props.maximum
).map(
    stamp => {
        const duration = props.duration(stamp)
        return {
            powers: new Map<integer, number | null>(
                bases.map(
                    base => [ base, picks(getLogarithm(stamp, base)) ]
                )
            ),
            datetime: duration.toUTCDateString(props.dateFormat, '-'),
            delta: props.deltaFormat(duration),
        }
    }
)
</script>

<template>
    <table>
        <thead>
        <tr>
            <th v-for="_ in bases" style="text-align:center;"></th>
            <th style="text-align:right;">时间差</th>
            <th style="text-align:right;">GMT+0 时刻</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in table">
            <td v-for="base in bases" style="text-align:center;">
                <span v-if="row.powers.get(base) != null">
                    {{ base }}<sup>{{ row.powers.get(base) }}</sup>
                </span>
            </td>
            <td style="text-align:right;">{{ row.delta }}</td>
            <td style="text-align:right;">{{ row.datetime }}</td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    font-family: "HarmonyOS Sans SC", "JetBrains Mono", var(--vp-font-family-mono);
}
</style>
