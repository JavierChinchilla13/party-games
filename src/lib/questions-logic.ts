import { QuestionPair, QuestionsPlayer, QuestionsSettings, QuestionsGameState } from "@/types/questions";

/**
 * Carga un par de preguntas aleatorio de una lista de categorías.
 */
export async function fetchRandomQuestionPair(categories: string[]): Promise<QuestionPair> {
  try {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const data = await import(`../data/questions/${randomCategory}.json`);
    const questions: QuestionPair[] = data.default;
    return questions[Math.floor(Math.random() * questions.length)];
  } catch (error) {
    console.error("Error loading questions:", error);
    // Fallback manual para asegurar que el juego siempre inicie
    return {
      main: "¿Cuál es tu película favorita?",
      different: "¿Cuál es tu serie favorita?"
    };
  }
}

/**
 * Genera el estado inicial de una partida de Pregunta Diferente.
 */
export function generateQuestionsGame(
  playerNames: string[],
  settings: QuestionsSettings,
  questionPair: QuestionPair
): QuestionsGameState {
  // 1. Crear lista base de jugadores
  const basePlayers: QuestionsPlayer[] = playerNames.map((name, index) => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    question: questionPair.main,
    isDifferent: false,
  }));

  // 2. Seleccionar jugadores diferentes aleatoriamente
  const shuffledIndices = Array.from({ length: basePlayers.length }, (_, i) => i)
    .sort(() => Math.random() - 0.5);
  
  const differentIndices = shuffledIndices.slice(0, settings.differentCount);

  const players = basePlayers.map((player, index) => {
    if (differentIndices.includes(index)) {
      return {
        ...player,
        question: questionPair.different,
        isDifferent: true,
      };
    }
    return player;
  });

  // 3. Mezclar el orden de los jugadores para la revelación
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  return {
    phase: "reveal",
    players: shuffledPlayers,
    questionPair,
    currentPlayerIndex: 0,
  };
}
