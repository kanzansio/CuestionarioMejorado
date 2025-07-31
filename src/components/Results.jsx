import React, { useRef } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { assessmentData, getMaturityLevel, getAreaMaturityLevel } from '../data/questions'
import { generateRecommendations } from '../data/recommendations'

export default function Results({ user, results, onRestart }){
  const { totalScore, areaScores, maxScore } = results
  const maturity = getMaturityLevel(totalScore, maxScore)
  const recos = generateRecommendations(areaScores)

  const radarData = assessmentData.areas.map(area => ({
    area: area.name.split(' ')[0],
    fullName: area.name,
    score: areaScores[area.id] || 0,
    max: area.questions.length * 5
  }))

  const barData = assessmentData.areas.map(area => ({
    name: area.name.split(' ')[0],
    score: areaScores[area.id] || 0,
    max: area.questions.length * 5
  }))

  const refReport = useRef(null)
  const downloadPDF = async () => {
    const el = refReport.current
    const canvas = await html2canvas(el, { scale: 2 })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p','mm','a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgProps = pdf.getImageProperties(img)
    const ratio = imgProps.width / imgProps.height
    const pdfWidth = pageWidth - 20
    const pdfHeight = pdfWidth / ratio
    pdf.addImage(img, 'PNG', 10, 10, pdfWidth, pdfHeight)
    pdf.save('diagnostico-ia-ventas.pdf')
  }

  return (
    <div className="vstack" style={{ gap: 16 }} ref={refReport}>
      <div className="card">
        <div className="hstack" style={{ justifyContent:'space-between' }}>
          <div className="vstack">
            <div style={{ fontWeight:800 }}>Diagnóstico de IA en Ventas</div>
            <div style={{ color:'var(--muted)', fontSize:13 }}>{new Date().toLocaleString()}</div>
          </div>
          <img src="https://iven.academy/wp-content/uploads/2023/03/Asset-3-2.svg" alt="IVen Academy" style={{ height: 36 }} />
        </div>
        <div className="grid-3" style={{ marginTop: 12 }}>
          <div className="card">
            <div className="kpi" style={{ color: maturity.color }}>{totalScore}/{maxScore}</div>
            <div className="kpi-muted">{maturity.label}</div>
            <div style={{ color:'var(--muted)' }}>{maturity.description}</div>
          </div>
          <div className="card">
            <div style={{ fontWeight:700, marginBottom: 8 }}>Radar por dimensión</div>
            <div style={{ width:'100%', height: 220 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="area" />
                  <PolarRadiusAxis />
                  <Radar name="Puntaje" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <div style={{ fontWeight:700, marginBottom: 8 }}>Barras por dimensión</div>
            <div style={{ width:'100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Puntaje" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight:700, marginBottom: 8 }}>Analíticas</div>
        <div className="grid-2">
          {assessmentData.areas.map(area => {
            const score = areaScores[area.id] || 0
            const max = area.questions.length * 5
            const pct = Math.round((score / max) * 100)
            const level = getAreaMaturityLevel(score, max)
            return (
              <div key={area.id} className="card">
                <div className="hstack" style={{ justifyContent:'space-between' }}>
                  <div style={{ fontWeight:700 }}>{area.name}</div>
                  <div className="badge" style={{ borderColor: level.color, color: level.color }}>{level.label}</div>
                </div>
                <div className="hstack" style={{ justifyContent:'space-between', marginTop: 6 }}>
                  <div>Puntuación</div><div className="kpi-muted">{score}/{max} · {pct}%</div>
                </div>
                <div className="progress" style={{ marginTop: 6 }}><div style={{ width: pct + '%' }} /></div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight:700, marginBottom: 8 }}>Áreas de oportunidad y procesos a mejorar con IA</div>
        <div className="grid-3">
          {recos.byArea.map((r) => (
            <div key={r.areaId} className="card">
              <div className="hstack" style={{ justifyContent:'space-between' }}>
                <div style={{ fontWeight:700 }}>{r.areaName}</div>
                <div className="badge">{r.priority} · {r.timeline}</div>
              </div>
              <ul>
                {r.actions.map((a, i) => <li key={i}>• {a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight:700, marginBottom: 8 }}>Top 3 prioridades (30/60/90)</div>
        <div className="grid-3">
          {recos.top3.map((r, idx) => (
            <div key={r.areaId} className="card">
              <div className="hstack" style={{ justifyContent:'space-between' }}>
                <div style={{ fontWeight:700 }}>{idx+1}. {r.areaName}</div>
                <div className="badge">{r.priority} · {r.timeline}</div>
              </div>
              <ul>
                {r.actions.map((a, i) => <li key={i}>• {a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="hstack" style={{ justifyContent:'flex-end' }}>
        <button className="btn secondary" onClick={onRestart}>Nueva evaluación</button>
        <button className="btn" onClick={downloadPDF}>Descargar PDF</button>
      </div>
    </div>
  )
}
