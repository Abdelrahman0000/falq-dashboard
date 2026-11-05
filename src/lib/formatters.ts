import type { ConnectionStatus } from '../types'

export function formatPrice(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatUtcTime(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export function getConnectionLabel(status: ConnectionStatus) {
  switch (status) {
    case 'connected':
      return 'CONNECTED'
    case 'reconnecting':
      return 'RECONNECTING'
    case 'disconnected':
      return 'DISCONNECTED'
    default:
      return 'CONNECTING'
  }
}
