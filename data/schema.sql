-- Enable PostGIS spatial extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Buildings Table
CREATE TABLE IF NOT EXISTS buildings (
    id UUID PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100) NOT NULL,
    building_type VARCHAR(100) NOT NULL,
    year_built INTEGER,
    floors INTEGER,
    height_m NUMERIC(6, 2),
    square_footage NUMERIC(10, 2) NOT NULL,
    annual_rent NUMERIC(12, 2) NOT NULL,
    operating_expenses NUMERIC(12, 2) NOT NULL,
    vacancy_rate NUMERIC(5, 4) NOT NULL,
    rental_yield NUMERIC(5, 4),
    energy_efficiency_rating VARCHAR(10),
    tree_canopy_percentage NUMERIC(5, 2),
    surface_temperature NUMERIC(4, 1),
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    geometry GEOMETRY(POLYGON, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Environmental Readings Time-Series Table
CREATE TABLE IF NOT EXISTS environmental_readings (
    id UUID PRIMARY KEY,
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    recorded_at TIMESTAMP NOT NULL,
    surface_temperature NUMERIC(4, 1) NOT NULL,
    air_temperature NUMERIC(4, 1),
    temperature_delta NUMERIC(4, 1),
    tree_canopy_percentage NUMERIC(5, 2),
    hvac_cost NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes for Spatial & Time-Series Performance
CREATE INDEX IF NOT EXISTS idx_buildings_geometry ON buildings USING GIST (geometry);
CREATE INDEX IF NOT EXISTS idx_environmental_building ON environmental_readings(building_id);
CREATE INDEX IF NOT EXISTS idx_environmental_recorded_at ON environmental_readings(recorded_at);