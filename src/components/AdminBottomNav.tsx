import { COLORS } from '../config/theme';

type AdminPage = 'admin-dashboard' | 'admin-ai' | 'admin-calendar';

interface AdminBottomNavProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onBackToUser: () => void;
}

const navItems: { page: AdminPage; label: string; icon: string }[] = [
  { page: 'admin-dashboard', label: 'Dashboard', icon: '📊' },
  { page: 'admin-ai', label: 'Schede AI', icon: '🤖' },
  { page: 'admin-calendar', label: 'Calendario', icon: '📅' },
];

export default function AdminBottomNav({ currentPage, onNavigate, onBackToUser }: AdminBottomNavProps) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      maxWidth: '430px', width: '100%',
      background: 'rgba(10,4,4,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${COLORS.borderBright}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 20px', zIndex: 1000,
    }}>
      {navItems.map(({ page, label, icon }) => {
        const active = currentPage === page;
        return (
          <button key={page} onClick={() => onNavigate(page)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            color: active ? COLORS.primary : COLORS.muted,
            position: 'relative', padding: '4px 16px',
          }}>
            {active && (
              <div style={{
                position: 'absolute', top: '-6px',
                width: '36px', height: '36px',
                background: `radial-gradient(circle, ${COLORS.primary}30 0%, transparent 70%)`,
                borderRadius: '50%', left: '50%', transform: 'translateX(-50%)',
              }} />
            )}
            <span style={{ fontSize: '20px', lineHeight: 1 }}>{icon}</span>
            <span style={{ fontSize: '10px', fontWeight: active ? 600 : 400 }}>{label}</span>
          </button>
        );
      })}
      <button onClick={onBackToUser} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        color: COLORS.textSec, padding: '4px 16px',
      }}>
        <span style={{ fontSize: '20px', lineHeight: 1 }}>👤</span>
        <span style={{ fontSize: '10px' }}>Utente</span>
      </button>
    </div>
  );
}
