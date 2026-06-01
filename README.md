# 🎭 Party Games

Una plataforma moderna de juegos sociales para grupos, diseñada para jugarse localmente pasando un solo dispositivo. Sin necesidad de internet (una vez cargado), sin cuentas y sin configuraciones complicadas.

## 🌟 Visión del Proyecto
Crear la mejor colección de juegos de fiesta en español, con interfaces modernas, vibrantes y una experiencia de usuario fluida basada en animaciones táctiles y diseño premium.

## 🛠️ Stack Tecnológico
- **Core:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript (Tipado estricto)
- **Diseño:** Tailwind CSS 4 (Gradientes, Glassmorphism, Variables CSS)
- **Animaciones:** Framer Motion (Transiciones de fase, Flip cards 3D)
- **Iconos:** Lucide React
- **Persistencia:** Local Storage (Persistencia de configuración sin base de datos)
- **Branding:** ONI Games.

## 🎮 Suite de Juegos

### 1. 🎭 Impostor (Completado)
El juego de deducción social estrella.
- **Estado:** ✅ 100% Funcional.
- **Contenido:** 23 categorías, +3,700 palabras.
- **Características:** Selección múltiple de categorías, pistas inteligentes de una sola palabra, soporte para múltiples impostores.
- **Documentación:** [Ver detalles de Impostor](./IMPOSTOR_DOCS.md)

### 2. 🔍 Palabra Similar (Planeado)
Todos reciben la misma palabra, excepto uno que recibe una muy parecida.
- **Estado:** ⏳ Pendiente de implementación.

### 3. ❓ Pregunta Diferente (Planeado)
Todos responden a la misma pregunta, pero un jugador recibe una pregunta distinta que lo hará quedar en evidencia.
- **Estado:** ⏳ Pendiente de implementación.

## 📁 Estructura del Proyecto
```text
party-games/
├── app/                  # Rutas y páginas (Next.js App Router)
│   └── games/            # Páginas individuales de cada juego
├── components/           # Componentes UI reutilizables y específicos
├── src/
│   ├── data/             # Datasets JSON (Palabras, preguntas, categorías)
│   ├── lib/              # Lógica pura de los juegos (Helpers, Shufflers)
│   └── types/            # Definiciones de TypeScript
└── public/               # Assets estáticos
```

## ⚙️ Configuración del Entorno de Desarrollo

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir [http://localhost:3000](http://localhost:3000)

## 📝 Convenciones del Proyecto
- **Pistas en Impostor:** Siempre deben ser de una sola palabra.
- **Estilo:** Seguir el diseño minimalista de Zinc/Black (dark mode).
- **Tipos:** Cada juego debe tener su propio archivo de tipos en `src/types/`.
- **Lógica:** Evitar lógica pesada en los componentes; moverla a `src/lib/`.

---
*Desarrollado con ❤️ para crear momentos divertidos entre amigos.*
