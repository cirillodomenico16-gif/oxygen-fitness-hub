import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../components/ui/animated-shiny-text';

type Measure = { label: string; value: string; delta: string; icon: string };

const AVAILABLE_MEASURES: { label: string; icon: string }[] = [
  { label: 'Vita', icon: '' },
  { label: 'Petto', icon: '' },
  { label: 'Gambe', icon: '' },
  { label: 'Braccia', icon: '' },
  { label: 'Spalle', icon: '' },
  { label: 'Glutei', icon: '' },
  { label: 'Polpacci', icon: '' },
  { label: 'Avambraccio', icon: '' },
  { label: 'Collo', icon: '' },
  { label: 'Fianchi', icon: '' },
  { label: '% Grasso', icon: '' },
  { label: 'Massa Magra', icon: '' },
];

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const [compareOpen, setCompareOpen] = useState(false);
  const [measures, setMeasures] = useState<Measure[]>([
    { label: 'Vita', value: '82cm', delta: '-2', icon: '' },
    { label: 'Petto', value: '98cm', delta: '+1', icon: '' },
    { label: 'Gambe', value: '54cm', delta: '-1', icon: '' },
  ]);
  const [addMeasureOpen, setAddMeasureOpen] = useState(false);
  const [newMeasureLabel, setNewMeasureLabel] = useState('Braccia');
  const [newMeasureValue, setNewMeasureValue] = useState('');
  const [beforePhoto, setBeforePhoto] = useState<string>(
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=420&fit=crop&auto=format&q=75'
  );
  const [afterPhoto, setAfterPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=420&fit=crop&auto=format&q=75'
  );
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, which: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      if (which === 'before') setBeforePhoto(url);
      else setAfterPhoto(url);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMeasure = () => {
    if (!newMeasureValue.trim()) return;
    const def = AVAILABLE_MEASURES.find((m) => m.label === newMeasureLabel);
    if (!def) return;
    setMeasures([
      ...measures,
      { label: def.label, icon: def.icon, value: newMeasureValue.trim(), delta: '0' },
    ]);
    setNewMeasureValue('');
    setAddMeasureOpen(false);
  };

  const weights = [
    86, 85.8, 85.6, 85.5, 85.3, 85.1, 85, 84.8, 84.6, 84.5,
    84.3, 84.1, 84, 83.8, 83.7, 83.5, 83.4, 83.2, 83, 82.9,
    82.8, 82.7, 82.6, 82.5, 82.4, 82.3, 82.2, 82.15, 82.1, 82.1,
  ];
  const minW = 82;
  const maxW = 86;
  const W = 320;
  const H = 180;
  const padL = 30;
  const padR = 10;
  const padT = 20;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const pts = weights.map((w, i) => {
    const x = padL + (i / (weights.length - 1)) * plotW;
    const y = padT + (1 - (w - minW) / (maxW - minW)) * plotH;
    return [x, y] as const;
  });
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const areaD = pathD + ` L ${pts[pts.length - 1][0].toFixed(1)} ${(padT + plotH).toFixed(1)} L ${pts[0][0].toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;


  const sectionTitle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 800,
    margin: '0 0 12px 0',
    color: 'white',
  };

  return (
    <div
      className="corsi-scroll"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        padding: '12px 20px 120px 20px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: 'white',
        overflowY: 'auto',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 999px; }
        .corsi-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ef4444, #b71c1c);
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(229,57,53,0.7);
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0 16px 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer' }}>‹</button>
        <AnimatedText text="I Miei Progressi" gradientColors="linear-gradient(90deg, #8b0000, #ff5252, #ffffff, #ff5252, #8b0000)" gradientAnimationDuration={2.4} textStyle={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.3px' }} />
        <button style={{ background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.35)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}></button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '18px', fontWeight: 800, animation: 'fadeInUp 0.5s ease-out' }}>
        Settembre <span style={{ color: '#ff5252' }}>2024</span>
      </div>

      <div style={{
        background: 'radial-gradient(ellipse at center, rgba(229,57,53,0.15) 0%, rgba(20,0,0,0.85) 70%)',
        border: '1.5px solid rgba(229,57,53,0.45)',
        borderRadius: '20px',
        padding: '16px 10px 10px 10px',
        marginBottom: '22px',
        boxShadow: '0 0 30px rgba(229,57,53,0.22)',
        animation: 'fadeInUp 0.6s ease-out 0.05s both',
      }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5252" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff8a80" />
              <stop offset="100%" stopColor="#e53935" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {[86, 85, 84, 83, 82].map((w, i) => {
            const y = padT + (i / 4) * plotH;
            return <text key={w} x={padL - 6} y={y + 4} fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="end" fontFamily="'Plus Jakarta Sans', sans-serif">{w}</text>;
          })}
          {[1, 5, 10, 15, 20, 25, 30].map((d) => {
            const x = padL + ((d - 1) / 29) * plotW;
            return (
              <g key={d}>
                <text x={x} y={H - padB + 14} fontSize="10" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">{d}</text>
                <text x={x} y={H - padB + 24} fontSize="7" fill="rgba(255,255,255,0.3)" textAnchor="middle">SET</text>
              </g>
            );
          })}
          <path d={areaD} fill="url(#areaGrad)" />
          <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" filter="url(#glow)" />
          <text x={pts[0][0] + 4} y={pts[0][1] - 6} fontSize="11" fill="#ff8a80" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">86kg</text>
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill="#ff5252" stroke="white" strokeWidth="1.5" />
          <rect x={pts[pts.length - 1][0] - 56} y={pts[pts.length - 1][1] - 30} width="56" height="26" rx="6" fill="rgba(229,57,53,0.2)" stroke="rgba(229,57,53,0.6)" />
          <text x={pts[pts.length - 1][0] - 28} y={pts[pts.length - 1][1] - 17} fontSize="10" fill="white" textAnchor="middle" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">82.1 kg</text>
          <text x={pts[pts.length - 1][0] - 28} y={pts[pts.length - 1][1] - 6} fontSize="9" fill="#ff8a80" textAnchor="middle" fontWeight="700">-4.1 kg</text>
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Misure Corporee</h3>
        <button
          onClick={() => setAddMeasureOpen(true)}
          style={{
            background: 'linear-gradient(180deg, #ef4444, #e53935)',
            border: 'none',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 0 14px rgba(229,57,53,0.55)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          + Aggiungi
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px', animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
        {measures.map((m, i) => (
          <div key={m.label + i} style={{ backgroundColor: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.35)', borderRadius: '14px', padding: '14px 8px', textAlign: 'center', boxShadow: '0 0 14px rgba(229,57,53,0.12)' }}>
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{m.icon}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginBottom: '2px' }}>{m.label}</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ff5252' }}>
              {m.value} <span style={{ fontSize: '11px', color: '#ff8a80' }}>{m.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
        <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Allenamenti Mensili</h3>
        <span style={{ fontSize: '12px', color: '#ff5252', fontWeight: 700 }}>Obiettivo: 24</span>
      </div>
      <div style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(229,57,53,0.22), rgba(0,0,0,0.6))',
        border: '1.5px solid rgba(229,57,53,0.45)',
        borderRadius: '18px',
        padding: '18px 16px',
        marginBottom: '22px',
        boxShadow: '0 0 24px rgba(229,57,53,0.2)',
        animation: 'fadeInUp 0.6s ease-out 0.15s both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Settembre</div>
            <div style={{ fontSize: '34px', fontWeight: 800, color: '#ff5252', lineHeight: 1, marginTop: '4px' }}>
              18<span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)' }}>/24</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>allenamenti completati</div>
          </div>
          <div style={{ fontSize: '40px' }}></div>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #ef4444, #ff5252)', boxShadow: '0 0 12px rgba(229,57,53,0.7)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {['Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set'].map((m, i) => {
            const vals = [14, 17, 20, 19, 22, 18];
            const h = (vals[i] / 24) * 100;
            return (
              <div key={m} style={{ textAlign: 'center' }}>
                <div style={{ height: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{
                    width: '70%',
                    height: `${h}%`,
                    background: i === 5 ? 'linear-gradient(180deg, #ff5252, #b71c1c)' : 'rgba(229,57,53,0.35)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: i === 5 ? '0 0 8px rgba(229,57,53,0.7)' : 'none',
                  }} />
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', fontWeight: 600 }}>{m}</div>
                <div style={{ fontSize: '10px', color: '#ff8a80', fontWeight: 700 }}>{vals[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <h3 style={sectionTitle}>I Tuoi Cambiamenti</h3>
      <input ref={beforeInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handlePhotoUpload(e, 'before')} />
      <input ref={afterInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handlePhotoUpload(e, 'after')} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px', animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
        <div
          onClick={() => beforeInputRef.current?.click()}
          style={{
            aspectRatio: '1/1.15',
            borderRadius: '14px',
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85)), url('${beforePhoto}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            border: '1px solid rgba(229,57,53,0.35)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '10px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#ff5252', fontSize: '10px', padding: '4px 8px', borderRadius: '999px', fontWeight: 800 }}>
            PRIMA
          </div>
          <div style={{ fontSize: '11px', fontWeight: 700 }}> Inizio (01 Set)</div>
        </div>
        <div
          onClick={() => afterInputRef.current?.click()}
          style={{
            aspectRatio: '1/1.15',
            borderRadius: '14px',
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85)), url('${afterPhoto}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            border: '1px solid rgba(229,57,53,0.35)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '10px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#ff5252', fontSize: '10px', padding: '4px 8px', borderRadius: '999px', fontWeight: 800 }}>
            DOPO
          </div>
          <div style={{ fontSize: '11px', fontWeight: 700 }}> Oggi (19 Set)</div>
        </div>
      </div>
      <button
        onClick={() => setCompareOpen(true)}
        style={{
          width: '100%',
          padding: '14px',
          background: 'linear-gradient(180deg, #ef4444, #e53935)',
          color: 'white',
          border: 'none',
          borderRadius: '14px',
          fontSize: '14px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(229,57,53,0.5)',
          marginBottom: '22px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        Compara Foto
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', animation: 'fadeInUp 0.6s ease-out 0.25s both' }}>
        {[
          { label: 'Allenamenti', value: '64' },
          { label: 'Kg Sollevati', value: '12.4k' },
          { label: 'All. Mensili', value: '18' },
        ].map((s) => (
          <div key={s.label} style={{
            backgroundColor: 'rgba(229,57,53,0.07)',
            border: '1px solid rgba(229,57,53,0.25)',
            borderRadius: '14px',
            padding: '14px 6px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff5252', lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {addMeasureOpen && (
        <div onClick={() => setAddMeasureOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#0c0c0c',
            border: '1.5px solid rgba(229,57,53,0.5)',
            borderRadius: '22px 22px 0 0',
            padding: '24px 20px 32px 20px',
            width: '100%',
            maxWidth: '430px',
            boxShadow: '0 -10px 50px rgba(229,57,53,0.35)',
            animation: 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          }}>
            <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', margin: '0 auto 18px' }} />
            <h3 style={{ margin: '0 0 16px 0', color: 'white', fontSize: '18px', fontWeight: 800 }}>
              Aggiungi Misura
            </h3>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Tipo di misura
            </label>
            <select
              value={newMeasureLabel}
              onChange={(e) => setNewMeasureLabel(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(229,57,53,0.08)',
                border: '1.5px solid rgba(229,57,53,0.4)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                marginBottom: '14px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                outline: 'none',
              }}
            >
              {AVAILABLE_MEASURES.filter((m) => !measures.find((mm) => mm.label === m.label)).map((m) => (
                <option key={m.label} value={m.label} style={{ background: '#111', color: 'white' }}>
                  {m.icon} {m.label}
                </option>
              ))}
            </select>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Valore
            </label>
            <input
              type="text"
              placeholder="es. 40cm"
              value={newMeasureValue}
              onChange={(e) => setNewMeasureValue(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(229,57,53,0.08)',
                border: '1.5px solid rgba(229,57,53,0.4)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                marginBottom: '18px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setAddMeasureOpen(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Annulla
              </button>
              <button
                onClick={handleAddMeasure}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(180deg, #ef4444, #e53935)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(229,57,53,0.6)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                AGGIUNGI
              </button>
            </div>
          </div>
        </div>
      )}

      {compareOpen && (
        <div onClick={() => setCompareOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px', zIndex: 1000,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#111',
            border: '1.5px solid rgba(229,57,53,0.5)',
            borderRadius: '18px',
            padding: '20px',
            maxWidth: '380px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(229,57,53,0.4)',
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#ff5252' }}>Confronto Foto</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              Differenza: <b style={{ color: '#ff5252' }}>-4.1 kg</b> · -3cm vita · +1cm petto
            </p>
            <button onClick={() => setCompareOpen(false)} style={{
              marginTop: '14px',
              padding: '12px 24px',
              background: '#e53935',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 800,
              cursor: 'pointer',
            }}>Chiudi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
