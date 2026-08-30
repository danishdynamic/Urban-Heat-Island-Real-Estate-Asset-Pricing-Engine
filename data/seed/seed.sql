INSERT INTO buildings (
    external_id,
    name,
    address,
    square_footage,
    rental_yield,
    tree_canopy_percentage,
    surface_temperature,
    energy_efficiency_rating,
    annual_hvac_cost,
    latitude,
    longitude,
    geometry
)
VALUES
(
    'BLDG-001',
    'Urban Heat Tower',
    'Main Road, Ranchi',
    50000,
    0.0825,
    12.5,
    42.3,
    'B',
    48000,
    23.3441,
    85.3096,
    ST_SetSRID(
        ST_MakePoint(85.3096, 23.3441),
        4326
    )
),
(
    'BLDG-002',
    'Green Plaza',
    'Morabadi, Ranchi',
    42000,
    0.0780,
    38.5,
    37.8,
    'A',
    31000,
    23.3560,
    85.3247,
    ST_SetSRID(
        ST_MakePoint(85.3247, 23.3560),
        4326
    )
),
(
    'BLDG-003',
    'Central Business Center',
    'Lalpur, Ranchi',
    75000,
    0.0910,
    8.5,
    44.1,
    'C',
    72000,
    23.3630,
    85.3260,
    ST_SetSRID(
        ST_MakePoint(85.3260, 23.3630),
        4326
    )
),
(
    'BLDG-004',
    'Canopy Heights',
    'Kanke Road, Ranchi',
    35000,
    0.0715,
    52.0,
    35.9,
    'A+',
    22000,
    23.3710,
    85.3180,
    ST_SetSRID(
        ST_MakePoint(85.3180, 23.3710),
        4326
    )
),
(
    'BLDG-005',
    'Industrial Tech Park',
    'Tupudana, Ranchi',
    100000,
    0.0950,
    5.5,
    46.2,
    'D',
    110000,
    23.2740,
    85.3200,
    ST_SetSRID(
        ST_MakePoint(85.3200, 23.2740),
        4326
    )
);