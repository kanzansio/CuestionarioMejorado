import { assessmentData } from './questions'

export const generateRecommendations = (areaScores) => {
  const byArea = assessmentData.areas.map(area => {
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
          'Mapea puntos de dolor en prospección, calificación, propuestas y cierre; cuantifica impacto.',
          'Selecciona 2–3 casos de uso de alto impacto de rápida implementación.',
          'Define KPIs por caso (respuesta, citas, win rate, ciclo) y metas trimestrales.',
          'Roadmap de adopción: responsables, riesgos y criterios de salida.'
        ]; break
      case 'uso':
        actions = [
          'Estandariza asistentes de IA para copy y resúmenes de llamadas con plantillas controladas.',
          'Activa lead scoring/next-best-action en el CRM y entrena su interpretación al equipo.',
          'Automatiza notas/actividades en CRM para eliminar copiar/pegar.',
          'Define checklist de QA humana para contenido generado por IA.'
        ]; break
      case 'datos':
        actions = [
          'Campos obligatorios y reglas anti-duplicados; auditorías semanales de calidad.',
          'Auto-logging de llamadas/reuniones/correos para cubrir brechas.',
          'Datasets para A/B y evaluación; versionado y documentación.',
          'Nombrar data stewards y definir políticas de gobernanza de datos.'
        ]; break
      case 'herramientas':
        actions = [
          'Catálogo de herramientas aprobadas y accesos; onboarding simplificado.',
          'Integrar snippets/atajos de IA en el flujo del vendedor.',
          'Resúmenes automáticos post-llamada + “next steps” sugeridos.',
          'Orquestar automatizaciones entre correo, CRM y voz (workflows).'
        ]; break
      case 'prompts':
        actions = [
          'Formación en patrón de prompts (rol-objetivo-formato-tono-límites) con ejemplos reales.',
          'Biblioteca por etapa (TOFU/MOFU/BOFU) y por vertical; control de versiones.',
          'Checklist de evaluación (fidelidad, relevancia, sesgo/riesgo).',
          'Calendario de práctica y feedback entre pares (weekly clinics).'
        ]; break
      case 'procesos':
        actions = [
          'Plan de 3 A/B tests mensuales (asuntos, CTAs, secuencias) y tablero público.',
          'OKRs de IA vinculados a KPIs; revisión quincenal.',
          'Rituales de iteración (retro semanal / cierre mensual) y actualización de playbooks.',
          'Etiquetado “con IA / sin IA” en oportunidades para atribución.'
        ]; break
      case 'gobernanza':
        actions = [
          'Políticas PII y límites de uso; consentimiento cuando aplique.',
          'Revisión humana obligatoria para contenido sensible (propuestas/pricing).',
          'Registro de riesgos (alucinación, sesgo); medidas de mitigación y escalamiento.',
          'Auditorías y logs de actividad; formación en uso responsable.'
        ]; break
      case 'impacto':
        actions = [
          'Define línea base y metodología de atribución (con/sin IA).',
          'Mide lift en respuesta, citas, win rate, ciclo; comunica resultados.',
          'Calcula ahorro de tiempo por rep y ticket medio; re-invierte en casos con ROI.',
          'Reprioriza cartera de casos de uso trimestralmente.'
        ]; break
      default:
        actions = ['Estandarizar buenas prácticas y documentar aprendizajes']
    }

    return {
      areaId: area.id, areaName: area.name,
      priority, timeline, actions,
      percent: Math.round(pct*100), score, max
    }
  })

  const order = { 'CRÍTICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BAJA': 3 }
  byArea.sort((a, b) => order[a.priority] - order[b.priority])

  return { byArea, top3: byArea.slice(0, 3) }
}
