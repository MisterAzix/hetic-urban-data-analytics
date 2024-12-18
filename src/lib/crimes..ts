import { AGE_GROUP, NEW_YORK_BOROUGH } from '@prisma/client';

// Utility function for formatting age group
export function formatAgeGroup(age_group: string): AGE_GROUP {
  switch (age_group) {
    case '<18':
      return AGE_GROUP.LESS_THAN_18;
    case '18-24':
      return AGE_GROUP.AGE_18_TO_24;
    case '25-44':
      return AGE_GROUP.AGE_25_TO_44;
    case '45-64':
      return AGE_GROUP.AGE_45_TO_64;
    case '65+':
      return AGE_GROUP.AGE_65_PLUS;
    default:
      return AGE_GROUP.UNKNOWN;
  }
}

// Utility function for formatting borough
export function formatBorough(borough: string): NEW_YORK_BOROUGH {
  switch (borough) {
    case 'MANHATTAN':
      return NEW_YORK_BOROUGH.MANHATTAN;
    case 'BRONX':
      return NEW_YORK_BOROUGH.BRONX;
    case 'BROOKLYN':
      return NEW_YORK_BOROUGH.BROOKLYN;
    case 'QUEENS':
      return NEW_YORK_BOROUGH.QUEENS;
    case 'STATEN ISLAND':
      return NEW_YORK_BOROUGH.STATEN_ISLAND;
    default:
      return NEW_YORK_BOROUGH.NEW_YORK;
  }
}

// Typing the get crimes params
export type GetCrimesParams = {
  age_group?: AGE_GROUP;
  borough?: NEW_YORK_BOROUGH;
  summons_date?: Date;
  offense_description?: { contains: string };
};
