import { NextResponse } from 'next/server';
import { BikeService } from '@/services/bike.service';
import { wrapperWithoutContext } from '@/lib/wrapper/wrapper';

// GET: Retrieve all bike stations from the database
export const GET = wrapperWithoutContext(async (req: Request) => {
  const bikeService = new BikeService(process.env.BIKE_API_URL);
   const { searchParams } = new URL(req.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const free_bikes = searchParams.get('free_bikes');
    const empty_slots = searchParams.get('empty_slots');
    const total_capacity = searchParams.get('total_capacity');

    const bikeStations = await bikeService.getBikeStations({
      latitude,
      longitude,
      free_bikes,
      empty_slots,
      total_capacity,
    });
  
  return NextResponse.json(bikeStations);
});