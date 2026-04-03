import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  WorkoutIcon,
  ProgressIcon,
  ScheduleIcon,
  CommunityIcon,
} from './PremiumIcons';
import './BottomNav.css';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/workout', label: 'Workout', icon: WorkoutIcon },
    { path: '/schedule', label: 'Schedule', icon: ScheduleIcon },
    { path: '/progress', label: 'Progress', icon: ProgressIcon },
    { path: '/community', label: 'Community', icon: CommunityIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav glass-effect-light">
      <div className="bottom-nav__container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              className={`bottom-nav__item ${active ? 'bottom-nav__item--active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <div className="bottom-nav__icon-wrapper">
                <Icon
                  size={24}
                  color={active ? '#ff3d3d' : '#b0b5c8'}
                  withGradient={active}
                  className={active ? 'glow-red-hover' : ''}
                />
              </div>
              <span className="bottom-nav__label">{item.label}</span>
              {active && <div className="bottom-nav__indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
