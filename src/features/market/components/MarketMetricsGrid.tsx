import { formatPrice } from '../../../lib/formatters'
import { MARKET_SUMMARY } from '../data/marketDashboard'
import { MetricCard } from './MetricCard'

interface MarketMetricsGridProps {
  price: number
}

export function MarketMetricsGrid({ price }: MarketMetricsGridProps) {
  return (
    <section className="metrics-grid" aria-label="Gold market summary">
      <MetricCard
        label="LAST PRICE"
        value={`$${formatPrice(price)}`}
        caption="+0.84% today"
        valueTone="green"
        captionTone="green"
      />
      <MetricCard label="24H HIGH" value={`$${MARKET_SUMMARY.high}`} caption="Session high" />
      <MetricCard label="24H LOW" value={`$${MARKET_SUMMARY.low}`} caption="Session low" />
      <MetricCard
        className="volume-card"
        label="24H VOLUME"
        value={MARKET_SUMMARY.volume}
        caption="+12.6% vs avg"
        valueTone="blue"
        captionTone="green"
      />
    </section>
  )
}
