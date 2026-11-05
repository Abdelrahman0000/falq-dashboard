import type { Timeframe } from '../../../types'

export const MARKET_TIMEFRAMES: Timeframe[] = ['1m', '5m', '15m', '1H', '4H', '1D', '1M']

export const MARKET_SUMMARY = {
  high: '2,361.40',
  low: '2,318.65',
  volume: '184.2K oz',
}

export const MARKET_ACTIVITY = [
  { time: '12:04:52', description: 'Price update', value: 'current-price', tone: 'green' },
  { time: '12:04:38', description: '24h high check passed', value: '+$14.80', tone: 'green' },
  { time: '12:03:29', description: 'Signal refreshed', value: '78% confidence', tone: 'gold-text' },
] as const

export const RISK_METRICS = [
  { label: 'Volatility', value: 'Moderate' },
  { label: 'Spread', value: '0.32' },
  { label: 'Trend strength', value: '72 / 100' },
  { label: 'Support', value: '$2,331.50' },
] as const
