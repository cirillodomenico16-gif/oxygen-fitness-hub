import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const [compareOpen, setCompareOpen] = useState(false);

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

  const measures = [
    { label: 'Vita', value: '82cm', delta: '-2', icon: '🧍' },
    { label: 'Petto', value: '98cm', delta: '+1', icon: '💪' },
    { label: 'Gambe', value: '54cm', delta: '-1', icon: '🦵' },
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const activeDays = 18;
  const todayDay = 29;

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
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>I Miei Progressi</h1>
        <button style={{ background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.35)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}>⚙</button>
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

      <h3 style={sectionTitle}>Misure Corporee</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px', animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
        {measures.map((m) => (
          <div key={m.label} style={{ backgroundColor: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.35)', borderRadius: '14px', padding: '14px 8px', textAlign: 'center', boxShadow: '0 0 14px rgba(229,57,53,0.12)' }}>
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{m.icon}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginBottom: '2px' }}>{m.label}</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ff5252' }}>
              {m.value} <span style={{ fontSize: '11px', color: '#ff8a80' }}>{m.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
        <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Streak Mensile</h3>
        <span style={{ fontSize: '12px', color: '#ff5252', fontWeight: 700 }}>Migliore: 22g</span>
      </div>
      <div style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(229,57,53,0.22), rgba(0,0,0,0.6))',
        border: '1.5px solid rgba(229,57,53,0.45)',
        borderRadius: '18px',
        padding: '18px 14px',
        marginBottom: '22px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '14px',
        alignItems: 'center',
        boxShadow: '0 0 24px rgba(229,57,53,0.2)',
        animation: 'fadeInUp 0.6s ease-out 0.15s both',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px' }}>🔥</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#ff5252', lineHeight: 1 }}>18 giorni</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Migliore: 22g</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {days.map((d) => {
            const active = d <= activeDays;
            const isToday = d === todayDay;
            return (
              <div key={d} style={{
                aspectRatio: '1',
                borderRadius: '5px',
                background: active ? 'linear-gradient(135deg, #ff5252, #b71c1c)' : 'rgba(255,255,255,0.05)',
                border: isToday ? '1.5px solid white' : 'none',
                boxShadow: isToday ? '0 0 10px rgba(255,255,255,0.8)' : active ? '0 0 6px rgba(229,57,53,0.5)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 700,
                color: active ? 'white' : 'rgba(255,255,255,0.35)',
              }}>{d}</div>
            );
          })}
        </div>
      </div>

      <h3 style={sectionTitle}>I Tuoi Cambiamenti</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px', animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
        <div style={{
          aspectRatio: '1/1.05',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'rgba(255,255,255,0.4)',
        }}>
          <div style={{ fontSize: '32px' }}>🖼️</div>
          <div style={{ fontSize: '11px', marginTop: '8px', color: 'white' }}>Inizio (01 Set)</div>
        </div>
        <div style={{
          aspectRatio: '1/1.05',
          borderRadius: '14px',
          backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(229,57,53,0.35)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '8px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700 }}>Oggi (19 Set)</div>
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
          { label: 'Miglior Streak', value: '22g' },
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
