import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
      {/* Admin mode banner */}
      {showAdminNav && (
        <div
          style={{
            backgroundColor: '#e53935',
            color: 'white',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '600',
            textAlign: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          ADMIN MODE
        </div>
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
