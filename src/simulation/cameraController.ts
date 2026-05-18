import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createCameraController(camera: THREE.PerspectiveCamera, dom: HTMLElement): OrbitControls {
  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.minDistance = 6;
  controls.maxDistance = 200;
  return controls;
}
