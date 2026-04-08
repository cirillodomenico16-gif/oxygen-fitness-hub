import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/admin', label: 'Home', icon: 'home' },
    { path: '/admin/schede-ai', label: 'Membri', icon: 'users' },
    { path: '/admin/calendario', label: 'Calendario', icon: 'calendar' },
    { path: '/admin/analisi', label: 'Analisi', icon: 'chart' },
    { path: '/admin/settings', label: 'Impostazioni', icon: 'gear' },
  ];

  const Icon = ({ name, color }: { name: string; color: string }) => {
    const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
    switch (name) {
      case 'home': return (<svg {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>);
      case 'users': return (<svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 19c0-2.5-2-4.5-4.5-4.5"/></svg>);
      case 'calendar': return (<svg {...p}><rect x="3" y="4.5" width="18" height="17" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/></svg>);
      case 'chart': return (<svg {...p}><line x1="4" y1="20" x2="4" y2="12"/><line x1="10" y1="20" x2="10" y2="6"/><line x1="16" y1="20" x2="16" y2="14"/><line x1="21" y1="20" x2="3" y2="20"/></svg>);
      case 'gear': return (<svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>);
      default: return null;
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        height: '74px',
        background: '#000',
        borderTop: '1px solid rgba(229, 57, 53, 0.25)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 40,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        paddingBottom: '6px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const color = isActive ? '#ef4444' : 'rgba(255,255,255,0.55)';
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '8px 4px 4px',
              color,
              fontSize: '10.5px',
              fontWeight: isActive ? 700 : 500,
              position: 'relative',
            }}
          >
            <Icon name={tab.icon} color={color} />
            <span>{tab.label}</span>
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: 0,
                width: '34px',
                height: '3px',
                borderRadius: '3px',
                background: '#ef4444',
                boxShadow: '0 0 10px #ef4444',
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default AdminBottomNav;
