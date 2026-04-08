import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Page imports
import UserHome from './pages/UserHome';
import CorsiPage from './pages/CorsiPage';
import WorkoutActivePage from './pages/WorkoutActivePage';
import ProgressPage from './pages/ProgressPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminSchedeAI from './pages/AdminSchedeAI';
import AdminCalendar from './pages/AdminCalendar';
import AdminSettings from './pages/AdminSettings';
import DietaPage from './pages/DietaPage';
import SchedaPage from './pages/SchedaPage';
import LoginPage from './pages/LoginPage';

// Component imports
import UserBottomNav from './components/UserBottomNav';
import AdminBottomNav from './components/AdminBottomNav';

import { PHOTOS } from './constants';

// Header component with user dropdown
const AppHeader: React.FC<{ isAdminRoute: boolean; navigate: any }> = ({ isAdminRoute, navigate }) => {
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

  return (
    <header
      style={{
        background: '#111827',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        zIndex: 100,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Left: O2 Logo */}
      <div
        onClick={() => navigate(isAdminRoute ? '/admin' : '/')}
        style={{ fontSize: '24px', fontWeight: '700', color: '#e53935', letterSpacing: '-1px', cursor: 'pointer' }}
      >
        O<span style={{ fontSize: '16px', verticalAlign: 'sub' }}>2</span>
      </div>

      {/* Right: User Avatar with dropdown */}
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: isAdminRoute ? '2px solid #f59e0b' : '2px solid #e53935',
            padding: '0',
            cursor: 'pointer',
            overflow: 'hidden',
            background: 'transparent',
            transition: 'transform 0.2s ease',
          }}
        >
          <img
            src={PHOTOS.avatar}
            alt="Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.style.background = isAdminRoute
                ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #e53935, #c62828)';
              (e.target as HTMLImageElement).parentElement!.innerHTML = `<span style="color:white;font-size:14px;font-weight:700">${isAdminRoute ? 'A' : 'MR'}</span>`;
            }}
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
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
            {/* User Info */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={PHOTOS.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>Marco Rossi</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '2px' }}>Membro Premium</div>
              </div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '6px 0' }}>
              {[
                { label: 'Il Mio Profilo', path: '/profilo', icon: '👤' },
                { label: isAdminRoute ? 'Torna Utente' : 'Pannello Admin', path: isAdminRoute ? '/' : '/admin', icon: isAdminRoute ? '🏠' : '⚙️' },
                { label: 'La Mia Scheda', path: '/scheda', icon: '📋' },
                { label: 'La Mia Dieta', path: '/dieta', icon: '🥗' },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleMenuClick(item.path)}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '13px',
                    fontWeight: '500',
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
                  <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <div style={{ margin: '4px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

              <button
                onClick={() => setDropdownOpen(false)}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(239,68,68,0.9)',
                  fontSize: '13px',
                  fontWeight: '500',
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
                <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>🚪</span>
                Esci
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [currentUser, setCurrentUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('oxygen_auth') || 'null'); } catch { return null; }
  });

  if (!currentUser) {
    return (
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#000' }}>
        <LoginPage onLogin={() => {
          try { setCurrentUser(JSON.parse(localStorage.getItem('oxygen_auth') || 'null')); } catch {}
          navigate(JSON.parse(localStorage.getItem('oxygen_auth') || 'null')?.role === 'admin' ? '/admin' : '/');
        }} />
      </div>
    );
  }

  // expose logout handler globally for ProfilePage
  (window as any).__oxygenLogout = () => {
    localStorage.removeItem('oxygen_auth');
    setCurrentUser(null);
    navigate('/');
  };

  const userRoutes = ['/', '/corsi', '/allenamento', '/progressi', '/community', '/profilo', '/dieta', '/scheda'];
  const showUserNav = userRoutes.includes(location.pathname);
  const showAdminNav = isAdminRoute;

  return (
    <div
      style={{
        maxWidth: '430px',
        margin: '0 auto',
        height: '100vh',
        backgroundColor: '#0a0e1a',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Admin mode thin bar */}
      {showAdminNav && (
        <div
          style={{
            background: 'linear-gradient(90deg, #e53935, #c62828)',
            color: 'white',
            padding: '8px 16px',
            fontSize: '11px',
            fontWeight: '700',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(229,57,53,0.3)',
          }}
        >
          <span>MODALITÀ ADMIN</span>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '3px 10px',
              borderRadius: '16px',
              fontSize: '9px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.5px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          >
            ← Torna Utente
          </button>
        </div>
      )}

      {/* Scrollable content area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '80px',
        }}
      >
        <Routes>
          {/* User routes */}
          <Route path="/" element={<UserHome />} />
          <Route path="/corsi" element={<CorsiPage />} />
          <Route path="/allenamento" element={<WorkoutActivePage />} />
          <Route path="/progressi" element={<ProgressPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profilo" element={<ProfilePage />} />
          <Route path="/dieta" element={<DietaPage />} />
          <Route path="/scheda" element={<SchedaPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/schede-ai" element={<AdminSchedeAI />} />
          <Route path="/admin/calendario" element={<AdminCalendar />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Bottom navigation */}
      {showUserNav && <UserBottomNav />}
      {showAdminNav && <AdminBottomNav />}
    </div>
  );
};

export default App;
