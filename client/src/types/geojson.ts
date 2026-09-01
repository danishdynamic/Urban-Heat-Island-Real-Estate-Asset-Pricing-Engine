import type { Building } from './building';

export interface BuildingFeature {
  type: 'Feature';

  geometry: {
    type: 'Point';

    coordinates: [
      number,
      number
    ];
  };

  properties: Building;
}

export interface BuildingFeatureCollection {
  type: 'FeatureCollection';

  features: BuildingFeature[];
}