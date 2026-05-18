import './styles.css';
import * as THREE from 'three';
import { createEarth, createStars } from './simulation/earth';
import { createPanel } from './ui/panel';
import { createGroundStation } from './simulation/groundStations';
import { createRfBeam, updateRfBeam } from './simulation/beams';
import { createCameraController } from './simulation/cameraController';
import { resetScenario } from './simulation/scenarios';
import { updateOrbits } from './simulation/satellites';
import { updateHandover } from './simulation/handover';
import { collectKesslerStats, DebrisObj, triggerKesslerEvent, updateDebris } from './simulation/debris';

const app = document.querySelector<HTMLDivElement>('#app')!;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 20, 35);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const sun = new THREE.DirectionalLight(0xffffff, 1.2); sun.position.set(20, 15, 8); scene.add(sun);
scene.add(createEarth()); scene.add(createStars());

const station = createGroundStation(); scene.add(station.mesh);
const beam = createRfBeam(); scene.add(beam);
const panel = createPanel();
const controls = createCameraController(camera, renderer.domElement);

let runtime = resetScenario(scene, null, 'leo', 40);
let currentSatId: string | null = null;
let debris: DebrisObj[] = []; let collisions = 0;

const clock = new THREE.Clock();
function animate() {
  const dt = clock.getDelta() * Number(panel.speed.value);
  updateOrbits(runtime.sats, clock.elapsedTime * Number(panel.speed.value));
  const ho = updateHandover(runtime.sats, station.mesh, currentSatId);
  currentSatId = ho.currentSatId;
  panel.handover.textContent = ho.message;
  const sat = runtime.sats.find((s) => s.id === currentSatId);
  if (sat) updateRfBeam(beam, station.mesh, sat.mesh);
  collisions += updateDebris(debris, runtime.sats);
  panel.kessler.textContent = Object.entries(collectKesslerStats(runtime.sats, debris, collisions)).map(([k,v])=>`${k}: ${v}`).join(' | ');
  panel.latency.textContent = `Latência (valor didático aproximado): ${runtime.preset.latency}`;
  renderer.render(scene, camera); controls.update(); requestAnimationFrame(animate);
}
animate();

panel.scenario.onchange = () => { runtime = resetScenario(scene, runtime, panel.scenario.value, Number(panel.satCount.value)); currentSatId = null; };
panel.satCount.oninput = () => { runtime = resetScenario(scene, runtime, panel.scenario.value, Number(panel.satCount.value)); };
panel.startCollision.onclick = () => { const target = runtime.sats.find((s) => s.active); if (!target) return; triggerKesslerEvent(target, debris); debris.forEach((d)=>scene.add(d.mesh)); panel.root.classList.add('alert'); };

panel.camButtons.general.onclick = () => camera.position.set(0, 20, 35);
panel.camButtons.sat.onclick = () => { const sat = runtime.sats.find((s) => s.id === currentSatId); if (sat) camera.position.copy(sat.mesh.position.clone().addScalar(2)); };
panel.camButtons.gs.onclick = () => camera.position.copy(station.mesh.position.clone().add(new THREE.Vector3(2,2,2)));
panel.camButtons.sat2earth.onclick = () => { const sat = runtime.sats.find((s) => s.id === currentSatId); if (sat) { camera.position.copy(sat.mesh.position.clone()); camera.lookAt(0,0,0);} };
panel.camButtons.geo.onclick = () => camera.position.set(40, 5, 0);

window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
