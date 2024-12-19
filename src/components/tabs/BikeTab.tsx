import Map from '@/components/Map';
import BikeStationChart from '@/components/charts/BikeStationChart';

import { HeatLatLngTuple } from 'leaflet';
import { BikeStation } from '@prisma/client';

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

  // Statistiques sur les stations
  const bikeStationData: BikeStationData[] = [];
  const bikeStationUniqueDate: string[] = [];
  bikes.forEach((bike: BikeStation) => {
    const date = bike.timestamp.toString().split('T')[0];
    if (!bikeStationUniqueDate.includes(date)) {
      bikeStationUniqueDate.push(date);
      bikeStationData.push({
        date: date,
        free_bikes: bike.free_bikes,
        empty_slots: bike.empty_slots,
      });
    } else {
      const dateIndex = bikeStationData.findIndex((data) => data.date === date);
      bikeStationData[dateIndex].free_bikes += bike.free_bikes;
      bikeStationData[dateIndex].empty_slots += bike.empty_slots;
    }
  });

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
