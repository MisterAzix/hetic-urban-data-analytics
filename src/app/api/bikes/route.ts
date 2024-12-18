import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bikeStations = await prisma.bikeStation.findMany();
    return NextResponse.json(bikeStations);
  } catch (error) {
    console.error('Error retrieving bike stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bike stations' },
      { status: 500 },
    );
  }
}
