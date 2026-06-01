export type QuestionsPhase = "setup" | "reveal" | "results" | "solution";

export interface QuestionPair {
  main: string;
  different: string;
}

export interface QuestionsPlayer {
  id: string;
  name: string;
  question: string;
  isDifferent: boolean;
  answer?: string;
}

export interface QuestionsSettings {
  differentCount: number;
  categories: string[];
}

export interface QuestionsGameState {
  phase: QuestionsPhase;
  players: QuestionsPlayer[];
  questionPair: QuestionPair | null;
  currentPlayerIndex: number;
}
