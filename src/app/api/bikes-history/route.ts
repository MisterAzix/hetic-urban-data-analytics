import { NextResponse } from 'next/server';
import { wrapperWithoutContext } from '@/lib/wrapper/wrapper';
import { BikeHistoryService } from '@/services/bike-history.service';

export const GET = wrapperWithoutContext(async () => {
  const bikeHistoryService = new BikeHistoryService();
  const bikeStations = await bikeHistoryService.getBikeStationsHistory();

  return NextResponse.json(bikeStations);
});
