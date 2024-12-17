'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import L from 'leaflet';
import 'leaflet.heat';
import React, { useEffect, useRef } from 'react';

export default function BikeTab() {
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

    L.heatLayer(
      [
        [40.73061, -73.935242, 10],
        [40.74, -73.945, 10],
        [40.745, -73.95, 8],
        [40.75, -73.955, 12],
        [40.755, -73.96, 6],
        [40.76, -73.965, 5],
        [40.765, -73.97, 14],
        [40.77, -73.975, 16],
        [40.775, -73.98, 2],
        [40.78, -73.985, 18],
        [40.785, -73.99, 20],
      ],
      { radius: 25 },
    ).addTo(mapRef.current);
  }, []);

  return <div id="map" className="card"></div>;
}
