import prisma from '@/lib/prisma';
import { GetCrimesParams } from '@/app/api/crimes/route';
import { formatAgeGroup, formatBorough } from '@/lib/crimes.utils';

export class CrimeService {
  private readonly apiUrl: string;

  public constructor(apiUrl?: string) {
    if (!apiUrl) {
      throw new Error('API URL is required');
    }
    this.apiUrl = apiUrl;
  }

  async getCrimes(
    age_group: string | null,
    borough: string | null,
    summons_date: string | null,
    offense_description: string | null,
  ) {
    const filter: GetCrimesParams = {};

    if (age_group) {
      filter['age_group'] = formatAgeGroup(age_group);
    }
    if (borough) {
      filter['borough'] = formatBorough(borough);
    }
    if (summons_date) {
      filter['summons_date'] = new Date(summons_date);
    }
    if (offense_description) {
      filter['offense_description'] = { contains: offense_description };
    }

    return prisma.crime.findMany({ where: filter });
  }

  async createCrimes() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      const crimes = data.data;

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
    } catch (error) {
      console.error('Error fetching crime API!', error);
      throw new Error('Failed to fetch crime API!');
    }
  }
}
