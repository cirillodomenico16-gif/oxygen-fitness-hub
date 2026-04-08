import React, { useState } from 'react';

interface Member {
  id: number;
  name: string;
  avatar: string;
}

const MEMBERS: Member[] = [
  { id: 1, name: 'Marco R.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { id: 2, name: 'Anna S.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
  { id: 3, name: 'Luigi B.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { id: 4, name: 'Giulia T.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' },
  { id: 5, name: 'Davide P.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
  { id: 6, name: 'Sara L.', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop' },
];

const WORKOUT_TAGS = [
  { day: 'Lun', label: 'Upper Body' },
  { day: 'Mar', label: 'Lower Body' },
  { day: 'Mer', label: 'Rest', muted: true },
  { day: 'Gio', label: 'Push' },
  { day: 'Ven', label: 'Pull' },
];

const AdminSchedeAI: React.FC = () => {
  const [selected, setSelected] = useState(0);

  const card: React.CSSProperties = {
    background: 'rgba(229,57,53,0.07)',
    border: '1.5px solid rgba(229,57,53,0.55)',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '18px',
    boxShadow: '0 0 26px rgba(229,57,53,0.24)',
  };

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, rgba(30,5,8,1), #000 60%)',
      padding: '16px 22px 130px 22px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: 'white',
      overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from {opacity:0; transform:translateY(14px);} to{opacity:1; transform:translateY(0);} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 30px rgba(229,57,53,0.6);} 50%{box-shadow:0 0 50px rgba(229,57,53,1);} }
        .corsi-scroll::-webkit-scrollbar{ width:6px;} .corsi-scroll::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#ef4444,#b71c1c);border-radius:999px;}
        .ai-carousel { display: flex; gap: 14px; overflow-x: auto; padding: 4px 0 10px 0; scrollbar-width: none; }
        .ai-carousel::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ fontSize: '13px' }}>9:41</div>
        <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.75)', letterSpacing: '2px' }}>ADMIN MODE</div>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #ff5252, #8b0000)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px', fontWeight: 900, color: 'white',
          boxShadow: '0 0 14px rgba(229,57,53,0.7)',
        }}>OX</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px', animation: 'fadeInUp 0.5s ease-out' }}>
        <button style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.4)',
          color: 'white', cursor: 'pointer', fontSize: '20px', flexShrink: 0,
        }}>‹</button>
        <div className="ai-carousel" style={{ flex: 1 }}>
          {MEMBERS.map((m, i) => (
            <div key={m.id} onClick={() => setSelected(i)} style={{ textAlign: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundImage: `url('${m.avatar}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                border: selected === i ? '3px solid #ff5252' : '2px solid rgba(255,255,255,0.2)',
                boxShadow: selected === i ? '0 0 24px rgba(229,57,53,0.9)' : 'none',
                transition: 'all 0.25s ease',
              }} />
              <div style={{ fontSize: '11px', fontWeight: 700, marginTop: '6px', color: selected === i ? 'white' : 'rgba(255,255,255,0.7)' }}>
                {m.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...card, animation: 'fadeInUp 0.5s ease-out 0.05s both' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>Piano generato da AI</h2>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: '0 0 14px 0' }}>
          {MEMBERS[selected].name} settimanale:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
          {WORKOUT_TAGS.map((t) => (
            <div key={t.day} style={{
              padding: '8px 14px',
              borderRadius: '999px',
              background: t.muted ? 'rgba(255,255,255,0.08)' : 'linear-gradient(180deg, rgba(239,68,68,0.35), rgba(183,28,28,0.4))',
              border: t.muted ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(229,57,53,0.7)',
              fontSize: '12px',
              fontWeight: 700,
              color: t.muted ? 'rgba(255,255,255,0.6)' : 'white',
              boxShadow: t.muted ? 'none' : '0 0 12px rgba(229,57,53,0.4)',
            }}>
              {t.day}: {t.label}
            </div>
          ))}
        </div>
        <button style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(180deg, #ef4444, #e53935)',
          border: 'none',
          borderRadius: '999px',
          color: 'white',
          fontSize: '14px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          boxShadow: '0 0 40px rgba(229,57,53,0.7)',
          animation: 'glowPulse 2.4s ease-in-out infinite',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          ⚡ GENERA NUOVA SCHEDA AI
        </button>
      </div>

      <div style={{ ...card, animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 16px 0', letterSpacing: '-0.3px' }}>Piano Nutrizionale AI</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '6px' }}>
          {[
            { label: 'Proteine', val: '180g', pct: 45, color: '#ef4444' },
            { label: 'Carboidrati', val: '250g', pct: 45, color: '#f97316' },
            { label: 'Grassi', val: '60g', pct: 10, color: '#f59e0b' },
          ].map((m) => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <svg width="88" height="88" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle cx="40" cy="40" r="32" fill="none" stroke={m.color} strokeWidth="6"
                  strokeDasharray={`${(m.pct / 100) * 201} 201`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ filter: `drop-shadow(0 0 6px ${m.color})` }}
                />
                <text x="40" y="35" fontSize="8" fill="rgba(255,255,255,0.6)" textAnchor="middle">{m.label}</text>
                <text x="40" y="49" fontSize="12" fontWeight="800" fill="white" textAnchor="middle">{m.val}</text>
              </svg>
              <div style={{ fontSize: '11px', color: m.color, fontWeight: 700, marginTop: '-6px' }}>{m.pct}%</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 14px 0' }}>
          2450 Kcal
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {[
            { t: 'Colazione', d: 'Avena | Albumi | Frutta' },
            { t: 'Pranzo', d: 'Pollo | Riso | Verdure' },
            { t: 'Spuntino', d: 'Shaker | Noci' },
            { t: 'Cena', d: 'Salmone | Asparagi' },
          ].map((m) => (
            <div key={m.t} style={{
              background: 'rgba(0,0,0,0.45)',
              border: '1px solid rgba(229,57,53,0.3)',
              borderRadius: '12px',
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'white', marginBottom: '2px' }}>{m.t}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>{m.d}</div>
            </div>
          ))}
        </div>
        <button style={{
          width: '100%',
          padding: '14px',
          background: 'transparent',
          border: '1.5px solid #ff5252',
          borderRadius: '999px',
          color: 'white',
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          boxShadow: '0 0 22px rgba(229,57,53,0.45)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          🥗 GENERA DIETA AI
        </button>
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '2px',
        padding: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '999px',
      }}>
        SOLO ADMIN 🔒
      </div>
    </div>
  );
};

export default AdminSchedeAI;
