# Urban Heat Risk & Valuation Engine

An end-to-end urban analytics platform assessing environmental surface heat risks and financial impacts across commercial real estate assets in Munich.

## 🏗 System Architecture

* **Client:** React, TypeScript, MapLibre GL, Deck.gl, Tailwind CSS
* **Server:** Node.js / NestJS API (PostgreSQL/PostGIS driver)
* **Quant Service:** Python / FastAPI microservice for climate risk simulations
* **Database:** PostgreSQL 16 with PostGIS extension enabled

---

## 📁 Repository Data Structure

```text
.
├── data/
│   ├── schema.sql                         # PostGIS extension, DDL tables, and spatial indexes
│   ├── seeds/
│   │   ├── buildings.sql                  # Pure SQL INSERT statements (50 Munich buildings)
│   │   └── environmental_readings.sql     # Pure SQL INSERT statements (Time-series data)
│   ├── fixtures/
│   │   └── scenarios.json                 # Climate heatwave scenario parameters
│   └── geojson/
│       └── buildings.geojson              # 3D spatial building footprint polygons (camelCase)
├── client/                                # React Frontend
├── server/                                # Backend API Service
├── quant-service/                         # Python Quantitative Modeling Service
├── generate_data.py                       # Python Data Generator script
└── docker-compose.yml                     # Multi-container orchestrator