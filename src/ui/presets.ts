export interface ScenarioPreset {
  key: string;
  label: string;
  altitudeKm: number;
  inclinationDeg: number;
  speed: number;
  count: number;
  latency: string;
}

export const SCENARIOS: ScenarioPreset[] = [
  { key: 'leo', label: 'Comunicação LEO tipo Starlink', altitudeKm: 550, inclinationDeg: 53, speed: 0.9, count: 40, latency: '30–80 ms' },
  { key: 'oneweb', label: 'Comunicação LEO tipo OneWeb polar', altitudeKm: 1200, inclinationDeg: 87, speed: 0.65, count: 48, latency: '40–90 ms' },
  { key: 'kuiper', label: 'Comunicação LEO tipo Amazon Leo / Kuiper', altitudeKm: 620, inclinationDeg: 51, speed: 0.85, count: 42, latency: '30–80 ms' },
  { key: 'meo', label: 'Rede MEO', altitudeKm: 12000, inclinationDeg: 56, speed: 0.35, count: 24, latency: '120–180 ms' },
  { key: 'geo', label: 'Rede GEO', altitudeKm: 35786, inclinationDeg: 0, speed: 0.02, count: 6, latency: '550–700 ms' },
  { key: 'gps', label: 'GPS / navegação', altitudeKm: 20200, inclinationDeg: 55, speed: 0.2, count: 24, latency: '120–180 ms' },
  { key: 'kessler', label: 'Síndrome de Kessler', altitudeKm: 750, inclinationDeg: 70, speed: 0.75, count: 56, latency: '40–90 ms' },
];
