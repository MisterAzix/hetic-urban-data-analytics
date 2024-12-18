import { wrapperWithContext } from '@/lib/wrapper/wrapper';
import { CrimeService } from '@/services/crime.service';
import { NextResponse } from 'next/server';

export const GET = wrapperWithContext(async (req, context) => {
  const { params } = context ?? {};
  const crimeService = new CrimeService(process.env.CRIME_API_URL);
  const id = params?.id;

  const crime = await crimeService.getCrimeById(id);
  return NextResponse.json(crime);
});
