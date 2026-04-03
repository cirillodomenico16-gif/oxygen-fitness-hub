import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTOS } from '../constants';

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#0a0e1a',
    minHeight: '100vh',
    overflowY: 'auto',
    paddingBottom: 100,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  const greetingContainerStyle: React.CSSProperties = {
    padding: '20px 20px 12px 20px',
    animation: 'fadeInUp 0.6s ease-out',
  };

  const greetingTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'white',
    margin: 0,
    lineHeight: 1.2,
  };

  const greetingSubtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '8px 0 0 0',
  };

  const motivationalBannerStyle: React.CSSProperties = {
    margin: '20px 20px',
    borderRadius: '16px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px',
    animation: 'fadeInUp 0.6s ease-out 0.1s both',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.9) 10%, rgba(10,14,26,0.3) 100%), url(${PHOTOS.gym})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
  };

  const motivationalTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'white',
    margin: '0 0 4px 0',
  };

  const motivationalSubtitleStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  };

  const workoutCardStyle: React.CSSProperties = {
    margin: '20px 20px',
    padding: '0',
    backgroundColor: 'rgba(17, 24, 39, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    borderLeft: '3px solid transparent',
    borderImage: 'linear-gradient(to bottom, #ff8c00, #f59e0b) 1',
    animation: 'fadeInUp 0.6s ease-out 0.2s both',
    overflow: 'hidden',
  };

  const workoutImageAreaStyle: React.CSSProperties = {
    height: '120px',
    backgroundImage: `linear-gradient(to bottom, rgba(10,14,26,0.1), rgba(17,24,39,0.95)), url(${PHOTOS.benchpress})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const workoutContentStyle: React.CSSProperties = {
    padding: '20px',
  };

  const workoutLabelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '0 0 12px 0',
  };

  const workoutTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: 'white',
    margin: '0 0 16px 0',
    lineHeight: 1.2,
  };

  const pillsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  };

  const pillStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(229, 57, 53, 0.6)',
    animation: 'glowPulse 2s ease-in-out infinite',
  };

  const secondaryLinkStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '12px',
    textDecoration: 'none',
  };

  const statsRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    padding: '0 20px',
    animation: 'fadeInUp 0.6s ease-out 0.3s both',
  };

  const statCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(17, 24, 39, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    padding: '16px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: '#e53935',
    margin: '0 0 8px 0',
    lineHeight: 1,
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  };

  const monthlyGoalContainerStyle: React.CSSProperties = {
    margin: '24px 20px',
    padding: '20px',
    backgroundColor: 'rgba(17, 24, 39, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    animation: 'fadeInUp 0.6s ease-out 0.4s both',
  };

  const monthlyGoalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const monthlyGoalTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  };

  const monthlyGoalPercentStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 700,
    color: '#e53935',
  };

  const progressBarContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '12px',
  };

  const progressBarFillStyle: React.CSSProperties = {
    height: '100%',
    width: '68%',
    backgroundColor: '#e53935',
    borderRadius: '4px',
    transition: 'width 0.6s ease-out',
  };

  const progressSubtitleStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  };

  const quickActionsSectionStyle: React.CSSProperties = {
    margin: '24px 20px',
    animation: 'fadeInUp 0.6s ease-out 0.5s both',
  };

  const quickActionsTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0 0 16px 0',
  };

  const quickActionsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  };

  const quickActionCardBase: React.CSSProperties = {
    borderRadius: '16px',
    height: '80px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '13px',
    fontWeight: 700,
    color: 'white',
    padding: '12px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '1px solid rgba(255,255,255,0.06)',
    textShadow: '0 1px 4px rgba(0,0,0,0.7)',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(229, 57, 53, 0.6);
          }
          50% {
            box-shadow: 0 0 30px rgba(229, 57, 53, 0.9);
          }
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(229, 57, 53, 0.9) !important;
        }

        button:active {
          transform: translateY(0);
        }
      `}</style>

      {/* Greeting */}
      <div style={greetingContainerStyle}>
        <h1 style={greetingTitleStyle}>Ciao, Marco</h1>
        <p style={greetingSubtitleStyle}>Pronto per allenarti?</p>
      </div>

      {/* Motivational Banner */}
      <div style={motivationalBannerStyle}>
        <h2 style={motivationalTitleStyle}>LA TUA PALESTRA</h2>
        <p style={motivationalSubtitleStyle}>Oxygen Fitness Hub</p>
      </div>

      {/* Workout Card */}
      <div style={workoutCardStyle}>
        <div style={workoutImageAreaStyle} />

        <div style={workoutContentStyle}>
          <p style={workoutLabelStyle}>Il tuo allenamento</p>
          <h2 style={workoutTitleStyle}>Upper Body Strength</h2>
          <div style={pillsContainerStyle}>
            <div style={pillStyle}>7 esercizi</div>
            <div style={pillStyle}>55 min</div>
            <div style={pillStyle}>Avanzato</div>
          </div>
          <button style={buttonStyle} onClick={() => navigate('/allenamento')}>
            INIZIA SESSIONE
          </button>
          <button
            style={secondaryLinkStyle}
            onClick={() => navigate('/scheda')}
          >
            Vedi Scheda Settimanale
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={statsRowStyle}>
        <div style={statCardStyle}>
          <p style={statValueStyle}>18<span style={{ fontSize: '16px' }}>g</span></p>
          <p style={statLabelStyle}>Streak</p>
        </div>
        <div style={statCardStyle}>
          <p style={statValueStyle}>87%</p>
          <p style={statLabelStyle}>Obiettivo</p>
        </div>
        <div style={statCardStyle}>
          <p style={statValueStyle}>4.2<span style={{ fontSize: '16px' }}>k</span></p>
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
        <p style={progressSubtitleStyle}>14 di 20 allenamenti completati</p>
      </div>

      {/* Quick Actions */}
      <div style={quickActionsSectionStyle}>
        <h3 style={quickActionsTitleStyle}>Accesso Rapido</h3>
        <div style={quickActionsGridStyle}>
          <div
            style={{...quickActionCardBase, backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${PHOTOS.nutrition})`}}
            onClick={() => navigate('/dieta')}
          >
            La Mia Dieta
          </div>
          <div
            style={{...quickActionCardBase, backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${PHOTOS.sala})`}}
            onClick={() => navigate('/corsi')}
          >
            Corsi Oggi
          </div>
          <div
            style={{...quickActionCardBase, backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${PHOTOS.running})`}}
            onClick={() => navigate('/progressi')}
          >
            Progressi
          </div>
          <div
            style={{...quickActionCardBase, backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${PHOTOS.community})`}}
            onClick={() => navigate('/community')}
          >
            Community
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
