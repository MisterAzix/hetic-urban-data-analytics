import Map from '@/components/Map';
import BikeStationChart from '@/components/charts/BikeStationChart';

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
  const data = await fetch('http://localhost:3000/api/bikes/');
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

  return (
    <div className="grid flex-col gap-2">
      <div className="card h-auto">
        <BikeStationChart data={bikeStationsData} />
      </div>
      <div className="card pb-0">
        <Map />
      </div>
    </div>
  );
}
