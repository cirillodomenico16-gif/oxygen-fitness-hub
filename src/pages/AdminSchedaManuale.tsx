import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MEMBERS } from '../data/members';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes: string;
}

const EXERCISE_LIBRARY = [
  'Panca piana', 'Panca inclinata', 'Panca declinata', 'Croci con manubri', 'Pushdown',
  'French press', 'Dip alle parallele', 'Trazioni', 'Lat machine', 'Rematore bilanciere',
  'Rematore manubrio', 'Pulley basso', 'Curl bilanciere', 'Curl manubri', 'Curl panca scott',
  'Squat', 'Squat bulgaro', 'Leg press', 'Affondi', 'Stacco rumeno', 'Leg curl',
  'Leg extension', 'Calf in piedi', 'Military press', 'Alzate laterali', 'Alzate frontali',
  'Alzate posteriori', 'Shrug', 'Plank', 'Crunch', 'Russian twist', 'Hyperextension',
];

const REST_PRESETS = ['30s', '45s', '60s', '90s', '120s', '180s'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '13px',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.6)',
  letterSpacing: '1px',
  marginBottom: '6px',
  display: 'block',
};

const AdminSchedaManuale: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const member = MEMBERS.find((m) => m.id === id) || MEMBERS[0];

  const [title, setTitle] = useState('Scheda Personalizzata');
  const [objective, setObjective] = useState('Ipertrofia');
  const [frequency, setFrequency] = useState('4');
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: crypto.randomUUID(), name: '', sets: 4, reps: '8-10', rest: '90s', notes: '' },
  ]);
  const [savedMsg, setSavedMsg] = useState(false);

  const addExercise = () => {
    setExercises([...exercises, { id: crypto.randomUUID(), name: '', sets: 3, reps: '10', rest: '60s', notes: '' }]);
  };

  const removeExercise = (eid: string) => {
    setExercises(exercises.filter((e) => e.id !== eid));
  };

  const updateExercise = (eid: string, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map((e) => (e.id === eid ? { ...e, [field]: value } : e)));
  };

  const handleSave = () => {
    const valid = exercises.filter((e) => e.name.trim());
    if (valid.length === 0) {
      alert('Aggiungi almeno un esercizio con nome valido.');
      return;
    }

    const planText = [
      `${title.toUpperCase()}`,
      `Obiettivo: ${objective}`,
      `Frequenza: ${frequency} giorni / settimana`,
      '',
      '━━━ ESERCIZI ━━━',
      ...valid.map((e, i) =>
        `${i + 1}. ${e.name}\n   Serie: ${e.sets} · Ripetizioni: ${e.reps} · Recupero: ${e.rest}${e.notes ? `\n   Note: ${e.notes}` : ''}`
      ),
    ].join('\n');

    const payload = {
      date: new Date().toLocaleDateString('it-IT'),
      plan: planText,
      source: 'manuale',
      title,
      objective,
      frequency,
      exercises: valid,
    };

    localStorage.setItem(`oxy_scheda_${member.id}`, JSON.stringify(payload));
    setSavedMsg(true);
    setTimeout(() => navigate(`/admin/membro/${member.id}`), 900);
  };

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh', backgroundColor: '#000',
      padding: '18px 22px 140px', color: '#fff',
      fontFamily: "'Plus Jakarta Sans', sans-serif", overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(12px);} to {opacity:1; transform: translateY(0);} }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
        select option { background: #1a0a0a; color: white; }
        input:focus, select:focus, textarea:focus { border-color: rgba(229,57,53,0.7) !important; box-shadow: 0 0 0 2px rgba(229,57,53,0.2); }
      `}</style>

      <button onClick={() => navigate(`/admin/membro/${member.id}`)} style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>← Indietro</button>

      {/* Header */}
      <div style={{
        background: 'rgba(229,57,53,0.06)',
        border: '1.5px solid rgba(229,57,53,0.45)',
        borderRadius: '18px', padding: '16px', marginBottom: '18px',
        boxShadow: '0 0 20px rgba(229,57,53,0.2)',
        animation: 'fadeInUp 0.4s ease-out',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#ff5252', fontWeight: 800 }}>
          SCHEDA MANUALE
        </div>
        <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px' }}>{member.name}</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
          Crea una scheda di allenamento personalizzata
        </div>
      </div>

      {/* General info */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', padding: '16px', marginBottom: '16px',
        animation: 'fadeInUp 0.45s ease-out',
      }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>TITOLO SCHEDA</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="Es. Ipertrofia Upper/Lower" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>OBIETTIVO</label>
            <select value={objective} onChange={(e) => setObjective(e.target.value)} style={inputStyle}>
              <option>Ipertrofia</option>
              <option>Forza</option>
              <option>Dimagrimento</option>
              <option>Tonificazione</option>
              <option>Resistenza</option>
              <option>Riabilitazione</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>FREQUENZA / SETT.</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} style={inputStyle}>
              {['2', '3', '4', '5', '6'].map((n) => <option key={n} value={n}>{n} giorni</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#ff5252', letterSpacing: '1px' }}>
          ESERCIZI ({exercises.length})
        </div>
      </div>

      {exercises.map((ex, idx) => (
        <div key={ex.id} style={{
          background: 'rgba(229,57,53,0.05)',
          border: '1.5px solid rgba(229,57,53,0.35)',
          borderRadius: '16px', padding: '14px', marginBottom: '12px',
          animation: 'fadeInUp 0.3s ease-out',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
              width: '26px', height: '26px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 800,
              boxShadow: '0 4px 10px rgba(229,57,53,0.4)',
            }}>{idx + 1}</div>
            {exercises.length > 1 && (
              <button onClick={() => removeExercise(ex.id)} style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ff5252', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Rimuovi</button>
            )}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={labelStyle}>ESERCIZIO</label>
            <input
              list={`ex-list-${ex.id}`}
              value={ex.name}
              onChange={(e) => updateExercise(ex.id, 'name', e.target.value)}
              style={inputStyle}
              placeholder="Cerca o digita..."
            />
            <datalist id={`ex-list-${ex.id}`}>
              {EXERCISE_LIBRARY.map((n) => <option key={n} value={n} />)}
            </datalist>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            <div>
              <label style={labelStyle}>SERIE</label>
              <input
                type="number" min={1} max={20}
                value={ex.sets}
                onChange={(e) => updateExercise(ex.id, 'sets', parseInt(e.target.value) || 1)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>RIPETIZIONI</label>
              <input
                value={ex.reps}
                onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                style={inputStyle}
                placeholder="8-10"
              />
            </div>
            <div>
              <label style={labelStyle}>RECUPERO</label>
              <select value={ex.rest} onChange={(e) => updateExercise(ex.id, 'rest', e.target.value)} style={inputStyle}>
                {REST_PRESETS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>NOTE</label>
            <textarea
              value={ex.notes}
              onChange={(e) => updateExercise(ex.id, 'notes', e.target.value)}
              style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
              placeholder="Tecnica, cadenza, varianti..."
            />
          </div>
        </div>
      ))}

      <button onClick={addExercise} style={{
        width: '100%', padding: '14px',
        background: 'rgba(255,255,255,0.04)',
        border: '1.5px dashed rgba(229,57,53,0.5)',
        borderRadius: '14px', color: '#ff5252', fontSize: '13px', fontWeight: 800,
        cursor: 'pointer', marginBottom: '20px', letterSpacing: '0.5px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>＋ AGGIUNGI ESERCIZIO</button>

      {/* Save */}
      <button onClick={handleSave} style={{
        width: '100%', padding: '16px',
        background: savedMsg ? 'linear-gradient(135deg,#22c55e,#15803d)' : 'linear-gradient(135deg,#ef4444,#b71c1c)',
        border: '1px solid #ff5252', borderRadius: '14px',
        color: '#fff', fontSize: '14px', fontWeight: 800,
        letterSpacing: '0.5px', cursor: 'pointer',
        boxShadow: savedMsg ? '0 6px 18px rgba(34,197,94,0.5)' : '0 6px 18px rgba(229,57,53,0.5)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'all 0.3s ease',
      }}>
        {savedMsg ? '✓ SCHEDA SALVATA' : ' SALVA SCHEDA'}
      </button>
    </div>
  );
};

export default AdminSchedaManuale;
