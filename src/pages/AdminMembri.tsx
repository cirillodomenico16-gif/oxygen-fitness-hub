import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEMBERS } from '../data/members';
import { AnimatedText } from '../components/ui/animated-shiny-text';

const AdminMembri: React.FC = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const list = MEMBERS.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh', backgroundColor: '#000',
      padding: '18px 22px 120px', color: '#fff',
      fontFamily: "'Plus Jakarta Sans', sans-serif", overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform: translateY(0);} }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
      `}</style>

      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>PANNELLO AMMINISTRATORE</div>
      <AnimatedText text="Membri" gradientColors="linear-gradient(90deg, #8b0000, #ff5252, #ffffff, #ff5252, #8b0000)" gradientAnimationDuration={2.4} style={{ margin: '2px 0 16px' }} textStyle={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }} />

      <input
        placeholder=" Cerca socio..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{
          width: '100%', padding: '13px 16px', marginBottom: '18px',
          background: 'rgba(255,255,255,0.04)',
          border: '1.5px solid rgba(229,57,53,0.35)', borderRadius: '14px',
          color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      />

      {list.map((m, i) => (
        <div key={m.id} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: 'rgba(229,57,53,0.06)',
          border: '1.5px solid rgba(229,57,53,0.45)',
          borderRadius: '16px', padding: '12px', marginBottom: '12px',
          boxShadow: '0 0 18px rgba(229,57,53,0.15)',
          animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both`,
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            backgroundImage: `url('${m.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center',
            border: '2px solid #ef4444', flexShrink: 0,
            boxShadow: '0 0 12px rgba(229,57,53,0.5)',
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 800 }}>{m.name}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
              {m.age} anni · {m.plan}
            </div>
            <div style={{
              display: 'inline-block', marginTop: '5px',
              padding: '2px 8px', borderRadius: '999px', fontSize: '9px', fontWeight: 800,
              background: m.status === 'ATTIVO' ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)',
              color: m.status === 'ATTIVO' ? '#22c55e' : '#ef4444',
              border: `1px solid ${m.status === 'ATTIVO' ? '#22c55e55' : '#ef444455'}`,
            }}>{m.status}</div>
          </div>
          <button
            onClick={() => navigate(`/admin/membro/${m.id}`)}
            style={{
              background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
              border: '1px solid #ff5252', borderRadius: '12px',
              padding: '10px 14px', color: '#fff', fontSize: '11px', fontWeight: 800,
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(229,57,53,0.5)',
              fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.4px',
              flexShrink: 0,
            }}>DETTAGLIO →</button>
        </div>
      ))}
    </div>
  );
};

export default AdminMembri;
