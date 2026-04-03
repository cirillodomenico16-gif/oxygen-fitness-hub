import { useState } from 'react';
import { COLORS } from './config/theme';
import BottomNav from './components/BottomNav';
import AdminBottomNav from './components/AdminBottomNav';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import WorkoutPage from './components/WorkoutPage';
import ProgressPage from './components/ProgressPage';
import PersonalTrainerAIPage from './components/PersonalTrainerAIPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminAIPage from './components/AdminAIPage';
import AdminCalendarPage from './components/AdminCalendarPage';

type UserPage = 'home' | 'booking' | 'workout' | 'progress' | 'ai-trainer';
type AdminPage = 'admin-dashboard' | 'admin-ai' | 'admin-calendar';
type Mode = 'user' | 'admin';

function AdminBadge() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
      maxWidth: '430px', width: '100%',
      background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.crimson})`,
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
      padding: '4px 0', zIndex: 900,
    }}>
      <span style={{ fontSize: '12px' }}>⚙️</span>
      <span style={{ color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
        MODALITÀ ADMIN
      </span>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>('user');
  const [userPage, setUserPage] = useState<UserPage>('home');
  const [adminPage, setAdminPage] = useState<AdminPage>('admin-dashboard');

  const switchToAdmin = () => {
    setMode('admin');
    setAdminPage('admin-dashboard');
  };

  const switchToUser = () => {
    setMode('user');
    setUserPage('home');
  };

  return (
    <div style={{
      background: COLORS.bg, minHeight: '100vh',
      maxWidth: '430px', margin: '0 auto',
      position: 'relative',
    }}>
      {mode === 'admin' && <AdminBadge />}

      {mode === 'user' && (
        <>
          <div style={{ paddingTop: 0 }}>
            {userPage === 'home'       && <HomePage onNavigate={(p) => setUserPage(p as UserPage)} />}
            {userPage === 'booking'    && <BookingPage />}
            {userPage === 'workout'    && <WorkoutPage />}
            {userPage === 'ai-trainer' && <PersonalTrainerAIPage />}
            {userPage === 'progress'   && <ProgressPage />}
          </div>
          <BottomNav
            currentPage={userPage}
            onNavigate={setUserPage}
            onAdminClick={switchToAdmin}
          />
        </>
      )}

      {mode === 'admin' && (
        <>
          <div style={{ paddingTop: '24px' }}>
            {adminPage === 'admin-dashboard' && <AdminDashboardPage />}
            {adminPage === 'admin-ai'        && <AdminAIPage />}
            {adminPage === 'admin-calendar'  && <AdminCalendarPage />}
          </div>
          <AdminBottomNav
            currentPage={adminPage}
            onNavigate={setAdminPage}
            onBackToUser={switchToUser}
          />
        </>
      )}
    </div>
  );
}
