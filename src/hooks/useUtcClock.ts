import { useEffect, useState } from 'react'
import { formatUtcTime } from '../lib/formatters'

export function useUtcClock() {
  const [time, setTime] = useState(() => formatUtcTime(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatUtcTime(new Date())), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return time
}
