import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  const data = await fetch('https://api.citybik.es/v2/networks/citi-bike-nyc');
  const bikeStations = await data.json();
  try {
    for (const station of bikeStations.network.stations) {
      await prisma.bikeStation.create({
        data: {
          external_id: station.id,
          name: station.name,
          latitude: station.latitude,
          longitude: station.longitude,
          timestamp: station.timestamp,
          free_bikes: station.free_bikes,
          empty_slots: station.empty_slots,
          total_capacity: station.extra.slots,
        },
      });
    }
  } catch (error) {
    console.error('Error creating bike stations:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create bike stations', details: errorMessage },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Bike stations created' });
}
