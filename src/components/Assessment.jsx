import React, { useEffect, useState } from 'react'
import { assessmentData, scaleOptions } from '../data/questions'

const STORAGE = 'ia-ventas-progress'

export default function Assessment({ onComplete }){
  const [areaIndex, setAreaIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const currentArea = assessmentData.areas[areaIndex]
  const currentQuestion = currentArea.questions[questionIndex]

  // load
  useEffect(() => {
    try{
      const saved = JSON.parse(localStorage.getItem(STORAGE) || '{}')
      if(saved.answers) setAnswers(saved.answers)
      if(Number.isInteger(saved.areaIndex)) setAreaIndex(saved.areaIndex)
      if(Number.isInteger(saved.questionIndex)) setQuestionIndex(saved.questionIndex)
    }catch{}
  }, [])

  // save
  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ areaIndex, questionIndex, answers }))
  }, [areaIndex, questionIndex, answers])

  const totalQuestions = assessmentData.areas.reduce((acc,a)=>acc+a.questions.length,0)
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount/totalQuestions)*100)

  const select = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  const next = () => {
    if(questionIndex < currentArea.questions.length - 1){
      setQuestionIndex(questionIndex + 1)
    } else if(areaIndex < assessmentData.areas.length - 1){
      setAreaIndex(areaIndex + 1)
      setQuestionIndex(0)
    } else {
      // finish
      const areaScores = {}
      let totalScore = 0
      assessmentData.areas.forEach(area => {
        let sum = 0
        area.questions.forEach(q => { sum += answers[q.id] || 0 })
        areaScores[area.id] = sum
        totalScore += sum
      })
      onComplete({ answers, areaScores, totalScore, maxScore: totalQuestions * 5 })
    }
  }

  const prev = () => {
    if(questionIndex > 0) setQuestionIndex(questionIndex - 1)
    else if(areaIndex > 0){
      const prevArea = assessmentData.areas[areaIndex - 1]
      setAreaIndex(areaIndex - 1)
      setQuestionIndex(prevArea.questions.length - 1)
    }
  }

  const skip = () => next()

  const isAnswered = answers[currentQuestion.id] !== undefined

  return (
    <div className="card">
      <div className="vstack">
        <div className="hstack" style={{ justifyContent:'space-between' }}>
          <div style={{ fontWeight:700 }}>Progreso</div>
          <div className="badge">{answeredCount}/{totalQuestions} · {progress}%</div>
        </div>
        <div className="progress"><div style={{ width: progress + '%' }} /></div>
      </div>

      <div className="vstack" style={{ marginTop: 16 }}>
        <div style={{ fontSize:18, fontWeight:700 }}>{currentArea.name}</div>
        <div style={{ color:'var(--muted)' }}>{currentArea.description}</div>
      </div>

      <div className="vstack" style={{ marginTop: 16 }}>
        <div style={{ fontSize:16, fontWeight:600, marginBottom: 8 }}>{currentQuestion.text}</div>
        <div className="vstack">
          {scaleOptions.map(opt => {
            const selected = answers[currentQuestion.id] === opt.value
            return (
              <div key={opt.value} className={'question ' + (selected?'selected':'')} onClick={() => select(opt.value)}>
                {opt.value}. {opt.text}
              </div>
            )
          })}
        </div>
      </div>

      <div className="hstack" style={{ justifyContent:'space-between', marginTop: 16 }}>
        <button className="btn secondary" onClick={prev} disabled={areaIndex===0 && questionIndex===0}>Anterior</button>
        <div className="hstack">
          <button className="btn ghost" onClick={skip}>Omitir</button>
          <button className="btn" onClick={next}>{(areaIndex===assessmentData.areas.length-1 && questionIndex===currentArea.questions.length-1) ? 'Finalizar' : 'Siguiente'}</button>
        </div>
      </div>
    </div>
  )
}
