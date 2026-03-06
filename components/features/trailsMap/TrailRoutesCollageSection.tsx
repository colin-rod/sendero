import Image from 'next/image';
import { trailCollagePaths } from '@/lib/data/trailCollagePaths';
import {
  TRAIL_COLLAGE_DESKTOP_PLACEMENTS,
  TRAIL_COLLAGE_ROUTES,
} from '@/lib/data/trailCollageRoutes';
import type {
  TrailCollagePathData,
  TrailCollagePlacement,
  TrailCollagePoint,
  TrailCollageRouteConfig,
} from '@/lib/types/trailCollage';

function pointsToPath(points: TrailCollagePoint[]): string {
  if (points.length === 0) return '';

  const [start, ...rest] = points;
  const commands = [`M ${(start.x * 1000).toFixed(2)} ${(start.y * 1000).toFixed(2)}`];

  for (const point of rest) {
    commands.push(`L ${(point.x * 1000).toFixed(2)} ${(point.y * 1000).toFixed(2)}`);
  }

  return commands.join(' ');
}

function labelAlignment(
  alignment: TrailCollagePlacement['labelAlign']
): 'left' | 'center' | 'right' {
  if (alignment === 'left') return 'left';
  if (alignment === 'right') return 'right';
  return 'center';
}

function RouteOverlay({
  route,
  pathData,
  placement,
  testIdPrefix,
}: {
  route: TrailCollageRouteConfig;
  pathData: TrailCollagePathData;
  placement: { x: number; y: number; width: number; height: number };
  testIdPrefix: string;
}) {
  const routePath = pointsToPath(pathData.points);

  return (
    <div
      data-testid={`${testIdPrefix}-${route.id}`}
      className="absolute pointer-events-none"
      style={{
        left: `${placement.x}%`,
        top: `${placement.y}%`,
        width: `${placement.width}%`,
        height: `${placement.height}%`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1000 1000" className="h-full w-full overflow-visible">
        <path
          d={routePath}
          fill="none"
          stroke="#FAF0C0"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.97"
        />
        <circle
          cx={(pathData.start.x * 1000).toFixed(2)}
          cy={(pathData.start.y * 1000).toFixed(2)}
          r="22"
          fill="#FAF0C0"
        />
        <circle
          cx={(pathData.end.x * 1000).toFixed(2)}
          cy={(pathData.end.y * 1000).toFixed(2)}
          r="22"
          fill="#FAF0C0"
        />
      </svg>
    </div>
  );
}

export function TrailRoutesCollageSection() {
  return (
    <section
      className="w-full bg-[#0f1411]"
      aria-label="Sendero route collage"
      data-testid="trail-routes-collage-section"
    >
      <div
        className="relative hidden md:block w-full overflow-hidden"
        style={{ height: 'min(75vw, 980px)' }}
        data-testid="trail-routes-collage-desktop"
      >
        <Image
          src="/3284064ce8a2fa82bd062d005dfb0213d5959283.jpg"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.45)_95%)]" />

        {TRAIL_COLLAGE_DESKTOP_PLACEMENTS.map((placement) => {
          const route = TRAIL_COLLAGE_ROUTES.find((entry) => entry.id === placement.routeId);
          if (!route) return null;

          return (
            <RouteOverlay
              key={route.id}
              route={route}
              pathData={trailCollagePaths[route.id]}
              placement={placement}
              testIdPrefix="trail-route-overlay"
            />
          );
        })}

        {TRAIL_COLLAGE_DESKTOP_PLACEMENTS.map((placement) => {
          const route = TRAIL_COLLAGE_ROUTES.find((entry) => entry.id === placement.routeId);
          if (!route) return null;

          return (
            <p
              key={`${route.id}-label`}
              className="absolute pointer-events-none text-[#ECECEC] font-['Helvetica_Neue'] text-[clamp(12px,1.05vw,24px)] leading-[1.06] tracking-[0.035em] font-semibold"
              style={{
                left: `${placement.labelX}%`,
                top: `${placement.labelY}%`,
                transform:
                  placement.labelAlign === 'center'
                    ? 'translate(-50%, -50%)'
                    : placement.labelAlign === 'right'
                      ? 'translate(-100%, -50%)'
                      : 'translate(0, -50%)',
                textAlign: labelAlignment(placement.labelAlign),
                whiteSpace: 'pre-line',
              }}
            >
              {route.label.replace(' DEL ', '\nDEL ').replace(' DE LA ', '\nDE LA ')}
            </p>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 md:hidden">
        {TRAIL_COLLAGE_ROUTES.map((route) => {
          const pathData = trailCollagePaths[route.id];

          return (
            <article
              key={`${route.id}-mobile`}
              className="relative overflow-hidden rounded-sm border border-[#FAF0C0]/20 aspect-[4/3]"
            >
              <Image
                src="/3284064ce8a2fa82bd062d005dfb0213d5959283.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/52" />

              <RouteOverlay
                route={route}
                pathData={pathData}
                placement={{ x: 11, y: 10, width: 78, height: 68 }}
                testIdPrefix="trail-route-mobile-overlay"
              />

              <p className="absolute bottom-3 left-3 right-3 text-[14px] leading-[1.1] text-[#ECECEC] font-['Helvetica_Neue'] font-semibold tracking-[0.04em]">
                {route.label}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
