export class BuildingResponseDto {
  id: string;
  externalId: string;

  name: string;
  address: string | null;

  squareFootage: number;
  rentalYield: number;

  treeCanopyPercentage: number;
  surfaceTemperature: number;

  energyEfficiencyRating: string | null;
  annualHvacCost: number;

  latitude: number;
  longitude: number;

  heightMeters: number;
  floorCount: number;

  createdAt: Date;
  updatedAt: Date;
}