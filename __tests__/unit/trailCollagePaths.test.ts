import { trailCollagePaths } from '@/lib/data/trailCollagePaths';
import { TRAIL_COLLAGE_ROUTES } from '@/lib/data/trailCollageRoutes';

describe('trailCollagePaths', () => {
  it('contains normalized path data for all configured routes', () => {
    expect(TRAIL_COLLAGE_ROUTES).toHaveLength(9);
    expect(Object.keys(trailCollagePaths)).toHaveLength(9);

    for (const route of TRAIL_COLLAGE_ROUTES) {
      const path = trailCollagePaths[route.id];
      expect(path).toBeDefined();
      expect(path.points.length).toBeGreaterThan(1);

      for (const point of path.points) {
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(1);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(1);
      }

      expect(path.start.x).toBeGreaterThanOrEqual(0);
      expect(path.start.x).toBeLessThanOrEqual(1);
      expect(path.start.y).toBeGreaterThanOrEqual(0);
      expect(path.start.y).toBeLessThanOrEqual(1);
      expect(path.end.x).toBeGreaterThanOrEqual(0);
      expect(path.end.x).toBeLessThanOrEqual(1);
      expect(path.end.y).toBeGreaterThanOrEqual(0);
      expect(path.end.y).toBeLessThanOrEqual(1);
    }
  });
});
