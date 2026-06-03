# Impostor - Documentación del Proyecto

## 🎭 Descripción del Juego
"Impostor" es un juego social de ONI Games diseñado para jugarse en grupo con un solo dispositivo. El objetivo es identificar al impostor (o impostores) antes de que ellos descubran la palabra secreta.

## 🚀 Tecnologías Utilizadas
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Estado:** React Hooks (`useState`)
- **Almacenamiento:** Archivos JSON locales (Sin base de datos)

## 🛠️ Cambios Recientes

### 1. Rediseño UX/UI Premium (ONI Games Style)
- **Identidad Visual:** Transición de un diseño monocromático a una paleta vibrante (Morado, Azul Eléctrico, Cian).
- **Glassmorphism:** Uso de fondos translúcidos con desenfoque y bordes suaves en todas las tarjetas.
- **Header Compacto:** Rediseño del header con logo a la izquierda, navegación centrada en desktop y **menú hamburguesa** (dropdown) en móvil.
- **Fondo Animado:** Implementación de "Glow Shapes" animados que dan vida a la interfaz.

### 2. Mecánica de Revelación "Hold to Flip"
- **3D Flip Card:** La revelación ahora se realiza mediante una tarjeta que gira 180° al mantener presionada.
- **Seguridad:** La tarjeta vuelve automáticamente a su estado frontal al soltarla, evitando vistas accidentales.
- **Flujo Inteligente:** El botón "Siguiente Jugador" solo aparece después de que el usuario ha revelado su palabra al menos una vez.

### 3. Persistencia Local
- **Hook `useLocalStorage`:** Implementación de persistencia automática para:
  - Lista de nombres de jugadores.
  - Selección de categorías.
  - Configuración de impostores y pistas.
- **Sin Base de Datos:** Los datos se guardan exclusivamente en el navegador del usuario para una experiencia instantánea.

### 4. Animaciones y Micro-interacciones
- **Framer Motion:** Transiciones suaves entre las fases del juego (`AnimatePresence`) y animaciones de entrada laterales entre jugadores.
- **Auto-scroll:** Implementación de scroll automático al inicio en cada cambio de fase para mejorar la navegación.
- **Optimización de Espacio:** Refactorización de la pantalla de revelación para eliminar scroll innecesario en móviles.
- **Feedback Táctil:** Animaciones de escala y resplandor al interactuar con botones y tarjetas.

## 📊 Estado del Contenido
El juego cuenta con un dataset curado de **25 categorías** seleccionadas por su potencial para generar pistas creativas y sospechas.

- **Refactor de Calidad:** Se han eliminado cientos de términos mediocres o abstractos. Ahora, cada categoría (desde Animales hasta Videojuegos) contiene palabras icónicas que todos conocen, facilitando la participación.
- **Regla de Oro:** Las pistas automáticas son de **una sola palabra**, diseñadas para ser lo suficientemente amplias para que el impostor pueda camuflarse, pero lo suficientemente específicas para los jugadores normales.

### 7. Mejoras de UX en Configuración
- **Selección Rápida:** Implementación de botones "TODAS" y "NINGUNA" en el selector de categorías para facilitar la configuración de partidas personalizadas.
- **Validación Premium:** Sustitución de alertas del sistema por modales de confirmación integrados en la estética de ONI Games para notificar cuando faltan categorías seleccionadas.

### 8. 🔥 Modo Caos (Activación Secreta)
- **Desbloqueo:** Acceso mediante la ruta oculta `/chaos`.
- **Contenido Exclusivo:** Se habilita la categoría "Modo Caos 🔥" que incluye palabras y situaciones más intensas, diseñadas para grupos de confianza.
- **UI Adaptativa:** La categoría Chaos aparece con un estilo visual de fuego y resplandor naranja cuando el modo está activo.

## 📂 Estructura de Archivos Clave
- `app/games/impostor/page.tsx`: Contenedor principal y gestión del estado del juego.
- `src/lib/impostor-logic.ts`: Lógica de barajado, generación de partida y carga de palabras.
- `src/types/impostor.ts`: Definiciones de interfaces para Jugadores, Palabras y Configuración.
- `components/impostor/`: Componentes modulares para cada fase del juego (Setup, Reveal, Discussion, Solution).
- `src/data/impostor/`: Directorio con todos los archivos JSON de palabras.

## 🎮 Flujo del Juego
1. **Configuración:** Se agregan jugadores y se eligen las categorías.
2. **Revelación:** Cada jugador ve su rol y la palabra secreta (excepto el impostor, que ve una pista).
3. **Discusión:** Los jugadores hablan y dan pistas para identificar quién no conoce la palabra.
4. **Solución:** Se revela quién era el impostor y cuál era la palabra secreta.

---
*Documentación actualizada al 31 de mayo, 2026.*
