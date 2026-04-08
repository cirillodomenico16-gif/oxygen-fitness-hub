import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Home', icon: 'house' },
    { path: '/allenamento', label: 'Allenati', icon: 'runner' },
    { path: '/corsi', label: 'Corsi', icon: 'book' },
    { path: '/dieta', label: 'OXYGEN', icon: 'oxygen' },
    { path: '/profilo', label: 'Profilo', icon: 'person' },
  ];

  const renderIcon = (iconName: string, active: boolean) => {
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
      case 'runner':
        return (
          <svg {...iconProps}>
            <circle cx="13" cy="4" r="2"></circle>
            <path d="M4 22l3-8 4-3-2-5 4 2 3 4 4 1"></path>
            <path d="M11 13l-2 4 3 3"></path>
          </svg>
        );
      case 'book':
        return (
          <svg {...iconProps} fill={active ? 'currentColor' : 'none'}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        );
      case 'oxygen':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 3a9 9 0 0 1 0 18"></path>
          </svg>
        );
      case 'person':
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
        height: '78px',
        backgroundColor: 'rgba(20, 8, 10, 0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(229, 57, 53, 0.15)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 40,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        paddingBottom: '8px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const color = isActive ? '#ff5252' : 'rgba(255, 255, 255, 0.45)';

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
              padding: '8px 10px',
              color: color,
              transition: 'color 0.3s ease',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            <div style={{ color: color }}>
              {renderIcon(tab.icon, isActive)}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default UserBottomNav;
