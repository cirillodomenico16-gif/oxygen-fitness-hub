import React from 'react';
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

// Component imports
import UserBottomNav from './components/UserBottomNav';
import AdminBottomNav from './components/AdminBottomNav';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const userRoutes = ['/', '/corsi', '/allenamento', '/progressi', '/community', '/profilo'];
  const showUserNav = userRoutes.includes(location.pathname);
  const showAdminNav = isAdminRoute;

  return (
    <div
      style={{
        maxWidth: '430px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#0a0e1a',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Admin mode banner with back to user button */}
      {showAdminNav && (
        <div
          style={{
            background: 'linear-gradient(135deg, #e53935, #c62828)',
            color: 'white',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: '700',
            textAlign: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            letterSpacing: '1px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            MODALITÀ ADMIN
          </span>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.5px',
            }}
          >
            ← UTENTE
          </button>
        </div>
      )}

      {/* Floating admin access button (only in user mode) */}
      {showUserNav && (
        <button
          onClick={() => navigate('/admin')}
          style={{
            position: 'fixed',
            top: '16px',
            right: 'calc(50% - 215px + 16px)',
            zIndex: 100,
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #e53935, #c62828)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(229, 57, 53, 0.4)',
            transition: 'transform 0.2s ease',
          }}
          title="Pannello Admin"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
      )}

      {/* Routes */}
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/corsi" element={<CorsiPage />} />
        <Route path="/allenamento" element={<WorkoutActivePage />} />
        <Route path="/progressi" element={<ProgressPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profilo" element={<ProfilePage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/schede-ai" element={<AdminSchedeAI />} />
        <Route path="/admin/calendario" element={<AdminCalendar />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Bottom navigation */}
      {showUserNav && <UserBottomNav />}
      {showAdminNav && <AdminBottomNav />}
    </div>
  );
};

export default App;
