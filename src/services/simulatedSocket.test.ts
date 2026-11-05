import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSimulatedMarketFeed } from './simulatedSocket'

describe('simulated market feed', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('pauses ticks while disconnected and resumes after reconnecting', () => {
    vi.useFakeTimers()
    const feed = createSimulatedMarketFeed()
    const onTick = vi.fn()
    const onStatusChange = vi.fn()
    const unsubscribe = feed.subscribe(onTick, onStatusChange)

    vi.advanceTimersByTime(2000)
    expect(onTick).toHaveBeenCalledTimes(1)

    feed.simulateDisconnect()
    expect(onStatusChange).toHaveBeenLastCalledWith('disconnected')
    vi.advanceTimersByTime(6000)
    expect(onTick).toHaveBeenCalledTimes(1)

    feed.reconnect()
    expect(onStatusChange).toHaveBeenLastCalledWith('reconnecting')
    vi.advanceTimersByTime(900)
    expect(onStatusChange).toHaveBeenLastCalledWith('connected')
    vi.advanceTimersByTime(2000)
    expect(onTick).toHaveBeenCalledTimes(2)

    unsubscribe()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('simulates a dropped connection and automatic recovery without sending offline ticks', () => {
    vi.useFakeTimers()
    const feed = createSimulatedMarketFeed()
    const onTick = vi.fn()
    const onStatusChange = vi.fn()
    const unsubscribe = feed.subscribe(onTick, onStatusChange)

    vi.advanceTimersByTime(29 * 2000)
    expect(onTick).toHaveBeenCalledTimes(29)

    vi.advanceTimersByTime(2000)
    expect(onStatusChange).toHaveBeenLastCalledWith('reconnecting')
    vi.advanceTimersByTime(700)
    expect(onStatusChange).toHaveBeenLastCalledWith('disconnected')
    vi.advanceTimersByTime(899)
    expect(onTick).toHaveBeenCalledTimes(29)

    vi.advanceTimersByTime(1)
    expect(onStatusChange).toHaveBeenLastCalledWith('connected')
    vi.advanceTimersByTime(2000)
    expect(onTick).toHaveBeenCalledTimes(30)

    unsubscribe()
    expect(vi.getTimerCount()).toBe(0)
  })
})
