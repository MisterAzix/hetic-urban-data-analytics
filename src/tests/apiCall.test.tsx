import { GET as GetCrimes } from '../app/api/crimes/route';
import { GET as GetBikeStations } from '../app/api/bikes/route';
import { NextResponse } from 'next/server';

describe('API Tests', () => {
  describe('Crimes API', () => {
    const crimeApiUrl = process.env.CRIME_API_URL;
    if (!crimeApiUrl) {
      throw new Error('CRIME_API_URL is not defined');
    }

    it('should return crimes data successfully', async () => {
      const req = new Request(`${crimeApiUrl}?age_group=ADULT`);
      const res = await GetCrimes(req);

      expect(res).toBeInstanceOf(NextResponse);
      const jsonResponse = await res.json();
      expect(Array.isArray(jsonResponse)).toBe(true);
      expect(jsonResponse.length).toBeGreaterThan(0);
    });

  });

  describe('Bike Stations API', () => {
    const bikeApiUrl = process.env.BIKE_API_URL;
    if (!bikeApiUrl) {
      throw new Error('BIKE_API_URL is not defined');
    }

    it('should return bike stations data successfully', async () => {
      const req = new Request(bikeApiUrl);
      const res = await GetBikeStations(req);

      expect(res).toBeInstanceOf(NextResponse);
      const jsonResponse = await res.json();
      expect(Array.isArray(jsonResponse)).toBe(true);
      expect(jsonResponse.length).toBeGreaterThan(0);
    });

  });
});