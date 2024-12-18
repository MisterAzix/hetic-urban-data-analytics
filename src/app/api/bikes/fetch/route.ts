import { NextResponse } from 'next/server';
import { BikeService } from '@/servcices/bike.service';

export async function POST() {
  const bikeService = new BikeService(process.env.BIKE_API_URL);

  try {
    await bikeService.createBikeStations();
  } catch (error) {
    console.error('Error creating bike stations:', error);
    return NextResponse.json(
      { error: 'Failed to create bike stations' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Bike stations created!' });
}
