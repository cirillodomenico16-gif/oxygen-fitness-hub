import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, BarChart3, Settings } from 'lucide-react';
import { MenuBar, GlowMenuItem } from './ui/glow-menu';

const RED_GRADIENT =
  'radial-gradient(circle, rgba(239,68,68,0.35) 0%, rgba(220,38,38,0.15) 50%, rgba(185,28,28,0) 100%)';

const TABS: (GlowMenuItem & { path: string })[] = [
  { path: '/admin', label: 'Home', href: '#', icon: Home, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/admin/membri', label: 'Membri', href: '#', icon: Users, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/admin/calendario', label: 'Calendario', href: '#', icon: Calendar, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/admin/analisi', label: 'Analisi', href: '#', icon: BarChart3, gradient: RED_GRADIENT, iconColor: '#ff5252' },
  { path: '/admin/settings', label: 'Impostazioni', href: '#', icon: Settings, gradient: RED_GRADIENT, iconColor: '#ff5252' },
];

const AdminBottomNav: React.FC = () => {
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

export default AdminBottomNav;
