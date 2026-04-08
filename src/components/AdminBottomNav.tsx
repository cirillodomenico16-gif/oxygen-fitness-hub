import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/admin', label: 'Dashboard', icon: '⚙️' },
    { path: '/admin/schede-ai', label: 'Schede AI', icon: '🤖' },
    { path: '/admin/calendario', label: 'Calendario', icon: '📅' },
    { path: '/admin/settings', label: 'Impostazioni', icon: '⚡' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        padding: '10px 12px 18px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, #000 40%)',
        borderTop: '1px solid rgba(229, 57, 53, 0.35)',
        boxShadow: '0 -8px 24px rgba(229, 57, 53, 0.15)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '6px',
        zIndex: 40,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              background: isActive
                ? 'linear-gradient(135deg, #e53935 0%, #b71c1c 100%)'
                : 'transparent',
              border: isActive ? '1px solid #ff5252' : '1px solid transparent',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              cursor: 'pointer',
              padding: '8px 4px',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: '10px',
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '0.3px',
              boxShadow: isActive
                ? '0 6px 18px rgba(229, 57, 53, 0.55), inset 0 0 12px rgba(255,255,255,0.1)'
                : 'none',
              transition: 'all 0.25s ease',
            }}
          >
            <span style={{ fontSize: '20px', lineHeight: 1, filter: isActive ? 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' : 'none' }}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default AdminBottomNav;
