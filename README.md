# Urban Heat Valuation Engine

An environmental finance analytics platform that analyzes how **urban heat, tree canopy, and building energy costs can influence commercial real estate valuation**.

The platform combines geospatial building data, environmental metrics, financial valuation models, and climate scenarios into a single interactive dashboard.

## What We Are Building

The application allows users to:

* Explore buildings on an interactive 3D city map.
* Visualize surface temperature and environmental conditions.
* Inspect building-level financial and environmental metrics.
* Estimate property value using DCF based valuation.
* Model additional HVAC costs caused by increased temperatures.
* Run climate/temperature scenarios.
* Analyze the potential impact of environmental changes on NOI and property value.
* Explore relationships between climate factors, energy costs, NOI, and valuation through a dependency graph.

## Technology Stack

### Frontend

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

### Backend

* NestJS
* TypeScript
* Node.js
* PostgreSQL
* PostGIS

### Quantitative Service

* Python
* FastAPI
* Pydantic
* QuantLib

### Infrastructure

* Docker
* Docker Compose
* Git / GitHub

## High-Level Architecture

```text
                    ┌──────────────────────┐
                    │       React          │
                    │ TypeScript + Vite    │
                    │ Tailwind + Zustand   │
                    │ TanStack Query       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       NestJS         │
                    │   REST API Layer     │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ PostgreSQL      │        │    FastAPI      │
        │ + PostGIS       │        │ Quant Service   │
        │                 │        │ + QuantLib      │
        └─────────────────┘        └────────┬────────┘
                                            │
                                            ▼
                                  ┌──────────────────┐
                                  │ Valuation + Risk │
                                  │ Scenario Engine  │
                                  └──────────────────┘
```

## Core Data Flow

```text
Urban Environment
       │
       ├── Surface Temperature
       ├── Tree Canopy
       └── Energy Conditions
              │
              ▼
          HVAC Costs
              │
              ▼
             NOI
              │
              ▼
          QuantLib DCF
              │
              ▼
       Property Valuation
              │
              ▼
      Climate Risk Scenarios
```

## Project Structure

```text
urban-heat-val/
├── client/          # React frontend
├── server/          # NestJS API
├── quant-service/   # FastAPI + QuantLib
├── data/            # Seed data, fixtures and spatial datasets
├── docker-compose.yml
└── README.md
```

## Development Goal

The initial version focuses on building a working full stack MVP with simulated/sample environmental and real estate data. The architecture is designed so that real GIS, satellite, weather, energy, and property datasets can be introduced later.
