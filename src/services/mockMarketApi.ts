import { createMockCandles } from '../data/mockMarket'
import type { MarketSnapshot, Timeframe } from '../types'

export async function fetchMockMarketSnapshot(
  timeframe: Timeframe,
  currentPrice: number,
): Promise<MarketSnapshot> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 320))
  return { candles: createMockCandles(timeframe, 90, Math.floor(Date.now() / 1000), currentPrice) }
}
