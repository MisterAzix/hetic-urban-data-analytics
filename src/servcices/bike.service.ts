import prisma from '@/lib/prisma';

export type GetBikeStationsParams = Partial<{
  latitude: number;
  longitude: number;
  free_bikes: number;
  empty_slots: number;
  total_capacity: number;
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
        latitude,
        longitude,
        free_bikes,
        empty_slots,
        total_capacity,
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
