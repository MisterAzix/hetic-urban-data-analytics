'use client';

import BasicChart from './charts/BasicChart';
import CrimeTypeChart from './charts/CrimeTypeChart';

export default function CrimeTab() {
  return (
    <>
      <div className="mb-2 rounded-lg bg-muted px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Type de criminalité</h2>
        <CrimeTypeChart />
      </div>
      <div className="rounded-lg bg-muted px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Graphique basique</h2>
        <BasicChart />
      </div>
    </>
  );
}
