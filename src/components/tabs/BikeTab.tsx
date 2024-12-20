import Map from '@/components/Map';
import BikeStationChart from '@/components/charts/BikeStationChart';

import { HeatLatLngTuple } from 'leaflet';
import { BikeStation } from '@prisma/client';
import { fetchBikeStationData } from '@/lib/bikes.utils';

export interface BikeStationData {
  date: string;
  free_bikes: number;
  empty_slots: number;
}

export default async function BikeTab() {
  const data = await fetch('http://localhost:3000/api/bikes/', {
    cache: 'no-store',
  });
  const bikes = await data.json();

  const bikeStationData = await fetchBikeStationData();

  // Carte des stations
  const bikeStationHeatmap: HeatLatLngTuple[] = [];
  bikes.forEach((bike: BikeStation) => {
    const latitude = Number(bike.latitude);
    const longitude = Number(bike.longitude);
    bikeStationHeatmap.push([latitude, longitude, 5]);
  });

  return (
    <div className="grid gap-2">
      <BikeStationChart data={bikeStationData} />
      <Map data={bikeStationHeatmap} />
    </div>
  );
}
