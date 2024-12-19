import CrimeTypeChart from '@/components/charts/CrimeTypeChart';
import CrimeAgeGroupChart from '@/components/charts/CrimeAgeGroupChart';
import CrimeFrequencyChart from '@/components/charts/CrimeFrequencyChart';

import { Crime } from '@prisma/client';

export default async function CrimeTab() {
  const data = await fetch('http://localhost:3000/api/crimes/');
  const crimes = await data.json();

  // Types de crimes
  let offenseCounts: { [key: string]: number } = {};

  crimes.forEach((crime: Crime) => {
    const offense = crime.offense_description.replace(
      /\s+|[?',.*\/:()\-]|[";]/g,
      '_',
    );
    if (offenseCounts[offense]) {
      offenseCounts[offense]++;
    } else {
      offenseCounts[offense] = 1;
    }
  });

  offenseCounts = Object.entries(offenseCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as { [key: string]: number },
    );

  // Groupes d'âge
  const ageGroupCounts = {
    LESS_THAN_18: 0,
    AGE_18_TO_24: 0,
    AGE_25_TO_44: 0,
    AGE_45_TO_64: 0,
    AGE_65_PLUS: 0,
  };

  crimes.forEach((crime: Crime) => {
    const ageGroup = crime.age_group as keyof typeof ageGroupCounts;
    if (ageGroupCounts.hasOwnProperty(ageGroup)) {
      ageGroupCounts[ageGroup]++;
    }
  });

  // Fréquence
  let monthlyCrimeCounts: { [key: string]: number } = {};

  crimes.forEach((crime: Crime) => {
    const month = new Date(crime.summons_date)
      .toLocaleString('en-US', {
        month: 'long',
      })
      .toLowerCase();
    if (monthlyCrimeCounts[month]) {
      monthlyCrimeCounts[month]++;
    } else {
      monthlyCrimeCounts[month] = 1;
    }
  });

  monthlyCrimeCounts = Object.keys(monthlyCrimeCounts)
    .sort(
      (a, b) =>
        new Date(`1970 ${a}`).getTime() - new Date(`1970 ${b}`).getTime(),
    )
    .reduce(
      (acc, key) => {
        acc[key] = monthlyCrimeCounts[key];
        return acc;
      },
      {} as { [key: string]: number },
    );

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="card">
        <h2 className="p-4 text-2xl font-semibold">Types de crimes</h2>
        <div className="chart">
          <CrimeTypeChart data={offenseCounts} />
        </div>
      </div>
      <div className="card">
        <h2 className="p-4 text-2xl font-semibold">Groupes d&apos;âge</h2>
        <div className="chart">
          <CrimeAgeGroupChart data={ageGroupCounts} />
        </div>
      </div>
      <div className="card col-span-2">
        <h2 className="p-4 text-2xl font-semibold">Fréquence</h2>
        <div className="chart">
          <CrimeFrequencyChart data={monthlyCrimeCounts} />
        </div>
      </div>
    </div>
  );
}
