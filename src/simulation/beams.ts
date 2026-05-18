import * as THREE from 'three';

export function createRfBeam(): THREE.Line {
  const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const m = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.9 });
  return new THREE.Line(g, m);
}

export function updateRfBeam(beam: THREE.Line, from: THREE.Object3D, to: THREE.Object3D): void {
  const pts = [from.position.clone(), to.position.clone()];
  beam.geometry.dispose();
  beam.geometry = new THREE.BufferGeometry().setFromPoints(pts);
}
