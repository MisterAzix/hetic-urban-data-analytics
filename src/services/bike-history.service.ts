import prisma from '@/lib/prisma';

export class BikeHistoryService {
  public constructor() {}

  async getBikeStationsHistory() {
    return prisma.bikeStationHistory.findMany();
  }
}
