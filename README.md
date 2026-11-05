# FALQ — Falcon Intelligence

A responsive XAU/USD market dashboard demo built with React, TypeScript, Vite, Tailwind CSS, and TradingView Lightweight Charts. All market data and signals are simulated; the app does not connect to a real market, backend, or AI service.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run build
npm run lint
npm test
```

## Structure

- `src/app/` — app-level composition
- `src/components/layout/` — page shell, header, navigation, and brand
- `src/features/market/components/` — market-specific display components
- `src/features/market/data/` — dashboard constants and display data
- `src/features/market/hooks/` — dashboard state orchestration
- `src/components/charts/MarketChart.tsx` — Lightweight Charts adapter and lifecycle
- `src/hooks/` — reusable stateful behavior (market feed and UTC clock)
- `src/services/` — mock REST-style snapshot and simulated WebSocket
- `src/data/` — generated OHLC candles and data tests
- `src/lib/` — shared formatting utilities
- `src/styles/` — design tokens, layout, market components, responsive rules, and animations
- `src/assets/` — image and static asset files imported by the components that use them
- `src/types.ts` — market candle, timeframe, and connection types

The UI components receive typed data through props; fetching and feed updates stay in hooks/services, static display values live in feature data modules, and chart-library lifecycle code stays behind the chart component. This keeps individual UI, data, and styling changes scoped to their own files.

The chart period controls update the mock candle interval (`1m` through `1D`, plus calendar-month `1M` candles). Candles use UTC-aligned boundaries and one deterministic mock price curve, so changing periods preserves the underlying price timeline. The illustrative market signal is recalculated from the selected timeframe's candles. A simulated price tick arrives every two seconds. The feed periodically moves through reconnecting and disconnected states before recovering, and failed snapshot requests show an explicit error with a retry action.
