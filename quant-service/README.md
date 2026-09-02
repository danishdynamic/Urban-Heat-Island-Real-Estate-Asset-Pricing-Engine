# Quantitative Valuation Service

The `quant-service` is the Python-based quantitative engine for the Urban Heat Valuation Engine.

It is intentionally separated from the NestJS backend so that financial models can evolve independently from the main application API.

## Responsibilities

* Calculate DCF property valuation.
* Calculate NOI and adjusted NOI.
* Calculate implied cap rates.
* Model HVAC/energy cost impacts.
* Run temperature/climate scenarios.
* Estimate potential property-value changes.
* Provide quantitative risk analysis.
* Use QuantLib for financial calculations.

## Technology

* Python
* FastAPI
* Pydantic
* QuantLib
* Uvicorn

## Core Calculation Flow

```text
Building Financial Data
          │
          ▼
        NOI
          │
          ├──────────────┐
          │              │
          ▼              ▼
 Temperature ΔT      Base HVAC Cost
          │              │
          └──────┬───────┘
                 ▼
          Energy Cost Model
                 │
                 ▼
        Additional HVAC Cost
                 │
                 ▼
           Adjusted NOI
                 │
                 ▼
             QuantLib
                 │
                 ▼
          DCF Property Value
                 │
                 ▼
          Scenario / Risk
             Analysis
```

## Main Components

```text
app/
├── api/
│   └── routes/
│       ├── valuation.py
│       └── risk.py
│
├── core/
│   ├── config.py
│   └── logging.py
│
├── models/
│   ├── valuation.py
│   └── scenario.py
│
└── services/
    ├── quantlib_engine.py
    ├── dcf.py
    ├── cap_rate.py
    ├── energy_cost.py
    └── risk_engine.py
```

## Important Modeling Principle

The environmental-to-financial relationships in the MVP are configurable assumptions rather than scientifically validated universal constants.

Future versions can replace these assumptions with building-specific energy models, weather observations, satellite data, utility data, and other validated datasets.
