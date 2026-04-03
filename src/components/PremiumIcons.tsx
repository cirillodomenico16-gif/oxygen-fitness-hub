import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  withGradient?: boolean;
}

/**
 * Premium Icon Library for Oxygen Fitness Hub
 * All icons are SVG-based with optional gradient effects
 * Stroke width: 1.5-2px for premium feel
 * Corner radius: 2px for refined appearance
 */

// Home Icon - Premium version with gradient
export const HomeIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3d3d" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </linearGradient>
      )}
    </defs>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={withGradient ? 'url(#homeGradient)' : 'none'} />
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

// Workout Icon - Premium dumbbell with gradient
export const WorkoutIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 1.5,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="workoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#00a8cc" />
        </linearGradient>
      )}
    </defs>
    <rect x="4" y="8" width="4" height="8" rx="1" fill={withGradient ? 'url(#workoutGradient)' : 'none'} stroke={color} />
    <rect x="16" y="8" width="4" height="8" rx="1" fill={withGradient ? 'url(#workoutGradient)' : 'none'} stroke={color} />
    <path d="M8 12h8" stroke={color} strokeWidth={strokeWidth} />
    <rect x="10" y="10" width="4" height="4" fill={color} rx="1" />
  </svg>
);

// Progress Icon - Trending up with gradient
export const ProgressIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="progressGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff3d3d" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      )}
    </defs>
    <polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      stroke={withGradient ? 'url(#progressGradient)' : color}
      fill="none"
      strokeWidth={strokeWidth}
    ></polyline>
    <polyline
      points="17 6 23 6 23 12"
      stroke={withGradient ? 'url(#progressGradient)' : color}
      fill="none"
      strokeWidth={strokeWidth}
    ></polyline>
  </svg>
);

// Schedule/Calendar Icon - Premium calendar with gradient
export const ScheduleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="scheduleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      )}
    </defs>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} fill={withGradient ? 'url(#scheduleGradient)' : 'none'} />
    <path d="M16 2v4M8 2v4" stroke={color} strokeWidth={strokeWidth} />
    <path d="M3 10h18" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="8" cy="15" r="1" fill={color} />
    <circle cx="16" cy="15" r="1" fill={color} />
    <circle cx="8" cy="19" r="1" fill={color} />
  </svg>
);

// Community/People Icon - Premium people icon with gradient
export const CommunityIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="communityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3d3d" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      )}
    </defs>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} />
    <circle cx="9" cy="7" r="4" stroke={color} fill={withGradient ? 'url(#communityGradient)' : 'none'} />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} />
  </svg>
);

// Settings Icon - Premium gear with gradient
export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ff3d3d" />
        </linearGradient>
      )}
    </defs>
    <circle cx="12" cy="12" r="3" stroke={color} />
    <path
      d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Profile Icon - Premium user profile with gradient
export const ProfileIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      )}
    </defs>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} />
    <circle cx="12" cy="7" r="4" stroke={color} fill={withGradient ? 'url(#profileGradient)' : 'none'} />
  </svg>
);

// Menu/Hamburger Icon - Premium menu
export const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// Close Icon - Premium X
export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Arrow Right Icon
export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Play Icon - Premium play button
export const PlayIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3d3d" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </linearGradient>
      )}
    </defs>
    <polygon
      points="5 3 19 12 5 21 5 3"
      fill={withGradient ? 'url(#playGradient)' : 'none'}
      stroke={color}
    />
  </svg>
);

// Heart Icon - Premium heart
export const HeartIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ff3d3d',
  className = '',
  strokeWidth = 2,
  withGradient = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3d3d" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </linearGradient>
      )}
    </defs>
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={withGradient ? 'url(#heartGradient)' : 'none'}
      stroke={color}
    />
  </svg>
);

// Plus Icon - Premium plus
export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffffff',
  className = '',
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Check Icon - Premium checkmark
export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#10b981',
  className = '',
  strokeWidth = 3,
  withGradient = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      )}
    </defs>
    <polyline points="20 6 9 17 4 12" stroke={withGradient ? 'url(#checkGradient)' : color} />
  </svg>
);

// Star Icon - Premium star
export const StarIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#ffd700',
  className = '',
  strokeWidth = 2,
  withGradient = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      {withGradient && (
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ffed4e" />
        </linearGradient>
      )}
    </defs>
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill={withGradient ? 'url(#starGradient)' : 'none'}
      stroke={color}
    />
  </svg>
);
