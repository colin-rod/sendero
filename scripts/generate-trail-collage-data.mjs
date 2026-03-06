/* eslint-env node */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(projectRoot, 'lib/data/trailCollagePaths.ts');
const MAX_POINTS = 360;

const { TRAIL_COLLAGE_ROUTES } = await import(
  path.join(projectRoot, 'lib/data/trailCollageRoutes.ts')
);

function parseTrackPoints(gpxContent) {
  const points = [];
  const regex = /<trkpt[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"/g;
  let match = regex.exec(gpxContent);

  while (match) {
    const lat = Number.parseFloat(match[1]);
    const lon = Number.parseFloat(match[2]);

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      points.push({ lat, lon });
    }

    match = regex.exec(gpxContent);
  }

  return points;
}

function downsample(points) {
  if (points.length <= MAX_POINTS) return points;

  const step = Math.ceil(points.length / MAX_POINTS);
  const reduced = points.filter((_, index) => index % step === 0);

  const lastOriginal = points[points.length - 1];
  const lastReduced = reduced[reduced.length - 1];
  if (lastReduced !== lastOriginal) {
    reduced.push(lastOriginal);
  }

  return reduced;
}

function normalizeRoute(points) {
  const lats = points.map((point) => point.lat);
  const lons = points.map((point) => point.lon);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  const latRange = maxLat - minLat || 1;
  const lonRange = maxLon - minLon || 1;

  return points.map((point) => ({
    x: Number(((point.lon - minLon) / lonRange).toFixed(6)),
    y: Number(((maxLat - point.lat) / latRange).toFixed(6)),
  }));
}

function toLiteralPoint(point) {
  return `{ x: ${point.x}, y: ${point.y} }`;
}

const records = {};

for (const route of TRAIL_COLLAGE_ROUTES) {
  const gpxPath = path.join(projectRoot, 'public', route.gpxPath.replace(/^\//, ''));
  const gpxContent = await fs.readFile(gpxPath, 'utf8');
  const parsedPoints = parseTrackPoints(gpxContent);

  if (parsedPoints.length < 2) {
    throw new Error(`Route ${route.id} must include at least two <trkpt> points.`);
  }

  const normalized = normalizeRoute(downsample(parsedPoints));
  records[route.id] = {
    points: normalized,
    start: normalized[0],
    end: normalized[normalized.length - 1],
  };
}

const orderedEntries = TRAIL_COLLAGE_ROUTES.map((route) => {
  const record = records[route.id];
  const pointsLiteral = record.points.map((point) => toLiteralPoint(point)).join(', ');

  return `  '${route.id}': {
    points: [${pointsLiteral}],
    start: ${toLiteralPoint(record.start)},
    end: ${toLiteralPoint(record.end)},
  }`;
});

const output = `import type { TrailCollagePathData, TrailCollageRouteId } from '@/lib/types/trailCollage';

export const trailCollagePaths: Record<TrailCollageRouteId, TrailCollagePathData> = {
${orderedEntries.join(',\n')}
};
`;

await fs.writeFile(OUTPUT_FILE, output, 'utf8');
