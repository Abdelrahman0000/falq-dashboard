import { formatPrice } from '../../../lib/formatters'
import { MARKET_ACTIVITY } from '../data/marketDashboard'

interface RecentMarketActivityProps {
  price: number
}

export function RecentMarketActivity({ price }: RecentMarketActivityProps) {
  return (
    <section className="activity-card panel">
      <div className="card-heading">
        <div>
          <h2>Recent Market Activity</h2>
          <p>Latest simulated price movements</p>
        </div>
      </div>
      {MARKET_ACTIVITY.map((activity) => (
        <div className="activity-row" key={activity.time}>
          <span>{activity.time}</span>
          <strong>{activity.description}</strong>
          <b className={activity.tone}>
            {activity.value === 'current-price' ? `$${formatPrice(price)}` : activity.value}
          </b>
        </div>
      ))}
    </section>
  )
}
