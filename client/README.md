# React Frontend

The `client` application is the interactive analytics dashboard for the Urban Heat Valuation Engine.

It provides the visual interface for exploring buildings, environmental conditions, financial metrics, valuation results, and climate scenarios.

## Responsibilities

* Render the interactive dashboard.
* Display buildings on a 3D map.
* Visualize environmental conditions.
* Allow users to select individual buildings.
* Display financial and environmental metrics.
* Trigger valuation calculations.
* Run climate scenarios.
* Display valuation/risk charts.
* Manage frontend UI state.

## Technology

* React
* TypeScript
* Vite
* Tailwind CSS
* Zustand
* TanStack Query
* Axios
* MapLibre GL
* Deck.gl
* Chart.js
* 3D Force Graph

## Frontend Architecture

```text
                 React Application
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
      Components      Hooks        Zustand
          │             │             │
          │       TanStack Query       │
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                     Axios
                        │
                        ▼
                    NestJS API
```

## Visualization Flow

```text
NestJS
  │
  ▼
GeoJSON
  │
  ▼
TanStack Query
  │
  ▼
React
  │
  ├── MapLibre
  │
  ├── Deck.gl
  │      └── 3D Buildings
  │
  ├── Chart.js
  │      └── Financial / Risk Charts
  │
  └── 3D Force Graph
         └── Climate → Energy → NOI → Value
```

## Project Structure

```text
client/
└── src/
    ├── api/
    ├── components/
    │   ├── dashboard/
    │   ├── map/
    │   ├── graph/
    │   └── ui/
    ├── hooks/
    ├── stores/
    ├── types/
    ├── pages/
    ├── lib/
    ├── App.tsx
    └── main.tsx
```

## State Management

### TanStack Query

Used for:

* Server state
* API requests
* Caching
* Loading/error states
* Refetching

### Zustand

Used for:

* Selected building
* Map visualization mode
* Temperature scenario
* UI state
* Future dashboard controls

The frontend keeps **server state and client/UI state separate**.
