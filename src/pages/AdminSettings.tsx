import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../components/ui/animated-shiny-text';
import { useAuth } from '../contexts/AuthContext';

const AdminSettings: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const [toggles, setToggles] = useState({ backup: true, email: true, maint: false });
  const section = (title: string, children: React.ReactNode, delay: number) => (
    <div style={{ marginBottom: '18px', animation: `fadeInUp 0.5s ease-out ${delay}s both` }}>
      <h2 style={{
        fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.55)',
        textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px 4px',
      }}>{title}</h2>
      <div style={{
        background: 'rgba(229,57,53,0.06)',
        border: '1.5px solid rgba(229,57,53,0.45)',
        borderRadius: '16px',
        padding: '6px',
        boxShadow: '0 0 18px rgba(229,57,53,0.18)',
      }}>
        {children}
      </div>
    </div>
  );

  const row = (label: string, right: React.ReactNode, last?: boolean) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '13px 14px',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{label}</span>
      {right}
    </div>
  );

  const toggle = (on: boolean, onClick: () => void) => (
    <button onClick={onClick} style={{
      width: '42px', height: '24px', borderRadius: '999px',
      background: on ? 'linear-gradient(135deg,#ef4444,#b71c1c)' : 'rgba(255,255,255,0.15)',
      border: on ? '1px solid #ff5252' : '1px solid rgba(255,255,255,0.2)',
      position: 'relative', cursor: 'pointer', padding: 0,
      boxShadow: on ? '0 0 12px rgba(229,57,53,0.6)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      <span style={{
        position: 'absolute', top: '2px', left: on ? '20px' : '2px',
        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
        transition: 'left 0.25s ease',
      }} />
    </button>
  );

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
      <AnimatedText text="Impostazioni" gradientColors="linear-gradient(90deg, #8b0000, #ff5252, #ffffff, #ff5252, #8b0000)" gradientAnimationDuration={2.4} style={{ margin: '2px 0 4px' }} textStyle={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }} />
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: '0 0 22px' }}>
        Gestisci le impostazioni amministrative
      </p>

      {section('Generali', (
        <>
          {row('Nome Palestra', <span style={{ fontSize: '13px', fontWeight: 800, color: '#ff5252' }}>Oxygen Fitness Hub</span>)}
          {row('Email Supporto', <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>support@oxygen.it</span>)}
          {row('Telefono', <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>+39 02 1234 5678</span>, true)}
        </>
      ), 0)}

      {section('Iscrizioni', (
        <>
          {row('Membri Totali', <span style={{ fontSize: '15px', fontWeight: 800, color: '#ff5252' }}>234</span>)}
          {row('Iscritti Attivi', <span style={{ fontSize: '15px', fontWeight: 800, color: '#4ade80' }}>189</span>)}
          {row('In Scadenza', <span style={{ fontSize: '15px', fontWeight: 800, color: '#fbbf24' }}>12</span>, true)}
        </>
      ), 0.05)}

      {section('Sistema', (
        <>
          {row('Backup Automatico', toggle(toggles.backup, () => setToggles({ ...toggles, backup: !toggles.backup })))}
          {row('Email Notifiche', toggle(toggles.email, () => setToggles({ ...toggles, email: !toggles.email })))}
          {row('Modalità Manutenzione', toggle(toggles.maint, () => setToggles({ ...toggles, maint: !toggles.maint })), true)}
        </>
      ), 0.1)}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '22px', animation: 'fadeInUp 0.5s ease-out 0.15s both' }}>
        <button style={{
          padding: '14px',
          background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
          border: '1px solid #ff5252', borderRadius: '14px',
          color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px',
          cursor: 'pointer', boxShadow: '0 6px 20px rgba(229,57,53,0.5)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}> SALVA IMPOSTAZIONI</button>
        <button style={{
          padding: '14px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px',
          color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 700,
          cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>Ripristina Predefiniti</button>
        <button onClick={handleLogout} style={{
          padding: '14px',
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.5)', borderRadius: '14px',
          color: '#ff5252', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px',
          cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}> LOGOUT</button>
      </div>
    </div>
  );
};

export default AdminSettings;
