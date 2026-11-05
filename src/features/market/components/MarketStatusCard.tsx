import type { ConnectionStatus } from '../../../types'
import { getConnectionLabel } from '../../../lib/formatters'

interface MarketStatusCardProps {
  status: ConnectionStatus
  onSimulateDisconnect: () => void
  onReconnect: () => void
}

export function MarketStatusCard({ status, onSimulateDisconnect, onReconnect }: MarketStatusCardProps) {
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
        <div>
          <dt>Price ticks</dt>
          <dd>
            {status === 'connected'
              ? 'Every 2 sec'
              : status === 'disconnected'
                ? 'Paused'
                : 'Waiting…'}
          </dd>
        </div>
        <div><dt>Data source</dt><dd>Mock REST + WS</dd></div>
        <div><dt>Session</dt><dd>London / NY overlap</dd></div>
      </dl>
      <button
        className="connection-action"
        type="button"
        onClick={status === 'disconnected' ? onReconnect : onSimulateDisconnect}
        disabled={status === 'connecting'}
      >
        {status === 'disconnected' ? 'Reconnect feed' : 'Simulate disconnect'}
      </button>
    </section>
  )
}
