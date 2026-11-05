import { getMockPriceAt } from '../data/mockMarket'
import type { ConnectionStatus, PriceTick } from '../types'

let simulatedPrice = getMockPriceAt(Math.floor(Date.now() / 1000))

export function subscribeToSimulatedFeed(
  onTick: (tick: PriceTick) => void,
  onStatusChange: (status: ConnectionStatus) => void,
) {
  let tickCount = 0
  let recoveryTimer = 0
  let reconnectTimer = 0

  onStatusChange('connected')
  const intervalId = window.setInterval(() => {
    tickCount += 1

    if (tickCount % 30 === 0) {
      onStatusChange('reconnecting')
      recoveryTimer = window.setTimeout(() => {
        onStatusChange('disconnected')
        reconnectTimer = window.setTimeout(() => onStatusChange('connected'), 900)
      }, 700)
      return
    }

    simulatedPrice = Math.max(2318.65, Math.min(2361.4, simulatedPrice + (Math.random() - 0.48) * 0.72))
    const time = Math.floor(Date.now() / 1000)
    onTick({ price: Number(simulatedPrice.toFixed(2)), time: time as PriceTick['time'] })
  }, 2000)

  return () => {
    window.clearInterval(intervalId)
    window.clearTimeout(recoveryTimer)
    window.clearTimeout(reconnectTimer)
  }
}
