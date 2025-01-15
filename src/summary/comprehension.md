---
title: Python 推导式
lang: zh-CN
outline: deep
order: 20211105
created: 2021-11-05 00:00
expires: 3650
excerpt: 推导式又叫生成式，是一种用于生成序列、集合、映射的语句。本文用直观的方式向读者解释其语法。
tags:
    - Python
    - 语法
---

<script setup lang="ts">
import RevisionInfo from "@/components/RevisionInfo.vue";
</script>

# Python 推导式

<RevisionInfo indent />

## 列表推导式

### 一维

对迭代器进行循环：

```python
tags = [m + n for m in 'ABC' for n in '123']
#       \___/ \____________/ \____________/
#         │         │               │
#         │         │               └─⫸ 循环语句
#         │         └─⫸ 循环语句
#         └─⫸ 值表达式
# 最终生成：['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
```

多重带条件循环：

```python
values = [x * y for x in range(10) if x % 2 == 0 for y in range(10) if y % 3 == 0]
#         \___/ \______________________________/ \_______________________________/
#           │   \________________/ \___________/                │
#           │            │               │                      └─⫸ 重复结构
#           │            │               └─⫸ 过滤条件
#           │            └─⫸ 循环语句
#           └─⫸ 值表达式
# 最终生成：[0, 0, 0, 0, 0, 6, 12, 18, 0, 12, 24, 36, 0, 18, 36, 54, 0, 24, 48, 72]
```

使用语句外变量：

```python
# 十天干（Heavenly Stems）
stems = '甲乙丙丁戊己庚辛壬癸'

# 十二地支（Earthly Branches）
branches = '子丑壬卯辰巳午未申酉戌亥'

# 六十干支
cycles = [stems[i % 10] + branches[i % 12] for i in range(60)]
# 最终生成：['甲子', '乙丑', '丙壬', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', ……]
```

### 二维

```python
points = [[(a, b) for a in range(10) if a % 2 == 0] for b in range(100) if b % 3 == 0]
#         \_______________________________________/ \_________________/ \___________/
#              │                                        │                 │
#              │                                        │                 └─⫸ 过滤条件
#              │                                        └─⫸ 循环语句
#              └─⫸ 值表达式，同时也是一个一维列表生成式
```

## 字典推导式

```python
# 十天干（Heavenly Stems）
stems = '甲乙丙丁戊己庚辛壬癸'

# 十二地支（Earthly Branches）
branches = '子丑壬卯辰巳午未申酉戌亥'

# 六十干支
cycles = {i: stems[i % 10] + branches[i % 12] for i in range(60)}
#         \_________________________________/ \________________/
#                       │                            │
#                       │                            │
#                       │                            └─⫸ 循环语句
#                       └─⫸ 键-值对的表达式
# 最终生成：{0: '甲子', 1: '乙丑', 2: '丙壬', 3: '丁卯', 4: '戊辰', 5: '己巳', 6: '庚午', ……}
```
