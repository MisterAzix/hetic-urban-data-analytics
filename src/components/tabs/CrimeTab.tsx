import CrimeTypeChart from '@/components/charts/CrimeTypeChart';
import CrimeAgeGroupChart from '@/components/charts/CrimeAgeGroupChart';
import CrimeFrequencyChart from '../charts/CrimeFrequencyChart';

export default function CrimeTab() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="card">
        <h2 className="p-4 text-2xl font-semibold">Types de crimes</h2>
        <div className="chart">
          <CrimeTypeChart />
        </div>
      </div>
      <div className="card">
        <h2 className="p-4 text-2xl font-semibold">Groupes d&apos;âge</h2>
        <div className="chart">
          <CrimeAgeGroupChart />
        </div>
      </div>
      <div className="card col-span-2">
        <h2 className="p-4 text-2xl font-semibold">Fréquence</h2>
        <div className="chart">
          <CrimeFrequencyChart />
        </div>
      </div>
    </div>
  );
}
