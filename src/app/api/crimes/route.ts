import prisma from '@/lib/prisma';
import { AGE_GROUP, NEW_YORK_BOROUGH } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  // Getting the data from the database
  const data = await fetch(
    'https://data.cityofnewyork.us/resource/mv4k-y93f.json',
  );
  const crimes = await data.json();

  try {
    for (const crime of crimes) {
      let age_group = crime.age_group;
      switch (age_group) {
        case '<18':
          age_group = AGE_GROUP.LESS_THAN_18;
          break;
        case '18-24':
          age_group = AGE_GROUP.AGE_18_TO_24;
          break;
        case '25-44':
          age_group = AGE_GROUP.AGE_25_TO_44;
          break;
        case '45-64':
          age_group = AGE_GROUP.AGE_45_TO_64;
          break;
        case '65+':
          age_group = AGE_GROUP.AGE_65_PLUS;
          break;
        default:
          age_group = AGE_GROUP.UNKNOWN;
      }

      const summonsDate = new Date(crime.summons_date);

      let borough = crime.boro;
      switch (borough) {
        case 'MANHATTAN':
          borough = NEW_YORK_BOROUGH.MANHATTAN;
          break;
        case 'BRONX':
          borough = NEW_YORK_BOROUGH.BRONX;
          break;
        case 'BROOKLYN':
          borough = NEW_YORK_BOROUGH.BROOKLYN;
          break;
        case 'QUEENS':
          borough = NEW_YORK_BOROUGH.QUEENS;
          break;
        case 'STATEN ISLAND':
          borough = NEW_YORK_BOROUGH.STATEN_ISLAND;
          break;
        default:
          borough = NEW_YORK_BOROUGH.NEW_YORK;
      }

      await prisma.crime.create({
        data: {
          external_id: crime.summons_key,
          latitude: crime.latitude,
          longitude: crime.longitude,
          age_group: age_group,
          sex: crime.sex,
          race: crime.race,
          summons_date: summonsDate,
          offense_description: crime.offense_description,
          borough: borough,
        },
      });
    }
    console.log('========data inserted========');
  } catch (error) {
    console.error('========error========', error);
  }

  return NextResponse.json({ message: 'hello' });
}

export async function POST() {
  // fetching the initial data
}
