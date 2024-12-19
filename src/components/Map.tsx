'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet/dist/leaflet.css';

export default function Map({ data }: { data: L.HeatLatLngTuple[] }) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map('map').setView(
      [40.73061, -73.935242],
      11.5,
    ) as L.Map;

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    ).addTo(mapRef.current);

    L.heatLayer(data, { radius: 20 }).addTo(mapRef.current);
  }, [data]);

  return <div id="map" className="h-[512px]"></div>;
}
