import Map from '@/components/Map';
import BikeStationChart from '@/components/charts/BikeStationChart';

export default function BikeTab() {
  return (
    <div className="grid flex-col gap-2">
      <div className="card h-auto">
        <BikeStationChart />
      </div>
      <div className="card">
        <Map />
      </div>
    </div>
  );
}
