import type { ReactNode } from 'react'
import type { ConnectionStatus } from '../../types'
import { useUtcClock } from '../../hooks/useUtcClock'
import { AppHeader } from './AppHeader'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  status: ConnectionStatus
}

export function DashboardLayout({ children, status }: DashboardLayoutProps) {
  const utcTime = useUtcClock()

  return (
    <div className="app-shell">
      <AppHeader status={status} utcTime={utcTime} />
      <Sidebar />
      <main className="main-content">
        <div className="dashboard">{children}</div>
      </main>
      <div className="mobile-demo">DEMO ENVIRONMENT <span>·</span> Simulated market data</div>
    </div>
  )
}
