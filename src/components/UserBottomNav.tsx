import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Activity, BookOpen, Circle, User } from 'lucide-react';
import { MenuBar, GlowMenuItem } from './ui/glow-menu';

const RED_GRADIENT =
  'radial-gradient(circle, rgba(239,68,68,0.35) 0%, rgba(220,38,38,0.15) 50%, rgba(185,28,28,0) 100%)';

const TABS: (GlowMenuItem & { path: string })[] = [
  { path: '/', label: 'Home', href: '#', icon: Home, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/scheda', label: 'Allenati', href: '#', icon: Activity, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/corsi', label: 'Corsi', href: '#', icon: BookOpen, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/community', label: 'OXYGEN', href: '#', icon: Circle, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/profilo', label: 'Profilo', href: '#', icon: User, gradient: RED_GRADIENT, iconColor: '#ff5252' },
];

const UserBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = TABS.find((t) => t.path === location.pathname)?.label || '';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 20px)',
        maxWidth: 430,
        zIndex: 40,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <MenuBar
        items={TABS}
        activeItem={active}
        onItemClick={(label) => {
          const tab = TABS.find((t) => t.label === label);
          if (tab) navigate(tab.path);
        }}
      />
    </div>
  );
};

export default UserBottomNav;
