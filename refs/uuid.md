---
title: UUID 结构
outline: deep
createAt: 2025-04-24 17:26
expires: 3650
order: 4
excerpt:
    通用唯一标识符 UUID（Universally unique identifier）结构梳理。
---

> UUIDs were originally used in the Apollo Network Computing System \(NCS\),
> later in the Open Software Foundation's \(OSF's\) Distributed Computing Environment \(DCE\),
> and then in Microsoft Windows platforms. —— [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562.html)

UUID 有很多不同风格的字符串表达，均为 16 字节 128 比特，通常用十六进制字符 8-4-4-4-12 结构记录，本文仅使用第一种以统一说明。

<pre style="text-align: center">
00112233-4455-6677-8899-aabbccddeeff<br/>
{00112233-4455-6677-8899-aabbccddeeff}<br/>
00112233445566778899aabbccddeeff<br/>
urn:uuid:00112233-4455-6677-8899-aabbccddeeff<br/>
</pre>

## UUID 种类

UUID 的结构取决于其种类：

<pre style="text-align: center">
00112233-4455-6677-<strong>88</strong>99-aabbccddeeff
</pre>

提取方法为：

```python
variant = (i & 0xFF00000000000000) >> 56
```

取值有下：

|     比特位     |   十进制   |   十六进制    | 种类                        |
|:-----------:|:-------:|:---------:|---------------------------|
| `0xxx xxxx` |  0～127  | 0x00～0x7F | Apollo NCS UUID，仅使用 0～13。 |
| `10xx xxxx` | 128～191 | 0x80～0xBF | OSF's DCE UUID。           |
| `110x xxxx` | 192～223 | 0xC0～0xDF | 微软 COM / DCOM UUID。       |
| `111x xxxx` | 224～255 | 0xE0～0xFF | 保留以供将来定义。                 |

::: warning
注意，该字段并不一定会占用全部 8 个比特位，具体取决于相应种类规定的格式。
:::

## Nil UUID

由 Apollo NCS 规定的全零 UUID，用于表示没有 UUID 值，在意思上相当于数据库字段中的 `NULL`。

<pre style="text-align: center">
00000000-0000-0000-0000-000000000000
</pre>

## OSF's DCE UUID

OSF DCE 的 UUID 有不同的版本，通过 `version` 字段指示：

<pre style="text-align: center">
00112233-4455-<strong>6</strong>677-8899-aabbccddeeff
</pre>

提取方法为：

```python
version = (i & 0xF0000000000000000000) >> 76
```

取值有下：

