# FALQ — Falcon Intelligence

**XAU/USD Market Intelligence Dashboard (Demo)**

A professional, responsive financial analytics dashboard focused on **Gold / US Dollar (XAU/USD)**.  
Built as a frontend engineering demonstration for FALQ — Falcon Intelligence.

> **Live Demo:** [https://falq-dashboard.vercel.app](https://falq-dashboard.vercel.app)

---

### Overview

This project demonstrates a clean, modern financial interface capable of handling continuously changing market data.  
It focuses purely on **frontend engineering excellence** — no real backend, no live market APIs, and no proprietary AI engines.

All price data, candlesticks, signals, and connection states are **fully simulated**.

The goal is to showcase:

- Professional financial UI/UX
- Real-time data handling patterns
- Clean component architecture
- Type-safe React + TypeScript practices
- Production-ready chart integration
- Responsive design across devices

---

### Key Features

- **Interactive Candlestick Chart**  
  Powered by TradingView Lightweight Charts with multiple timeframes (`1m`, `5m`, `15m`, `1H`, `4H`, `1D`, `1M`).

- **Simulated Real-Time Price Feed**  
  Price ticks arrive every \~2 seconds. The chart updates the current candle smoothly without full re-renders.

- **Connection State Management**  
  Clear visual feedback for `Connected`, `Reconnecting`, and `Disconnected` states with automatic recovery simulation.

- **Market Overview Cards**  
  Last price, 24H High/Low, Volume, Market Signal, Risk Snapshot, and Recent Activity.

- **Modular Architecture**  
  Components, hooks, services, and data layers are cleanly separated for easy extension into a full platform.

- **Fully Responsive**  
  Optimized for desktop, tablet, and mobile.

- **Type-Safe**  
  Strict TypeScript types for candles, timeframes, ticks, and connection status.

---

### Tech Stack

| Category              | Technology                          |
|-----------------------|-------------------------------------|
| Framework             | React 19 + TypeScript               |
| Build Tool            | Vite                                |
| Styling               | Tailwind CSS v4                     |
| Charts                | TradingView Lightweight Charts v5   |
| Icons                 | Lucide React                        |
| Testing               | Vitest + Testing Library            |
| Linting               | Oxlint                              |
| Deployment            | Vercel                              |

---

### Getting Started

#### Prerequisites
- Node.js 18+ 
- npm

#### Installation

```bash
git clone https://github.com/Abdelrahman0000/falq-dashboard.git
cd falq-dashboard
npm install
