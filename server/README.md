# NestJS Backend

The `server` application is the main backend/API layer for the Urban Heat Valuation Engine.

It acts as the **orchestration layer** between the React frontend, PostgreSQL/PostGIS database, and Python quantitative service.

## Responsibilities

* Expose REST APIs to the frontend.
* Retrieve building and environmental data.
* Manage property records.
* Query spatial data from PostGIS.
* Validate API requests.
* Communicate with the FastAPI quantitative service.
* Return valuation and risk results to the frontend.
* Handle backend errors and API-level concerns.

## Technology

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* PostGIS
* Axios / HTTP client
* Class Validator
* Class Transformer

## Architecture

```text
React Client
     │
     │ REST API
     ▼
┌───────────────┐
│    NestJS     │
│               │
│ Controllers  │
│ Services     │
│ DTOs         │
└───────┬───────┘
        │
   ┌────┴─────────────┐
   ▼                  ▼
PostgreSQL          FastAPI
+ PostGIS           Quant Service
   │                  │
   ▼                  ▼
Building Data     Valuation/Risk
Environmental     QuantLib
Data
```

## Main API Areas

```text
/api/v1/buildings
/api/v1/environment
/api/v1/valuations
/api/v1/health
```

The NestJS backend intentionally remains separate from the quantitative calculations. Its primary role is **API orchestration and application/business logic**, while financial calculations are delegated to the Python service.

## Project Structure

```text
server/
└── src/
    ├── buildings/
    ├── environment/
    ├── valuations/
    ├── database/
    ├── health/
    └── main.ts
```
