import { ShieldCheck } from 'lucide-react'

export function DemoDisclaimer() {
  return (
    <div className="disclaimer">
      <ShieldCheck size={12} />
      <span>Demo only · Simulated market data · Not financial advice</span>
    </div>
  )
}
