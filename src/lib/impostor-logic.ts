import { Player, Word, GameSettings, GameState } from '../types/impostor';

export const CATEGORIES = [
  { id: 'objetos-cotidianos', name: 'Objetos cotidianos' },
  { id: 'personas-famosas', name: 'Personas famosas' },
  { id: 'comidas-bebidas', name: 'Comidas y bebidas' },
  { id: 'animales', name: 'Animales' },
  { id: 'marcas-logos', name: 'Marcas y logos' },
  { id: 'colores-formas', name: 'Colores y formas' },
  { id: 'paises-ciudades', name: 'Países y ciudades' },
  { id: 'emociones-sentimientos', name: 'Emociones y sentimientos' },
  { id: 'pasatiempos-actividades', name: 'Pasatiempos y actividades' },
  { id: 'cultura-internet', name: 'Cultura de Internet' },
  { id: 'cocina-cocinar', name: 'Cocina y cocinar' },
  { id: 'peliculas-series', name: 'Películas y series' },
  { id: 'musica-bandas', name: 'Música y bandas' },
  { id: 'musica-latina', name: 'Música latina' },
  { id: 'ocupaciones', name: 'Ocupaciones' },
  { id: 'costa-rica', name: 'Costa Rica' },
  { id: 'deportes', name: 'Deportes' },
  { id: 'futbol', name: 'Fútbol' },
  { id: 'superheroes', name: 'Superhéroes' },
  { id: 'transporte', name: 'Transporte' },
  { id: 'videojuegos', name: 'Videojuegos' },
  { id: 'clash-royale', name: 'Clash Royale' },
  { id: 'clima-naturaleza', name: 'Clima y naturaleza' },
  { id: 'memes', name: 'Memes' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export async function fetchRandomWord(categoryIds: string[]): Promise<Word> {
  try {
    if (!categoryIds || categoryIds.length === 0) {
      throw new Error("No categories provided");
    }
    
    // Pick a random category from the selection
    const randomCategoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
    const categoryInfo = CATEGORIES.find(c => c.id === randomCategoryId);
    
    // In a real production app, we might import all or use a dynamic fetch if it's on a server
    // For this local-only version, we'll try to import the specific JSON
    // Note: Next.js can bundle these JSONs easily.
    const data = await import(`../data/impostor/${randomCategoryId}.json`);
    const words: Word[] = data.default;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    return {
      ...randomWord,
      category: categoryInfo?.name || "General"
    };
  } catch (error) {
    console.error(`Error loading category, falling back to default`, error);
    // Fallback if file not found - making hint more vague as requested
    return { 
      word: "Pizza", 
      hint: "Se suele compartir en grupo y viene en caja",
      category: "Comida"
    };
  }
}

export function generateGame(
  playerNames: string[],
  settings: GameSettings,
  secretWord: Word
): GameState {
  // Create indices for the number of players
  const indices = Array.from({ length: playerNames.length }, (_, i) => i);
  // Shuffle indices to assign roles randomly
  const shuffledIndices = shuffleArray(indices);
  
  // Identify which indices will be impostors
  const impostorIndices = shuffledIndices.slice(0, settings.impostorsCount);

  // Map players in the ORIGINAL order of playerNames
  const players: Player[] = playerNames.map((name, index) => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    role: impostorIndices.includes(index) ? 'impostor' : 'normal',
  }));

  return {
    phase: 'reveal',
    players, // players are in the original order of playerNames
    secretWord,
    currentPlayerIndex: 0,
    startingPlayerId: players[Math.floor(Math.random() * players.length)].id,
  };
}
