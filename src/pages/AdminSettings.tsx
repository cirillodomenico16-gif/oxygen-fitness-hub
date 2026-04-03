import React from 'react';

const AdminSettings: React.FC = () => {
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
            margin: '0 0 8px 0',
            color: '#ffffff',
          }}
        >
          Impostazioni
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
          }}
        >
          Gestisci le impostazioni amministrative
        </p>
      </div>

      {/* Settings Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* General Settings */}
        <div>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: '0 0 12px 0',
            }}
          >
            Generali
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Nome Palestra', value: 'Oxygen Fitness Hub' },
              { label: 'Email Supporto', value: 'support@oxygen.it' },
              { label: 'Telefono', value: '+39 02 1234 5678' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#1a1f2e',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#ffffff',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Settings */}
        <div>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: '0 0 12px 0',
            }}
          >
            Iscrizioni
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Membri Totali', value: '234' },
              { label: 'Iscritti Attivi', value: '189' },
              { label: 'In Scadenza', value: '12' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#1a1f2e',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#e53935',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: '0 0 12px 0',
            }}
          >
            Sistema
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Backup Automatico', enabled: true },
              { label: 'Email Notifiche', enabled: true },
              { label: 'Modalità Manutenzione', enabled: false },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#1a1f2e',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {item.label}
                </span>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: item.enabled ? '#e53935' : 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          <button
            style={{
              backgroundColor: '#e53935',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Salva Impostazioni
          </button>
          <button
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            Ripristina Predefiniti
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
