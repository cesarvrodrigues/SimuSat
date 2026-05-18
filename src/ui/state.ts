export interface UiState {
  scenario: string;
  speed: number;
  satCount: number;
  showOrbits: boolean;
  showBeam: boolean;
  showDebris: boolean;
}

export const defaultState: UiState = {
  scenario: 'leo', speed: 1, satCount: 40, showOrbits: true, showBeam: true, showDebris: true,
};
