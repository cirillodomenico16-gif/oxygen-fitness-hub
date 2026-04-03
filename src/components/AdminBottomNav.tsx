import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/admin', label: 'Gestione', icon: 'grid' },
    { path: '/admin/schede-ai', label: 'Schede AI', icon: 'users' },
    { path: '/admin/calendario', label: 'Calendario', icon: 'calendar' },
    { path: '/admin/settings', label: 'Impostazioni', icon: 'settings' },
  ];

  const renderIcon = (iconName: string) => {
    const iconProps = {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    };

    switch (iconName) {
      case 'grid':
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        );
      case 'users':
        return (
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'calendar':
        return (
          <svg {...iconProps}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case 'barchart':
        return (
          <svg {...iconProps}>
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      case 'settings':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
          </svg>
        );
      default:
        return null;
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
        height: '72px',
        backgroundColor: '#0a0e1a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 40,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const color = isActive ? '#e53935' : 'rgba(255, 255, 255, 0.4)';

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '8px 12px',
              color: color,
              transition: 'color 0.3s ease',
              fontSize: '11px',
              fontWeight: '500',
            }}
          >
            <div style={{ color: color, transition: 'color 0.3s ease' }}>
              {renderIcon(tab.icon)}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default AdminBottomNav;
