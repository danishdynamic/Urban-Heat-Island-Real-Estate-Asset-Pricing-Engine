import json
import os
import random
import uuid
from datetime import datetime, timedelta

# Create directory structure if missing
os.makedirs("data/seeds", exist_ok=True)
os.makedirs("data/fixtures", exist_ok=True)
os.makedirs("data/geojson", exist_ok=True)

# Helper function to escape single quotes in SQL string values
def escape_sql(val: str) -> str:
    return val.replace("'", "''")

# Extended list of Munich commercial building names (50 total)
BUILDING_NAMES = [
    "Isar Center", "Maxvorstadt Forum", "Schwabing Office Park", "Marienplatz Plaza", 
    "Bogenhausen Heights", "Sendling Tech Hub", "Pasing Central", "Giesing Commercial", 
    "Englischer Garten Office", "Karlsplatz Corporate", "Arabellapark Tower", "Haidhausen Hub",
    "Olympia Business Center", "Laimer Würfel", "Nymphenburg Plaza", "Bavariapark Office",
    "Donnersberger Center", "Werksviertel IT Park", "Arnulfpark Chambers", "Moosach Heights",
    "Theresienhöhe Tower", "Riem Corporate Center", "Lehel Executive Hub", "Obersendling Park",
    "Münchner Freiheit Center", "Neuhausen Office Hub", "Feldmoching Tech Center",
    "Trudering Commercial Suite", "Sendlinger Tor Plaza", "Prinzregenten Tower",
    "Isarvorstadt Chambers", "Ludwigstraße Executive", "Bogenhausen Park Place",
    "Glockenbach Corporate", "Max-Weber-Platz Forum", "Schwabing Nord Center",
    "Freimann Tech Square", "Perlach Business Hub", "Hadern Medical & Office",
    "Forstenrieder Plaza", "Solln Commercial Lodge", "Aubing Innovation Park",
    "Allach Business Complex", "Unterföhring Media Tower", "Dornach Logistics & Office",
    "Garching Tech Hub", "Martinsried BioCenter", "Aschheim Business Park",
    "Gräfelfing Corporate Campus", "Ottobrunn Tech Suites"
]

BUILDING_TYPES = ["Commercial Office", "IT Park", "Mixed-Use Commercial", "Retail Complex"]
ENERGY_RATINGS = ["A", "B", "C", "D", "E"]

# Center coordinates around Munich City Center (Marienplatz)
BASE_LAT = 48.13715
BASE_LON = 11.57612

buildings = []
environmental_readings = []
geojson_features = []

