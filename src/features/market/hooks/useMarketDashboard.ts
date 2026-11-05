import { useState } from 'react'
import { useMarketData } from '../../../hooks/useMarketData'
import type { Timeframe } from '../../../types'
import { deriveMarketSignal } from '../data/marketSignal'

export function useMarketDashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>('15m')
  const market = useMarketData(timeframe)
  const signalCandles = market.currentCandle
    ? [...market.candles, market.currentCandle]
    : market.candles
  const signal = deriveMarketSignal(signalCandles)

  return {
    ...market,
    signal,
    timeframe,
    setTimeframe,
  }
}
