import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { COLORS } from './config/theme';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import WorkoutPage from './components/WorkoutPage';
import ProgressPage from './components/ProgressPage';
import PersonalTrainerAIPage from './components/PersonalTrainerAIPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminAIPage from './components/AdminAIPage';
import AdminCalendarPage from './components/AdminCalendarPage';
import AdminBottomNav from './components/AdminBottomNav';

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
  return (
    <Router>
      <div style={{
        background: COLORS.bg, minHeight: '100vh',
        maxWidth: '430px', margin: '0 auto',
        position: 'relative',
      }}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/schedule" element={<BookingPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/community" element={<PersonalTrainerAIPage />} />
          <Route path="/ai-trainer" element={<PersonalTrainerAIPage />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <>
              <AdminBadge />
              <div style={{ paddingTop: '24px' }}>
                <AdminDashboardPage />
              </div>
              <AdminBottomNav currentPage="admin-dashboard" onNavigate={() => {}} onBackToUser={() => {}} />
            </>
          } />
          <Route path="/admin-ai" element={
            <>
              <AdminBadge />
              <div style={{ paddingTop: '24px' }}>
                <AdminAIPage />
              </div>
              <AdminBottomNav currentPage="admin-ai" onNavigate={() => {}} onBackToUser={() => {}} />
            </>
          } />
          <Route path="/admin-calendar" element={
            <>
              <AdminBadge />
              <div style={{ paddingTop: '24px' }}>
                <AdminCalendarPage />
              </div>
              <AdminBottomNav currentPage="admin-calendar" onNavigate={() => {}} onBackToUser={() => {}} />
            </>
          } />
        </Routes>

        {/* Bottom Nav for user routes - only show on non-admin routes */}
        <BottomNav />
      </div>
    </Router>
  );
}
