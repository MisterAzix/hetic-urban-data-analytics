import {
  formatAgeGroup,
  formatBorough,
  GetCrimesParams,
} from '@/lib/crimes.utils';
import prisma from '@/lib/prisma';
import { AGE_GROUP, NEW_YORK_BOROUGH } from '@prisma/client';
import { NextResponse } from 'next/server';

// GET: Retrieve crimes from the database
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const age_group = searchParams.get('age_group');
    const borough = searchParams.get('borough');
    const summons_date = searchParams.get('summons_date');
    const offense_description = searchParams.get('offense_description');

    const where: GetCrimesParams = {};

    if (age_group) {
      where['age_group'] = formatAgeGroup(age_group) as AGE_GROUP;
    }
    if (borough) {
      where['borough'] = formatBorough(borough) as NEW_YORK_BOROUGH;
    }
    if (summons_date) {
      where['summons_date'] = new Date(summons_date);
    }
    if (offense_description) {
      where['offense_description'] = { contains: offense_description };
    }

    const crimes = await prisma.crime.findMany({ where });
    return NextResponse.json(crimes);
  } catch (error) {
    console.error('Error retrieving crimes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crimes' },
      { status: 500 },
    );
  }
}
