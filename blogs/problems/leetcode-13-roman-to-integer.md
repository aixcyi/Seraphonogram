# 罗马数字转整数

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2024年1月8日](https://img.shields.io/badge/Release-2024.01.08-purple.svg) ![题目来自力扣](https://img.shields.io/badge/LeetCode-13-FFA116?logo=leetcode&logoColor=FFA116)

## 题目

见[力扣](https://leetcode.cn/problems/roman-to-integer/)或[LeetCode](https://leetcode.com/problems/roman-to-integer/)。

## 样例

输入的罗马数字的取值范围是 `[1, 3999]` 。

| 输入        | 输出   | 备注                                 |
| ----------- | ------ | ------------------------------------ |
| `"III"`     | `3`    |                                      |
| `"IV"`      | `4`    |                                      |
| `"IX"`      | `9`    |                                      |
| `"LVIII"`   | `58`   | L = 50, V= 5, III = 3.               |
| `"MCMXCIV"` | `1994` | M = 1000, CM = 900, XC = 90, IV = 4. |

## 思路

罗马数字[^1]只有七个，与十进制整数的关系如下：

```python
{'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
```

拼写规则是大致如下：

1. 大数+小数，表示大数加上小数，比如 `XI` 换算为 11 。
2. 小数+大数，表示大数减去小数，比如 `IX` 换算为 9 。
3. 最多连续拼接三个相同的数。所以 40 应当是 `XL` 而不是 `XXXX` 。
4. 小数+大数不能越级，比如 999 应当是 `CMXCIX` 而不是 `IM` 。

推论：

- 由 3、4 可知 “小数+大数” 中的小数最多一位，且不会粘连。
- 由 1、2 结合上一条推论可知，只要左侧比右侧小，那么左侧就是负数。
- 由罗马数字本身可知，它的读取是求和。
- 由拼写规则可知，罗马数字表示极限是 `[1, 3999]` 。

综上，可以将每一位映射出来，并变换成负数，最后直接相加即可。

[^1]: 罗马数字 - 维基百科，https://zh.wikipedia.org/wiki/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97

## 代码

```python
class Solution:
    symbols = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}

    def romanToInt(self, s: str) -> int:
        digits = list(map(self.symbols.__getitem__, s))
        return digits[-1] + sum(
            -prev if prev < nuxt else prev
            for prev, nuxt in zip(digits[:-1], digits[1:])
        )

sol = Solution()
assert sol.romanToInt('III') == 3
assert sol.romanToInt('IV') == 4
assert sol.romanToInt('IX') == 9
assert sol.romanToInt('LVIII') == 58
assert sol.romanToInt('MCMXCIV') == 1994
```

