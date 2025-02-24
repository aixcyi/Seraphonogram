---
title: 时间戳对照表
lang: zh-CN
aside: false
outline: false
publishAt: 2023-12-21 10:02
reviseAt: 2025-01-02 10:24
excerpt: 工具表格，用来查不同进位制（不同字符集）下的计数空间，以及不同单位的时间存储上限。
tags:
    - 开发
    - 设计
    - 时间戳
    - 进位制
---

<script setup lang="ts">
import TimestampTables from "./TimestampTables.vue";
</script>

# 时间戳对照表

<RevisionInfo />

> [!NOTE] 食用指南
> - 用 **字符串** 存储时长：下表的 **指数** 表示所需 **字符个数**（BaseN），而 **底数** 表示整数的 **进位制**。
> - 用 **整数** 存储时长：以 `2` 为底的数的指数表示所需的 **比特数**。
> - 下表的时间差均不含 **闰日** 和 **闰秒**：一年按 365 天整计，一天按 24 小时整计。
> - 下表的时间均为 GMT+0 时刻。

> [!WARNING] 注意
> 测算超远日期时，务必提前了解所用语言／框架是否支持。

<TimestampTables />
