import { SimilarPlayer, WordPair, SimilarSettings, SimilarGameState } from '../types/similar';

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export async function fetchRandomWordPair(categoryIds: string[]): Promise<WordPair> {
  try {
    if (!categoryIds || categoryIds.length === 0) {
      throw new Error("No categories provided");
    }
    
    const randomCategoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
    const data = await import(`../data/similar/${randomCategoryId}.json`);
    const pairs: WordPair[] = data.default;
    return pairs[Math.floor(Math.random() * pairs.length)];
  } catch (error) {
    console.error(`Error loading category, falling back to default`, error);
    return { main: "Perro", different: "Lobo" };
  }
}

export function generateSimilarGame(
  playerNames: string[],
  settings: SimilarSettings,
  wordPair: WordPair
): SimilarGameState {
  const indices = Array.from({ length: playerNames.length }, (_, i) => i);
  const shuffledIndices = shuffleArray(indices);
  
  const differentIndices = shuffledIndices.slice(0, settings.differentCount);

  // Randomly decide which word is the "main" one for the majority
  // To keep it unpredictable, we can swap main and different occasionally
  const shouldSwap = Math.random() > 0.5;
  const majorityWord = shouldSwap ? wordPair.different : wordPair.main;
  const minorityWord = shouldSwap ? wordPair.main : wordPair.different;
  
  const finalWordPair = {
    main: majorityWord,
    different: minorityWord
  };

  const players: SimilarPlayer[] = playerNames.map((name, index) => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    word: differentIndices.includes(index) ? minorityWord : majorityWord,
    isDifferent: differentIndices.includes(index),
  }));

  return {
    phase: 'reveal',
    players,
    wordPair: finalWordPair,
    currentPlayerIndex: 0,
    startingPlayerId: players[Math.floor(Math.random() * players.length)].id,
  };
}
