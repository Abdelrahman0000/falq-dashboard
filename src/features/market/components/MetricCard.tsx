interface MetricCardProps {
  label: string
  value: string
  caption: string
  valueTone?: 'green' | 'blue'
  captionTone?: 'green'
  className?: string
}

export function MetricCard({
  label,
  value,
  caption,
  valueTone,
  captionTone,
  className = '',
}: MetricCardProps) {
  const valueClassName = ['metric-value', valueTone].filter(Boolean).join(' ')
  const captionClassName = ['metric-caption', captionTone].filter(Boolean).join(' ')

  return (
    <article className={`metric-card ${className}`.trim()}>
      <span className="metric-label">{label}</span>
      <strong className={valueClassName}>{value}</strong>
      <span className={captionClassName}>{caption}</span>
    </article>
  )
}