|      值      | 要素                   | 说明                                  |
|:-----------:|----------------------|-------------------------------------|
| `0000`（`0`） |                      | 未使用。                                |
| `0001`（`1`） | 公历时间戳，时钟序列，节点地址      | [UUIDv1](#uuidv1)。                  |
| `0110`（`6`） | 公历时间戳，时钟序列，节点地址      | [UUIDv6](#uuidv6)。与 v1 相比调整了时间戳的顺序。 |
| `0010`（`2`） |                      | UUIDv2。DCE 安全 UUID，没有具备共识的结构。       |
| `0011`（`3`） | 命名空间下唯一名称的 MD5 杂凑值   | [UUIDv3](#uuidv3)。                  |
| `0101`（`5`） | 命名空间下唯一名称的 SHA-1 杂凑值 | [UUIDv5](#uuidv5)。                  |
| `0100`（`4`） | 随机数                  | [UUIDv4](#uuidv4)。                  |
| `0111`（`7`） | 随机数，Unix 毫秒级时间戳      | [UUIDv7](#uuidv7)。                  |
| `1000`（`8`） |                      | [UUIDv8](#uuidv8)。自定义 UUID。         |
|     其它      |                      | 保留以供将来定义。                           |

### UUIDv1

第一版 UUID 基于一个 60 位的时间戳。

时间戳是自 UTC 1582 年 10 月 15 日 00:00:00.00 以来的时间，单位是 100 纳秒。以下表为例，这个时间戳是
`0x677445500112233`，即 46591621832016747500 纳秒，合 46591621832.016745 秒，得 3059-03-20 21:10:32.016745 。

| 位置                                                  | 字段        | 字段                                   |
|-----------------------------------------------------|-----------|--------------------------------------|
| <pre>**00112233**-4455-1677-8899-aabbccddeeff</pre> | time_low  | 时间戳（低位）。                             |
| <pre>00112233-**4455**-1677-8899-aabbccddeeff</pre> | time_mid  | 时间戳（中位）。                             |
| <pre>00112233-4455-**1**677-8899-aabbccddeeff</pre> | version   | OSF's DCE UUID 的版本。                  |
| <pre>00112233-4455-1**677**-8899-aabbccddeeff</pre> | time_high | 时间戳（高位）。                             |
| <pre>00112233-4455-1677-**8**899-aabbccddeeff</pre> | variant   | UUID 的种类。                            |
| <pre>00112233-4455-1677-8**899**-aabbccddeeff</pre> | clock_seq | 时钟序列，用以避免时钟回拨或节点变化导致的重复。             |
| <pre>00112233-4455-1677-8899-**aabbccddeeff**</pre> | node      | 节点，由 IEEE 802 MAC 地址组成，通常是主机地址或随机得出。 |

### UUIDv3

第三版 UUID 基于一个命名空间中的名称的 MD5 杂凑值。

将杂凑值的所有 128 个比特全部填充到 UUID 中，然后将 `version` 和 `variant` 结构用相应的字段值进行**替换**。

| 位置                                                  | 字段       | 字段                  |
|-----------------------------------------------------|----------|---------------------|
| <pre>**00112233-4455**-2677-8899-aabbccddeeff</pre> | md5_high | 杂凑值（高位）。            |
| <pre>00112233-4455-**2**677-8899-aabbccddeeff</pre> | version  | OSF's DCE UUID 的版本。 |
| <pre>00112233-4455-2**677**-8899-aabbccddeeff</pre> | md5_mid  | 杂凑值（中位）。            |
| <pre>00112233-4455-2677-**8**899-aabbccddeeff</pre> | variant  | UUID 的种类。           |
| <pre>00112233-4455-2677-8**899-aabbccddeeff**</pre> | md5_low  | 杂凑值（低位）。            |

### UUIDv4

第四版 UUID 基于一个随机数或伪随机数。

生成一个 128 位的随机数并将所有比特填充到 UUID 中，然后将 `version` 和 `variant` 结构用相应的字段值进行**替换**。

| 位置                                                  | 字段       | 字段                  |
|-----------------------------------------------------|----------|---------------------|
| <pre>**00112233-4455**-4677-8899-aabbccddeeff</pre> | random_a | 随机数。                |
| <pre>00112233-4455-**4**677-8899-aabbccddeeff</pre> | version  | OSF's DCE UUID 的版本。 |
| <pre>00112233-4455-4**677**-8899-aabbccddeeff</pre> | random_b | 随机数。                |
| <pre>00112233-4455-4677-**8**899-aabbccddeeff</pre> | variant  | UUID 的种类。           |
| <pre>00112233-4455-4677-8**899-aabbccddeeff**</pre> | random_c | 随机数。                |

### UUIDv5

第五版 UUID 基于一个命名空间中的名称的 SHA-1 杂凑值。

将 SHA-1 杂凑值的高 128 位全部填充到 UUID 中，丢弃低 32 位，然后将 `version` 和 `variant` 结构用相应的字段值进行**替换**。

| 位置                                                  | 字段        | 字段                  |
|-----------------------------------------------------|-----------|---------------------|
| <pre>**00112233-4455**-5677-8899-aabbccddeeff</pre> | sha1_high | 杂凑值（高位）。            |
| <pre>00112233-4455-**5**677-8899-aabbccddeeff</pre> | version   | OSF's DCE UUID 的版本。 |
| <pre>00112233-4455-5**677**-8899-aabbccddeeff</pre> | sha1_mid  | 杂凑值（中位）。            |
| <pre>00112233-4455-5677-**8**899-aabbccddeeff</pre> | variant   | UUID 的种类。           |
| <pre>00112233-4455-5677-8**899-aabbccddeeff**</pre> | sha1_low  | 杂凑值（低位）。            |

### UUIDv6

第六版 UUID 是 [UUIDv1](#uuidv1) 的兼容版本，调整了字段顺序以提高数据库性能。

时间戳是自 UTC 1582 年 10 月 15 日 00:00:00.00 以来的时间，单位是 100 纳秒。以下表为例，这个时间戳是
`0x001122334455677`，即 30141738682533500 纳秒，合 30141738.6825335 秒，得 1583-09-28 20:42:18.6825335 。

| 位置                                                  | 字段        | 字段                                   |
|-----------------------------------------------------|-----------|--------------------------------------|
| <pre>**00112233**-4455-6677-8899-aabbccddeeff</pre> | time_high | 时间戳（高位）。                             |
| <pre>00112233-**4455**-6677-8899-aabbccddeeff</pre> | time_mid  | 时间戳（中位）。                             |
| <pre>00112233-4455-**6**677-8899-aabbccddeeff</pre> | version   | OSF's DCE UUID 的版本。                  |
| <pre>00112233-4455-6**677**-8899-aabbccddeeff</pre> | time_low  | 时间戳（低位）。                             |
| <pre>00112233-4455-6677-**8**899-aabbccddeeff</pre> | variant   | UUID 的种类。                            |
| <pre>00112233-4455-6677-8**899**-aabbccddeeff</pre> | clock_seq | 时钟序列，用以避免时钟回拨或节点变化导致的重复。             |
| <pre>00112233-4455-6677-8899-**aabbccddeeff**</pre> | node      | 节点，由 IEEE 802 MAC 地址组成，通常是主机地址或随机得出。 |

### UUIDv7

第七版 UUID 基于 Unix 毫秒时间戳。

以下表为例，时间戳为 `0x001122334455`，合 73588229.205 秒，得 1972-05-02 01:10:29.205。

随机数共计 48 比特，UUID 碰撞概率为每秒 28,1474,9767,1065,6000（28 亿亿）分之一。

| 位置                                                  | 字段         | 字段                  |
|-----------------------------------------------------|------------|---------------------|
| <pre>**00112233-4455**-7677-8899-aabbccddeeff</pre> | unix_ts_ms | 毫秒级 Unix 时间戳。       |
| <pre>00112233-4455-**7**677-8899-aabbccddeeff</pre> | version    | OSF's DCE UUID 的版本。 |
| <pre>00112233-4455-7**677**-8899-aabbccddeeff</pre> | rand_a     | 随机数。                |
| <pre>00112233-4455-7677-**8**899-aabbccddeeff</pre> | variant    | UUID 的种类。           |
| <pre>00112233-4455-7677-8**899-aabbccddeeff**</pre> | rand_b     | 随机数。                |

### UUIDv8

第八版 UUID 格式取决于生成者，唯一要求是将 `version` 和 `variant` 结构用相应的字段值进行**替换**。

| 位置                                                          | 字段      | 字段                  |
|-------------------------------------------------------------|---------|---------------------|
| <pre>00112233-4455-**8**677-8899-aabbccddeeff</pre>         | version | OSF's DCE UUID 的版本。 |
| <pre>00112233-4455-8677-**8**899-aabbccddeeff</pre>         | variant | UUID 的种类。           |
| <pre>**00112233-4455**-8**677**-8**899-aabbccddeeff**</pre> |         | 自定义结构。              |

## 参考

- [RFC 9562 - Universally Unique IDentifiers \(UUIDs\)](https://www.rfc-editor.org/rfc/rfc9562.html)
- [RFC 4122 - A Universally Unique IDentifier (UUID) URN Namespace](https://www.rfc-editor.org/rfc/rfc4122)


<style scoped>
pre {
    line-height: 16px;
}

table pre {
    line-height: 8px;
}

th, td {
    text-wrap: nowrap;
}
</style>
