import { GET as GetCrimes} from '../app/api/crimes/route';
import { GET as GetBikeStations } from '../app/api/bikes/route';
import { NextResponse } from 'next/server';
import { CrimeService } from '@/servcices/crime.service';
import { BikeService } from '@/servcices/bike.service';

jest.mock('@/servcices/crime.service');
jest.mock('@/servcices/bike.service');

describe('API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Crimes API', () => {
    it('should return crimes data successfully', async () => {
      const mockCrimes = [
        { id: 1, age_group: 'ADULT', borough: 'MANHATTAN', offense_description: 'Assault' },
      ];
      CrimeService.prototype.getCrimes = jest.fn().mockResolvedValue(mockCrimes);

      const req = new Request('http://localhost/api/crimes?age_group=ADULT');
      const res = await GetCrimes(req);

      expect(res).toBeInstanceOf(NextResponse);
      const jsonResponse = await res.json();
      expect(jsonResponse).toEqual(mockCrimes);
      expect(CrimeService.prototype.getCrimes).toHaveBeenCalledWith('ADULT', null, null, null);
    });

    it('should handle errors when fetching crimes', async () => {
      CrimeService.prototype.getCrimes = jest.fn().mockRejectedValue(new Error('Service Error'));

      const req = new Request('http://localhost/api/crimes');
      const res = await GetCrimes(req);

      expect(res).toBeInstanceOf(NextResponse);
      const jsonResponse = await res.json();
      expect(jsonResponse).toEqual({ error: 'Failed to fetch crimes' });
      expect(res.status).toBe(500);
      expect(CrimeService.prototype.getCrimes).toHaveBeenCalled();
    });
  });

  describe('Bike Stations API', () => {
    it('should return bike stations data successfully', async () => {
      const mockBikeStations = [
        { id: 1, name: 'Station 1', availableBikes: 10 },
        { id: 2, name: 'Station 2', availableBikes: 5 },
      ];
      BikeService.prototype.getBikeStations = jest.fn().mockResolvedValue(mockBikeStations);

      const res = await GetBikeStations();

      expect(res).toBeInstanceOf(NextResponse);
      const jsonResponse = await res.json();
      expect(jsonResponse).toEqual(mockBikeStations);
      expect(BikeService.prototype.getBikeStations).toHaveBeenCalled();
    });

    it('should handle errors when fetching bike stations', async () => {
      BikeService.prototype.getBikeStations = jest.fn().mockRejectedValue(new Error('Service Error'));

      const res = await GetBikeStations();

      expect(res).toBeInstanceOf(NextResponse);
      const jsonResponse = await res.json();
      expect(jsonResponse).toEqual({ error: 'Failed to fetch bike stations' });
      expect(res.status).toBe(500);
      expect(BikeService.prototype.getBikeStations).toHaveBeenCalled();
    });
  });
});
