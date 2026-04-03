import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Home', icon: 'house' },
    { path: '/corsi', label: 'Corsi', icon: 'calendar' },
    { path: '/allenamento', label: 'Allenamento', icon: 'dumbbell' },
    { path: '/progressi', label: 'Stats', icon: 'chart' },
    { path: '/profilo', label: 'Profilo', icon: 'user' },
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
      case 'house':
        return (
          <svg {...iconProps}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
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
      case 'dumbbell':
        return (
          <svg {...iconProps}>
            <path d="M6 4h1v16H6zM17 4h1v16h-1zM8 6v12M16 6v12M9 4v16M15 4v16"></path>
          </svg>
        );
      case 'chart':
        return (
          <svg {...iconProps}>
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      case 'user':
        return (
          <svg {...iconProps}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
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

export default UserBottomNav;
