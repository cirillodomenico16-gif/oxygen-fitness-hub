import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';
import { AnimatedText } from '../components/ui/animated-shiny-text';
import ShaderBackground from '../components/ui/shader-background';

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    minHeight: '100vh',
    padding: '8px 24px 40px 24px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: 'white',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
  };
  const contentStyle: React.CSSProperties = { position: 'relative', zIndex: 1 };

  const greetingStyle: React.CSSProperties = {
    fontSize: '38px',
    fontWeight: 800,
    color: 'white',
    margin: '12px 0 28px 0',
    lineHeight: 1.1,
    letterSpacing: '-0.5px',
    animation: 'fadeInUp 0.6s ease-out',
  };

  const workoutCardStyle: React.CSSProperties = {
    position: 'relative',
    padding: '32px 20px',
    backgroundColor: 'rgba(229, 57, 53, 0.06)',
    border: '1.5px solid rgba(229, 57, 53, 0.55)',
    borderRadius: '20px',
    textAlign: 'center',
    marginBottom: '28px',
    boxShadow: '0 0 30px rgba(229, 57, 53, 0.25), inset 0 0 20px rgba(229, 57, 53, 0.08)',
    animation: 'fadeInUp 0.6s ease-out 0.1s both',
  };

  const workoutTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 800,
    color: 'white',
    margin: '0 0 12px 0',
    lineHeight: 1.15,
    letterSpacing: '-0.5px',
  };

  const workoutMetaStyle: React.CSSProperties = {
    fontSize: '15px',
    color: 'rgba(229, 57, 53, 0.85)',
    fontWeight: 500,
    margin: 0,
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(180deg, #ef4444 0%, #e53935 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: 800,
    letterSpacing: '0.5px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 40px rgba(229, 57, 53, 0.75), 0 8px 24px rgba(229, 57, 53, 0.4)',
    animation: 'glowPulse 2.4s ease-in-out infinite, fadeInUp 0.6s ease-out 0.2s both',
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  };

  const statsRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px',
    animation: 'fadeInUp 0.6s ease-out 0.3s both',
  };

  const statCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(229, 57, 53, 0.07)',
    border: '1px solid rgba(229, 57, 53, 0.2)',
    borderRadius: '16px',
    padding: '18px 8px',
    textAlign: 'center',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '26px',
    fontWeight: 800,
    color: '#ff5252',
    margin: '0 0 4px 0',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.55)',
    margin: 0,
    fontWeight: 500,
  };

  const monthlyGoalContainerStyle: React.CSSProperties = {
    padding: '18px 20px',
    backgroundColor: 'rgba(229, 57, 53, 0.07)',
    border: '1px solid rgba(229, 57, 53, 0.2)',
    borderRadius: '16px',
    animation: 'fadeInUp 0.6s ease-out 0.4s both',
  };

  const monthlyGoalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  };

  const monthlyGoalTitleStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 600,
    color: 'white',
    margin: 0,
  };

  const monthlyGoalPercentStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 700,
    color: '#ff5252',
  };

  const progressBarContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '999px',
    overflow: 'hidden',
  };

  const progressBarFillStyle: React.CSSProperties = {
    height: '100%',
    width: '68%',
    background: 'linear-gradient(90deg, #ef4444, #ff5252)',
    borderRadius: '999px',
    boxShadow: '0 0 12px rgba(229, 57, 53, 0.6)',
    transition: 'width 0.8s ease-out',
  };

  return (
    <div style={containerStyle}>
      <ShaderBackground opacity={0.45} />
      <div style={contentStyle}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(229, 57, 53, 0.7), 0 8px 24px rgba(229, 57, 53, 0.4); }
          50% { box-shadow: 0 0 55px rgba(229, 57, 53, 1), 0 8px 32px rgba(229, 57, 53, 0.6); }
        }
        .start-btn:hover { transform: translateY(-2px); }
        .start-btn:active { transform: translateY(0); }
      `}</style>

      {/* Header: O2 logo + avatar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 0 10px 0',
        animation: 'fadeInUp 0.5s ease-out',
      }}>
        <div style={{
          width: 140,
          height: 36,
          backgroundColor: '#ef4444',
          WebkitMaskImage: "url('/oxygen-logo.png')",
          maskImage: "url('/oxygen-logo.png')",
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'left center',
          maskPosition: 'left center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          filter: 'drop-shadow(0 0 10px rgba(229,57,53,0.55))',
        }} />
        <div
          onClick={() => navigate('/profilo')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(229,57,53,0.5)',
            backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=75')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 0 12px rgba(229,57,53,0.4)',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Notification Bell */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <NotificationBell />
      </div>

      {/* Greeting */}
      <AnimatedText
        text="Ciao, Marco"
        gradientColors="linear-gradient(90deg, #8b0000, #ff5252, #ffffff, #ff5252, #8b0000)"
        gradientAnimationDuration={2.4}
        style={{ margin: '12px 0 28px 0', animation: 'fadeInUp 0.6s ease-out' }}
        textStyle={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-0.5px' }}
      />

      {/* Workout Card */}
      <div style={workoutCardStyle}>
        <h2 style={workoutTitleStyle}>Upper Body<br />Strength</h2>
        <p style={workoutMetaStyle}>7 esercizi · 55 min · Avanzato</p>
      </div>

      {/* Start Session Button */}
      <button
        className="start-btn"
        style={buttonStyle}
        onClick={() => navigate('/allenamento')}
      >
        <span style={{ fontSize: '14px' }}>▶</span> INIZIA SESSIONE
      </button>

      {/* Stats Row */}
      <div style={statsRowStyle}>
        <div style={statCardStyle}>
          <p style={statValueStyle}>
            <span style={{ fontSize: '22px' }}></span>18
          </p>
          <p style={statLabelStyle}>All. Mensili</p>
        </div>
        <div style={statCardStyle}>
          <p style={statValueStyle}>87%</p>
          <p style={statLabelStyle}>Ob. Settimanale</p>
        </div>
        <div style={statCardStyle}>
          <p style={statValueStyle}>4.2<span style={{ fontSize: '18px' }}>k</span></p>
          <p style={statLabelStyle}>Kcal</p>
        </div>
      </div>

      {/* Monthly Goal */}
      <div style={monthlyGoalContainerStyle}>
        <div style={monthlyGoalHeaderStyle}>
          <h3 style={monthlyGoalTitleStyle}>Obiettivo mensile</h3>
          <span style={monthlyGoalPercentStyle}>68%</span>
        </div>
        <div style={progressBarContainerStyle}>
          <div style={progressBarFillStyle}></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserHome;
