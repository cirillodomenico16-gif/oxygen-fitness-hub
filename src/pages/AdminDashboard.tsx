import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../components/ui/animated-shiny-text';

const EXPIRING = [
  { name: 'Luca Ferrari', plan: 'Mensile', date: '09/04/2026', email: 'luca.ferrari@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Sara Conti', plan: 'Trimestrale', date: '09/04/2026', email: 'sara.conti@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
  { name: 'Davide Greco', plan: 'Annuale', date: '09/04/2026', email: 'davide.greco@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showNewMember, setShowNewMember] = React.useState(false);
  const [form, setForm] = React.useState({ nome: '', cognome: '', email: '', telefono: '', piano: 'Mensile' });
  const [toast, setToast] = React.useState<string | null>(null);

  const sendRenewalEmails = () => {
    const bcc = EXPIRING.map(e => e.email).join(',');
    const subject = encodeURIComponent('Il tuo abbonamento Oxygen sta per scadere - Offerta di rinnovo');
    const body = encodeURIComponent(
      `Ciao,\n\nIl tuo abbonamento presso Oxygen Fitness Hub è in scadenza.\nTi proponiamo un'offerta esclusiva per il rinnovo del tuo piano.\n\nContattaci in palestra o rispondi a questa mail per attivare la promo.\n\nA presto,\nIl team Oxygen`
    );
    window.location.href = `mailto:?bcc=${bcc}&subject=${subject}&body=${body}`;
    setToast('Email di rinnovo inviate a ' + EXPIRING.length + ' soci');
    setTimeout(() => setToast(null), 3000);
  };

  const submitNewMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.cognome || !form.email) return;
    const subject = encodeURIComponent('Benvenuto in Oxygen Fitness Hub — Abbonamento attivato');
    const body = encodeURIComponent(
      `Ciao ${form.nome},\n\nIl tuo abbonamento ${form.piano} presso Oxygen Fitness Hub è stato ATTIVATO con successo.\n\nPuoi accedere in palestra da oggi. Ti aspettiamo!\n\nIl team Oxygen`
    );
    window.location.href = `mailto:${form.email}?subject=${subject}&body=${body}`;
    setShowNewMember(false);
    setForm({ nome: '', cognome: '', email: '', telefono: '', piano: 'Mensile' });
    setToast('Socio creato e mail di attivazione inviata');
    setTimeout(() => setToast(null), 3000);
  };

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
    { icon: '+', label: 'Nuovo Socio', path: '__new__' },
    { icon: 'C', label: 'Campagna', path: '/admin/campagna' },
    { icon: 'R', label: 'Report', path: '/admin/report' },
    { icon: 'K', label: 'Corsi', path: '/admin/calendario' },
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
          <div style={{
            width: 150, height: 34,
            backgroundColor: '#ff5252',
            WebkitMaskImage: "url('/oxygen-logo.png')",
            maskImage: "url('/oxygen-logo.png')",
            WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'left center', maskPosition: 'left center',
            WebkitMaskSize: 'contain', maskSize: 'contain',
            filter: 'drop-shadow(0 0 10px rgba(229,57,53,0.6))',
          }} />
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
        }}>LIVE</span>
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', marginBottom: '2px' }}>
        PANNELLO AMMINISTRATORE
      </div>
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #ff5252 0%, #e53935 50%, #8b0000 100%)',
        padding: '10px 22px',
        borderRadius: '14px',
        margin: '8px 0 18px 0',
        boxShadow: '0 0 28px rgba(229,57,53,0.55), 0 8px 20px rgba(229,57,53,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <AnimatedText
          text="Dashboard"
          gradientColors="linear-gradient(90deg, #ffffff, #ffe0e0, #ffffff, #ffcccc, #ffffff)"
          gradientAnimationDuration={2.4}
          textStyle={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}
        />
      </div>

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
        <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>Andamento Entrate Mensili</div>
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
        <span style={{ fontSize: '20px' }}></span>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px' }}>ATTENZIONE!</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24', marginTop: '2px' }}>
            3 abbonamenti in scadenza domani
          </div>
        </div>
      </div>

      {/* Expiring list */}
      <div style={{
        background: 'rgba(245,158,11,0.06)',
        border: '1.5px solid rgba(245,158,11,0.45)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '18px',
        animation: 'fadeInUp 0.5s ease-out 0.12s both',
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 12px 0', color: '#fbbf24' }}>⏳ Abbonamenti in scadenza</h3>
        {EXPIRING.map((e, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0',
            borderBottom: i < EXPIRING.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              backgroundImage: `url('${e.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center',
              border: '1.5px solid rgba(245,158,11,0.6)', flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 800 }}>{e.name}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{e.plan} · scade {e.date}</div>
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: '999px', fontSize: '9px', fontWeight: 800,
              background: 'rgba(245,158,11,0.18)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.5)',
            }}>IN SCADENZA</div>
          </div>
        ))}
        <button onClick={sendRenewalEmails} style={{
          marginTop: '14px', width: '100%', padding: '13px',
          background: 'linear-gradient(135deg, #ef4444, #b71c1c)',
          border: '1px solid #ff5252', borderRadius: '12px',
          color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px',
          cursor: 'pointer', boxShadow: '0 6px 18px rgba(229,57,53,0.5)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}> INVIA OFFERTA RINNOVO AI SOCI</button>
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
          <button key={q.label} onClick={() => q.path === '__new__' ? setShowNewMember(true) : navigate(q.path)} style={{
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

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg,#ef4444,#b71c1c)', color: '#fff',
          padding: '12px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: 800,
          boxShadow: '0 8px 24px rgba(229,57,53,0.6)', zIndex: 100,
          border: '1px solid #ff5252', maxWidth: '90%', textAlign: 'center',
        }}>{toast}</div>
      )}

      {/* New Member Modal */}
      {showNewMember && (
        <div onClick={() => setShowNewMember(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 200, backdropFilter: 'blur(4px)',
        }}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submitNewMember} style={{
            width: '100%', maxWidth: '430px',
            background: '#0a0a0a',
            border: '1.5px solid rgba(229,57,53,0.6)',
            borderRadius: '24px 24px 0 0',
            padding: '22px 22px 30px',
            boxShadow: '0 -10px 40px rgba(229,57,53,0.4)',
            animation: 'fadeInUp 0.3s ease-out',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: '#ff5252' }}>+ Nuovo Socio</h2>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', margin: '0 0 18px 0' }}>Compila i dati. Al salvataggio verrà inviata mail di attivazione.</p>

            {[
              { k: 'nome', ph: 'Nome', t: 'text' },
              { k: 'cognome', ph: 'Cognome', t: 'text' },
              { k: 'email', ph: 'Email', t: 'email' },
              { k: 'telefono', ph: 'Telefono', t: 'tel' },
            ].map((f) => (
              <input
                key={f.k}
                type={f.t}
                placeholder={f.ph}
                value={(form as any)[f.k]}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                required={f.k !== 'telefono'}
                style={{
                  width: '100%', padding: '13px 14px', marginBottom: '10px',
                  background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(229,57,53,0.35)',
                  borderRadius: '12px', color: '#fff', fontSize: '13px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', boxSizing: 'border-box',
                }}
              />
            ))}
            <select
              value={form.piano}
              onChange={(e) => setForm({ ...form, piano: e.target.value })}
              style={{
                width: '100%', padding: '13px 14px', marginBottom: '16px',
                background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(229,57,53,0.35)',
                borderRadius: '12px', color: '#fff', fontSize: '13px',
                fontFamily: "'Plus Jakarta Sans', sans-serif", outline: 'none', boxSizing: 'border-box',
              }}>
              <option style={{ background: '#0a0a0a' }}>Mensile</option>
              <option style={{ background: '#0a0a0a' }}>Trimestrale</option>
              <option style={{ background: '#0a0a0a' }}>Semestrale</option>
              <option style={{ background: '#0a0a0a' }}>Annuale</option>
            </select>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setShowNewMember(false)} style={{
                flex: 1, padding: '13px', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Annulla</button>
              <button type="submit" style={{
                flex: 2, padding: '13px',
                background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
                border: '1px solid #ff5252', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px',
                cursor: 'pointer', boxShadow: '0 6px 18px rgba(229,57,53,0.5)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}> CREA & INVIA MAIL</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
