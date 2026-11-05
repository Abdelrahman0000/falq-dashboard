import { MarketChart } from '../../../components/charts/MarketChart'
import type { Candle, Timeframe } from '../../../types'
import { TimeframeSelector } from './TimeframeSelector'

interface PriceChartCardProps {
  candles: Candle[]
  currentCandle: Candle | null
  loading: boolean
  error: string | null
  timeframe: Timeframe
  timeframes: readonly Timeframe[]
  onTimeframeChange: (timeframe: Timeframe) => void
  onRetry: () => void
}

export function PriceChartCard({
  candles,
  currentCandle,
  loading,
  error,
  timeframe,
  timeframes,
  onTimeframeChange,
  onRetry,
}: PriceChartCardProps) {
  return (
    <section className="chart-card panel">
      <div className="chart-heading">
        <div className="chart-title">
          <h2>XAU/USD · Gold Spot</h2>
          <p>Candlestick · {timeframe}</p>
        </div>
        <span className="live-badge"><span /> LIVE SIMULATION</span>
      </div>
      <TimeframeSelector value={timeframe} options={timeframes} onChange={onTimeframeChange} />
      {error ? (
        <div className="chart-message" role="alert">
          <strong>Market data unavailable. Please try again.</strong>
          <span>{error}</span>
          <button className="retry-button" type="button" onClick={onRetry}>Retry</button>
        </div>
      ) : (
        <MarketChart
          candles={candles}
          currentCandle={currentCandle}
          loading={loading}
          timeframe={timeframe}
        />
      )}
      <div className="chart-footer">
        <span>Last update: just now</span>
        <span>Feed simulated · Auto-refresh 2s</span>
      </div>
    </section>
  )
}
