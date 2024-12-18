import { formatAgeGroup, formatBorough } from '@/lib/crimes.';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  const data = await fetch(
    'https://data.cityofnewyork.us/resource/mv4k-y93f.json',
  );
  const crimes = await data.json();
  console.log('crimes', crimes);

  try {
    for (const crime of crimes) {
      const ageGroup = formatAgeGroup(crime.age_group);
      const borough = formatBorough(crime.boro);
      const summonsDate = new Date(crime.summons_date);

      await prisma.crime.create({
        data: {
          external_id: crime.summons_key,
          latitude: crime.latitude,
          longitude: crime.longitude,
          age_group: ageGroup,
          sex: crime.sex,
          race: crime.race,
          summons_date: summonsDate,
          offense_description: crime.offense_description,
          borough: borough,
        },
      });
    }

    return NextResponse.json({ message: 'Crimes created' });
  } catch (error) {
    console.error('Error creating crimes:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create crimes', details: errorMessage },
      { status: 500 },
    );
  }
}
