import * as THREE from 'three';
import { Satellite } from './satellites';

export interface DebrisObj { mesh: THREE.Mesh; velocity: THREE.Vector3; }
export interface KesslerStats { active: number; destroyed: number; debris: number; collisions: number; }

export function triggerKesslerEvent(target: Satellite, list: DebrisObj[]): void {
  target.active = false;
  target.mesh.visible = false;
  for (let i = 0; i < 12; i++) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
    mesh.position.copy(target.mesh.position);
    const v = new THREE.Vector3((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12);
    list.push({ mesh, velocity: v });
  }
}

export function updateDebris(debris: DebrisObj[], sats: Satellite[]): number {
  let collisions = 0;
  for (const d of debris) {
    d.mesh.position.add(d.velocity);
    d.velocity.multiplyScalar(0.999);
    sats.forEach((s) => {
      if (!s.active) return;
      if (d.mesh.position.distanceTo(s.mesh.position) < 0.25) {
        s.active = false; s.mesh.visible = false; collisions++;
      }
    });
  }
  return collisions;
}

export function collectKesslerStats(sats: Satellite[], debris: DebrisObj[], collisions: number): KesslerStats {
  const active = sats.filter((s) => s.active).length;
  return { active, destroyed: sats.length - active, debris: debris.length, collisions };
}
