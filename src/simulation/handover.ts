import * as THREE from 'three';
import { Satellite } from './satellites';

export interface HandoverState { currentSatId: string | null; message: string; }

export function updateHandover(sats: Satellite[], station: THREE.Object3D, prev: string | null): HandoverState {
  const active = sats.filter((s) => s.active);
  let best: Satellite | null = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const sat of active) {
    const d = sat.mesh.position.distanceTo(station.position);
    if (d < bestDist) { bestDist = d; best = sat; }
  }
  if (!best) return { currentSatId: null, message: 'Sem satélite disponível' };
  if (prev && prev !== best.id) return { currentSatId: best.id, message: `handover realizado do ${prev} para ${best.id}` };
  return { currentSatId: best.id, message: `Link ativo em ${best.id}` };
}
