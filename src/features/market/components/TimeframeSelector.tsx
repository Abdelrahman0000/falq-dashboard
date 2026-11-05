import type { Timeframe } from '../../../types'

interface TimeframeSelectorProps {
  value: Timeframe
  options: readonly Timeframe[]
  onChange: (timeframe: Timeframe) => void
}

export function TimeframeSelector({ value, options, onChange }: TimeframeSelectorProps) {
  return (
    <div className="timeframe-tabs" role="group" aria-label="Chart timeframe">
      {options.map((timeframe) => (
        <button
          key={timeframe}
          className={value === timeframe ? 'timeframe-button selected' : 'timeframe-button'}
          type="button"
          aria-pressed={value === timeframe}
          onClick={() => onChange(timeframe)}
        >
          {timeframe}
        </button>
      ))}
    </div>
  )
}
