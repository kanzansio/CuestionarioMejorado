import React, { useState } from 'react'

const LOGO = "https://iven.academy/wp-content/uploads/2023/03/Asset-3-2.svg"

export default function Landing({ onStart }){
  const [form, setForm] = useState({ name:'', email:'', company:'', role:'', teamSize:'1-5' })
  const [err, setErr] = useState({})

  const validate = () => {
    const e = {}
    if(!form.name.trim()) e.name = 'Requerido'
    if(!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email inválido'
    if(!form.company.trim()) e.company = 'Requerido'
    if(!form.role.trim()) e.role = 'Requerido'
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
        <div className="center"><h1 style={{ margin: 0 }}>¿Qué tan preparada está tu <span style={{ color:'#2563eb' }}>área de ventas</span> para la <span style={{ color:'#2563eb' }}>IA</span>?</h1></div>
        <p className="center" style={{ color:'var(--muted)' }}>
          Evalúa el <b>uso actual</b> y la <b>necesidad</b> de IA en tu proceso comercial y recibe un plan 30/60/90 para mejorar prospección, calificación, propuestas y cierre.
        </p>
        <div className="hr"></div>

        <div className="row">
          <div className="vstack">
            <label className="label">Nombre *</label>
            <input className="input" value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} placeholder="Tu nombre" />
            {err.name && <small style={{ color:'#ef4444' }}>{err.name}</small>}
          </div>
          <div className="vstack">
            <label className="label">Email *</label>
            <input className="input" value={form.email} onChange={e => setForm({ ...form, email:e.target.value })} placeholder="tu.email@empresa.com" />
            {err.email && <small style={{ color:'#ef4444' }}>{err.email}</small>}
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="vstack">
            <label className="label">Empresa *</label>
            <input className="input" value={form.company} onChange={e => setForm({ ...form, company:e.target.value })} placeholder="Nombre de tu empresa" />
            {err.company && <small style={{ color:'#ef4444' }}>{err.company}</small>}
          </div>
          <div className="vstack">
            <label className="label">Cargo *</label>
            <input className="input" value={form.role} onChange={e => setForm({ ...form, role:e.target.value })} placeholder="Ej. Head of Sales" />
            {err.role && <small style={{ color:'#ef4444' }}>{err.role}</small>}
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="vstack">
            <label className="label">Tamaño del equipo</label>
            <select className="select" value={form.teamSize} onChange={e => setForm({ ...form, teamSize:e.target.value })}>
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
