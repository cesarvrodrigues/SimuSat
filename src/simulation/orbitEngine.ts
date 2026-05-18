import * as THREE from 'three';

export const VISUAL_SCALE = {
  EARTH_RADIUS: 10,
  KM_TO_UNITS: 0.0008,
};

export interface OrbitConfig {
  altitudeKm: number;
  inclinationDeg: number;
  speed: number;
  phase: number;
  planeOffset: number;
}

export const altitudeToRadius = (altitudeKm: number): number =>
  VISUAL_SCALE.EARTH_RADIUS + altitudeKm * VISUAL_SCALE.KM_TO_UNITS;

export function computeOrbitPosition(orbit: OrbitConfig, elapsed: number): THREE.Vector3 {
  const r = altitudeToRadius(orbit.altitudeKm);
  const theta = elapsed * orbit.speed + orbit.phase;
  const x = r * Math.cos(theta);
  const z = r * Math.sin(theta);
  const y = 0;

  const p = new THREE.Vector3(x, y, z);
  const inc = THREE.MathUtils.degToRad(orbit.inclinationDeg);
  const rotInc = new THREE.Matrix4().makeRotationX(inc);
  const rotPlane = new THREE.Matrix4().makeRotationY(orbit.planeOffset);
  p.applyMatrix4(rotInc).applyMatrix4(rotPlane);
  return p;
}

export function createOrbitLine(orbit: OrbitConfig): THREE.Line {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 128; i++) {
    const t = (i / 128) * Math.PI * 2;
    points.push(computeOrbitPosition({ ...orbit, phase: t, speed: 0 }, 0));
  }
  const g = new THREE.BufferGeometry().setFromPoints(points);
  const m = new THREE.LineBasicMaterial({ color: 0x3a4d7a, transparent: true, opacity: 0.5 });
  return new THREE.LineLoop(g, m);
}
