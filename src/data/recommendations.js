import { assessmentData } from './questions'

export const generateRecommendations = (areaScores) => {
  const items = []

  assessmentData.areas.forEach(area => {
    const max = area.questions.length * 5
    const score = areaScores[area.id] || 0
    const pct = max ? score / max : 0

    let priority = 'MEDIA', timeline = '60–90 días'
    if (pct < 0.5) { priority = 'CRÍTICA'; timeline = '0–30 días' }
    else if (pct < 0.75) { priority = 'ALTA'; timeline = '30–60 días' }

    let actions = []
    switch(area.id){
      case 'necesidad':
        actions = [
          'Mapear puntos de dolor en prospección, calificación, propuestas y cierre',
          'Priorizar 2–3 casos de IA de alto impacto y baja complejidad',
          'Definir objetivos de cada caso y sus KPIs de negocio',
          'Plan de adopción: responsables, hitos y riesgos'
        ]
        break
      case 'uso':
        actions = [
          'Estandarizar el uso de asistentes de IA para copy y resúmenes de llamadas',
          'Activar lead scoring/next-best-action en el CRM',
          'Automatizar notas/actividades con IA (evitar copiar/pegar)',
          'Checklist de QA para salidas de IA (revisión humana)'
        ]
        break
      case 'datos':
        actions = [
          'Definir campos obligatorios y reglas anti-duplicados en CRM',
          'Auto-logging de llamadas/reuniones y correos',
          'Datasets para A/B tests y evaluación de modelos',
          'Data stewardship: responsables y políticas de calidad'
        ]
        break
      case 'herramientas':
        actions = [
          'Habilitar herramientas de IA aprobadas y accesibles',
          'Integrar plantillas/snippets/atajos al flujo del vendedor',
          'Resúmenes automáticos y sugerencias de próximos pasos',
          'Orquestar automatizaciones entre correo, CRM y voz'
        ]
        break
      case 'prompts':
        actions = [
          'Formación en patrón de prompts (rol-objetivo-formato-tono-límites)',
          'Biblioteca por etapa (TOFU/MOFU/BOFU) y casos repetibles',
          'Checklist de evaluación de salidas (fidelidad, relevancia, riesgos)',
          'Sesiones de práctica con feedback y mejora continua'
        ]
        break
      case 'procesos':
        actions = [
          '3 A/B tests mensuales (asuntos, CTAs, secuencias) con IA',
          'Tableros por rep y por caso de uso (respuesta, citas, win rate, ciclo)',
          'Rituales semanales/mensuales para actualizar playbooks',
          'Etiquetado con/sin IA en oportunidades'
        ]
        break
      case 'gobernanza':
        actions = [
          'Políticas de PII/consentimiento y límites de uso de IA',
          'Revisión humana obligatoria para contenido sensible',
          'Registro de riesgos y mitigaciones (alucinación, sesgo, cumplimiento)',
          'Auditorías periódicas y logs de actividad'
        ]
        break
      case 'impacto':
        actions = [
          'Línea base y atribución (con/sin IA)',
          'Medir lift en respuesta, citas, win rate y ciclo',
          'Calcular ahorro de tiempo por rep y ticket medio',
          'Repriorizar casos de uso según ROI'
        ]
        break
      default:
        actions = ['Estandarizar buenas prácticas y documentar aprendizajes']
    }

    items.push({
      areaId: area.id,
      areaName: area.name,
      priority, timeline, actions,
      percent: Math.round(pct*100),
      score, max
    })
  })

  const order = { 'CRÍTICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BAJA': 3 }
  items.sort((a, b) => order[a.priority] - order[b.priority])

  return {
    byArea: items,
    top3: items.slice(0, 3)
  }
}
