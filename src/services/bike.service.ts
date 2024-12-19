import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

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

  async getBikeStationById(id: string) {
    return prisma.bikeStation.findUnique({
      where: { id },
    });
  }

  async getBikeStations({
    latitude,
    longitude,
    free_bikes,
    empty_slots,
    total_capacity,
  }: GetBikeStationsParams) {
    const filters = {
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      free_bikes: free_bikes ? Number(free_bikes) : undefined,
      empty_slots: empty_slots ? Number(empty_slots) : undefined,
      total_capacity: total_capacity ? Number(total_capacity) : undefined,
    };

    return prisma.bikeStation.findMany({
      where: filters,
      include: {
        BikeStationHistory: true, // Include related BikeStationHistory records
      },
    });
  }

  async fetchBikeStationsFromApi() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      const bikeStations = data.network.stations;

      for (const station of bikeStations) {
        const existingStation = await prisma.bikeStation.findUnique({
          where: { external_id: station.id },
        });

        const newData = {
          name: station.name as string,
          latitude: station.latitude as number,
          longitude: station.longitude as number,
          timestamp: station.timestamp as Date,
          free_bikes: station.free_bikes as number,
          empty_slots: station.empty_slots as number,
          total_capacity: station.extra.slots as number,
          external_id: station.id as string,
        };

        if (existingStation) {
          // Check if data has changed
          const fieldsToCompare = ['free_bikes', 'empty_slots'] as const;

          const hasChanged = fieldsToCompare.some(
            (key) => newData[key] !== existingStation[key],
          );

          if (hasChanged) {
            // Save the current state to BikeStationHistory
            const bikeStationHistoryDto: Prisma.BikeStationHistoryCreateInput =
              {
                bikeStation: { connect: { id: existingStation.id } },
                timestamp: existingStation.timestamp,
                free_bikes: existingStation.free_bikes,
                empty_slots: existingStation.empty_slots,
              };
            await this.createBikeStationHistory(bikeStationHistoryDto);

            // Update the BikeStation with new data
            await this.updateBikeStation(existingStation.id, newData);
          }
        } else {
          // Create a new BikeStation if it doesn't exist
          await this.createBikeStation(newData);
        }
      }
    } catch (error) {
      console.error('Error fetching bike API!', error);
      throw new Error('Failed to fetch bike API!');
    }
  }

  private async createBikeStation(
    createBikeStationDto: Prisma.BikeStationCreateInput,
  ) {
    return await prisma.bikeStation.create({ data: createBikeStationDto });
  }

  private async updateBikeStation(
    id: string,
    updateBikeStationDto: Prisma.BikeStationUpdateInput,
  ) {
    return await prisma.bikeStation.update({
      where: { id },
      data: updateBikeStationDto,
    });
  }

  private async createBikeStationHistory(
    createBikeStationHistoryDto: Prisma.BikeStationHistoryCreateInput,
  ) {
    return await prisma.bikeStationHistory.create({
      data: createBikeStationHistoryDto,
    });
  }
}
