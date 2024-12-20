import { BikeStationData } from '@/components/tabs/BikeTab';
import { BikeStation } from '@prisma/client';

export const fetchBikeStationData = async () => {
  const data = await fetch('http://localhost:3000/api/bikes/', {
    cache: 'no-store',
  });
  const bikes = await data.json();
  const bikeStationData: BikeStationData[] = [];
  const bikeStationUniqueDate: string[] = [];
  bikes.forEach((bike: BikeStation) => {
    const date = bike.timestamp.toString().split(':').slice(0, 2).join(':'); // Extract date and time up to minutes
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
  return bikeStationData;
};
