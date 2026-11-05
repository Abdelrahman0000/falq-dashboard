import { describe, expect, it } from 'vitest'
import { createMockCandles, getMockPriceAt } from '../../../data/mockMarket'
import { deriveMarketSignal } from './marketSignal'
import type { Candle } from '../../../types'

const NOW = Date.UTC(2026, 10, 5, 14, 30) / 1000

function makeCandles(closes: number[]): Candle[] {
  return closes.map((close, index) => ({
    time: (index * 60) as Candle['time'],
    open: close,
    high: close + 0.2,
    low: close - 0.2,
    close,
  }))
}

describe('market signal', () => {
  it('derives a bullish signal from rising candles', () => {
    const signal = deriveMarketSignal(makeCandles([100, 101, 103]))

    expect(signal.direction).toBe('bullish')
    expect(signal.trend).toBe('Upward')
    expect(signal.confidence).toBeGreaterThan(50)
  })

  it('changes direction and confidence for the selected candle history', () => {
    const bullish = deriveMarketSignal(makeCandles([100, 101, 103]))
    const bearish = deriveMarketSignal(makeCandles([103, 101, 100]))

    expect(bearish.direction).toBe('bearish')
    expect(bearish.trend).toBe('Downward')
    expect(bearish.confidence).toBe(bullish.confidence)
  })

  it('returns a neutral signal if there is not enough history', () => {
    expect(deriveMarketSignal([])).toMatchObject({
      direction: 'neutral',
      confidence: 50,
      trend: 'Sideways',
    })
  })

  it('derives different readings from different timeframe histories', () => {
    const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1M'] as const
    const readings = timeframes.map((timeframe) => {
      const candles = createMockCandles(timeframe, 90, NOW, getMockPriceAt(NOW))
      return deriveMarketSignal(candles)
    })
    const uniqueReadings = new Set(
      readings.map(({ direction, confidence, volatility }) => `${direction}:${confidence}:${volatility}`),
    )

    expect(uniqueReadings.size).toBeGreaterThan(1)
  })
})
