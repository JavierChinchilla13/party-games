export interface Player {
  id: string;
  name: string;
  role: 'normal' | 'impostor';
}

export interface Word {
  word: string;
  hint: string;
  category?: string;
}

export interface GameSettings {
  impostorsCount: number;
  showHints: boolean;
  categories: string[];
}

export type GamePhase = 'setup' | 'reveal' | 'discussion' | 'solution';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  secretWord: Word | null;
  currentPlayerIndex: number;
  startingPlayerId: string | null;
}
