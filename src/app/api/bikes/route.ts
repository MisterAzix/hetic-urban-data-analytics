import { NextResponse } from 'next/server';
import { BikeService } from '@/servcices/bike.service';

// GET: Retrieve all bike stations from the database
export async function GET() {
  const bikeService = new BikeService(process.env.BIKE_API_URL);

  try {
    const bikeStations = await bikeService.getBikeStations();
    return NextResponse.json(bikeStations);
  } catch (error) {
    console.error('Error retrieving bike stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bike stations' },
      { status: 500 },
    );
  }
}
