import { COLORS } from '../config/theme';

type Page = 'home' | 'booking' | 'workout' | 'progress' | 'ai-trainer';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAdminClick: () => void;
}

const navItems: { page: Page; label: string; icon: string }[] = [
  { page: 'home',       label: 'Home',    icon: '🏠' },
  { page: 'booking',    label: 'Corsi',   icon: '📅' },
  { page: 'workout',    label: 'Allena',  icon: '💪' },
  { page: 'ai-trainer', label: 'AI PT',   icon: '🤖' },
  { page: 'progress',   label: 'Progressi', icon: '📊' },
];

export default function BottomNav({ currentPage, onNavigate, onAdminClick }: BottomNavProps) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      maxWidth: '430px', width: '100%',
      background: 'rgba(14,6,6,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${COLORS.border}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 20px', zIndex: 1000,
    }}>
      {navItems.map(({ page, label, icon }) => {
        const active = currentPage === page;
        const isAI = page === 'ai-trainer';
        return (
          <button key={page} onClick={() => onNavigate(page)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            color: active ? COLORS.primary : COLORS.muted,
            position: 'relative', padding: '4px 10px',
          }}>
            {active && (
              <div style={{
                position: 'absolute', top: '-6px',
                width: '36px', height: '36px',
                background: `radial-gradient(circle, ${COLORS.primary}30 0%, transparent 70%)`,
                borderRadius: '50%', left: '50%', transform: 'translateX(-50%)',
              }} />
            )}
            {isAI && !active && (
              <div style={{
                position: 'absolute', top: '-3px', right: '6px',
                width: 7, height: 7, borderRadius: '50%',
                background: '#22c55e', boxShadow: '0 0 5px #22c55e',
              }} />
            )}
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{icon}</span>
            <span style={{
              fontSize: '10px', fontWeight: active ? 600 : 400,
              letterSpacing: '0.3px',
            }}>{label}</span>
            {active && (
              <div style={{
                position: 'absolute', bottom: '-10px',
                width: '24px', height: '2px',
                background: COLORS.gradient, borderRadius: '2px',
              }} />
            )}
          </button>
        );
      })}
      {/* Admin quick access */}
      <button onClick={onAdminClick} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        color: COLORS.muted, padding: '4px 10px',
      }}>
        <span style={{ fontSize: '20px', lineHeight: 1 }}>⚙️</span>
        <span style={{ fontSize: '10px' }}>Admin</span>
      </button>
    </div>
  );
}
