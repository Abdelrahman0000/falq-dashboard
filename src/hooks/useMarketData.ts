import { useEffect, useRef, useState } from 'react'
import { getCandleStart, getMockPriceAt } from '../data/mockMarket'
import { fetchMockMarketSnapshot } from '../services/mockMarketApi'
import { subscribeToSimulatedFeed } from '../services/simulatedSocket'
import type { Candle, ConnectionStatus, Timeframe } from '../types'

export function useMarketData(timeframe: Timeframe) {
  const [candles, setCandles] = useState<Candle[]>([])
  const [currentCandle, setCurrentCandle] = useState<Candle | null>(null)
  const [price, setPrice] = useState(() => getMockPriceAt(Math.floor(Date.now() / 1000)))
  const [status, setStatus] = useState<ConnectionStatus>('connecting')
  const [requestVersion, setRequestVersion] = useState(0)
  const [completedRequest, setCompletedRequest] = useState<{ timeframe: Timeframe; version: number } | null>(null)
  const [fetchError, setFetchError] = useState<{ timeframe: Timeframe; version: number; message: string } | null>(null)
  const priceRef = useRef(price)
  const currentCandleRef = useRef<Candle | null>(null)
  const candlesRef = useRef<Candle[]>([])
  const requestIdRef = useRef(0)
  const timeframeRef = useRef(timeframe)

  useEffect(() => {
    timeframeRef.current = timeframe
  }, [timeframe])

  useEffect(() => {
    const requestId = ++requestIdRef.current

    fetchMockMarketSnapshot(timeframe, priceRef.current)
      .then(({ candles: snapshotCandles }) => {
        if (requestId !== requestIdRef.current) return

        const latest = snapshotCandles[snapshotCandles.length - 1]
        if (!latest) {
          throw new Error('The mock market feed returned no candle data.')
        }

        const adjustedLatest = { ...latest, close: priceRef.current }
        adjustedLatest.high = Math.max(adjustedLatest.high, priceRef.current)
        adjustedLatest.low = Math.min(adjustedLatest.low, priceRef.current)
        const history = snapshotCandles.slice(0, -1)
        candlesRef.current = history
        currentCandleRef.current = adjustedLatest
        setCandles(history)
        setCurrentCandle(adjustedLatest)
        setCompletedRequest({ timeframe, version: requestVersion })
      })
      .catch((cause: unknown) => {
        if (requestId !== requestIdRef.current) return
        setFetchError({
          timeframe,
          version: requestVersion,
          message: cause instanceof Error ? cause.message : 'An unexpected mock data error occurred.',
        })
      })

    return () => {
      requestIdRef.current += 1
    }
  }, [timeframe, requestVersion])

  useEffect(() => {
    const unsubscribe = subscribeToSimulatedFeed(
      ({ price: nextPrice, time }) => {
        priceRef.current = nextPrice
        setPrice(nextPrice)

        const current = currentCandleRef.current
        if (!current) return

        const candleTime = getCandleStart(Number(time), timeframeRef.current) as Candle['time']
        if (Number(candleTime) > Number(current.time)) {
          const completed = [...candlesRef.current, current].slice(-149)
          const nextCandle = {
            time: candleTime,
            open: current.close,
            high: Math.max(current.close, nextPrice),
            low: Math.min(current.close, nextPrice),
            close: nextPrice,
          }
          candlesRef.current = completed
          currentCandleRef.current = nextCandle
          setCandles(completed)
          setCurrentCandle(nextCandle)
          return
        }

        const updatedCandle = {
          ...current,
          high: Math.max(current.high, nextPrice),
          low: Math.min(current.low, nextPrice),
          close: nextPrice,
        }
        currentCandleRef.current = updatedCandle
        setCurrentCandle(updatedCandle)
      },
      setStatus,
    )
    return unsubscribe
  }, [])

  const requestCompleted = completedRequest?.timeframe === timeframe
    && completedRequest.version === requestVersion
  const requestFailed = fetchError?.timeframe === timeframe
    && fetchError.version === requestVersion
  const loading = !requestCompleted && !requestFailed
  const error = requestFailed ? fetchError.message : null
  const retry = () => setRequestVersion((version) => version + 1)
  return { candles, currentCandle, price, status, loading, error, retry }
}
