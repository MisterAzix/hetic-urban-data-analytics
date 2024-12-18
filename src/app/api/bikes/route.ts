import { NextResponse } from 'next/server';
import { BikeService } from '@/servcices/bike.service';
import { wrapper } from '@/lib/wrapper/wrapper';

// GET: Retrieve all bike stations from the database
export const GET = wrapper(async (req: Request) => {
  const bikeService = new BikeService(process.env.BIKE_API_URL);
  const bikeStations = await bikeService.getBikeStations();
  return NextResponse.json(bikeStations);
});
