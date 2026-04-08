import React, { useState } from 'react';
import { login } from '../auth';

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('marco@oxygen.com');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(email, password);
    if (!u) {
      setError('Credenziali non valide');
      return;
    }
    onLogin();
  };

  const fill = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '32px 28px',
        backgroundImage:
          "radial-gradient(circle at top, rgba(229,57,53,0.25), transparent 70%), radial-gradient(circle at bottom, rgba(229,57,53,0.15), transparent 70%)",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(229, 57, 53, 0.7); }
          50% { box-shadow: 0 0 55px rgba(229, 57, 53, 1); }
        }
      `}</style>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '36px', animation: 'fadeInUp 0.6s ease-out' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ff5252, #e53935 60%, #8b0000)',
            boxShadow: '0 0 40px rgba(229,57,53,0.8), inset 0 0 16px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 900,
            fontSize: '42px',
            margin: '0 auto 14px',
          }}
        >
          O
        </div>
        <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Oxygen <span style={{ color: '#ff5252' }}>Fitness</span>
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>
          Accedi al tuo account
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(229,57,53,0.06)',
          border: '1.5px solid rgba(229,57,53,0.4)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 0 30px rgba(229,57,53,0.2)',
          animation: 'fadeInUp 0.6s ease-out 0.1s both',
        }}
      >
        <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
          EMAIL
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <label
          style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginTop: '14px', display: 'block' }}
        >
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {error && (
          <div
            style={{
              marginTop: '14px',
              padding: '10px 14px',
              background: 'rgba(229,57,53,0.15)',
              border: '1px solid rgba(229,57,53,0.5)',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#ff8a80',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '16px',
            background: 'linear-gradient(180deg, #ef4444, #e53935)',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(229,57,53,0.6)',
            animation: 'glowPulse 2.4s ease-in-out infinite',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          ACCEDI
        </button>
      </form>

      {/* Demo credentials */}
      <div
        style={{
          marginTop: '22px',
          padding: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(229,57,53,0.3)',
          borderRadius: '14px',
          animation: 'fadeInUp 0.6s ease-out 0.2s both',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#ff5252',
            letterSpacing: '1px',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          CREDENZIALI DEMO
        </div>
        <button
          type="button"
          onClick={() => fill('marco@oxygen.com', 'user123')}
          style={demoBtn}
        >
          👤 Utente · marco@oxygen.com / user123
        </button>
        <button
          type="button"
          onClick={() => fill('admin@oxygen.com', 'admin123')}
          style={{ ...demoBtn, marginTop: '8px', borderColor: 'rgba(245,158,11,0.5)', color: '#f59e0b' }}
        >
          ⚙️ Admin · admin@oxygen.com / admin123
        </button>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '6px',
  padding: '14px 16px',
  background: 'rgba(0,0,0,0.4)',
  border: '1.5px solid rgba(229,57,53,0.35)',
  borderRadius: '12px',
  color: 'white',
  fontSize: '15px',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
};

const demoBtn: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: 'transparent',
  border: '1px solid rgba(229,57,53,0.4)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

export default LoginPage;
