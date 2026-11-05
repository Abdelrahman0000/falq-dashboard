import type { UTCTimestamp } from 'lightweight-charts'

export type Timeframe = '1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1M'
export type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected'

export interface Candle {
  time: UTCTimestamp
  open: number
  high: number
  low: number
  close: number
}

export interface MarketSnapshot {
  candles: Candle[]
}

export interface PriceTick {
  price: number
  time: UTCTimestamp
}
