export interface Building {
  id: string;
  externalId: string;

  name: string;
  address: string | null;

  squareFootage: number;
  rentalYield: number;
  annualRent: number;
  operatingExpenses: number;
  vacancyRate: number;

  treeCanopyPercentage: number;
  surfaceTemperature: number;

  energyEfficiencyRating: string | null;
  annualHvacCost: number;

  latitude: number;
  longitude: number;

  heightMeters: number;
  floorCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface BuildingListResponse {
  data: Building[];

  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}