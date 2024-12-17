import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Getting the data from the database
  const data = await fetch('http://api.citybik.es/v2/networks/citi-bike-nyc');
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
    console.log('========data inserted========');
  } catch (error) {
    console.error('========error========', error);
  }

  return NextResponse.json({ message: 'hello' });
}
