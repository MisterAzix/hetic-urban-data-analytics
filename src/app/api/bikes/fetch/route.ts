import { NextResponse } from 'next/server';
import { BikeService } from '@/services/bike.service';

export async function POST() {
  const bikeService = new BikeService(process.env.BIKE_API_URL);
  console.log('======POST CONTROLLER======');

  try {
    await bikeService.fetchBikeStationsFromApi();
  } catch (error) {
    console.error('Error creating bike stations:', error);
    return NextResponse.json(
      { error: 'Failed to create bike stations' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Bike stations created!' });
}
