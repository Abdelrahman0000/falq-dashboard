import type { Candle, Timeframe } from '../types'

const INTERVAL_SECONDS: Record<Exclude<Timeframe, '1M'>, number> = {
  '1m': 60,
  '5m': 300,
  '15m': 900,
  '1H': 3600,
  '4H': 14400,
  '1D': 86400,
}

const STARTING_PRICE = 2347.82
const DAY_SECONDS = 86400
const MOCK_PRICE_ANCHOR = Math.floor(Date.now() / DAY_SECONDS) * DAY_SECONDS

export function getCandleStart(timestamp: number, timeframe: Timeframe) {
  if (timeframe === '1M') {
    const date = new Date(timestamp * 1000)
    date.setUTCDate(1)
    date.setUTCHours(0, 0, 0, 0)
    return Math.floor(date.getTime() / 1000)
  }

  const interval = INTERVAL_SECONDS[timeframe]
  return Math.floor(timestamp / interval) * interval
}

export function getNextCandleStart(candleStart: number, timeframe: Timeframe) {
  if (timeframe === '1M') {
    const date = new Date(candleStart * 1000)
    date.setUTCMonth(date.getUTCMonth() + 1)
    return Math.floor(date.getTime() / 1000)
  }

  return candleStart + INTERVAL_SECONDS[timeframe]
}

export function getPreviousCandleStart(candleStart: number, timeframe: Timeframe) {
  if (timeframe === '1M') {
    const date = new Date(candleStart * 1000)
    date.setUTCMonth(date.getUTCMonth() - 1)
    return Math.floor(date.getTime() / 1000)
  }

  return candleStart - INTERVAL_SECONDS[timeframe]
}

export function getMockPriceAt(timestamp: number) {
  const elapsed = timestamp - MOCK_PRICE_ANCHOR
  const intraday = Math.sin((elapsed / 7200) * Math.PI * 2) * 2.4
    + Math.sin((elapsed / 19800) * Math.PI * 2) * 1.6
    + Math.sin((elapsed / DAY_SECONDS) * Math.PI * 2) * 1.1
  const trend = Math.tanh(elapsed / (DAY_SECONDS * 365 * 2)) * 1.8
  return Number((STARTING_PRICE + intraday + trend).toFixed(2))
}

function createCandle(
  timeframe: Timeframe,
  time: number,
  now: number,
  currentPrice: number,
): Candle {
  const nextTime = getNextCandleStart(time, timeframe)
  const open = getMockPriceAt(time)
  const close = time === getCandleStart(now, timeframe)
    ? currentPrice
    : getMockPriceAt(nextTime)
  const duration = nextTime - time
  const sampleCount = Math.min(256, Math.max(12, Math.ceil(duration / 900)))
  let high = Math.max(open, close)
  let low = Math.min(open, close)

  for (let sample = 1; sample < sampleCount; sample += 1) {
    const sampleTime = time + (duration * sample) / sampleCount
    const samplePrice = getMockPriceAt(sampleTime)
    high = Math.max(high, samplePrice)
    low = Math.min(low, samplePrice)
  }

  return {
    time: time as Candle['time'],
    open,
    high: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    close,
  }
}

export function createMockCandles(
  timeframe: Timeframe,
  count = 90,
  now = Math.floor(Date.now() / 1000),
  currentPrice = getMockPriceAt(now),
): Candle[] {
  const currentCandleStart = getCandleStart(now, timeframe)
  const starts = [currentCandleStart]

  for (let index = 1; index < count; index += 1) {
    starts.unshift(getPreviousCandleStart(starts[0], timeframe))
  }

  return starts.map((time) => createCandle(timeframe, time, now, currentPrice))
}
