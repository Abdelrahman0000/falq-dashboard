import { describe, expect, it } from 'vitest'
import { createMockCandles, getCandleStart, getNextCandleStart } from './mockMarket'

const NOW = Date.UTC(2026, 10, 5, 14, 30) / 1000

describe('mock market data', () => {
  it.each(['1m', '5m', '15m', '1H', '4H', '1D', '1M'] as const)(
    'creates correctly ordered %s candles with valid OHLC ranges',
    (timeframe) => {
      const candles = createMockCandles(timeframe, 30, NOW, 2349)

      expect(candles).toHaveLength(30)
      expect(candles.at(-1)?.close).toBe(2349)
      expect(Number(candles.at(-1)?.time)).toBe(getCandleStart(NOW, timeframe))

      for (let index = 0; index < candles.length; index += 1) {
        const candle = candles[index]
        expect(candle.high).toBeGreaterThanOrEqual(Math.max(candle.open, candle.close))
        expect(candle.low).toBeLessThanOrEqual(Math.min(candle.open, candle.close))
        if (index > 0) {
          expect(Number(candle.time)).toBe(
            getNextCandleStart(Number(candles[index - 1].time), timeframe),
          )
          expect(candle.open).toBe(candles[index - 1].close)
        }
      }
    },
  )

  it('uses UTC day boundaries and calendar month boundaries', () => {
    const dailyStart = getCandleStart(NOW, '1D')
    const monthlyStart = getCandleStart(NOW, '1M')

    expect(new Date(dailyStart * 1000).toISOString()).toBe('2026-11-05T00:00:00.000Z')
    expect(new Date(monthlyStart * 1000).toISOString()).toBe('2026-11-01T00:00:00.000Z')
    expect(new Date(getNextCandleStart(monthlyStart, '1M') * 1000).toISOString())
      .toBe('2026-12-01T00:00:00.000Z')
    expect(new Date(getNextCandleStart(Date.UTC(2026, 11, 1) / 1000, '1M') * 1000).toISOString())
      .toBe('2027-01-01T00:00:00.000Z')
  })

  it('keeps candle boundary prices consistent between minute and hourly views', () => {
    const minuteCandles = createMockCandles('1m', 181, NOW, 2349)
    const hourlyCandles = createMockCandles('1H', 3, NOW, 2349)
    const currentHourStart = getCandleStart(NOW, '1H')
    const minuteAtHourStart = minuteCandles.find((candle) => Number(candle.time) === currentHourStart)
    const hour = hourlyCandles.at(-1)

    expect(hour?.open).toBe(minuteAtHourStart?.open)
    expect(hour?.close).toBe(2349)
  })
})
