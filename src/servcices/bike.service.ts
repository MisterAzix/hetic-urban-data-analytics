import prisma from '@/lib/prisma';

export class BikeService {
  private readonly apiUrl: string;

  public constructor(apiUrl?: string) {
    if (!apiUrl) {
      throw new Error('API URL is required');
    }
    this.apiUrl = apiUrl;
  }

  async getBikeStations() {
    return prisma.bikeStation.findMany();
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
