export interface SimilarPlayer {
  id: string;
  name: string;
  word: string;
  isDifferent: boolean;
}

export interface WordPair {
  main: string;
  different: string;
}

export interface SimilarSettings {
  differentCount: number;
  categories: string[];
}

export type SimilarPhase = 'setup' | 'reveal' | 'discussion' | 'solution';

export interface SimilarGameState {
  phase: SimilarPhase;
  players: SimilarPlayer[];
  wordPair: WordPair | null;
  currentPlayerIndex: number;
  startingPlayerId: string | null;
}
