import React from 'react';
import CrimeTabClient from './CrimeTabClient';
import { Crime } from '@prisma/client';

export default async function CrimeTab() {
  if (!process.env.LOCAL_CRIME_API) {
    throw new Error('LOCAL_CRIME_API is not defined');
  }
  const data = await fetch(process.env.LOCAL_CRIME_API);
  const crimes: Crime[] = await data.json();

  return <CrimeTabClient crimes={crimes} />;
}