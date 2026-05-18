import * as THREE from 'three';
import { VISUAL_SCALE } from './orbitEngine';

export interface GroundStation { id: string; mesh: THREE.Mesh; }

export function createGroundStation(id = 'GS-1'): GroundStation {
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 8), new THREE.MeshStandardMaterial({ color: 0x00ff99 }));
  const lat = THREE.MathUtils.degToRad(-15);
  const lon = THREE.MathUtils.degToRad(-47);
  const r = VISUAL_SCALE.EARTH_RADIUS + 0.15;
  mesh.position.set(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon));
  mesh.lookAt(mesh.position.clone().multiplyScalar(2));
  return { id, mesh };
}
