import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ExerciseDef {
  name: string;
  totalSeries: number;
  reps: number;
  weight: number;
}

const EXERCISES: ExerciseDef[] = [
  { name: 'Bench Press', totalSeries: 4, reps: 10, weight: 80 },
  { name: 'Shoulder Press', totalSeries: 4, reps: 10, weight: 50 },
  { name: 'Lat Pulldown', totalSeries: 3, reps: 12, weight: 60 },
  { name: 'Bicep Curl', totalSeries: 3, reps: 12, weight: 18 },
];

const REST_SECONDS = 120;

const WorkoutActivePage: React.FC = () => {
  const navigate = useNavigate();
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [currentSeries, setCurrentSeries] = useState(3);
  const [completedSeries, setCompletedSeries] = useState(2);
  const [secondsLeft, setSecondsLeft] = useState(95);
  const [isResting, setIsResting] = useState(true);

  const currentExercise = EXERCISES[exerciseIdx];
  const nextExercise = EXERCISES[exerciseIdx + 1];

  useEffect(() => {
    if (!isResting) return;
    if (secondsLeft <= 0) {
      setIsResting(false);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, isResting]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleCompleteSeries = () => {
    const newCompleted = completedSeries + 1;
    if (currentSeries >= currentExercise.totalSeries) {
      if (exerciseIdx + 1 < EXERCISES.length) {
        setExerciseIdx(exerciseIdx + 1);
        setCurrentSeries(1);
        setCompletedSeries(0);
        setSecondsLeft(REST_SECONDS);
        setIsResting(true);
      } else {
        navigate('/');
      }
      return;
    }
    setCompletedSeries(newCompleted);
    setCurrentSeries(currentSeries + 1);
    setSecondsLeft(REST_SECONDS);
    setIsResting(true);
  };

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = isResting ? (secondsLeft / REST_SECONDS) : 1;
  const offset = circumference * (1 - progress);

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    minHeight: '100vh',
    padding: '8px 22px 40px 22px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes ringGlow {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(229,57,53,0.7)); }
          50% { filter: drop-shadow(0 0 32px rgba(229,57,53,1)); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 0 18px 0',
      }}>
        <button
          onClick={() => navigate('/scheda')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(229,57,53,0.15)',
            border: '1px solid rgba(229,57,53,0.3)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#ff5252',
          letterSpacing: '0.2px',
        }}>
          Upper Body · Serie {currentSeries}/{currentExercise.totalSeries}
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: 800,
          color: '#ff5252',
        }}>+25XP</div>
      </div>

      <h1 style={{
        fontSize: '17px',
        fontWeight: 800,
        color: 'white',
        textAlign: 'center',
        letterSpacing: '2px',
        margin: '4px 0 24px 0',
        textTransform: 'uppercase',
      }}>Allenamento in Corso</h1>

      {/* Timer Circle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px',
        animation: 'fadeInUp 0.5s ease-out',
      }}>
        <div style={{ position: 'relative', width: '260px', height: '260px' }}>
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            style={{ animation: 'ringGlow 2s ease-in-out infinite' }}
          >
            <circle cx="130" cy="130" r={radius} fill="none" stroke="rgba(229,57,53,0.12)" strokeWidth="6" />
            <circle
              cx="130"
              cy="130"
              r={radius}
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 130 130)"
              style={{ transition: 'stroke-dashoffset 0.9s linear' }}
            />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff5252" />
                <stop offset="100%" stopColor="#e53935" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}>{formatTime(secondsLeft)}</div>
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#ff5252',
              letterSpacing: '2px',
              marginTop: '8px',
            }}>{isResting ? 'RIPOSO' : 'PRONTO'}</div>
          </div>
        </div>
      </div>

      {/* Exercise Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(60,12,16,0.85), rgba(30,6,8,0.85))',
        border: '1px solid rgba(229,57,53,0.3)',
        borderRadius: '20px',
        padding: '20px 22px',
        marginBottom: '14px',
        animation: 'fadeInUp 0.5s ease-out 0.1s both',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '26px',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 6px 0',
              letterSpacing: '-0.5px',
            }}>{currentExercise.name}</h2>
            <p style={{
              fontSize: '14px',
              color: '#ff5252',
              fontWeight: 700,
              margin: '0 0 8px 0',
            }}>Serie {currentSeries} di {currentExercise.totalSeries}</p>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              margin: 0,
            }}>{currentExercise.reps} reps · {currentExercise.weight}kg</p>
          </div>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff5252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13" cy="4" r="2"></circle>
            <path d="M4 22l3-8 4-3-2-5 4 2 3 4 4 1"></path>
            <path d="M11 13l-2 4 3 3"></path>
          </svg>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          {Array.from({ length: currentExercise.totalSeries }).map((_, i) => {
            const isDone = i < completedSeries;
            const isCurrent = i === completedSeries;
            return (
              <div key={i} style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: isDone || isCurrent ? '#ef4444' : 'transparent',
                border: isCurrent || isDone ? 'none' : '2px solid rgba(255,255,255,0.25)',
                boxShadow: isCurrent ? '0 0 12px rgba(239,68,68,0.8)' : 'none',
              }} />
            );
          })}
        </div>
      </div>

      {/* Completed Series */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        padding: '14px 18px',
        marginBottom: '12px',
        animation: 'fadeInUp 0.5s ease-out 0.2s both',
      }}>
        {completedSeries === 0 ? (
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            Nessuna serie completata
          </div>
        ) : (
          Array.from({ length: completedSeries }).map((_, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 0',
              fontSize: '14px',
              color: 'white',
              fontWeight: 600,
            }}>
              <span>Serie {i + 1}: {currentExercise.reps}×{currentExercise.weight}kg</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          ))
        )}
      </div>

      {/* Next */}
      {nextExercise && (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '14px',
          padding: '14px 18px',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '18px',
          animation: 'fadeInUp 0.5s ease-out 0.3s both',
        }}>
          Prossimo: {nextExercise.name}
        </div>
      )}

      <button
        onClick={handleCompleteSeries}
        style={{
          width: '100%',
          padding: '18px',
          background: 'linear-gradient(180deg, #ff5252, #e53935)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          fontSize: '16px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: '0 0 40px rgba(229,57,53,0.6), 0 8px 24px rgba(229,57,53,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          animation: 'fadeInUp 0.5s ease-out 0.4s both',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        SERIE COMPLETATA
      </button>
    </div>
  );
};

export default WorkoutActivePage;
