# Palabra Similar - Documentación del Proyecto

## 🔍 Descripción del Juego
"Palabra Similar" es un juego de agudeza mental donde la mayoría de los jugadores reciben una palabra idéntica, mientras que una minoría recibe una palabra muy parecida y relacionada. El reto es que nadie sabe si tiene la palabra "diferente", por lo que todos deben hablar con cautela para identificar quién no encaja.

## 🚀 Mecánicas Clave
- **Sin Roles Explícitos:** A diferencia de Impostor, el sistema no te dice si eres "diferente". Solo ves tu palabra.
- **Parejas Relacionadas:** Las palabras están diseñadas para ser comparables (ej. Perro vs Lobo, Pizza vs Hamburguesa).
- **3D Flip Card:** Reutiliza la interacción premium de ONI Games para una revelación segura.
- **Detección de Discrepancias:** El juego termina cuando el grupo cree haber identificado a los jugadores con la palabra diferente.

## 🛠️ Estructura de Datos
Se han curado **12 categorías** temáticas. Cada archivo ha sido filtrado para eliminar parejas irrelevantes, asegurando que cada partida genere debate real.

- **Filtro de Comparabilidad:** Solo se mantienen parejas donde un jugador puede confundirse fácilmente (ej: PlayStation vs Xbox).
- **¿Quién del Grupo?:** Esta categoría ha sido totalmente rediseñada para enfocarse en dinámicas sociales divertidas y rasgos de personalidad, eliminando preguntas genéricas.

#### Categorías Expandidas:
- `animales.json`: Fauna silvestre, mascotas, especies relacionadas.
- `comidas-bebidas.json`: Platillos, ingredientes y bebidas de todo el mundo.
- `videojuegos.json`: Consolas, franchise y personajes icónicos.
- `tecnologia.json`: Apps, marcas de hardware y software.
- `personas-famosas.json`: Deportistas, músicos y figuras históricas.
- `paises-ciudades.json`: Geografía global y puntos de interés.
- `peliculas-series.json`: Universos cinematográficos y TV.
- `marcas-logos.json`: Competidores comerciales directos.
- `costa-rica.json`: Cultura, comida y lugares locales.
- `memes.json`: Clásicos del internet y tendencias modernas.
- `clash-royale.json`: ⚔️ Tropas, hechizos y estructuras del universo de Supercell.
- `chaos.json`: 🔥 **Modo Caos**: Parejas de palabras diseñadas para generar máxima controversia.

## 🚀 Mejoras Recientes
- **Selección Inteligente:** Añadidos botones para seleccionar todas o ninguna categoría instantáneamente.
- **Modales de Validación:** Nuevo sistema de avisos integrados para prevenir el inicio de partidas sin categorías, eliminando las alertas estándar del navegador.
- **🌀 Modo Caos:** Integración con el sistema de activación secreta para desbloquear contenido especial.

## 🎮 Flujo del Juego
1. **Configuración:** Se eligen jugadores, categorías y la cantidad de "jugadores diferentes".
2. **Revelación:** Cada jugador gira la tarjeta para ver su palabra. Nadie sabe si su palabra es la mayoritaria o la minoritaria.
3. **Discusión:** Los jugadores dan pistas y debaten. Aquellos con la palabra diferente intentarán pasar desapercibidos, creyendo que tienen la palabra correcta.
4. **Solución:** Se revelan ambas palabras y quiénes tenían la diferente.

## 📂 Archivos del Juego
- `app/games/similar/page.tsx`: Gestor de estado y fases.
- `src/lib/similar-logic.ts`: Lógica de emparejamiento y asignación.
- `src/types/similar.ts`: Tipado estricto para el juego.
- `components/similar/`: Componentes UI específicos (Settings, Reveal, Solution, etc.).

---
*Implementado como parte de la suite ONI Games.*
