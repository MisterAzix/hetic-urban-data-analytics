import { wrapperWithContext } from '@/lib/wrapper/wrapper';
import { BikeService } from '@/services/bike.service';
import { NextResponse } from 'next/server';

export const GET = wrapperWithContext(async (req, context) => {
  const { params } = context ?? {};
  const bikeService = new BikeService(process.env.BIKE_API_URL);
  const id = params?.id;

  const bikeStation = await bikeService.getBikeStationById(id);
  return NextResponse.json(bikeStation);
});
