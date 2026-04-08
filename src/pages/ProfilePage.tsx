import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const avatarUrl =
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop';

  const container: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#000000',
    padding: '8px 24px 120px 24px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: 'white',
    overflowY: 'auto',
  };

  const title: React.CSSProperties = {
    fontSize: '38px',
    fontWeight: 800,
    margin: '18px 0 24px 0',
    letterSpacing: '-0.5px',
    animation: 'fadeInUp 0.5s ease-out',
  };

  const card: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'rgba(229, 57, 53, 0.06)',
    border: '1.5px solid rgba(229, 57, 53, 0.55)',
    borderRadius: '20px',
    padding: '28px 20px 22px 20px',
    marginBottom: '24px',
    textAlign: 'center',
    boxShadow:
      '0 0 30px rgba(229, 57, 53, 0.25), inset 0 0 20px rgba(229, 57, 53, 0.08)',
    animation: 'fadeInUp 0.6s ease-out 0.1s both',
  };

  const rowButton: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(229, 57, 53, 0.07)',
    border: '1px solid rgba(229, 57, 53, 0.2)',
    borderRadius: '16px',
    padding: '18px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'all 0.2s ease',
    textAlign: 'left',
  };

  return (
    <div style={container}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .profile-row:hover {
          background-color: rgba(229, 57, 53, 0.14) !important;
          border-color: rgba(229, 57, 53, 0.45) !important;
          transform: translateX(2px);
        }
        .logout-row:hover {
          background-color: rgba(229, 57, 53, 0.22) !important;
        }
      `}</style>

      <div style={{
        width: 140, height: 32, marginBottom: 14,
        backgroundColor: '#ef4444',
        WebkitMaskImage: "url('/oxygen-logo.png')",
        maskImage: "url('/oxygen-logo.png')",
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'left center', maskPosition: 'left center',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        filter: 'drop-shadow(0 0 10px rgba(229,57,53,0.55))',
      }} />
      <h1 style={title}>Profilo</h1>

      {/* Profile Card */}
      <div style={card}>
        <div
          style={{
            width: '92px',
            height: '92px',
            borderRadius: '50%',
            margin: '0 auto 14px',
            backgroundImage: `url(${avatarUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '3px solid #e53935',
            boxShadow: '0 0 28px rgba(229,57,53,0.65)',
          }}
        />
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            margin: '0 0 6px 0',
            letterSpacing: '-0.3px',
          }}
        >
          Marco Rossi
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.55)',
            margin: '0 0 18px 0',
          }}
        >
          marco.rossi@example.com
        </p>

        {/* Membership badge */}
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(229,57,53,0.18), rgba(229,57,53,0.04))',
            border: '1px solid rgba(229,57,53,0.4)',
            borderLeft: '4px solid #ff5252',
            padding: '12px 14px',
            borderRadius: '12px',
            textAlign: 'left',
            marginBottom: '18px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              color: '#ff8a80',
              margin: '0 0 4px 0',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            Iscrizione
          </p>
          <p style={{ fontSize: '14px', margin: 0, fontWeight: 700 }}>
            Premium · Scade il 15 Agosto 2024
          </p>
        </div>

      </div>

      {/* Shortcuts grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '22px',
          animation: 'fadeInUp 0.6s ease-out 0.15s both',
        }}
      >
        {[
          { label: 'Scheda', sub: 'Storico', icon: '', path: '/scheda' },
          { label: 'Dieta', sub: 'Storico', icon: '', path: '/dieta' },
          { label: 'Progressi', sub: 'Grafici', icon: '', path: '/progressi' },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => navigate(s.path)}
            className="profile-row"
            style={{
              backgroundColor: 'rgba(229, 57, 53, 0.08)',
              border: '1.5px solid rgba(229, 57, 53, 0.45)',
              borderRadius: '16px',
              padding: '16px 8px',
              cursor: 'pointer',
              color: 'white',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 0 18px rgba(229,57,53,0.18)',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '24px' }}>{s.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>{s.label}</span>
            <span style={{ fontSize: '10px', color: '#ff8a80', fontWeight: 600 }}>
              {s.sub}
            </span>
          </button>
        ))}
      </div>

      {/* Settings list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'fadeInUp 0.6s ease-out 0.2s both',
        }}
      >
        {[
          { label: 'Modifica Profilo', icon: '' },
          { label: 'Impostazioni Privacy', icon: '' },
          { label: 'Password', icon: '' },
          { label: 'Notifiche', icon: '' },
          { label: 'Chi Siamo', icon: 'ℹ' },
        ].map((item, idx) => (
          <button key={idx} className="profile-row" style={rowButton}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
            <span
              style={{
                marginLeft: 'auto',
                color: '#ff5252',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              →
            </span>
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={() => (window as any).__oxygenLogout?.()}
          className="logout-row"
          style={{
            ...rowButton,
            marginTop: '8px',
            backgroundColor: 'rgba(229,57,53,0.14)',
            border: '1.5px solid rgba(229,57,53,0.55)',
            color: '#ff5252',
            fontWeight: 800,
            justifyContent: 'center',
            letterSpacing: '0.5px',
          }}
        >
          <span style={{ fontSize: '18px' }}>⎋</span>
          <span>LOGOUT</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
