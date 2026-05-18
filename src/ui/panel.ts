import { SCENARIOS } from './presets';

export interface PanelRefs {
  root: HTMLElement;
  scenario: HTMLSelectElement;
  satCount: HTMLInputElement;
  speed: HTMLSelectElement;
  handover: HTMLElement;
  latency: HTMLElement;
  kessler: HTMLElement;
  startCollision: HTMLButtonElement;
  camButtons: Record<string, HTMLButtonElement>;
}

export function createPanel(): PanelRefs {
  const root = document.createElement('aside');
  root.className = 'panel';
  root.innerHTML = `<h1>Satcom Orbital Simulator</h1>
  <label>Cenário<select id='scenario'>${SCENARIOS.map(s=>`<option value='${s.key}'>${s.label}</option>`).join('')}</select></label>
  <label>Quantidade de satélites<input id='satCount' type='range' min='1' max='500' value='40'/></label>
  <label>Velocidade<select id='speed'><option value='0'>Pausar</option><option value='0.5'>0.5x</option><option value='1' selected>1x</option><option value='5'>5x</option><option value='20'>20x</option><option value='100'>100x</option></select></label>
  <div class='toggles'><label><input id='showOrbits' type='checkbox' checked/> Mostrar órbitas</label><label><input id='showBeam' type='checkbox' checked/> Mostrar feixes RF</label><label><input id='showDebris' type='checkbox' checked/> Mostrar detritos</label></div>
  <button id='startCollision'>Iniciar colisão (Kessler)</button>
  <div class='status'><p id='handover'>Link ativo</p><p id='latency'>Latência: valor didático aproximado</p><p id='kessler'>Satélites ativos: 0 | destruídos: 0 | detritos: 0 | colisões: 0</p></div>
  <div class='cams'><button id='cam-general'>Visão orbital geral</button><button id='cam-sat'>Acompanhar satélite</button><button id='cam-gs'>Ver da antena</button><button id='cam-sat2earth'>Satélite para Terra</button><button id='cam-geo'>Ver GEO fixo</button></div>`;
  document.body.appendChild(root);
  return {
    root,
    scenario: root.querySelector('#scenario')!,
    satCount: root.querySelector('#satCount')!,
    speed: root.querySelector('#speed')!,
    handover: root.querySelector('#handover')!,
    latency: root.querySelector('#latency')!,
    kessler: root.querySelector('#kessler')!,
    startCollision: root.querySelector('#startCollision')!,
    camButtons: {
      general: root.querySelector('#cam-general')!, sat: root.querySelector('#cam-sat')!, gs: root.querySelector('#cam-gs')!, sat2earth: root.querySelector('#cam-sat2earth')!, geo: root.querySelector('#cam-geo')!,
    },
  };
}
