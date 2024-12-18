import { NextResponse } from 'next/server';
import { AGE_GROUP, NEW_YORK_BOROUGH } from '@prisma/client';
import { CrimeService } from '@/servcices/crime.service';

export type GetCrimesParams = {
  age_group?: AGE_GROUP;
  borough?: NEW_YORK_BOROUGH;
  summons_date?: Date;
  offense_description?: { contains: string };
};

// GET: Retrieve crimes from the database
export async function GET(req: Request) {
  const crimeService = new CrimeService(process.env.CRIME_API_URL);

  try {
    const { searchParams } = new URL(req.url);
    const age_group = searchParams.get('age_group');
    const borough = searchParams.get('borough');
    const summons_date = searchParams.get('summons_date');
    const offense_description = searchParams.get('offense_description');

    const crimes = await crimeService.getCrimes(
      age_group,
      borough,
      summons_date,
      offense_description,
    );
    return NextResponse.json(crimes);
  } catch (error) {
    console.error('Error retrieving crimes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crimes' },
      { status: 500 },
    );
  }
}
