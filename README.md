# Urban Heat Island Real Estate Asset Pricing Engine

> Urban Heat Island & Real Estate Asset Pricing Engine Domain: Environment + Finance (PropTech) Concept: A urban analytics portal that quantifies how environmental factors (heat islands, lack of green canopy) directly impact commercial real estate valuation and utility costs across a city. 3D & Geolocation Feature: 3D Building Extrusions (CityJSON / Mapbox 3D): Render city buildings in 3D color-coded by thermal canopy readings and HVAC operational costs. 3D Dependency Graph: Toggle a 3D network view showing urban micro-climate nodes connected to asset valuation clusters using 3d-force-graph. Key Parameters: Surface temperature delta (°C), building square footage, rental yield ($/sq ft), tree canopy coverage percentage, energy efficiency rating.

---


- Frontend: React + Vite + TypeScript + TanStack Query + Zustand + Tailwind CSS + MapLibre/Mapbox + deck.gl
- Backend API: NestJS + TypeScript + PostgreSQL/PostGIS
- Quant/valuation service: Python + FastAPI + QuantLib
- Infrastructure: Docker Compose + PostgreSQL/PostGIS
- Communication: React → NestJS → FastAPI → QuantLib
- Spatial data: PostGIS → NestJS → GeoJSON → React/deck.gl

---

``` Plaintext
urban-heat-val/
│
├── docker-compose.yml
├── .gitignore
├── README.md
│
├── server/                         # NestJS API
│   ├── src/
│   │   ├── common/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── filters/
│   │   │   └── pipes/
│   │   │
│   │   ├── config/
│   │   │   └── configuration.ts
│   │   │
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   └── migrations/
│   │   │
│   │   ├── buildings/
│   │   │   ├── buildings.module.ts
│   │   │   ├── buildings.controller.ts
│   │   │   ├── buildings.service.ts
│   │   │   ├── buildings.repository.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   ├── valuations/
│   │   │   ├── valuations.module.ts
│   │   │   ├── valuations.controller.ts
│   │   │   ├── valuations.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── environment/
│   │   │   ├── environment.module.ts
│   │   │   ├── environment.controller.ts
│   │   │   └── environment.service.ts
│   │   │
│   │   ├── health/
│   │   │   ├── health.module.ts
│   │   │   └── health.controller.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── quant-service/                  # Python FastAPI + QuantLib
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── health.py
│   │   │   │   ├── valuation.py
│   │   │   │   └── scenarios.py
│   │   │   └── router.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── logging.py
│   │   │
│   │   ├── models/
│   │   │   ├── valuation.py
│   │   │   └── scenario.py
│   │   │
│   │   ├── services/
│   │   │   ├── quantlib_engine.py
│   │   │   ├── dcf.py
│   │   │   ├── cap_rate.py
│   │   │   └── energy_cost.py
│   │   │
│   │   ├── main.py
│   │   └── __init__.py
│   │
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   └── README.md
│
├── client/                         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── map/
│   │   │   │   ├── MapContainer.tsx
│   │   │   │   ├── Building3DLayer.tsx
│   │   │   │   └── MapControls.tsx
│   │   │   │
│   │   │   ├── charts/
│   │   │   │   ├── ValuationChart.tsx
│   │   │   │   ├── EnergyCostChart.tsx
│   │   │   │   └── HeatImpactChart.tsx
│   │   │   │
│   │   │   ├── graph/
│   │   │   │   └── DependencyGraph.tsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── AnalyticsPanel.tsx
│   │   │   │   ├── BuildingDetailModal.tsx
│   │   │   │   ├── HeatSliderControls.tsx
│   │   │   │   └── MetricCard.tsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── DashboardLayout.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useBuildings.ts
│   │   │   ├── useBuilding.ts
│   │   │   ├── useValuation.ts
│   │   │   └── useHeatScenario.ts
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── mapStore.ts
│   │   │   ├── scenarioStore.ts
│   │   │   └── uiStore.ts
│   │   │
│   │   ├── types/
│   │   │   ├── building.ts
│   │   │   ├── valuation.ts
│   │   │   ├── environment.ts
│   │   │   └── geojson.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── colorScales.ts
│   │   │   ├── formatters.ts
│   │   │   └── calculations.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── public/
│   │   └── data/
│   │       └── sample_buildings.geojson
│   │
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── data/
    ├── geojson/
    ├── raster/
    └── seed/
```