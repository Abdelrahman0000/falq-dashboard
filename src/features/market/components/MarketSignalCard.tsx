import type { Timeframe } from '../../../types'
import type { MarketSignal } from '../data/marketSignal'

interface MarketSignalCardProps {
  signal: MarketSignal
  timeframe: Timeframe
}

export function MarketSignalCard({ signal, timeframe }: MarketSignalCardProps) {
  return (
    <section className="signal-card panel">
      <div className="card-heading">
        <h2>Market Signal · {timeframe}</h2>
        <span className={`state-badge ${signal.direction}`}>{signal.direction.toUpperCase()}</span>
      </div>
      <p className="signal-description">{signal.description}</p>
      <div className="confidence-label">
        <span>CONFIDENCE</span>
        <strong>{signal.confidence}%</strong>
      </div>
      <div className="confidence-track">
        <span style={{ width: `${signal.confidence}%` }} />
      </div>
      <p className="signal-caption">Illustrative mock signal for the selected timeframe.</p>
      <div className="signal-tags">
        <span>Trend: {signal.trend}</span>
        <span>Volatility: {signal.volatility}</span>
      </div>
    </section>
  )
}
