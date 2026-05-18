import * as THREE from 'three';
import { VISUAL_SCALE } from './orbitEngine';

export function createEarth(): THREE.Group {
  const group = new THREE.Group();

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(VISUAL_SCALE.EARTH_RADIUS, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0x1f5aa6, emissive: 0x102040, shininess: 8 }),
  );

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(VISUAL_SCALE.EARTH_RADIUS * 1.03, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x66b3ff, transparent: true, opacity: 0.2 }),
  );

  group.add(earth, atmosphere);
  return group;
}

export function createStars(count = 2000): THREE.Points {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 400;
    positions[i * 3] = (Math.random() - 0.5) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * r;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.4 }));
}
