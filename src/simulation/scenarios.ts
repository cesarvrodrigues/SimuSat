import * as THREE from 'three';
import { createConstellation, Satellite } from './satellites';
import { ScenarioPreset, SCENARIOS } from '../ui/presets';

export interface ScenarioRuntime { sats: Satellite[]; orbitLines: THREE.Line[]; preset: ScenarioPreset; }

export function getPreset(key: string): ScenarioPreset {
  return SCENARIOS.find((s) => s.key === key) ?? SCENARIOS[0];
}

export function resetScenario(scene: THREE.Scene, old: ScenarioRuntime | null, key: string, countOverride?: number): ScenarioRuntime {
  if (old) {
    [...old.sats.map((s) => s.mesh), ...old.orbitLines].forEach((o) => scene.remove(o));
  }
  const preset = getPreset(key);
  const count = countOverride ?? preset.count;
  const { sats, orbits } = createConstellation(count, {
    altitudeKm: preset.altitudeKm,
    inclinationDeg: preset.inclinationDeg,
    speed: preset.speed,
  });
  sats.forEach((s) => scene.add(s.mesh));
  orbits.forEach((o) => scene.add(o));
  return { sats, orbitLines: orbits, preset };
}
