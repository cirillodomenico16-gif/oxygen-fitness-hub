import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import UserBottomNav from './components/UserBottomNav';
import AdminBottomNav from './components/AdminBottomNav';
import PageLoader from './components/PageLoader';
import { useAuth } from './contexts/AuthContext';

import { PHOTOS } from './constants';

// Eager — login is the entry point, lazy-loading it would just add a spinner before first paint
import LoginPage from './pages/LoginPage';

// Lazy user routes
const UserHome = lazy(() => import('./pages/UserHome'));
const CorsiPage = lazy(() => import('./pages/CorsiPage'));
const WorkoutActivePage = lazy(() => import('./pages/WorkoutActivePage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DietaPage = lazy(() => import('./pages/DietaPage'));
const SchedaPage = lazy(() => import('./pages/SchedaPage'));
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'));

// Lazy admin routes — separate chunk
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminSchedeAI = lazy(() => import('./pages/AdminSchedeAI'));
const AdminCalendar = lazy(() => import('./pages/AdminCalendar'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const AdminMembri = lazy(() => import('./pages/AdminMembri'));
const AdminMembroDetail = lazy(() => import('./pages/AdminMembroDetail'));
const AdminSchedaManuale = lazy(() => import('./pages/AdminSchedaManuale'));
const AdminReport = lazy(() => import('./pages/AdminReport'));
const AdminCampagna = lazy(() => import('./pages/AdminCampagna'));
const AgentChat = lazy(() => import('./pages/AgentChat'));
const AgentProgrammazione = lazy(() => import('./pages/AgentProgrammazione'));

const headerStyle: React.CSSProperties = {
  background: '#111827',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  padding: '12px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
  zIndex: 100,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const logoStyle: React.CSSProperties = {
  width: 130,
  height: 32,
  cursor: 'pointer',
  backgroundColor: '#e53935',
  WebkitMaskImage: "url('/oxygen-logo.png')",
  maskImage: "url('/oxygen-logo.png')",
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'left center',
  maskPosition: 'left center',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
};

interface AppHeaderProps {
  isAdminRoute: boolean;
  navigate: (path: string) => void;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isAdminRoute, navigate, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (path: string) => {
    setDropdownOpen(false);
    setTimeout(() => navigate(path), 10);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  const avatarBorderColor = isAdminRoute ? '#f59e0b' : '#e53935';

  return (
    <header style={headerStyle}>
      <button
        onClick={() => navigate(isAdminRoute ? '/admin' : '/')}
        aria-label="Vai alla home"
        style={{
          ...logoStyle,
          border: 'none',
          padding: 0,
          minHeight: 32,
        }}
      />

      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-haspopup="menu"
          aria-expanded={dropdownOpen}
          aria-label="Apri menu utente"
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: `2px solid ${avatarBorderColor}`,
            padding: 0,
            cursor: 'pointer',
            overflow: 'hidden',
            background: 'transparent',
            transition: 'transform 0.2s ease',
          }}
        >
          <img
            src={PHOTOS.avatar}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (!parent) return;
              parent.style.background = isAdminRoute
                ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                : 'linear-gradient(135deg, #e53935, #c62828)';
              parent.innerHTML = `<span style="color:white;font-size:14px;font-weight:700">${isAdminRoute ? 'A' : 'MR'}</span>`;
            }}
          />
        </button>

        {dropdownOpen && (
          <div
            role="menu"
            style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              background: 'rgba(17,24,39,0.98)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              minWidth: '230px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              zIndex: 1000,
              animation: 'scaleIn 0.15s ease-out',
            }}
          >
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={PHOTOS.avatar}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Marco Rossi</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: 2 }}>Membro Premium</div>
              </div>
            </div>

            <div style={{ padding: '6px 0' }}>
              {[
                { label: 'Il Mio Profilo', path: '/profilo' },
                { label: isAdminRoute ? 'Torna Utente' : 'Pannello Admin', path: isAdminRoute ? '/' : '/admin' },
                { label: 'La Mia Scheda', path: '/scheda' },
                { label: 'La Mia Dieta', path: '/dieta' },
              ].map((item) => (
                <button
                  key={item.path}
                  role="menuitem"
                  onClick={() => handleMenuClick(item.path)}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '13px',
                    fontWeight: 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {item.label}
                </button>
              ))}

              <div style={{ margin: '4px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

              <button
                role="menuitem"
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(239,68,68,0.9)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Esci
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const USER_NAV_ROUTES = new Set([
  '/',
  '/corsi',
  '/allenamento',
  '/progressi',
  '/community',
  '/profilo',
  '/dieta',
  '/scheda',
  '/abbonamento',
]);

const shellStyle: React.CSSProperties = {
  maxWidth: '100%',
  width: '100%',
  margin: '0 auto',
  height: '100dvh',
  minHeight: '100vh',
  backgroundColor: '#000',
  position: 'relative',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 0 60px rgba(239,68,68,0.12)',
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch',
  paddingBottom: '80px',
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showUserNav = useMemo(() => USER_NAV_ROUTES.has(location.pathname), [location.pathname]);

  if (!user) {
    return (
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#000' }}>
        <LoginPage
          onLogin={() => {
            try {
              const fresh = JSON.parse(localStorage.getItem('oxygen_auth') || 'null');
              setUser(fresh);
              navigate(fresh?.role === 'admin' ? '/admin' : '/');
            } catch {}
          }}
        />
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <AppHeader isAdminRoute={isAdminRoute} navigate={navigate} onLogout={handleLogout} />
      <div style={scrollAreaStyle}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/corsi" element={<CorsiPage />} />
            <Route path="/allenamento" element={<WorkoutActivePage />} />
            <Route path="/progressi" element={<ProgressPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profilo" element={<ProfilePage />} />
            <Route path="/dieta" element={<DietaPage />} />
            <Route path="/scheda" element={<SchedaPage />} />
            <Route path="/abbonamento" element={<SubscriptionPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/schede-ai" element={<AdminSchedeAI />} />
            <Route path="/admin/membri" element={<AdminMembri />} />
            <Route path="/admin/membro/:id" element={<AdminMembroDetail />} />
            <Route path="/admin/membro/:id/agent-scheda" element={<AgentChat type="scheda" />} />
            <Route path="/admin/membro/:id/scheda-manuale" element={<AdminSchedaManuale />} />
            <Route path="/admin/membro/:id/agent-dieta" element={<AgentChat type="dieta" />} />
            <Route path="/admin/calendario" element={<AdminCalendar />} />
            <Route path="/admin/calendario/agent-programmazione" element={<AgentProgrammazione />} />
            <Route path="/admin/analisi" element={<AdminReport />} />
            <Route path="/admin/report" element={<AdminReport />} />
            <Route path="/admin/campagna" element={<AdminCampagna />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>

      {showUserNav && <UserBottomNav />}
      {isAdminRoute && <AdminBottomNav />}
    </div>
  );
};

export default App;
