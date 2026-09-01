import Map from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

import { BuildingLayer } from './BuildingLayer';

export function MapView() {
  return (
    <Map
      initialViewState={{
        longitude: 85.3096,
        latitude: 23.3441,
        zoom: 12,
        pitch: 45,
        bearing: 0,
      }}
      mapStyle={
        import.meta.env
          .VITE_MAP_STYLE_URL
      }
    >
      <BuildingLayer />
    </Map>
  );
}