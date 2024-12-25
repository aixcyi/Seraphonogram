---
title: 时间戳对照表
lang: zh-CN
aside: false
outline: false
---

<script setup lang="ts">
import TimestampTables from "@/cheatsheet/TimestampTables.vue";
</script>

# 时间戳对照表

> [!NOTE]
> - 用 **字符串** 存储时长：下表的 **指数** 表示所需 **字符个数**，而 **底数** 表示整数的 **进位制**。
> - 用 **整数** 存储时长：以 `2` 为底的数的指数表示所需的 **比特数**。
> - 下表提供的时间差不含 **闰日** 和 **闰秒**；一年按 365 天整计，一天按 24 小时整计。
> - “实际能够存储的时长”要在下表提供的“时间差”上减去 1 单位。比如 16 位无符号整数存储日戳，最大只能存储 2<sup>16</sup> - 1 = 179 年 200 天。

> [!WARNING]
> 测算超远日期时，务必提前了解所用语言／框架是否支持。

<TimestampTables />
