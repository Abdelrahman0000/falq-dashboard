import {
  BarChart3,
  History,
  LayoutDashboard,
  Settings,
  Signal,
} from 'lucide-react'

const navigationItems = [
  { label: 'Overview', Icon: LayoutDashboard, active: true },
  { label: 'Market analysis', Icon: BarChart3, active: false },
  { label: 'Signals', Icon: Signal, active: false },
  { label: 'History', Icon: History, active: false },
  { label: 'Settings', Icon: Settings, active: false },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="side-nav" aria-label="Main navigation">
        {navigationItems.map(({ label, Icon, active }) => (
          <button
            key={label}
            className={active ? 'nav-item active' : 'nav-item'}
            type="button"
            aria-current={active ? 'page' : undefined}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="workspace">
        <span className="workspace-label">WORKSPACE</span>
        <strong>Gold &amp; Metals</strong>
        <span className="environment-pill">DEMO ENVIRONMENT</span>
      </div>
    </aside>
  )
}
