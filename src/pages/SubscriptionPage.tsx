import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  badge?: string;
  features: string[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'mensile',
    name: 'Mensile',
    price: 39,
    period: '/mese',
    features: ['Accesso illimitato palestra', 'Corsi di gruppo', 'Spogliatoi e docce'],
  },
  {
    id: 'trimestrale',
    name: 'Trimestrale',
    price: 99,
    period: '/3 mesi',
    badge: '-15%',
    features: ['Tutto del Mensile', 'Consulenza iniziale', '1 sessione PT inclusa'],
  },
  {
    id: 'semestrale',
    name: 'Semestrale',
    price: 179,
    period: '/6 mesi',
    badge: '-23%',
    highlight: true,
    features: ['Tutto del Trimestrale', '3 sessioni PT incluse', 'Check-up composizione corporea'],
  },
  {
    id: 'annuale',
    name: 'Annuale',
    price: 299,
    period: '/anno',
    badge: 'BEST VALUE',
    features: ['Tutto del Semestrale', '6 sessioni PT incluse', 'Scheda personalizzata gratis', 'Accesso area VIP'],
  },
];

const EXTRA_PLAN: Plan = {
  id: 'scheda',
  name: 'Scheda di Allenamento',
  price: 49,
  period: 'una tantum',
  features: ['Scheda 100% personalizzata', 'Generata dal Coach AI', 'Adattata ai tuoi obiettivi', 'Aggiornamenti mensili'],
};

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('semestrale');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const allPlans = [...PLANS, EXTRA_PLAN];
  const currentPlan = allPlans.find((p) => p.id === selected) || PLANS[2];

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => setDone(false), 2200);
    }, 1600);
  };

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh', backgroundColor: '#000',
      padding: '14px 22px 140px', color: '#fff',
      fontFamily: "'Plus Jakarta Sans', sans-serif", overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(12px);} to {opacity:1; transform: translateY(0);} }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
        .plan-card { transition: all 0.25s ease; }
        .plan-card:hover { transform: translateY(-2px); }
      `}</style>

      <button onClick={() => navigate('/profilo')} style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>← Indietro</button>

      {/* Header */}
      <div style={{ marginBottom: '22px', animation: 'fadeInUp 0.4s ease-out' }}>
        <div style={{ fontSize: '10px', color: '#ff5252', letterSpacing: '2px', fontWeight: 800 }}>
          ABBONAMENTI
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0 6px 0', letterSpacing: '-0.5px' }}>
          Scegli il tuo piano
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Pagamento sicuro tramite Stripe.
        </p>
      </div>

      {/* Plans grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
        {PLANS.map((p, i) => {
          const isSel = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="plan-card"
              style={{
                position: 'relative',
                width: '100%',
                background: isSel
                  ? 'linear-gradient(135deg, rgba(239,68,68,0.18), rgba(183,28,28,0.08))'
                  : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${isSel ? '#ff5252' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '16px',
                padding: '16px 18px',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#fff',
                fontFamily: 'inherit',
                boxShadow: isSel ? '0 0 24px rgba(229,57,53,0.35)' : 'none',
                animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both`,
              }}
            >
              {p.badge && (
                <div style={{
                  position: 'absolute', top: '-9px', right: '14px',
                  background: p.highlight ? 'linear-gradient(90deg,#fbbf24,#f59e0b)' : 'linear-gradient(90deg,#ef4444,#b71c1c)',
                  color: '#fff', fontSize: '9px', fontWeight: 800, letterSpacing: '1px',
                  padding: '4px 10px', borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                }}>{p.badge}</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#ff5252', fontWeight: 700, letterSpacing: '1px' }}>
                    {p.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 800, marginTop: '2px' }}>
                    €{p.price}
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginLeft: '4px' }}>
                      {p.period}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  border: `2px solid ${isSel ? '#ff5252' : 'rgba(255,255,255,0.25)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isSel ? '#ff5252' : 'transparent',
                }}>
                  {isSel && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>✓</span>}
                </div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {p.features.map((f) => (
                  <li key={f} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: '#ff5252', fontWeight: 800 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Extra: scheda allenamento */}
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#ff5252', fontWeight: 800, marginBottom: '10px' }}>
        ACQUISTA SEPARATAMENTE
      </div>
      <button
        onClick={() => setSelected(EXTRA_PLAN.id)}
        className="plan-card"
        style={{
          position: 'relative',
          width: '100%',
          background: selected === EXTRA_PLAN.id
            ? 'linear-gradient(135deg, rgba(239,68,68,0.18), rgba(183,28,28,0.08))'
            : 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${selected === EXTRA_PLAN.id ? '#ff5252' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '16px',
          padding: '16px 18px',
          textAlign: 'left',
          cursor: 'pointer',
          color: '#fff',
          fontFamily: 'inherit',
          marginBottom: '24px',
          boxShadow: selected === EXTRA_PLAN.id ? '0 0 24px rgba(229,57,53,0.35)' : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#ff5252', fontWeight: 700, letterSpacing: '1px' }}>
              SCHEDA DI ALLENAMENTO
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, marginTop: '2px' }}>
              €{EXTRA_PLAN.price}
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginLeft: '4px' }}>
                {EXTRA_PLAN.period}
              </span>
            </div>
          </div>
          <div style={{
            width: '22px', height: '22px', borderRadius: '50%',
            border: `2px solid ${selected === EXTRA_PLAN.id ? '#ff5252' : 'rgba(255,255,255,0.25)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: selected === EXTRA_PLAN.id ? '#ff5252' : 'transparent',
          }}>
            {selected === EXTRA_PLAN.id && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>✓</span>}
          </div>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {EXTRA_PLAN.features.map((f) => (
            <li key={f} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#ff5252', fontWeight: 800 }}>✓</span> {f}
            </li>
          ))}
        </ul>
      </button>

      {/* Summary + Stripe checkout */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '16px 18px',
        marginBottom: '14px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Piano selezionato</span>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>{currentPlan.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Totale</span>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#ff5252' }}>€{currentPlan.price}</span>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>🔒 Pagamento sicuro tramite</span>
          {/* Stripe wordmark */}
          <svg viewBox="0 0 60 25" width="48" height="20" style={{ verticalAlign: 'middle' }}>
            <path fill="#635BFF" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.09.6-2.49.91-4.45.91-3.95 0-6.74-2.45-6.74-7.32 0-4.03 2.34-7.27 6.27-7.27s5.81 3.03 5.81 7.21c0 .43-.04 1.32-.08 1.55zm-5.86-5.43c-1.04 0-2.19.79-2.19 2.69h4.32c0-1.85-1.04-2.69-2.13-2.69zM40.95 20.3c-1.44 0-2.32-.6-2.91-1.04l-.02 4.63-4.04.85V5.57h3.56l.21 1.01c.57-.55 1.61-1.34 3.18-1.34 2.84 0 5.52 2.57 5.52 7.21 0 4.97-2.66 7.85-5.5 7.85zM40 8.95c-.93 0-1.51.34-1.93.81l.02 6.15c.39.43.95.78 1.91.78 1.51 0 2.52-1.65 2.52-3.89 0-2.18-1.03-3.85-2.52-3.85zM28.24 5.57h4.06v14.45h-4.06V5.57zm0-4.7L32.3 0v3.3l-4.06.86V.87zm-4.34 9.15v9.96h-4.05V5.57h3.5l.25 1.18c.95-1.74 2.85-1.36 3.39-1.18v3.74c-.51-.17-2.1-.41-3.09.91zm-8.59 5.49c0 2.39 2.56 1.65 3.08 1.44v3.29c-.54.3-1.52.54-2.84.54-2.4 0-4.21-1.77-4.21-4.17l.02-13.07 3.95-.84v3.36h3.08V9.1h-3.08v6.41zm-4.7.93c0 2.97-2.36 4.66-5.79 4.66-1.42 0-2.97-.27-4.5-.93v-3.86c1.38.75 3.13 1.31 4.5 1.31.93 0 1.59-.25 1.59-1.02 0-1.99-6.31-1.24-6.31-5.85 0-2.92 2.23-4.66 5.58-4.66 1.36 0 2.72.21 4.09.75v3.81c-1.25-.67-2.83-1.05-4.09-1.05-.87 0-1.42.25-1.42.93 0 1.86 6.35 1.04 6.35 5.91z"/>
          </svg>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || done}
        style={{
          width: '100%', padding: '16px',
          background: done
            ? 'linear-gradient(135deg,#22c55e,#15803d)'
            : 'linear-gradient(135deg,#635BFF,#4f46e5)',
          border: 'none', borderRadius: '14px',
          color: '#fff', fontSize: '14px', fontWeight: 800,
          letterSpacing: '0.5px', cursor: loading ? 'wait' : 'pointer',
          boxShadow: done
            ? '0 6px 18px rgba(34,197,94,0.5)'
            : '0 6px 22px rgba(99,91,255,0.5)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}
      >
        {done ? (
          <>✓ PAGAMENTO COMPLETATO</>
        ) : loading ? (
          <>⏳ REINDIRIZZAMENTO A STRIPE...</>
        ) : (
          <>
            <svg viewBox="0 0 60 25" width="42" height="18">
              <path fill="#fff" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.09.6-2.49.91-4.45.91-3.95 0-6.74-2.45-6.74-7.32 0-4.03 2.34-7.27 6.27-7.27s5.81 3.03 5.81 7.21c0 .43-.04 1.32-.08 1.55zm-5.86-5.43c-1.04 0-2.19.79-2.19 2.69h4.32c0-1.85-1.04-2.69-2.13-2.69zM40.95 20.3c-1.44 0-2.32-.6-2.91-1.04l-.02 4.63-4.04.85V5.57h3.56l.21 1.01c.57-.55 1.61-1.34 3.18-1.34 2.84 0 5.52 2.57 5.52 7.21 0 4.97-2.66 7.85-5.5 7.85zM40 8.95c-.93 0-1.51.34-1.93.81l.02 6.15c.39.43.95.78 1.91.78 1.51 0 2.52-1.65 2.52-3.89 0-2.18-1.03-3.85-2.52-3.85zM28.24 5.57h4.06v14.45h-4.06V5.57zm0-4.7L32.3 0v3.3l-4.06.86V.87zm-4.34 9.15v9.96h-4.05V5.57h3.5l.25 1.18c.95-1.74 2.85-1.36 3.39-1.18v3.74c-.51-.17-2.1-.41-3.09.91zm-8.59 5.49c0 2.39 2.56 1.65 3.08 1.44v3.29c-.54.3-1.52.54-2.84.54-2.4 0-4.21-1.77-4.21-4.17l.02-13.07 3.95-.84v3.36h3.08V9.1h-3.08v6.41zm-4.7.93c0 2.97-2.36 4.66-5.79 4.66-1.42 0-2.97-.27-4.5-.93v-3.86c1.38.75 3.13 1.31 4.5 1.31.93 0 1.59-.25 1.59-1.02 0-1.99-6.31-1.24-6.31-5.85 0-2.92 2.23-4.66 5.58-4.66 1.36 0 2.72.21 4.09.75v3.81c-1.25-.67-2.83-1.05-4.09-1.05-.87 0-1.42.25-1.42.93 0 1.86 6.35 1.04 6.35 5.91z"/>
            </svg>
            PAGA CON STRIPE — €{currentPlan.price}
          </>
        )}
      </button>

      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '12px' }}>
        Cancellazione gratuita in qualsiasi momento. Pagamento crittografato end-to-end.
      </p>
    </div>
  );
};

export default SubscriptionPage;
