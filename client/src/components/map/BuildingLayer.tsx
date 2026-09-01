import {
  useMemo,
} from 'react';

import {
  GeoJsonLayer,
} from '@deck.gl/layers';

import {
  MapboxOverlay,
} from '@deck.gl/mapbox';

import {
  useControl,
} from 'react-map-gl/maplibre';

import {
  useBuildingGeoJson,
} from '../../hooks/useBuildings';

export function BuildingLayer() {
  const {
    data,
  } = useBuildingGeoJson();

  const layer = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      new GeoJsonLayer({
        id: 'buildings',

        data,

        filled: true,

        extruded: true,

        getElevation: (
          feature: any,
        ) =>
          Number(
            feature.properties
              .heightMeters,
          ),

        getFillColor: (
          feature: any,
        ) => {
          const temperature =
            Number(
              feature.properties
                .surfaceTemperature,
            );

          if (temperature >= 44) {
            return [180, 0, 0];
          }

          if (temperature >= 40) {
            return [255, 100, 0];
          }

          if (temperature >= 37) {
            return [255, 200, 0];
          }

          return [0, 150, 255];
        },

        getLineColor: [
          80,
          80,
          80,
        ],

        pickable: true,

        autoHighlight: true,
      }),
    ];
  }, [data]);

  useControl(() => {
    return new MapboxOverlay({
      interleaved: true,
      layers: layer,
    });
  });

  return null;
}