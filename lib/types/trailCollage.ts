export type TrailCollageRouteId =
  | 'sendero-del-agua'
  | 'sendero-del-oro'
  | 'sendero-del-cacao'
  | 'sendero-del-tigre'
  | 'sendero-del-cafe'
  | 'sendero-del-volcan'
  | 'sendero-del-paramo'
  | 'sendero-de-la-guadua'
  | 'sendero-luminoso';

export interface TrailCollagePoint {
  x: number;
  y: number;
}

export interface TrailCollagePathData {
  points: TrailCollagePoint[];
  start: TrailCollagePoint;
  end: TrailCollagePoint;
}

export interface TrailCollageRouteConfig {
  id: TrailCollageRouteId;
  gpxPath: `/gpx/${string}.gpx`;
  label: string;
}

export interface TrailCollagePlacement {
  routeId: TrailCollageRouteId;
  x: number;
  y: number;
  width: number;
  height: number;
  labelX: number;
  labelY: number;
  labelAlign: 'left' | 'center' | 'right';
}
