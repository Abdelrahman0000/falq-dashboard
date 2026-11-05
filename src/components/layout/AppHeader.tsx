import { Bell, LoaderCircle, Wifi, WifiOff } from 'lucide-react'
import { getConnectionLabel } from '../../lib/formatters'
import type { ConnectionStatus } from '../../types'
import { Brand } from './Brand'

interface AppHeaderProps {
  status: ConnectionStatus
  utcTime: string
}

export function AppHeader({ status, utcTime }: AppHeaderProps) {
  const StatusIcon = status === 'disconnected'
    ? WifiOff
    : status === 'reconnecting' || status === 'connecting'
      ? LoaderCircle
      : Wifi

  return (
    <header className="topbar">
      <Brand />
      <div className="topbar-meta">
        <span className="utc-clock">UTC {utcTime}</span>
        <span className={`connection-pill ${status}`} aria-live="polite" aria-atomic="true">
          <StatusIcon size={12} aria-hidden="true" />
          {getConnectionLabel(status)}
        </span>
        <button className="mobile-bell" type="button" aria-label="Notifications">
          <Bell size={14} />
        </button>
      </div>
    </header>
  )
}
