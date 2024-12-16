'use client';

import BasicChart from './charts/BasicChart';
import CrimeTypeChart from './charts/CrimeTypeChart';

export default function BicycleTab() {
  return (
    <>
      <div className="border-b-8 border-white px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Type de criminalité</h2>
        <CrimeTypeChart />
      </div>
      <div className="px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Graphique basique</h2>
        <BasicChart />
      </div>
    </>
  );
}
