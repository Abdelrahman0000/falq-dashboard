import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MarketStatusCard } from './MarketStatusCard'

describe('market status controls', () => {
  it('lets the user simulate a disconnect', () => {
    const onSimulateDisconnect = vi.fn()

    render(
      <MarketStatusCard
        status="connected"
        onSimulateDisconnect={onSimulateDisconnect}
        onReconnect={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Simulate disconnect' }))

    expect(onSimulateDisconnect).toHaveBeenCalledOnce()
  })

  it('offers reconnect and shows paused ticks when disconnected', () => {
    const onReconnect = vi.fn()

    render(
      <MarketStatusCard
        status="disconnected"
        onSimulateDisconnect={vi.fn()}
        onReconnect={onReconnect}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Reconnect feed' }))

    expect(screen.getByText('Paused')).toBeTruthy()
    expect(onReconnect).toHaveBeenCalledOnce()
  })
})
