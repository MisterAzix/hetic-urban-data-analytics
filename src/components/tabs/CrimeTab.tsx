import BasicChart from '@/components/charts/BasicChart';
import CrimeTypeChart from '@/components/charts/CrimeTypeChart';

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
        <h2 className="p-4 text-2xl font-semibold">Graphique basique</h2>
        <div className="chart">
          <BasicChart />
        </div>
      </div>
    </div>
  );
}
