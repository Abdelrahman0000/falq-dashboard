import type { Candle } from '../../../types'

export type MarketSignalDirection = 'bullish' | 'bearish' | 'neutral'
export type MarketVolatility = 'Low' | 'Moderate' | 'High'

export interface MarketSignal {
  direction: MarketSignalDirection
  confidence: number
  description: string
  trend: 'Upward' | 'Downward' | 'Sideways'
  volatility: MarketVolatility
}

export function deriveMarketSignal(candles: readonly Candle[]): MarketSignal {
  if (candles.length < 2) {
    return {
      direction: 'neutral',
      confidence: 50,
      description: 'Not enough data to determine momentum',
      trend: 'Sideways',
      volatility: 'Low',
    }
  }

  const first = candles[0].close
  const last = candles[candles.length - 1].close
  const changePercent = ((last - first) / first) * 100
  const direction: MarketSignalDirection = changePercent > 0.02
    ? 'bullish'
    : changePercent < -0.02
      ? 'bearish'
      : 'neutral'
  const confidence = Math.min(95, Math.max(50, Math.round(50 + Math.abs(changePercent) * 20)))
  const averageRangePercent = candles.reduce(
    (total, candle) => total + ((candle.high - candle.low) / candle.close) * 100,
    0,
  ) / candles.length
  const volatility: MarketVolatility = averageRangePercent < 0.1
    ? 'Low'
    : averageRangePercent < 0.3
      ? 'Moderate'
      : 'High'

  return {
    direction,
    confidence,
    description: direction === 'bullish'
      ? 'Momentum favors upside'
      : direction === 'bearish'
        ? 'Momentum favors downside'
        : 'Momentum is mixed',
    trend: direction === 'bullish' ? 'Upward' : direction === 'bearish' ? 'Downward' : 'Sideways',
    volatility,
  }
}
