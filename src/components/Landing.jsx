import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const LOGO = "https://iven.academy/wp-content/uploads/2023/03/Asset-3-2.svg"

export default function Landing({ onStart }){
  const positions = [
    "Gerente de Ventas",
    "Director Comercial",
    "Head of Revenue",
    "Gerente de Desarrollo de Negocios",
    "Sales Enablement Manager",
    "Sales Operations Lead"
  ]

  const [form, setForm] = useState({ name:'', email:'', company:'', role:'', teamSize:'1-5' })
  const [err, setErr] = useState({})

  useEffect(() => {
    gsap.from('.card', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
    gsap.from('.btn', { scale: .98, duration: .6, ease: 'power2.out' })
  }, [])

  const validate = () => {
    const e = {}
    if(!form.name.trim()) e.name = 'Requerido'
    if(!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email inválido'
    if(!form.company.trim()) e.company = 'Requerido'
    if(!form.role.trim()) e.role = 'Selecciona un cargo'
    setErr(e)
    return Object.keys(e).length === 0
  }

  const submit = () => { if(validate()) onStart(form) }

  return (
    <div className="hero">
      <div className="card" style={{ width:'100%' }}>
        <div className="center" style={{ marginBottom: 12 }}>
          <img src={LOGO} alt="IVen Academy" style={{ height: 48 }} />
        </div>
        <div className="center"><h1 style={{ margin: 0 }}>¿Qué tan preparada está tu <span style={{ color:'var(--primary)' }}>área de ventas</span> para la <span style={{ color:'var(--primary)' }}>IA</span>?</h1></div>
        <p className="center" style={{ color:'var(--muted)', textAlign:'center' }}>
          Evalúa el <b>uso actual</b> y la <b>necesidad</b> de IA en tu proceso comercial y recibe un plan 30/60/90 para mejorar prospección, calificación, propuestas y cierre.
        </p>
        <div className="hr"></div>

        <div className="row">
          <div className="vstack">
            <label className="label">Nombre *</label>
            <input className="input" value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} placeholder="Tu nombre" aria-label="Nombre" />
            {err.name && <small style={{ color:'#ef4444' }}>{err.name}</small>}
          </div>
          <div className="vstack">
            <label className="label">Email *</label>
            <input className="input" value={form.email} onChange={e => setForm({ ...form, email:e.target.value })} placeholder="tu.email@empresa.com" aria-label="Email" />
            {err.email && <small style={{ color:'#ef4444' }}>{err.email}</small>}
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="vstack">
            <label className="label">Empresa *</label>
            <input className="input" value={form.company} onChange={e => setForm({ ...form, company:e.target.value })} placeholder="Nombre de tu empresa" aria-label="Empresa" />
            {err.company && <small style={{ color:'#ef4444' }}>{err.company}</small>}
          </div>
          <div className="vstack">
            <label className="label">Cargo *</label>
            <select className="select" value={form.role} onChange={e => setForm({ ...form, role:e.target.value })} aria-label="Cargo">
              <option value="">Selecciona…</option>
              {positions.map(p => <option key={p}>{p}</option>)}
            </select>
            {err.role && <small style={{ color:'#ef4444' }}>{err.role}</small>}
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="vstack">
            <label className="label">Tamaño del equipo</label>
            <select className="select" value={form.teamSize} onChange={e => setForm({ ...form, teamSize:e.target.value })} aria-label="Tamaño del equipo">
              <option value="1-5">1–5</option>
              <option value="6-15">6–15</option>
              <option value="16-50">16–50</option>
              <option value="51+">51+</option>
            </select>
          </div>
        </div>

        <div className="hstack" style={{ justifyContent:'flex-end', marginTop: 16 }}>
          <button className="btn" onClick={submit}>Empezar evaluación</button>
        </div>

        <div className="footer">Toma ~5–7 minutos. Recibirás tu diagnóstico y plan 30/60/90.</div>
      </div>
    </div>
  )
}
