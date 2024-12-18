import prisma from '@/lib/prisma';

type Optional<T> = {
  [K in keyof T]?: T[K] | undefined | null;
};

export type GetBikeStationsParams = Optional<{
  latitude: string;
  longitude: string;
  free_bikes: string;
  empty_slots: string;
  total_capacity: string;
}>;

export class BikeService {
  private readonly apiUrl: string;

  public constructor(apiUrl?: string) {
    if (!apiUrl) {
      throw new Error('API URL is required');
    }
    this.apiUrl = apiUrl;
  }

  async getBikeStations({
    latitude,
    longitude,
    free_bikes,
    empty_slots,
    total_capacity,
  }: GetBikeStationsParams) {
    return prisma.bikeStation.findMany({
      where: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        free_bikes: Number(free_bikes),
        empty_slots: Number(empty_slots),
        total_capacity: Number(total_capacity),
      },
    });
  }

  async createBikeStations() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      const bikeStations = data.network.stations;

      for (const station of bikeStations) {
        await prisma.bikeStation.create({
          data: {
            external_id: station.id,
            name: station.name,
            latitude: station.latitude,
            longitude: station.longitude,
            timestamp: station.timestamp,
            free_bikes: station.free_bikes,
            empty_slots: station.empty_slots,
            total_capacity: station.extra.slots,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching bike API!', error);
      throw new Error('Failed to fetch bike API!');
    }
  }
}
