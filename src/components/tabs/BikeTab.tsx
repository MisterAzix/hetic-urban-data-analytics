import Map from '@/components/Map';
import BikeStationChart from '@/components/charts/BikeStationChart';
import { HeatLatLngTuple } from 'leaflet';

interface Bike {
  id: string;
  external_id: string;
  name: string;
  latitude: string;
  longitude: string;
  timestamp: string;
  free_bikes: number;
  total_capacity: number;
  empty_slots: number;
}

export default async function BikeTab() {
  
  const bikeApiUrl = process.env.BIKE_API_URL;
  if (!bikeApiUrl) {
    throw new Error('BIKE_API_URL is not defined');
  }
  const data = await fetch(bikeApiUrl);
  const bikes = await data.json();

  // Statistiques sur les stations
  const bikeDataByDate = bikes.reduce(
    (
      acc: {
        [key: string]: {
          date: string;
          free_bikes: number;
          empty_slots: number;
        }[];
      },
      bike: Bike,
    ) => {
      const date = new Date(bike.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        date,
        free_bikes: bike.free_bikes,
        empty_slots: bike.empty_slots,
      });
      return acc;
    },
    {},
  );

  const bikeStationsData = Object.keys(bikeDataByDate).map((date) => {
    const dailyData = bikeDataByDate[date].reduce(
      (acc, data) => {
        acc.free_bikes += data.free_bikes;
        acc.empty_slots += data.empty_slots;
        return acc;
      },
      { date, free_bikes: 0, empty_slots: 0 },
    );
    return dailyData;
  });

  // Map
  const bikeStationCoordinates: HeatLatLngTuple[] = [];
  bikes.forEach((bike: Bike) => {
    bikeStationCoordinates.push([
      parseFloat(bike.latitude),
      parseFloat(bike.longitude),
      5,
    ]);
  });

  return (
    <div className="grid flex-col gap-2">
      <div className="card h-auto">
        <BikeStationChart data={bikeStationsData} />
      </div>
      <div className="card pb-0">
        <Map data={bikeStationCoordinates} />
      </div>
    </div>
  );
}
