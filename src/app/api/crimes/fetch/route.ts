import { NextResponse } from 'next/server';
import { CrimeService } from '@/servcices/crime.service';

export async function POST() {
  const crimeService = new CrimeService(process.env.CRIME_API_URL);

  try {
    await crimeService.createCrimes();
  } catch (error) {
    console.error('Error creating crimes:', error);
    return NextResponse.json(
      { error: 'Failed to create crimes' },
      { status: 500 },
    );
  }
  return NextResponse.json({ message: 'Crimes created!' });
}
