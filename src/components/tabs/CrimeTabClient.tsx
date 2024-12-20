'use client';

import React, { useState } from 'react';
import CrimeTypeChart from '@/components/charts/CrimeTypeChart';
import CrimeAgeGroupChart from '@/components/charts/CrimeAgeGroupChart';
import CrimeFrequencyChart from '@/components/charts/CrimeFrequencyChart';
import DateRangePicker from '@/components/DateRangePicker';

import { Crime } from '@prisma/client';

interface CrimeTabClientProps {
  crimes: Crime[];
}

const CrimeTabClient: React.FC<CrimeTabClientProps> = ({ crimes }) => {
  const [filteredCrimes, setFilteredCrimes] = useState<Crime[]>(crimes);

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    const filtered = crimes.filter((crime: Crime) => {
      const crimeDate = new Date(crime.summons_date);
      if (startDate && endDate) {
        return crimeDate >= startDate && crimeDate <= endDate;
      }
      return true;
    });
    setFilteredCrimes(filtered);
  };

  // Types de crimes
  let offenseCounts: { [key: string]: number } = {};

  filteredCrimes.forEach((crime: Crime) => {
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

  filteredCrimes.forEach((crime: Crime) => {
    const ageGroup = crime.age_group as keyof typeof ageGroupCounts;
    if (ageGroupCounts.hasOwnProperty(ageGroup)) {
      ageGroupCounts[ageGroup]++;
    }
  });

  // Fréquence
  let monthlyCrimeCounts: { [key: string]: number } = {};

  filteredCrimes.forEach((crime: Crime) => {
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
    const sortedMonthlyCrimeCounts = Object.keys(monthlyCrimeCounts)
    .sort(
      (a, b) =>
        new Date(a).getTime() - new Date(b).getTime(),
    )
    .reduce(
      (acc, key) => {
        acc[key] = monthlyCrimeCounts[key];
        return acc;
      },
      {} as { [key: string]: number },
    );

    const indexedMonthlyCrimeCounts = Object.keys(sortedMonthlyCrimeCounts).map((key, index) => {
        const [month, year] = key.split(' ');
        return {
          index,
          month,
          year,
          crimes: sortedMonthlyCrimeCounts[key],
        };
      });
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-2 flex justify-between items-center">
        <DateRangePicker onDateChange={handleDateChange} />
      </div>
      <CrimeTypeChart data={offenseCounts} />
      <CrimeAgeGroupChart data={ageGroupCounts} />
      <div className="col-span-2">
        <CrimeFrequencyChart data={monthlyCrimeCounts} />
      </div>
    </div>
  );
};

export default CrimeTabClient;