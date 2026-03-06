import { TRAIL_COLLAGE_DESKTOP_PLACEMENTS } from '@/lib/data/trailCollageRoutes';

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function overlapArea(a: Box, b: Box): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  const w = Math.max(0, x2 - x1);
  const h = Math.max(0, y2 - y1);
  return w * h;
}

describe('TRAIL_COLLAGE_DESKTOP_PLACEMENTS', () => {
  it('keeps route overlays visually distinct with limited overlap', () => {
    for (let i = 0; i < TRAIL_COLLAGE_DESKTOP_PLACEMENTS.length; i++) {
      for (let j = i + 1; j < TRAIL_COLLAGE_DESKTOP_PLACEMENTS.length; j++) {
        const first = TRAIL_COLLAGE_DESKTOP_PLACEMENTS[i];
        const second = TRAIL_COLLAGE_DESKTOP_PLACEMENTS[j];
        const overlap = overlapArea(first, second);
        const smallerArea = Math.min(
          first.width * first.height,
          second.width * second.height
        );
        const overlapRatio = smallerArea > 0 ? overlap / smallerArea : 0;

        expect(overlapRatio).toBeLessThanOrEqual(0.2);
      }
    }
  });

  it('keeps labels close to their route centers', () => {
    for (const placement of TRAIL_COLLAGE_DESKTOP_PLACEMENTS) {
      const routeCenterX = placement.x + placement.width / 2;
      const routeCenterY = placement.y + placement.height / 2;
      const dx = placement.labelX - routeCenterX;
      const dy = placement.labelY - routeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      expect(distance).toBeLessThanOrEqual(24);
    }
  });
});
