import { BikeStationData } from '@/components/tabs/BikeTab';
import { BikeStation, BikeStationHistory } from '@prisma/client';

export const fetchBikeStationData = async () => {
  const data = await fetch('http://localhost:3000/api/bikes/', {
    cache: 'no-store',
  });
  const bikes = await data.json();

  const bikeStationData: BikeStationData[] = [];
  const bikeStationUniqueDate: string[] = [];

  bikes.forEach((bike: BikeStation) => {
    bike.BikeStationHistory.forEach((bikeHistory: BikeStationHistory) => {
      const date = bikeHistory.timestamp
        .toString()
        .split(':')
        .slice(0, 2)
        .join(':');
      if (!bikeStationUniqueDate.includes(date)) {
        bikeStationUniqueDate.push(date);
        bikeStationData.push({
          date: date,
          free_bikes: bikeHistory.free_bikes,
          empty_slots: bikeHistory.empty_slots,
        });
      } else {
        const dateIndex = bikeStationData.findIndex(
          (data) => data.date === date,
        );
        bikeStationData[dateIndex].free_bikes += bikeHistory.free_bikes;
        bikeStationData[dateIndex].empty_slots += bikeHistory.empty_slots;
      }
    });
  });

  bikeStationData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return bikeStationData;
};
