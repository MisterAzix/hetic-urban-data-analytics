import CrimeTypeChart from '@/components/charts/CrimeTypeChart';
import CrimeAgeGroupChart from '@/components/charts/CrimeAgeGroupChart';

export default function CrimeTab() {
  return (
    <div className="flex gap-2">
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
    </div>
  );
}
