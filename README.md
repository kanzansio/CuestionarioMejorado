# Evaluación de IA en Ventas — Proyecto completo (Vite + React)

Proyecto listo para un **nuevo repositorio** y despliegue en **Vercel**.

## Funcionalidad
- **Landing** con logo IVen y textos centrados en **uso** y **necesidad** de IA en ventas.
- **Cuestionario** (8 dimensiones × 4 preguntas, Likert 1–5) con **Anterior / Omitir / Siguiente** y **guardado** en localStorage.
- **Resultados** con:
  - Puntaje global y **nivel** (Explorador / Iniciado / Integrador / Orquestador)
  - **Radar** y **Barras** por dimensión (Recharts)
  - **Analíticas** por dimensión (score, % y barra)
  - **Áreas de oportunidad y procesos** que pueden mejorar con IA
  - **Top 3 prioridades (30/60/90)**
  - **Descargar PDF** (html2canvas + jsPDF)

## Scripts

```bash
pnpm install   # o npm install / yarn
pnpm dev       # desarrollo
pnpm build     # build para producción (Vercel)
pnpm preview   # previsualización local
```

## Despliegue en Vercel
1. Sube este proyecto tal cual a un repo nuevo (asegúrate que `package.json` esté en la raíz).
2. Importa el repo en Vercel y despliega (detecta Vite automáticamente).
3. Si ya existió un build previo, usa **Clear build cache** en el redeploy.
4. Haz **hard reload** en el navegador (Ctrl/Cmd+Shift+R).

## Personalización
- **Preguntas y textos**: `src/data/questions.js`.
- **Recomendaciones**: `src/data/recommendations.js`.
- **Estilos**: `src/styles.css`.
