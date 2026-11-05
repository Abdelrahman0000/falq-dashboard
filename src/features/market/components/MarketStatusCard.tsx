import type { ConnectionStatus } from '../../../types'
import { getConnectionLabel } from '../../../lib/formatters'

interface MarketStatusCardProps {
  status: ConnectionStatus
}

export function MarketStatusCard({ status }: MarketStatusCardProps) {
  const statusLabel = getConnectionLabel(status)

  return (
    <section className="market-status-card panel">
      <div className="card-heading">
        <h2>Market Status</h2>
        <span className="state-badge market-open">MARKET OPEN</span>
      </div>
      <dl className="status-list">
        <div>
          <dt>Feed status</dt>
          <dd className={status === 'connected' ? 'green' : 'gold-text'}>
            {statusLabel === 'CONNECTED' ? 'Connected' : statusLabel.toLowerCase()}
          </dd>
        </div>
        <div><dt>Last heartbeat</dt><dd>2 sec ago</dd></div>
        <div><dt>Data source</dt><dd>Mock REST + WS</dd></div>
        <div><dt>Session</dt><dd>London / NY overlap</dd></div>
      </dl>
    </section>
  )
}
