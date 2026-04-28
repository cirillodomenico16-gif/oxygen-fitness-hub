import React from 'react';

const PageLoader: React.FC = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Caricamento pagina"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'rgba(255,255,255,0.6)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 13,
      gap: 12,
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: '2px solid rgba(229,57,53,0.25)',
        borderTopColor: '#ef4444',
        animation: 'oxy-spin 0.7s linear infinite',
      }}
    />
    <style>{`@keyframes oxy-spin { to { transform: rotate(360deg); } }`}</style>
    Caricamento…
  </div>
);

export default PageLoader;
