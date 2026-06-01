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

### 2. 🔍 Palabra Similar (Completado)
Todos reciben la misma palabra, excepto uno o varios que reciben una muy parecida.
- **Estado:** ✅ 100% Funcional.
- **Mecánica:** Nadie sabe si tiene la palabra diferente. Debate puro para encontrar la discrepancia.
- **Contenido:** 10 categorías optimizadas para comparaciones.

### 3. ❓ Pregunta Diferente (Completado)
Todos responden a la misma pregunta, pero uno o varios jugadores reciben una pregunta distinta que los hará quedar en evidencia.
- **Estado:** ✅ 100% Funcional.
- **Contenido:** 14 categorías con más de 2,500 parejas de preguntas.
- **Características:** Selección múltiple de categorías, respuestas integradas, revelación automática y nueva categoría 👥 "¿Quién del Grupo?".



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
