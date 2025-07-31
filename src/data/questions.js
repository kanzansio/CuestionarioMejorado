// Preguntas para evaluar uso y necesidad de IA en ventas
export const assessmentData = {
  areas: [
    {
      id: "necesidad",
      name: "Necesidad Percibida e Impacto Potencial",
      description: "Dónde la IA podría aportar mayor valor",
      questions: [
        { id: "N1", text: "Prospección actual insuficiente: la IA podría aumentar alcance y personalización.", type: "likert" },
        { id: "N2", text: "Calificación de leads es inconsistente; IA ayudaría a priorizar oportunidades.", type: "likert" },
        { id: "N3", text: "El ciclo de venta es largo; IA podría acortarlo con tareas y borradores automáticos.", type: "likert" },
        { id: "N4", text: "El equipo requiere apoyo para propuestas y objeciones; IA podría mejorar la calidad.", type: "likert" }
      ]
    },
    {
      id: "uso",
      name: "Uso Actual de IA",
      description: "Grado real de adopción en el día a día",
      questions: [
        { id: "U1", text: "Se usan asistentes de IA para redactar emails/mensajes de alcance.", type: "likert" },
        { id: "U2", text: "Se usa IA en llamadas: transcripción, resúmenes y próximos pasos.", type: "likert" },
        { id: "U3", text: "Lead scoring/next-best-action con IA está activo en el CRM.", type: "likert" },
        { id: "U4", text: "Automatizaciones con IA actualizan notas y actividades en el CRM.", type: "likert" }
      ]
    },
    {
      id: "datos",
      name: "Datos y CRM",
      description: "Calidad, cobertura e integración de datos",
      questions: [
        { id: "D1", text: "El CRM tiene registros completos y actualizados (campos clave ≥90%).", type: "likert" },
        { id: "D2", text: "Hay higiene de datos (duplicados, campos críticos, registro de actividades).", type: "likert" },
        { id: "D3", text: "La IA se integra al CRM sin pasos manuales (sin copiar/pegar).", type: "likert" },
        { id: "D4", text: "Podemos extraer datasets para A/B tests y evaluación de modelos.", type: "likert" }
      ]
    },
    {
      id: "herramientas",
      name: "Herramientas y Automatización",
      description: "Disponibilidad y orquestación de herramientas de IA",
      questions: [
        { id: "H1", text: "Disponemos de herramientas de IA aprobadas y accesibles para el equipo.", type: "likert" },
        { id: "H2", text: "El flujo del vendedor integra IA (plantillas, snippets, atajos).", type: "likert" },
        { id: "H3", text: "El equipo usa resúmenes automáticos y sugerencias de próximos pasos.", type: "likert" },
        { id: "H4", text: "Hay automatizaciones multi-herramienta (correo, CRM, voz).", type: "likert" }
      ]
    },
    {
      id: "prompts",
      name: "Habilidades de Prompting",
      description: "Competencias para pedir y evaluar salidas de IA",
      questions: [
        { id: "P1", text: "Dominio de prompts efectivos (rol, objetivo, formato, tono, límites).", type: "likert" },
        { id: "P2", text: "Existe biblioteca de prompts por etapa (TOFU/MOFU/BOFU).", type: "likert" },
        { id: "P3", text: "Hay checklist para evaluar salidas (fidelidad, relevancia, riesgo).", type: "likert" },
        { id: "P4", text: "El equipo practica e itera prompts con feedback estructurado.", type: "likert" }
      ]
    },
    {
      id: "procesos",
      name: "Procesos y Medición",
      description: "A/B testing, tableros y mejora continua",
      questions: [
        { id: "PR1", text: "A/B tests con y sin IA para asuntos, copys y secuencias.", type: "likert" },
        { id: "PR2", text: "Tableros por rep y por caso de uso (respuesta, citas, win rate, ciclo).", type: "likert" },
        { id: "PR3", text: "Ciclos de revisión semanal/mensual y actualización de playbooks.", type: "likert" },
        { id: "PR4", text: "Etiquetado ‘con IA / sin IA’ en oportunidades ganadas/perdidas.", type: "likert" }
      ]
    },
    {
      id: "gobernanza",
      name: "Gobernanza y Seguridad",
      description: "Políticas, riesgos y cumplimiento",
      questions: [
        { id: "G1", text: "Políticas claras de PII/consentimiento y límites de uso de IA.", type: "likert" },
        { id: "G2", text: "Revisión humana obligatoria para contenido sensible.", type: "likert" },
        { id: "G3", text: "Registro de riesgos y mitigaciones (alucinación, sesgo, cumplimiento).", type: "likert" },
        { id: "G4", text: "Auditorías periódicas y logs de uso de IA.", type: "likert" }
      ]
    },
    {
      id: "impacto",
      name: "Impacto y ROI",
      description: "Resultados atribuibles a IA",
      questions: [
        { id: "I1", text: "La IA reduce tiempo administrativo por rep (≥20–30%).", type: "likert" },
        { id: "I2", text: "La IA aumenta tasa de respuesta y agendamientos.", type: "likert" },
        { id: "I3", text: "Mejora el win rate o acorta el ciclo en ≥2 periodos.", type: "likert" },
        { id: "I4", text: "Existe caso financiero (ROI): inversión vs. ahorro/retorno.", type: "likert" }
      ]
    }
  ]
};

export const scaleOptions = [
  { value: 1, text: "Nunca / No existe" },
  { value: 2, text: "A veces / Piloto aislado" },
  { value: 3, text: "Regular / Integración inicial" },
  { value: 4, text: "Consistente / Estándar de equipo" },
  { value: 5, text: "Avanzado / Automatizado y medido" }
];

export const getMaturityLevel = (score, totalMax) => {
  const q1 = 0.25 * totalMax;
  const q2 = 0.50 * totalMax;
  const q3 = 0.75 * totalMax;
  if (score <= q1) return { label: "Explorador", color: "#ef4444", description: "Pilotos dispersos; enfócate en datos/CRM y 1–2 casos de uso tractables." };
  if (score <= q2) return { label: "Iniciado",   color: "#f59e0b", description: "Adopción inicial; formaliza playbooks, plantillas de prompt y medición." };
  if (score <= q3) return { label: "Integrador", color: "#3b82f6", description: "Fluye en el día a día; acelera A/B tests, automatiza CRM y QA." };
  return { label: "Orquestador", color: "#10b981", description: "Optimización continua; escala automatizaciones y mide ROI por caso de uso." };
};

export const getAreaMaturityLevel = (areaScore, areaMax) => {
  const q1 = 0.25 * areaMax;
  const q2 = 0.50 * areaMax;
  const q3 = 0.75 * areaMax;
  if (areaScore <= q1) return { label: "Explorador", color: "#ef4444", min: 0, max: q1 };
  if (areaScore <= q2) return { label: "Iniciado",   color: "#f59e0b", min: q1, max: q2 };
  if (areaScore <= q3) return { label: "Integrador", color: "#3b82f6", min: q2, max: q3 };
  return { label: "Orquestador", color: "#10b981", min: q3, max: areaMax };
};
