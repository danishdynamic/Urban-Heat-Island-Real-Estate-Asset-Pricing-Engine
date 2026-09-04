type PolygonCoordinates = number[][][];
type MultiPolygonCoordinates = number[][][][];

export interface BuildingProperties {
  id: string;
  externalId: string;
  name: string;
  address: string | null;
  heightM: number;
  squareFootage: number;
  rentalYield: number;
  surfaceTemperature: number;
  treeCanopyPercentage: number;
  energyEfficiencyRating: string | null;
}

export interface BuildingFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: PolygonCoordinates | MultiPolygonCoordinates;
  };
  properties: BuildingProperties;
}

export interface BuildingsGeoJSON {
  type: 'FeatureCollection';
  features: BuildingFeature[];
}