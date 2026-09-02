import { create } from 'zustand';

interface MapState {
  selectedBuildingId: string | null;

  heatMode:
    | 'temperature'
    | 'canopy'
    | 'hvac';

  temperatureDelta: number;

  setSelectedBuilding: (
    id: string | null,
  ) => void;

  setHeatMode: (
    mode:
      | 'temperature'
      | 'canopy'
      | 'hvac',
  ) => void;

  setTemperatureDelta: (
    value: number,
  ) => void;
}

export const useMapStore =
  create<MapState>((set) => ({
    selectedBuildingId: null,

    heatMode: 'temperature',

    temperatureDelta: 0,

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

    setTemperatureDelta: (
      value,
    ) =>
      set({
        temperatureDelta: value,
      }),
  }));