# 1. Generate 50 Buildings in Munich
for i, name in enumerate(BUILDING_NAMES, start=1):
    bldg_uuid = str(uuid.uuid4())
    ext_id = f"BLDG-{i:03d}"
    
    # Coordinate offset to scatter buildings within ~3km area of Munich
    lat_offset = random.uniform(-0.02, 0.02)
    lon_offset = random.uniform(-0.02, 0.02)
    center_lat = round(BASE_LAT + lat_offset, 6)
    center_lon = round(BASE_LON + lon_offset, 6)
    
    # Building metrics
    floors = random.randint(4, 30)
    height_m = round(floors * 3.5 + random.uniform(-1.0, 2.0), 2)
    sq_ft = round(floors * random.uniform(5000, 12000), 2)
    
    annual_rent = round(sq_ft * random.uniform(25, 45), 2)
    opex = round(annual_rent * random.uniform(0.20, 0.35), 2)
    vacancy_rate = round(random.uniform(0.02, 0.15), 4)
    rental_yield = round(random.uniform(0.035, 0.065), 4)
    
    tree_canopy = round(random.uniform(5.0, 45.0), 2)
    base_surface_temp = round(32.0 - (tree_canopy * 0.12) + random.uniform(-1.0, 1.0), 1)
    
    # Simple geometry footprint box (~20m x 20m around center)
    delta = 0.00018
    polygon_coords = [
        [round(center_lon - delta, 6), round(center_lat - delta, 6)],
        [round(center_lon + delta, 6), round(center_lat - delta, 6)],
        [round(center_lon + delta, 6), round(center_lat + delta, 6)],
        [round(center_lon - delta, 6), round(center_lat + delta, 6)],
        [round(center_lon - delta, 6), round(center_lat - delta, 6)]
    ]
    
    building = {
        "id": bldg_uuid,
        "external_id": ext_id,
        "name": name,
        "address": f"Maximilianstraße {i*4}, District {i%5 + 1}",
        "city": "Munich",
        "building_type": random.choice(BUILDING_TYPES),
        "year_built": random.randint(1998, 2023),
        "floors": floors,
        "height_m": height_m,
        "square_footage": sq_ft,
        "annual_rent": annual_rent,
        "operating_expenses": opex,
        "vacancy_rate": vacancy_rate,
        "rental_yield": rental_yield,
        "energy_efficiency_rating": random.choice(ENERGY_RATINGS),
        "tree_canopy_percentage": tree_canopy,
        "surface_temperature": base_surface_temp,
        "latitude": center_lat,
        "longitude": center_lon,
        "wkt_geometry": f"POLYGON(({', '.join([f'{c[0]} {c[1]}' for c in polygon_coords])}))",
        "geojson_coords": polygon_coords
    }
    buildings.append(building)
    
    # GeoJSON Feature (CamelCase properties for API alignment)
    geojson_features.append({
        "type": "Feature",
        "properties": {
            "id": building["id"],
            "externalId": building["external_id"],
            "name": building["name"],
            "address": building["address"],
            "city": building["city"],
            "buildingType": building["building_type"],
            "yearBuilt": building["year_built"],
            "floors": building["floors"],
            "heightM": building["height_m"],
            "squareFootage": building["square_footage"],
            "annualRent": building["annual_rent"],
            "operatingExpenses": building["operating_expenses"],
            "vacancyRate": building["vacancy_rate"],
            "rentalYield": building["rental_yield"],
            "energyEfficiencyRating": building["energy_efficiency_rating"],
            "treeCanopyPercentage": building["tree_canopy_percentage"],
            "surfaceTemperature": building["surface_temperature"],
            "latitude": building["latitude"],
            "longitude": building["longitude"]
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [building["geojson_coords"]]
        }
    })

    # Environmental Readings (5 days per building)
    base_date = datetime(2026, 8, 1, 14, 0, 0)
    for day_idx in range(5):
        reading_date = base_date + timedelta(days=day_idx)
        reading_uuid = str(uuid.uuid4())
        
        temp_wave = (day_idx * 0.6) + random.uniform(-0.4, 0.4)
        surf_temp = round(base_surface_temp + temp_wave, 1)
        air_temp = round(28.0 + temp_wave * 0.5 + random.uniform(-0.3, 0.3), 1)
        temp_delta = round(surf_temp - air_temp, 1)
        hvac_cost = round((sq_ft * 0.008) * (1 + (temp_delta * 0.08)), 2)
        
        environmental_readings.append({
            "id": reading_uuid,
            "building_id": bldg_uuid,
            "recorded_at": reading_date.strftime("%Y-%m-%d %H:%M:%S"),
            "surface_temperature": surf_temp,
            "air_temperature": air_temp,
            "temperature_delta": temp_delta,
            "tree_canopy_percentage": tree_canopy,
            "hvac_cost": hvac_cost
        })

# --- Write `data/seeds/buildings.sql` ---
with open("data/seeds/buildings.sql", "w", encoding="utf-8") as f:
    f.write(
        "INSERT INTO buildings "
        "(id, external_id, name, address, city, building_type, year_built, "
        "floors, height_m, square_footage, annual_rent, operating_expenses, "
        "vacancy_rate, rental_yield, energy_efficiency_rating, "
        "tree_canopy_percentage, surface_temperature, latitude, longitude, geometry) "
        "VALUES\n"
    )
    
    rows = []
    for b in buildings:
        row = (
            f"('{b['id']}', "
            f"'{escape_sql(b['external_id'])}', "
            f"'{escape_sql(b['name'])}', "
            f"'{escape_sql(b['address'])}', "
            f"'{escape_sql(b['city'])}', "
            f"'{escape_sql(b['building_type'])}', "
            f"{b['year_built']}, "
            f"{b['floors']}, "
            f"{b['height_m']}, "
            f"{b['square_footage']}, "
            f"{b['annual_rent']}, "
            f"{b['operating_expenses']}, "
            f"{b['vacancy_rate']}, "
            f"{b['rental_yield']}, "
            f"'{escape_sql(b['energy_efficiency_rating'])}', "
            f"{b['tree_canopy_percentage']}, "
            f"{b['surface_temperature']}, "
            f"{b['latitude']}, "
            f"{b['longitude']}, "
            f"ST_GeomFromText('{b['wkt_geometry']}', 4326))"
        )
        rows.append(row)
    
    f.write(",\n".join(rows) + ";\n")

