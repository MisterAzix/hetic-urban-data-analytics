'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export default function BicycleTab() {
  const mainPosition: LatLngExpression = [40.73061, -73.935242];

  return (
    <MapContainer
      center={mainPosition}
      zoom={10}
      className="h-[512px] w-full rounded-lg"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <Marker position={mainPosition} />
    </MapContainer>
  );
}
