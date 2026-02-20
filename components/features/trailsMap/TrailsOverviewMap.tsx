'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export interface TrailConfig {
  name: string;
  gpxPath: string;
  color: string;
}

interface TrailsOverviewMapProps {
  trails: TrailConfig[];
}

export function TrailsOverviewMap({ trails }: TrailsOverviewMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Dynamically import leaflet to ensure it only runs client-side
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const GpxPlugin = require('leaflet-gpx');

      // Fix default marker icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });

      const map = L.map(mapContainerRef.current!, {
        center: [4.8087, -75.6906],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Track all bounds to auto-fit after loading
      const allBounds: L.LatLngBounds[] = [];
      let loadedCount = 0;

      if (trails.length === 0) return;

      trails.forEach((trail) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gpx = new GpxPlugin(trail.gpxPath, {
          async: true,
          polyline_options: {
            color: trail.color,
            weight: 4,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round',
          },
          marker_options: {
            startIconUrl: '',
            endIconUrl: '',
            shadowUrl: '',
            wptIconUrls: { '': '' },
          },
        });

        gpx.on('loaded', (e: { target: { getBounds: () => L.LatLngBounds } }) => {
          const bounds = e.target.getBounds();
          if (bounds.isValid()) {
            allBounds.push(bounds);
          }
          loadedCount++;
          if (loadedCount === trails.length && allBounds.length > 0) {
            // Fit map to show all loaded trails
            let combined = allBounds[0];
            for (let i = 1; i < allBounds.length; i++) {
              combined = combined.extend(allBounds[i]);
            }
            map.fitBounds(combined, { padding: [32, 32] });
          }
        });

        gpx.addTo(map);
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [trails]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full rounded-lg overflow-hidden shadow-md"
      style={{ height: '500px' }}
      aria-label="Interactive trail map showing all Sendero bike routes"
    />
  );
}
