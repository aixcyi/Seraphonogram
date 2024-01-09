# 整数转罗马数字

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2024年1月9日](https://img.shields.io/badge/Release-2024.01.09-purple.svg) ![题目来自力扣](https://img.shields.io/badge/LeetCode-12-FFA116?logo=leetcode&logoColor=FFA116)

## 题目

见[力扣](https://leetcode.cn/problems/integer-to-roman/)或[LeetCode](https://leetcode.com/problems/integer-to-roman/)。

## 样例

输入的整数的取值范围是 `[1, 3999]` 。

| 输入   | 输出        | 备注                                 |
| ------ | ----------- | ------------------------------------ |
| `3`    | `"III"`     |                                      |
| `4`    | `"IV"`      |                                      |
| `9`    | `"IX"`      |                                      |
| `58`   | `"LVIII"`   | L = 50, V = 5, III = 3.              |
| `1994` | `"MCMXCIV"` | M = 1000, CM = 900, XC = 90, IV = 4. |

## 思路

从罗马数字的拼写规则（见[《整数转罗马数字》](./leetcode-13-roman-to-integer.md#思路)）以及上面的样例可以看出，十进制每位数都可以单独转换过去，拼接之后就是最终的罗马数字。

从样例可以看出，`1` 到 `4` 对应 10<sup>x</sup> 的情况，`5` 到 `9` 对应 10<sup>x</sup>+5 的情况，`0` 是一个特殊值，因为不需要任何罗马数字相加即可得到，所以应当返回空字符串。

另外，因为罗马数字连续不能超过3个，所以 `4` 和 `9` 是特殊情况。

那么在第 `power+1` 位的数字 `digit` 是：

- `0` 时返回 `""` 。
- `1` 到 `3` 时返回 `digit` 个 10<sup>power</sup> ，比如
  - `3` 是 `III`
  - `30` 是 `XXX`
  - `300` 是 `CCC`
- `4` 时是 10<sup>x</sup>+5 减去一个相邻的 10<sup>power</sup> ，比如
  - `4` 是 `V` 减去 `I` 得到 `IV`（5-1=4）
  - `40` 是 `L` 减去 `X` 得到 `XL`（50-10=40）
  - `400` 是 `D` 减去 `C` 得到 `CD`（500-100=40）
- `5` 到 `8` 时返回一个 10<sup>power</sup>+5 和 `digit-5` 个相邻的 10<sup>power</sup> ，比如
  - `8` 是一个 `V` 加上8-5=3个 `I`（5+1+1+1=8）
  - `70` 是一个 `L` 加上7-5=2个 `X`（50+10+10=70）
  - `600` 是一个 `D` 加上6-5=1个 `C`（500+100=600）
- `9` 时是下一个 10<sup>power</sup> 减去前一个相邻的 10<sup>power</sup> ，比如
  - `9` 是 `X` 减去 `I` 得到 `IX`（10-1=9）
  - `90` 是 `C` 减去 `X` 得到 `XC`（100-10=90）
  - `900` 是 `M` 减去 `C` 得到 `CM`（1000-100=900）

## 代码

```python
class Solution:

    def intToRoman(self, num: int) -> int:
        result = []
        for power, digit in enumerate(str(num)[::-1]):
            digit = int(digit)
            if digit == 0:
                result.insert(0, '')
            elif digit < 4:
                majors = 'IXCM'
                result.insert(0, f'{majors[power] * digit}')
            elif digit == 4:
                majors = 'VLD'
                minors = 'IXC'
                result.insert(0, f'{minors[power]}{majors[power]}')
            elif digit < 9:
                majors = 'VLD'
                minors = 'IXC'
                result.insert(0, f'{majors[power]}{minors[power] * (digit - 5)}')
            elif digit == 9:
                majors = 'XCM'
                minors = 'IXC'
                result.insert(0, f'{minors[power]}{majors[power]}')
        return ''.join(result)


sol = Solution()
assert sol.intToRoman(3) == 'III'
assert sol.intToRoman(4) == 'IV'
assert sol.intToRoman(9) == 'IX'
assert sol.intToRoman(58) == 'LVIII'
assert sol.intToRoman(1994) == 'MCMXCIV'
```

