'use client';

import { useEffect, useRef } from 'react';
import type { Map, LatLngBounds } from 'leaflet';
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
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Dynamically import leaflet to ensure it only runs client-side
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      // leaflet-gpx is a side-effect-only library: it attaches L.GPX to the Leaflet global
      await import('leaflet-gpx');

      // Fix default marker icon paths broken by webpack
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
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

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
          maxZoom: 18,
        }
      ).addTo(map);

      // Track all bounds to auto-fit after loading
      const allBounds: LatLngBounds[] = [];
      let loadedCount = 0;

      if (trails.length === 0) return;

      trails.forEach((trail) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gpx = new (L as any).GPX(trail.gpxPath, {
          async: true,
          polyline_options: {
            color: trail.color,
            weight: 5,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round',
          },
          markers: {
            startIcon: null,
            endIcon: null,
            wptIcons: {},
            wptTypeIcons: {},
            pointMatchers: [],
          },
          gpx_options: {
            parseElements: ['track', 'route'],
          },
        });

        gpx.on('loaded', (e: { target: { getBounds: () => LatLngBounds } }) => {
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
      className="w-full overflow-hidden"
      style={{ height: '350px' }}
      aria-label="Interactive trail map showing all Sendero bike routes"
    />
  );
}
