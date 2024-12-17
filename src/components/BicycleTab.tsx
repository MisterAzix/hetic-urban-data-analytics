'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function BicycleTab() {
  const mainPosition: LatLngExpression = [48.864716, 2.349014];

  return (
    <MapContainer
      center={mainPosition}
      zoom={10}
      className="h-[512px] w-full rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={mainPosition}>
        <Popup>Paris</Popup>
      </Marker>
    </MapContainer>
  );
}
