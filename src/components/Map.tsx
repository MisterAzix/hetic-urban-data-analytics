'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { HeatLatLngTuple, LatLngExpression } from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

import { Card, CardContent } from './ui/card';

const HeatmapLayer = ({ data }: { data: HeatLatLngTuple[] }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(data, {
      radius: 20,
      blur: 10,
    });
    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

export default function Map({ data }: { data: L.HeatLatLngTuple[] }) {
  const center: LatLngExpression = [40.73061, -73.935242];
  const zoom = 11.5;

  return (
    <Card>
      <CardContent className="p-0">
        <MapContainer
          center={center}
          zoom={zoom}
          className="h-[512px] rounded-lg"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <HeatmapLayer data={data} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}
