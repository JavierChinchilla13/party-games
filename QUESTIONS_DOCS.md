# Pregunta Diferente - Documentación del Proyecto

## ❓ Descripción del Juego
"Pregunta Diferente" es un juego de debate y deducción grupal. La mayoría de los jugadores reciben una "Pregunta Principal", mientras que uno o varios reciben una "Pregunta Diferente" pero muy relacionada. El objetivo es descubrir quiénes tienen la pregunta distinta basándose en sus respuestas.

## 🚀 Mecánicas Clave
- **Sin Roles Explícitos:** Nadie sabe si su pregunta es la común o la diferente hasta el final.
- **Click to Reveal:** Un sistema de tarjeta simple para ver la pregunta en secreto.
- **Respuestas Integradas:** Los jugadores escriben su respuesta inmediatamente después de ver su pregunta.
- **Flujo Automático:** El juego avanza al siguiente jugador automáticamente al enviar la respuesta.
- **Debate Basado en Resultados:** Se muestran todas las respuestas y la pregunta principal para fomentar la discusión.
- **Selección Rápida:** Botones "TODAS" y "NINGUNA" para gestionar las 14 categorías rápidamente.
- **Validación Integrada:** Modales personalizados para avisos de configuración.

## 🎯 Identidad de Categorías
Recientemente se realizó un refactor masivo para asegurar que cada categoría tenga su propia "voz" y no dependa únicamente del formato "¿Quién del grupo...?".

### Distribución de Formatos:
- **¿Quién del Grupo? 👥:** El hogar de las preguntas clásicas de votación grupal.
- **Personales 👤:** Confesiones, dilemas éticos y "Qué harías si...".
- **Modo Caos 🔥:** Una mezcla explosiva de escenarios absurdos, dilemas morales y preguntas "funables".
- **Temáticas (Comida, Viajes, Tech) 🍕:** Debates de opinión, preferencias extremas y experiencias compartidas.

## 🚀 Mejoras de Contenido
- **Variedad Estructural:** Se mezclan preguntas directas, rankings, apuestas y decisiones imposibles.
- **Pares Estratégicos:** Los pares `main` y `different` están diseñados para ser lo suficientemente similares como para pasar desapercibidos al principio, pero lo suficientemente distintos como para causar caos en la discusión.
- **Dataset Curado:** Se eliminaron miles de entradas mediocres para dejar solo las mejores preguntas que garantizan conversación real.

## 📂 Archivos del Juego
- `app/games/questions/page.tsx`: Gestor de estado principal y fases.
- `src/lib/questions-logic.ts`: Lógica de selección de preguntas y asignación de roles.
- `src/types/questions.ts`: Definiciones de TypeScript para el juego.
- `components/questions/`: Componentes UI específicos (Setup, Reveal, Results, Solution).
- `src/data/questions/`: Directorio con los datasets JSON.

---
*Implementado como parte de la suite ONI Games.*
