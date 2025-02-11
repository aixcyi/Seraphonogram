<script lang="ts" setup>
import { limit } from "@/utils/math.ts";
import type { integer } from "@vue/language-server";
import { add, differenceInDays, format, parse } from "date-fns";
import { useData } from "vitepress";

const $frontmatter = useData().frontmatter.value
const props = defineProps<{ badge?: integer, indent?: boolean }>()

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
const latestAt = [ updateAt, createAt ]
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
    <div class="status-bar">
        <el-space spacer=" " wrap>
            <el-text class="label" type="info">标签</el-text>
            <a v-for="tag in $frontmatter.tags" :href="`/catalog?tag=${tag}`" class="tag label">{{ tag }}</a>
        </el-space>
    </div>
    <div class="status-bar multiple">
        <div class="excerpt">
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
            <template v-else-if="$frontmatter.excerpt !== undefined">
                <div>
                    <span v-if="props.indent">　　</span>
                    <el-text type="info" v-html="$frontmatter.excerpt"></el-text>
                </div>
            </template>
            <template v-else>
                <el-text type="info">
                    <slot/>
                </el-text>
            </template>
        </div>
        <table class="attributes">
            <tbody>
            <tr>
                <td class="col-key">
                    <el-text type="info">发布于</el-text>
                </td>
                <td class="col-value">
                    <el-text type="info">{{ $frontmatter.created }}</el-text>
                </td>
            </tr>
            <tr v-if="$frontmatter.updated !== undefined">
                <td class="col-key">
                    <el-text type="info">更新于</el-text>
                </td>
                <td class="col-value">
                    <el-text type="info">{{ $frontmatter.updated }}</el-text>
                </td>
            </tr>
            <tr v-if="expires !== undefined">
                <td class="col-key">
                    <el-text type="info">保质期</el-text>
                </td>
                <td class="col-value">
                    <el-text type="info">{{ expires }}</el-text>
                </td>
            </tr>
            <tr v-if="freshness !== undefined">
                <td class="col-key">
                    <el-text type="info">新鲜度</el-text>
                </td>
                <td class="col-value">
                    <el-progress :color="getFreshnessColor" :percentage="freshness!" :stroke-width="10"
                                 style="min-width: 100px"/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
table {
    margin: 0;
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

.col-key {
    min-width: 50px;
    text-wrap: nowrap;
}

.col-value {
    min-width: 130px;
    text-wrap: nowrap;
}

.status-bar {
    padding: 1rem 4px 0 4px;
}

.multiple {
    display: flex;
}

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

.attributes {
    margin-left: 16px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        left: -7px;
        width: 1px;
        height: 100%;
        background-color: var(--vp-c-divider);
    }
}
</style>
