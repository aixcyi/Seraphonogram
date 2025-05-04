import { UTCDate } from '@date-fns/utc'
import type { integer } from '@vue/language-server'
import { format } from 'date-fns'
import { pi } from './math'

export enum DurationLevel {
    NANOSECOND,
    MICROSECOND,
    MILLISECOND,
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    YEAR,
}

export class Duration {
    static POWERS = [ 1000n, 1000n, 1000n, 60n, 60n, 24n, 365n ]

    private parts: integer[] = [ 0, 0, 0, 0, 0, 0, 0, 0 ]

    constructor(t: bigint, level?: DurationLevel) {
        let lefts = level == null ? t : t * pi(Duration.POWERS.slice(0, level))
        Duration.POWERS.forEach((power, index) => {
            this.parts[index] = Number(lefts % power)
            lefts = lefts / power
        })
        this.parts[DurationLevel.YEAR] = Number(lefts)
    }

    get year(): integer {
        return this.parts[DurationLevel.YEAR]
    }

    set year(v: integer) {
        this.parts[DurationLevel.YEAR] = v
    }

    get day(): integer {
        return this.parts[DurationLevel.DAY]
    }

    set day(v: integer) {
        this.parts[DurationLevel.DAY] = v
    }

    get hour(): integer {
        return this.parts[DurationLevel.HOUR]
    }

    set hour(v: integer) {
        this.parts[DurationLevel.HOUR] = v
    }

    get minute(): integer {
        return this.parts[DurationLevel.MINUTE]
    }

    set minute(v: integer) {
        this.parts[DurationLevel.MINUTE] = v
    }

    get second(): integer {
        return this.parts[DurationLevel.SECOND]
    }

    set second(v: integer) {
        this.parts[DurationLevel.SECOND] = v
    }

    get millisecond(): integer {
        return this.parts[DurationLevel.MILLISECOND]
    }

    set millisecond(v: integer) {
        this.parts[DurationLevel.MILLISECOND] = v
    }

    get microsecond(): integer {
        return this.parts[DurationLevel.MICROSECOND]
    }

    set microsecond(v: integer) {
        this.parts[DurationLevel.MICROSECOND] = v
    }

    get nanosecond(): integer {
        return this.parts[DurationLevel.NANOSECOND]
    }

    set nanosecond(v: integer) {
        this.parts[DurationLevel.NANOSECOND] = v
    }

    static fromDays(s: bigint) {
        return new Duration(s, DurationLevel.DAY)
    }

    static fromSeconds(s: bigint) {
        return new Duration(s, DurationLevel.SECOND)
    }

    static fromMilliseconds(ms: bigint) {
        return new Duration(ms, DurationLevel.MILLISECOND)
    }

    toSeconds() {
        const integer = [
            [ this.year, DurationLevel.YEAR ],
            [ this.day, DurationLevel.DAY ],
            [ this.hour, DurationLevel.HOUR ],
            [ this.minute, DurationLevel.MINUTE ],
            [ this.second, DurationLevel.SECOND ],
        ].map(
            v => BigInt(v[0]) * pi(Duration.POWERS.slice(DurationLevel.SECOND, v[1]))
        ).reduce(
            (prev, curr) => prev + curr, 0n
        )
        const decimal =
            `${this.millisecond.toString().padStart(3, '0')}`
            + `${this.microsecond.toString().padStart(3, '0')}`
            + `${this.nanosecond.toString().padStart(3, '0')}`;

        return Number(`${integer}.${decimal}`)
    }

    toMilliseconds() {
        const integer = [
            [ this.year, DurationLevel.YEAR ],
            [ this.day, DurationLevel.DAY ],
            [ this.hour, DurationLevel.HOUR ],
            [ this.minute, DurationLevel.MINUTE ],
            [ this.second, DurationLevel.SECOND ],
            [ this.millisecond, DurationLevel.MILLISECOND ],
        ].map(
            v => BigInt(v[0]) * pi(Duration.POWERS.slice(DurationLevel.MILLISECOND, v[1]))
        ).reduce(
            (prev, curr) => prev + curr, 0n
        )
        const decimal =
            `${this.microsecond.toString().padStart(3, '0')}`
            + `${this.nanosecond.toString().padStart(3, '0')}`;

        return Number(`${integer}.${decimal}`)
    }

    toUTCDate() {
        return new UTCDate(this.toMilliseconds())
    }

    toUTCDateString(fmt: string, _default: string) {
        try {
            return format(this.toUTCDate(), fmt)
        } catch (e) {
            return _default
        }
    }

    getLeadingZeroQty() {
        for (let i = this.parts.length; i > 0; i--) {
            if (this.parts[i] > 0)
                return this.parts.length - i - 1
        }
        return this.parts.length
    }
}
