# Pregunta Diferente - Documentación del Proyecto

## ❓ Descripción del Juego
"Pregunta Diferente" es un juego de debate y deducción grupal. La mayoría de los jugadores reciben una "Pregunta Principal", mientras que uno o varios reciben una "Pregunta Diferente" pero muy relacionada. El objetivo es descubrir quiénes tienen la pregunta distinta basándose en sus respuestas.

## 🚀 Mecánicas Clave
- **Sin Roles Explícitos:** Nadie sabe si su pregunta es la común o la diferente hasta el final.
- **Click to Reveal:** Un sistema de tarjeta simple para ver la pregunta en secreto.
- **Respuestas Integradas:** Los jugadores escriben su respuesta inmediatamente después de ver su pregunta.
- **Flujo Automático:** El juego avanza al siguiente jugador automáticamente al enviar la respuesta.
- **Debate Basado en Resultados:** Se muestran todas las respuestas y la pregunta principal para fomentar la discusión.

## 🛠️ Estructura de Datos
El juego cuenta con **14 categorías** con más de **2,500 parejas de preguntas** en total. Cada categoría tiene entre 150 y 200+ entradas, lo que garantiza una altísima rejugabilidad.

### Categorías:
- General
- Comida
- Entretenimiento
- Videojuegos
- Deportes
- Fútbol
- Música
- Costa Rica 🇨🇷
- Trabajo
- Viajes
- Tecnología
- Situaciones Hipotéticas
- Memes
- ¿Quién del Grupo? 👥 (¡NUEVO!)


## 📂 Archivos del Juego
- `app/games/questions/page.tsx`: Gestor de estado principal y fases.
- `src/lib/questions-logic.ts`: Lógica de selección de preguntas y asignación de roles.
- `src/types/questions.ts`: Definiciones de TypeScript para el juego.
- `components/questions/`: Componentes UI específicos (Setup, Reveal, Results, Solution).
- `src/data/questions/`: Directorio con los datasets JSON.

---
*Implementado como parte de la suite ONI Games.*
