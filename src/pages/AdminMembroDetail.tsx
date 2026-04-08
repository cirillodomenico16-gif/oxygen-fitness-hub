import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MEMBERS } from '../data/members';

const AdminMembroDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const member = MEMBERS.find((m) => m.id === id) || MEMBERS[0];
  const [tab, setTab] = useState<'scheda' | 'dieta'>('scheda');

  // Compute expiry date based on plan
  const planMonths: Record<string, number> = { 'Mensile': 1, 'Trimestrale': 3, 'Semestrale': 6, 'Annuale': 12 };
  const [dd, mm, yyyy] = member.joined.split('/').map(Number);
  const start = new Date(yyyy, mm - 1, dd);
  const expiry = new Date(start);
  expiry.setMonth(expiry.getMonth() + (planMonths[member.plan] || 1));
  const expiryStr = expiry.toLocaleDateString('it-IT');
  const daysLeft = Math.ceil((expiry.getTime() - new Date('2026-04-08').getTime()) / (1000 * 60 * 60 * 24));

  const loadPlan = (key: string) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  };
  const scheda = loadPlan(`oxy_scheda_${member.id}`);
  const dieta = loadPlan(`oxy_dieta_${member.id}`);

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh', backgroundColor: '#000',
      padding: '18px 22px 120px', color: '#fff',
      fontFamily: "'Plus Jakarta Sans', sans-serif", overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(12px);} to {opacity:1; transform: translateY(0);} }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
      `}</style>

      <button onClick={() => navigate('/admin/membri')} style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>← Indietro</button>

      {/* Member header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        background: 'rgba(229,57,53,0.06)',
        border: '1.5px solid rgba(229,57,53,0.45)',
        borderRadius: '18px', padding: '16px', marginBottom: '18px',
        boxShadow: '0 0 20px rgba(229,57,53,0.2)',
      }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          backgroundImage: `url('${member.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center',
          border: '2.5px solid #ef4444', boxShadow: '0 0 16px rgba(229,57,53,0.6)',
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>{member.name}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '3px' }}>{member.age} anni · {member.plan}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>✉ {member.email}</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>📞 {member.phone}</div>
        </div>
      </div>

      {/* Subscription info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
        <div style={{
          background: 'rgba(34,197,94,0.06)',
          border: '1.5px solid rgba(34,197,94,0.4)',
          borderRadius: '14px', padding: '12px 14px',
        }}>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700 }}>ISCRITTO DAL</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#4ade80', marginTop: '4px' }}>📅 {member.joined}</div>
        </div>
        <div style={{
          background: daysLeft < 15 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.06)',
          border: `1.5px solid ${daysLeft < 15 ? 'rgba(245,158,11,0.5)' : 'rgba(239,68,68,0.4)'}`,
          borderRadius: '14px', padding: '12px 14px',
        }}>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700 }}>SCADENZA</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: daysLeft < 15 ? '#fbbf24' : '#ff5252', marginTop: '4px' }}>⏳ {expiryStr}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
            {daysLeft > 0 ? `tra ${daysLeft} giorni` : `scaduto da ${-daysLeft} giorni`}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {(['scheda', 'dieta'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '12px',
            background: tab === t ? 'linear-gradient(135deg,#ef4444,#b71c1c)' : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${tab === t ? '#ff5252' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: '12px', color: '#fff', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
            letterSpacing: '0.5px', fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: tab === t ? '0 4px 14px rgba(229,57,53,0.5)' : 'none',
          }}>{t === 'scheda' ? '🏋️ SCHEDA' : '🥗 DIETA'}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: 'rgba(229,57,53,0.05)',
        border: '1.5px solid rgba(229,57,53,0.4)',
        borderRadius: '16px', padding: '16px', marginBottom: '16px', minHeight: '160px',
      }}>
        {tab === 'scheda' ? (
          <>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px', color: '#ff5252' }}>📋 Dettaglio Scheda</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
              {scheda ? `Generata il ${scheda.date} dal Coach AI` : 'Scheda base attiva · non ancora personalizzata'}
            </div>
            {scheda ? (
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', margin: 0 }}>{scheda.plan}</pre>
            ) : (
              <div style={{ fontSize: '12px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ marginBottom: '10px' }}><b style={{ color: '#ff5252' }}>Obiettivo:</b> Ipertrofia generale</div>
                <div style={{ marginBottom: '10px' }}><b style={{ color: '#ff5252' }}>Frequenza:</b> 4 giorni / settimana</div>
                <div style={{ marginBottom: '10px' }}><b style={{ color: '#ff5252' }}>Durata:</b> 60-75 min a seduta</div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '6px' }}>
                  <b style={{ color: '#ff5252', fontSize: '11px' }}>LUN — Petto/Tricipiti</b><br />
                  Panca piana · Panca inclinata · Croci · Pushdown<br /><br />
                  <b style={{ color: '#ff5252', fontSize: '11px' }}>MAR — Schiena/Bicipiti</b><br />
                  Trazioni · Rematore · Lat machine · Curl<br /><br />
                  <b style={{ color: '#ff5252', fontSize: '11px' }}>GIO — Gambe</b><br />
                  Squat · Leg press · Affondi · Leg curl<br /><br />
                  <b style={{ color: '#ff5252', fontSize: '11px' }}>VEN — Spalle/Core</b><br />
                  Military · Alzate · Plank · Crunch
                </div>
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(239,68,68,0.08)', borderRadius: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                  💡 Genera una scheda personalizzata con il Coach AI per risultati ottimali.
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px', color: '#4ade80' }}>🥗 Dettaglio Dieta</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
              {dieta ? `Generata il ${dieta.date} dal Nutrizionista AI` : 'Piano alimentare base · non ancora personalizzato'}
            </div>
            {dieta ? (
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', margin: 0 }}>{dieta.plan}</pre>
            ) : (
              <div style={{ textAlign: 'center', padding: '28px 0', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                Nessuna dieta generata.<br />
                <span style={{ fontSize: '11px', opacity: 0.7 }}>Clicca "GENERA DIETA" per crearne una personalizzata.</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button onClick={() => navigate(`/admin/membro/${member.id}/agent-scheda`)} style={{
          padding: '16px 8px',
          background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
          border: '1px solid #ff5252', borderRadius: '14px',
          color: '#fff', fontSize: '12px', fontWeight: 800,
          cursor: 'pointer', boxShadow: '0 6px 18px rgba(229,57,53,0.5)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>🤖 GENERA SCHEDA</button>
        <button onClick={() => navigate(`/admin/membro/${member.id}/agent-dieta`)} style={{
          padding: '16px 8px',
          background: 'linear-gradient(135deg,#22c55e,#15803d)',
          border: '1px solid #4ade80', borderRadius: '14px',
          color: '#fff', fontSize: '12px', fontWeight: 800,
          cursor: 'pointer', boxShadow: '0 6px 18px rgba(34,197,94,0.5)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>🥗 GENERA DIETA</button>
      </div>
    </div>
  );
};

export default AdminMembroDetail;