# --- Write `data/seeds/environmental_readings.sql` ---
with open("data/seeds/environmental_readings.sql", "w", encoding="utf-8") as f:
    f.write(
        "INSERT INTO environmental_readings "
        "(id, building_id, recorded_at, surface_temperature, "
        "air_temperature, temperature_delta, tree_canopy_percentage, hvac_cost) "
        "VALUES\n"
    )
    
    rows = []
    for r in environmental_readings:
        row = (
            f"('{r['id']}', "
            f"'{r['building_id']}', "
            f"'{r['recorded_at']}', "
            f"{r['surface_temperature']}, "
            f"{r['air_temperature']}, "
            f"{r['temperature_delta']}, "
            f"{r['tree_canopy_percentage']}, "
            f"{r['hvac_cost']})"
        )
        rows.append(row)
    
    f.write(",\n".join(rows) + ";\n")

# --- Write `data/geojson/buildings.geojson` ---
geojson_collection = {
    "type": "FeatureCollection",
    "name": "urban_heat_buildings_munich",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    "features": geojson_features
}
with open("data/geojson/buildings.geojson", "w", encoding="utf-8") as f:
    json.dump(geojson_collection, f, indent=2, ensure_ascii=False)

# --- Write `data/fixtures/scenarios.json` ---
scenarios = [
    {
        "scenarioId": "SCEN-001",
        "name": "Moderate Alpine Summer Wave (+2.0°C)",
        "description": "Simulates a typical August warm spell causing minor surface heating across Central Munich.",
        "targetBuildingId": buildings[0]["id"],
        "parameters": {"tempIncreaseC": 2.0, "hvacCostSurgePct": 12.5, "yieldImpactBps": -15}
    },
    {
        "scenarioId": "SCEN-002",
        "name": "Severe Bavarian Urban Heat Island (+4.5°C)",
        "description": "Simulates high atmospheric heat retention in dense areas with tree canopy under 15%.",
        "targetBuildingId": buildings[1]["id"],
        "parameters": {"tempIncreaseC": 4.5, "hvacCostSurgePct": 28.0, "yieldImpactBps": -45}
    },
    {
        "scenarioId": "SCEN-003",
        "name": "Extreme European Heatwave (+6.0°C)",
        "description": "Stress-test scenario reflecting peak heat conditions with severe HVAC overutilization.",
        "targetBuildingId": buildings[2]["id"],
        "parameters": {"tempIncreaseC": 6.0, "hvacCostSurgePct": 45.0, "yieldImpactBps": -80}
    },
    {
        "scenarioId": "SCEN-004",
        "name": "Urban Canopy Cooling Mitigation (-1.5°C)",
        "description": "Simulates green roof retrofits and tree planting interventions near high-risk assets.",
        "targetBuildingId": buildings[3]["id"],
        "parameters": {"tempIncreaseC": -1.5, "hvacCostSurgePct": -10.0, "yieldImpactBps": 12}
    },
    {
        "scenarioId": "SCEN-005",
        "name": "Grid Stress & Cooling Surge (+3.5°C)",
        "description": "Models mid-range heat wave combined with elevated municipal energy tariff spikes.",
        "targetBuildingId": buildings[4]["id"],
        "parameters": {"tempIncreaseC": 3.5, "hvacCostSurgePct": 35.0, "yieldImpactBps": -35}
    }
]

with open("data/fixtures/scenarios.json", "w", encoding="utf-8") as f:
    json.dump(scenarios, f, indent=2, ensure_ascii=False)

print("Generated clean UTF-8 seed files, GeoJSON, and scenario fixtures successfully!")