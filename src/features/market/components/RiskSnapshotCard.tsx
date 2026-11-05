import { RISK_METRICS } from '../data/marketDashboard'

export function RiskSnapshotCard() {
  return (
    <section className="risk-card panel">
      <div className="card-heading">
        <div>
          <h2>Risk Snapshot</h2>
          <p>Illustrative metrics</p>
        </div>
      </div>
      <dl className="risk-list">
        {RISK_METRICS.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
