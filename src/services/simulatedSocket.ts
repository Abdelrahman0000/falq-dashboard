import { getMockPriceAt } from '../data/mockMarket'
import type { ConnectionStatus, PriceTick } from '../types'

export interface MarketFeed {
  subscribe(
    onTick: (tick: PriceTick) => void,
    onStatusChange: (status: ConnectionStatus) => void,
  ): () => void
  simulateDisconnect(): void
  reconnect(): void
}

export function createSimulatedMarketFeed(): MarketFeed {
  const subscribers = new Set<{
    onTick: (tick: PriceTick) => void
    onStatusChange: (status: ConnectionStatus) => void
  }>()
  let simulatedPrice = getMockPriceAt(Math.floor(Date.now() / 1000))
  let status: ConnectionStatus = 'connecting'
  let tickCount = 0
  let intervalId: number | undefined
  let recoveryTimer: number | undefined
  let reconnectTimer: number | undefined
  let manuallyDisconnected = false

  function setStatus(nextStatus: ConnectionStatus) {
    status = nextStatus
    subscribers.forEach(({ onStatusChange }) => onStatusChange(status))
  }

  function clearRecoveryTimers() {
    if (recoveryTimer !== undefined) window.clearTimeout(recoveryTimer)
    if (reconnectTimer !== undefined) window.clearTimeout(reconnectTimer)
    recoveryTimer = undefined
    reconnectTimer = undefined
  }

  function startAutomaticRecovery() {
    setStatus('reconnecting')
    recoveryTimer = window.setTimeout(() => {
      setStatus('disconnected')
      reconnectTimer = window.setTimeout(() => {
        if (!manuallyDisconnected) setStatus('connected')
      }, 900)
    }, 700)
  }

  function startFeed() {
    if (intervalId !== undefined || subscribers.size === 0) return

    intervalId = window.setInterval(() => {
      if (status !== 'connected') return

      tickCount += 1
      if (tickCount % 30 === 0) {
        startAutomaticRecovery()
        return
      }

      simulatedPrice = Math.max(
        2318.65,
        Math.min(2361.4, simulatedPrice + (Math.random() - 0.48) * 0.72),
      )
      const time = Math.floor(Date.now() / 1000)
      const tick = { price: Number(simulatedPrice.toFixed(2)), time: time as PriceTick['time'] }
      subscribers.forEach(({ onTick }) => onTick(tick))
    }, 2000)
  }

  function stopFeed() {
    if (intervalId !== undefined) window.clearInterval(intervalId)
    intervalId = undefined
    clearRecoveryTimers()
    manuallyDisconnected = false
    status = 'connecting'
  }

  return {
    subscribe(onTick, onStatusChange) {
      const subscriber = { onTick, onStatusChange }
      subscribers.add(subscriber)
      if (subscribers.size === 1) {
        setStatus('connected')
        startFeed()
      } else {
        onStatusChange(status)
      }

      return () => {
        subscribers.delete(subscriber)
        if (subscribers.size === 0) stopFeed()
      }
    },
    simulateDisconnect() {
      if (subscribers.size === 0) return
      manuallyDisconnected = true
      clearRecoveryTimers()
      setStatus('disconnected')
    },
    reconnect() {
      if (subscribers.size === 0 || status === 'connected') return
      manuallyDisconnected = false
      clearRecoveryTimers()
      setStatus('reconnecting')
      reconnectTimer = window.setTimeout(() => {
        setStatus('connected')
        reconnectTimer = undefined
      }, 900)
    },
  }
}

export const simulatedMarketFeed = createSimulatedMarketFeed()
