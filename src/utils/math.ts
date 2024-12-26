import type { integer } from "@vue/language-server";

export function pi(arr: bigint[]): bigint {
    return arr.reduce((prev, curr) => prev * curr, BigInt(1))
}

// https://stackoverflow.com/a/70384828
export function getNaturalLogarithm(i: bigint) {
    if (i < 0)
        return NaN;

    const s = i.toString(16);
    const s15 = s.substring(0, 15);

    return Math.log(16) * (s.length - s15.length) + Math.log(Number("0x" + s15));
}

export function getLogarithm(i: bigint, base: integer): number {
    if (i < 0)
        return NaN
    return getNaturalLogarithm(i) / Math.log(base);
}

export function isInteger(n: number, accuracy: number): boolean {
    const decimal = n % 1;
    if (decimal < 0.5)
        return decimal < accuracy
    return 1 - decimal < accuracy
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
