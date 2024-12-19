import {
  BikeStation,
  BikeStationHistory,
  Crime,
  PrismaClient,
} from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Read the JSON files
  const bikeStationData: BikeStation[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, './seeding/bikes.json'), 'utf-8'),
  );
  const crimesData: Crime[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, './seeding/crimes.json'), 'utf-8'),
  );
  const bikeStationHistoryData: BikeStationHistory[] = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, './seeding/bikes_history.json'),
      'utf-8',
    ),
  );

  console.log(
    'Seeding data...',
    bikeStationData.length,
    crimesData.length,
    bikeStationHistoryData.length,
  );

  // Seed the BikeStation data
  for (const station of bikeStationData) {
    await prisma.bikeStation.create({
      data: {
        external_id: station.external_id,
        name: station.name,
        latitude: station.latitude,
        longitude: station.longitude,
        timestamp: station.timestamp,
        free_bikes: station.free_bikes,
        empty_slots: station.empty_slots,
        total_capacity: station.total_capacity,
      },
    });
  }

  // Seed the Crime data
  for (const crime of crimesData) {
    await prisma.crime.create({
      data: {
        external_id: crime.external_id,
        latitude: crime.latitude,
        longitude: crime.longitude,
        age_group: crime.age_group,
        sex: crime.sex,
        race: crime.race,
        summons_date: crime.summons_date,
        offense_description: crime.offense_description,
        borough: crime.borough,
      },
    });
  }

  // Seed the BikeStationHistory data
  for (const stationHistory of bikeStationHistoryData) {
    await prisma.bikeStationHistory.create({
      data: {
        bikeStation: {
          connect: { external_id: stationHistory.bikeStationExternalId },
        },
        timestamp: stationHistory.timestamp,
        free_bikes: stationHistory.free_bikes,
        empty_slots: stationHistory.empty_slots,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
