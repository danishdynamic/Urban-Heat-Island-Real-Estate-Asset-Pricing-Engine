import { create } from 'zustand';

interface MapState {
  selectedBuildingId: string | null;

  heatMode:
    | 'temperature'
    | 'canopy'
    | 'hvac';

  setSelectedBuilding: (
    id: string | null,
  ) => void;

  setHeatMode: (
    mode:
      | 'temperature'
      | 'canopy'
      | 'hvac',
  ) => void;
}

export const useMapStore =
  create<MapState>((set) => ({
    selectedBuildingId: null,

    heatMode: 'temperature',

    setSelectedBuilding: (
      id,
    ) =>
      set({
        selectedBuildingId: id,
      }),

    setHeatMode: (
      mode,
    ) =>
      set({
        heatMode: mode,
      }),
  }));