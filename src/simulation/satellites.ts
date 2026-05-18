import * as THREE from 'three';
import { computeOrbitPosition, createOrbitLine, OrbitConfig } from './orbitEngine';

export interface Satellite {
  id: string;
  mesh: THREE.Mesh;
  orbit: OrbitConfig;
  active: boolean;
}

export function createSatellite(id: string, orbit: OrbitConfig, color = 0x88ccff): Satellite {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.2, 0.2),
    new THREE.MeshStandardMaterial({ color, emissive: 0x223344 }),
  );
  return { id, mesh, orbit, active: true };
}

export function createConstellation(count: number, base: Omit<OrbitConfig, 'phase' | 'planeOffset'>): { sats: Satellite[]; orbits: THREE.Line[] } {
  const sats: Satellite[] = [];
  const orbits: THREE.Line[] = [];
  const planes = Math.max(1, Math.ceil(count / 12));
  for (let i = 0; i < count; i++) {
    const plane = i % planes;
    const orbit: OrbitConfig = {
      ...base,
      phase: (i / count) * Math.PI * 2,
      planeOffset: (plane / planes) * Math.PI * 2,
    };
    sats.push(createSatellite(`SAT-${i + 1}`, orbit));
    if (i < planes) orbits.push(createOrbitLine(orbit));
  }
  return { sats, orbits };
}

export function updateOrbits(sats: Satellite[], elapsed: number): void {
  sats.forEach((s) => {
    if (!s.active) return;
    s.mesh.position.copy(computeOrbitPosition(s.orbit, elapsed));
    s.mesh.lookAt(0, 0, 0);
  });
}
