import { CandlestickSeries, ColorType, createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts'
import { useEffect, useRef } from 'react'
import type { Candle, Timeframe } from '../../types'

interface MarketChartProps {
  candles: Candle[]
  currentCandle: Candle | null
  loading: boolean
  timeframe: Timeframe
}

export function MarketChart({ candles, currentCandle, loading, timeframe }: MarketChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const currentCandleRef = useRef(currentCandle)
  const loadedTimeframeRef = useRef<Timeframe | null>(null)
  const loadedCandlesRef = useRef<Candle[] | null>(null)

  useEffect(() => {
    currentCandleRef.current = currentCandle
  }, [currentCandle])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: '#0e1521' },
        textColor: '#74839a',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(144, 158, 177, 0)' },
        horzLines: { color: 'rgba(144, 158, 177, 0.11)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(144, 158, 177, 0.12)',
        scaleMargins: { top: 0.12, bottom: 0.1 },
      },
      timeScale: {
        borderColor: 'rgba(144, 158, 177, 0.12)',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 4,
        barSpacing: 8,
      },
      crosshair: {
        vertLine: { color: 'rgba(214, 174, 89, 0.4)', labelBackgroundColor: '#c49b4c' },
        horzLine: { color: 'rgba(214, 174, 89, 0.4)', labelBackgroundColor: '#c49b4c' },
      },
      handleScroll: { vertTouchDrag: false },
    })
    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#20d49a',
      downColor: '#f05b78',
      borderUpColor: '#20d49a',
      borderDownColor: '#f05b78',
      wickUpColor: '#20d49a',
      wickDownColor: '#f05b78',
      priceLineColor: '#efb847',
      priceLineStyle: 2,
      lastValueVisible: true,
    })

    chartRef.current = chart
    seriesRef.current = series
    const previousWidth = { current: container.clientWidth }
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width === undefined || Math.abs(width - previousWidth.current) < 40) return
      previousWidth.current = width
      if (seriesRef.current) chart.timeScale().fitContent()
    })
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [])

  useEffect(() => {
    const series = seriesRef.current
    if (!series || loading || candles.length === 0) return

    if (loadedTimeframeRef.current !== timeframe) {
      const latest = currentCandleRef.current
      series.setData(latest ? [...candles, latest] : candles)
      loadedTimeframeRef.current = timeframe
      loadedCandlesRef.current = candles
      chartRef.current?.timeScale().fitContent()
      return
    }

    if (loadedCandlesRef.current !== candles) {
      loadedCandlesRef.current = candles
      const latest = currentCandleRef.current
      if (latest) series.update(latest)
    }
  }, [candles, loading, timeframe])

  useEffect(() => {
    if (loadedTimeframeRef.current !== timeframe || !currentCandle) return
    seriesRef.current?.update(currentCandle)
  }, [currentCandle, timeframe])

  return (
    <div className="chart-plot">
      {loading && <div className="chart-loading">Preparing simulated price history…</div>}
      <div className="chart-canvas" ref={containerRef} aria-label={`XAU/USD ${timeframe} candlestick chart`} />
    </div>
  )
}
