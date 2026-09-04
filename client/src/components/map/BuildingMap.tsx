import React, { useMemo, useState } from 'react';
import Map from 'react-map-gl/maplibre';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';

// Import central type definitions from the single source of truth
import type { BuildingProperties } from '../../types/geojson';

// Initial map viewport centered on Munich
const INITIAL_VIEW_STATE = {
  latitude: 48.13715,
  longitude: 11.57612,
  zoom: 14,
  pitch: 45,
  bearing: 0,
};

// Utility function to map surface temperature (°C) to an RGB color array
// Cool (< 25°C) = Cyan/Blue | Warm (25°C - 34°C) = Yellow/Orange | Hot (> 37°C) = Bright Red
export const getTemperatureColor = (temp: number): [number, number, number] => {
  if (temp <= 25) return [50, 136, 189];    // Cool Cyan
  if (temp <= 28) return [102, 194, 165];   // Mint/Cool Green
  if (temp <= 31) return [254, 224, 139];   // Warm Yellow
  if (temp <= 34) return [253, 174, 97];    // Orange
  if (temp <= 37) return [244, 109, 67];    // Deep Orange
  return [213, 62, 79];                     // Hot Red
};

interface BuildingMapProps {
  data: FeatureCollection<Geometry, BuildingProperties>;
  mapStyle?: string;
}

export const BuildingMap: React.FC<BuildingMapProps> = ({
  data,
  mapStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
}) => {
  const [hoverInfo, setHoverInfo] = useState<{
    x: number;
    y: number;
    object?: Feature<Geometry, BuildingProperties>;
  } | null>(null);

  // Deck.gl GeoJsonLayer with 3D Polygon Extrusion using imported BuildingProperties
  const layer = useMemo(() => {
    return new GeoJsonLayer({
      id: 'buildings-3d-layer',
      data,
      filled: true,
      extruded: true,
      wireframe: true,
      pickable: true,
      getElevation: (f: Feature) => (f.properties as BuildingProperties)?.heightM || 10,
      getFillColor: (f: Feature) => {
        const temp = (f.properties as BuildingProperties)?.surfaceTemperature || 25;
        return getTemperatureColor(temp);
      },
      getLineColor: [255, 255, 255, 40],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      onHover: (info) => setHoverInfo(info.object ? (info as typeof hoverInfo) : null),
      updateTriggers: {
        getFillColor: [data],
        getElevation: [data],
      },
    });
  }, [data]);

  return (
    <div className="relative h-full w-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[layer]}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>

      {/* Tooltip on Hover */}
      {hoverInfo && hoverInfo.object && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            pointerEvents: 'none',
            left: hoverInfo.x + 10,
            top: hoverInfo.y + 10,
            backgroundColor: 'rgba(18, 18, 18, 0.9)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            border: '1px solid #333',
          }}
        >
          <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>
            {hoverInfo.object.properties.name}
          </strong>
          <div>External ID: {hoverInfo.object.properties.externalId}</div>
          <div>Height: {hoverInfo.object.properties.heightM} m</div>
          <div>Canopy: {hoverInfo.object.properties.treeCanopyPercentage}%</div>
          <div>
            Surface Temp:{' '}
            <span
              style={{
                fontWeight: 'bold',
                color: `rgb(${getTemperatureColor(hoverInfo.object.properties.surfaceTemperature).join(',')})`,
              }}
            >
              {hoverInfo.object.properties.surfaceTemperature}°C
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingMap;