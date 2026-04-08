import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Soci attivi', value: '342' },
    { label: 'Revenue', value: '€8.4k' },
    { label: 'Retention', value: '91%' },
    { label: 'Oggi', value: '28' },
  ];

  // Monthly revenue (Gen → Lug)
  const revenue = [3.2, 3.4, 4.1, 5.2, 6.8, 7.9, 8.4];
  const maxR = 10;
  const W = 320;
  const H = 150;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 22;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const pts = revenue.map((v, i) => {
    const x = padL + (i / (revenue.length - 1)) * plotW;
    const y = padT + (1 - v / maxR) * plotH;
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = path + ` L ${pts[pts.length - 1][0]} ${padT + plotH} L ${pts[0][0]} ${padT + plotH} Z`;

  const activities = [
    { name: 'Marco Rossi', plan: 'Annuale', date: '20/1/2023', status: 'ATTIVO', color: '#22c55e', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
    { name: 'Elena Bianchi', plan: 'Mensile', date: '19/1/2023', status: 'ATTIVO', color: '#22c55e', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
    { name: 'Marca Rossi', plan: 'Mensile', date: '18/1/2023', status: 'SCADUTO', color: '#ef4444', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  ];

  const quick = [
    { icon: '+', label: 'Nuovo Socio', path: '/admin' },
    { icon: '📋', label: 'Scheda AI', path: '/admin/schede-ai' },
    { icon: '📊', label: 'Report', path: '/admin' },
    { icon: '🗓', label: 'Corsi', path: '/admin/calendario' },
  ];

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      padding: '14px 22px 120px 22px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: 'white',
      overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(16px);} to {opacity:1; transform: translateY(0);} }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; box-shadow:0 0 10px rgba(229,57,53,0.7); }
      `}</style>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>⚙️</span>
          <span style={{ fontSize: '26px', fontWeight: 900, color: '#ff5252', letterSpacing: '-0.5px' }}>Admin Panel</span>
        </div>
        <span style={{
          background: 'linear-gradient(180deg, #ef4444, #e53935)',
          padding: '5px 12px',
          borderRadius: '999px',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '1px',
          boxShadow: '0 0 14px rgba(229,57,53,0.7)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>● LIVE</span>
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', marginBottom: '2px' }}>
        PANNELLO AMMINISTRATORE
      </div>
      <h1 style={{ fontSize: '30px', fontWeight: 800, margin: '0 0 18px 0', letterSpacing: '-0.5px' }}>Dashboard</h1>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '22px', animation: 'fadeInUp 0.5s ease-out' }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: 'rgba(229,57,53,0.08)',
            border: '1.5px solid rgba(229,57,53,0.5)',
            borderRadius: '14px',
            padding: '14px 4px',
            textAlign: 'center',
            boxShadow: '0 0 16px rgba(229,57,53,0.2)',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff5252', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Monthly revenue chart */}
      <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px 0' }}>Andamento Entrate Mensili</h3>
      <div style={{
        background: 'rgba(229,57,53,0.06)',
        border: '1.5px solid rgba(229,57,53,0.5)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '18px',
        boxShadow: '0 0 20px rgba(229,57,53,0.2)',
        animation: 'fadeInUp 0.5s ease-out 0.05s both',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>Monthly Revenue Trend</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5252" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 5, 10].map((v) => {
            const y = padT + (1 - v / maxR) * plotH;
            return <text key={v} x={padL - 4} y={y + 3} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="end">€{v}k</text>;
          })}
          <path d={area} fill="url(#revArea)" />
          <path d={path} fill="none" stroke="#ff5252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {['Gen','Feb','Mar','Apr','Mag','Giu','Lug'].map((m, i) => (
            <text key={m} x={padL + (i / 6) * plotW} y={H - 6} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle">{m}</text>
          ))}
        </svg>
      </div>

      {/* Alert */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.12)',
        border: '1.5px solid rgba(245, 158, 11, 0.55)',
        borderRadius: '14px',
        padding: '14px 16px',
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'fadeInUp 0.5s ease-out 0.1s both',
      }}>
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px' }}>ATTENZIONE!</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24', marginTop: '2px' }}>
            3 abbonamenti in scadenza domani
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div style={{
        background: 'rgba(229,57,53,0.06)',
        border: '1.5px solid rgba(229,57,53,0.5)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: '0 0 20px rgba(229,57,53,0.18)',
        animation: 'fadeInUp 0.5s ease-out 0.15s both',
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 12px 0' }}>Attività Recenti Soci</h3>
        {activities.map((a, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 0',
            borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              backgroundImage: `url('${a.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center',
              border: '1.5px solid rgba(229,57,53,0.5)',
              flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 800 }}>{a.name}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{a.plan}</div>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginRight: '8px' }}>{a.date}</div>
            <div style={{
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '9px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              background: a.status === 'ATTIVO' ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)',
              color: a.color,
              border: `1px solid ${a.color}55`,
            }}>{a.status}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px 0' }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
        {quick.map((q) => (
          <button key={q.label} onClick={() => navigate(q.path)} style={{
            background: 'rgba(229,57,53,0.08)',
            border: '1.5px solid rgba(229,57,53,0.5)',
            borderRadius: '14px',
            padding: '16px 4px',
            cursor: 'pointer',
            color: 'white',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textAlign: 'center',
            boxShadow: '0 0 16px rgba(229,57,53,0.2)',
          }}>
            <div style={{ fontSize: '22px', color: '#ff5252' }}>{q.icon}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '4px' }}>{q.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
