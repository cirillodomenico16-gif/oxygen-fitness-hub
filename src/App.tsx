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

// Component imports
import UserBottomNav from './components/UserBottomNav';
import AdminBottomNav from './components/AdminBottomNav';

// Header component with user dropdown
const AppHeader: React.FC<{ isAdminRoute: boolean; navigate: any }> = ({ isAdminRoute, navigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [dropdownOpen]);

  const avatarInitials = isAdminRoute ? 'A' : 'MR';
  const avatarGradient = isAdminRoute
    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
    : 'linear-gradient(135deg, #e53935, #c62828)';

  return (
    <>
      <header
        style={{
          background: '#111827',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Left: O2 Logo */}
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#e53935', letterSpacing: '-1px' }}>
          O2
        </div>

        {/* Right: User Avatar */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: avatarGradient,
              border: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {avatarInitials}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                background: 'rgba(17,24,39,0.98)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                minWidth: '220px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                zIndex: 1000,
              }}
            >
              {/* User Info */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>Marco Rossi</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '4px' }}>
                  Membro Premium
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ padding: '8px 0' }}>
                {/* Il Mio Profilo */}
                <button
                  onClick={() => {
                    navigate('/profilo');
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Il Mio Profilo
                </button>

                {/* Pannello Admin */}
                <button
                  onClick={() => {
                    navigate('/admin');
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Pannello Admin
                </button>

                {/* Esci */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(239,68,68,0.9)',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Esci
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
      {/* Shared Header Component */}
      <AppHeader isAdminRoute={isAdminRoute} navigate={navigate} />

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
