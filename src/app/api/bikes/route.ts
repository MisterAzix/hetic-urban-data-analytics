import { NextResponse } from 'next/server';
import { BikeService } from '@/servcices/bike.service';

// GET: Retrieve all bike stations from the database
export async function GET(req: Request) {
  const bikeService = new BikeService(process.env.BIKE_API_URL);

  try {
    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get('latitude') ?? undefined;
    const longitude = searchParams.get('longitude') ?? undefined;
    const free_bikes = searchParams.get('free_bikes') ?? undefined;
    const empty_slots = searchParams.get('empty_slots') ?? undefined;
    const total_capacity = searchParams.get('total_capacity') ?? undefined;

    const bikeStations = await bikeService.getBikeStations({
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      free_bikes: free_bikes ? Number(free_bikes) : undefined,
      empty_slots: empty_slots ? Number(empty_slots) : undefined,
      total_capacity: total_capacity ? Number(total_capacity) : undefined,
    });

    return NextResponse.json(bikeStations);
  } catch (error) {
    console.error('Error retrieving bike stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bike stations' },
      { status: 500 },
    );
  }
}
