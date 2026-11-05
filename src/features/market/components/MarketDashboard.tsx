import { DashboardLayout } from '../../../components/layout/DashboardLayout'
import { useMarketDashboard } from '../hooks/useMarketDashboard'
import { MARKET_TIMEFRAMES } from '../data/marketDashboard'
import { DemoDisclaimer } from './DemoDisclaimer'
import { MarketMetricsGrid } from './MarketMetricsGrid'
import { MarketPageHeading } from './MarketPageHeading'
import { MarketSignalCard } from './MarketSignalCard'
import { MarketStatusCard } from './MarketStatusCard'
import { PriceChartCard } from './PriceChartCard'
import { RecentMarketActivity } from './RecentMarketActivity'
import { RiskSnapshotCard } from './RiskSnapshotCard'

export function MarketDashboard() {
  const market = useMarketDashboard()

  return (
    <DashboardLayout status={market.status}>
      <MarketPageHeading />
      <MarketMetricsGrid price={market.price} />

      <div className="dashboard-grid">
        <div className="primary-column">
          <PriceChartCard
            candles={market.candles}
            currentCandle={market.currentCandle}
            loading={market.loading}
            error={market.error}
            timeframe={market.timeframe}
            timeframes={MARKET_TIMEFRAMES}
            onTimeframeChange={market.setTimeframe}
            onRetry={market.retry}
          />
          <div className="lower-grid">
            <RecentMarketActivity price={market.price} />
            <RiskSnapshotCard />
          </div>
        </div>

        <aside className="insights-column">
          <MarketSignalCard signal={market.signal} timeframe={market.timeframe} />
          <MarketStatusCard status={market.status} />
          <DemoDisclaimer />
        </aside>
      </div>
    </DashboardLayout>
  )
}
