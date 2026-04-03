import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0e1a',
        padding: '24px 16px 100px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#ffffff',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#ffffff',
          }}
        >
          Profilo
        </h1>
      </div>

      {/* Profile Card */}
      <div
        style={{
          backgroundColor: '#1a1f2e',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        {/* Avatar Circle */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e53935',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          MR
        </div>

        {/* Name */}
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            color: '#ffffff',
          }}
        >
          Marco Rossi
        </h2>

        {/* Email */}
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '0 0 16px 0',
          }}
        >
          marco.rossi@example.com
        </p>

        {/* Membership Info */}
        <div
          style={{
            backgroundColor: 'rgba(229, 57, 53, 0.1)',
            borderLeft: '3px solid #e53935',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: '0 0 4px 0',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}
          >
            Iscrizione
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#ffffff',
              margin: 0,
              fontWeight: '600',
            }}
          >
            Premium - Scade il 15 Agosto 2024
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '12px',
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '0 0 4px 0',
              }}
            >
              Allenamenti
            </p>
            <p
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#e53935',
                margin: 0,
              }}
            >
              42
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '12px',
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '0 0 4px 0',
              }}
            >
              Streak
            </p>
            <p
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#e53935',
                margin: 0,
              }}
            >
              8 gg
            </p>
          </div>
        </div>
      </div>

      {/* Settings Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { label: 'Modifica Profilo' },
          { label: 'Impostazioni Privacy' },
          { label: 'Password' },
          { label: 'Notifiche' },
          { label: 'Chi Siamo' },
          { label: 'Logout' },
        ].map((item, idx) => (
          <button
            key={idx}
            style={{
              backgroundColor: '#1a1f2e',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(229, 57, 53, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1f2e';
            }}
          >
            <span>{item.label}</span>
            <span
              style={{
                marginLeft: 'auto',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '16px',
              }}
            >
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
