/**
 * 求序列的乘积。
 */
export function pi(arr: bigint[]): bigint {
    return arr.reduce((prev, curr) => prev * curr, BigInt(1))
}

export function limit(floor: number, n: number, ceiling: number): number {
    if (floor > n)
        return floor
    if (n > ceiling)
        return ceiling
    return n
}

export function percentageRound(n: number): number {
    return limit(0, n, 100)
}
