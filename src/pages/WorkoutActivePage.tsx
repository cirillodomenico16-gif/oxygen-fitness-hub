import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ExerciseDef {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

const DEFAULT_EXERCISES: ExerciseDef[] = [
  { name: 'Bench Press', sets: 4, reps: 10, weight: 80 },
  { name: 'Shoulder Press', sets: 4, reps: 10, weight: 50 },
  { name: 'Lat Pulldown', sets: 3, reps: 12, weight: 60 },
  { name: 'Bicep Curl', sets: 3, reps: 12, weight: 18 },
  { name: 'Tricep Pushdown', sets: 3, reps: 15, weight: 25 },
];

const REST_SECONDS = 120;

const WorkoutActivePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const workoutType: string = location.state?.workoutType || 'Upper Body';
  const exercises: ExerciseDef[] = location.state?.exercises?.length ? location.state.exercises : DEFAULT_EXERCISES;

  // completed[exerciseIdx] = number of completed series
  const [completed, setCompleted] = useState<number[]>(() => exercises.map(() => 0));
  const [activeIdx, setActiveIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentExercise = exercises[activeIdx];
  const currentCompleted = completed[activeIdx] || 0;
  const currentSeries = Math.min(currentCompleted + 1, currentExercise.sets);

  // Total progress
  const totalSets = exercises.reduce((a, e) => a + e.sets, 0);
  const doneSets = completed.reduce((a, n) => a + n, 0);
  const overallPct = Math.round((doneSets / totalSets) * 100);

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
    const newCompleted = [...completed];
    newCompleted[activeIdx] = currentCompleted + 1;
    setCompleted(newCompleted);

    // if this exercise is fully done, move to next not-completed exercise
    if (newCompleted[activeIdx] >= currentExercise.sets) {
      const nextIdx = newCompleted.findIndex((c, i) => c < exercises[i].sets);
      if (nextIdx === -1) {
        setFinished(true);
        setIsResting(false);
        return;
      }
      setActiveIdx(nextIdx);
    }
    setSecondsLeft(REST_SECONDS);
    setIsResting(true);
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setSecondsLeft(0);
  };

  const handleSelectExercise = (idx: number) => {
    if (completed[idx] >= exercises[idx].sets) return;
    setActiveIdx(idx);
    setIsResting(false);
    setSecondsLeft(0);
  };

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = isResting ? (secondsLeft / REST_SECONDS) : (currentCompleted / currentExercise.sets);
  const offset = circumference * (1 - progress);

  return (
    <div
      className="corsi-scroll"
      style={{
        backgroundColor: '#000000',
        height: '100%',
        padding: '8px 22px 120px 22px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: 'white',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        scrollbarColor: '#e53935 rgba(255,255,255,0.05)',
      }}
    >
      <style>{`
        @keyframes ringGlow {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(229,57,53,0.7)); }
          50% { filter: drop-shadow(0 0 32px rgba(229,57,53,1)); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .corsi-scroll::-webkit-scrollbar { width: 8px; }
        .corsi-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.04);
          border-radius: 999px;
          margin: 8px 0;
        }
        .corsi-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ef4444, #e53935);
          border-radius: 999px;
          box-shadow: 0 0 12px rgba(229,57,53,0.5);
        }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 0 16px 0',
      }}>
        <button
          onClick={() => navigate('/scheda')}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'rgba(229,57,53,0.15)',
            border: '1px solid rgba(229,57,53,0.3)',
            color: 'white', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff5252' }}>
          {workoutType} · Serie {currentSeries}/{currentExercise.sets}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#ff5252' }}>+{doneSets * 5}XP</div>
      </div>

      <h1 style={{
        fontSize: '16px',
        fontWeight: 800,
        color: 'white',
        textAlign: 'center',
        letterSpacing: '2px',
        margin: '0 0 18px 0',
        textTransform: 'uppercase',
      }}>{finished ? 'Allenamento Completato' : 'Allenamento in Corso'}</h1>

      {/* Overall progress bar */}
      <div style={{
        marginBottom: '20px',
        animation: 'fadeInUp 0.5s ease-out',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '6px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 600,
        }}>
          <span>Progresso totale</span>
          <span style={{ color: '#ff5252' }}>{doneSets}/{totalSets} serie · {overallPct}%</span>
        </div>
        <div style={{
          height: '6px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${overallPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ef4444, #ff5252)',
            boxShadow: '0 0 12px rgba(229,57,53,0.6)',
            transition: 'width 0.5s ease-out',
          }} />
        </div>
      </div>

      {/* Timer Circle */}
      {!finished && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
          animation: 'fadeInUp 0.5s ease-out',
        }}>
          <div style={{ position: 'relative', width: '240px', height: '240px' }}>
            <svg width="240" height="240" viewBox="0 0 260 260" style={{ animation: 'ringGlow 2s ease-in-out infinite' }}>
              <circle cx="130" cy="130" r={radius} fill="none" stroke="rgba(229,57,53,0.12)" strokeWidth="6" />
              <circle
                cx="130" cy="130" r={radius}
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
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontSize: '58px',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-1px',
                lineHeight: 1,
              }}>{isResting ? formatTime(secondsLeft) : `${currentCompleted}/${currentExercise.sets}`}</div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#ff5252',
                letterSpacing: '2px',
                marginTop: '8px',
              }}>{isResting ? 'RIPOSO' : 'SERIE'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Current Exercise Card */}
      {!finished && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(60,12,16,0.85), rgba(30,6,8,0.85))',
          border: '1px solid rgba(229,57,53,0.3)',
          borderRadius: '20px',
          padding: '20px 22px',
          marginBottom: '14px',
          animation: 'fadeInUp 0.5s ease-out 0.1s both',
        }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#ff5252',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}>Esercizio {activeIdx + 1} di {exercises.length}</p>
          <h2 style={{
            fontSize: '26px',
            fontWeight: 800,
            color: 'white',
            margin: '0 0 6px 0',
            letterSpacing: '-0.5px',
          }}>{currentExercise.name}</h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 14px 0',
          }}>{currentExercise.reps} reps{currentExercise.weight ? ` · ${currentExercise.weight}kg` : ''}</p>

          {/* Series dots */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {Array.from({ length: currentExercise.sets }).map((_, i) => {
              const isDone = i < currentCompleted;
              const isCurrent = i === currentCompleted;
              return (
                <div key={i} style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: isDone ? '#22c55e' : isCurrent ? '#ef4444' : 'transparent',
                  border: isCurrent || isDone ? 'none' : '2px solid rgba(255,255,255,0.25)',
                  boxShadow: isCurrent ? '0 0 12px rgba(239,68,68,0.8)' : isDone ? '0 0 8px rgba(34,197,94,0.5)' : 'none',
                  transition: 'all 0.3s ease',
                }} />
              );
            })}
          </div>
        </div>
      )}

      {/* Complete Series Button */}
      {!finished && (
        <>
          <button
            onClick={handleCompleteSeries}
            disabled={isResting}
            style={{
              width: '100%',
              padding: '18px',
              background: isResting ? 'rgba(229,57,53,0.3)' : 'linear-gradient(180deg, #ff5252, #e53935)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              cursor: isResting ? 'not-allowed' : 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: isResting ? 'none' : '0 0 30px rgba(229,57,53,0.55), 0 8px 20px rgba(229,57,53,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            SERIE COMPLETATA
          </button>
          {isResting && (
            <button
              onClick={handleSkipRest}
              style={{
                width: '100%',
                padding: '12px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.3px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: '22px',
              }}
            >
              SALTA RIPOSO
            </button>
          )}
        </>
      )}

      {finished && (
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(180deg, #22c55e, #16a34a)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: '0 0 30px rgba(34,197,94,0.55)',
            marginBottom: '22px',
          }}
        >
           TORNA ALLA HOME
        </button>
      )}

      {/* Full Exercise List */}
      <p style={{
        fontSize: '11px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        margin: '10px 0 12px 4px',
      }}>Sequenza Allenamento</p>

      {exercises.map((ex, idx) => {
        const done = completed[idx] || 0;
        const isComplete = done >= ex.sets;
        const isActive = idx === activeIdx && !finished;
        return (
          <div
            key={idx}
            onClick={() => handleSelectExercise(idx)}
            style={{
              background: isActive
                ? 'linear-gradient(135deg, rgba(60,12,16,0.9), rgba(30,6,8,0.9))'
                : 'rgba(255,255,255,0.03)',
              border: isActive
                ? '1px solid rgba(229,57,53,0.5)'
                : '1px solid rgba(255,255,255,0.06)',
              borderLeft: isActive ? '3px solid #ef4444' : isComplete ? '3px solid #22c55e' : '3px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              padding: '14px 16px',
              marginBottom: '10px',
              cursor: isComplete ? 'default' : 'pointer',
              opacity: isComplete ? 0.55 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isActive ? '#ff5252' : 'rgba(255,255,255,0.4)',
                }}>{String(idx + 1).padStart(2, '0')}</span>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'white',
                  margin: 0,
                  textDecoration: isComplete ? 'line-through' : 'none',
                }}>{ex.name}</h3>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.55)',
                margin: '0 0 6px 24px',
              }}>
                {ex.sets}×{ex.reps}{ex.weight ? ` · ${ex.weight}kg` : ''} · {done}/{ex.sets} fatte
              </p>
              {/* mini progress bar */}
              <div style={{
                marginLeft: '24px',
                height: '4px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(done / ex.sets) * 100}%`,
                  height: '100%',
                  background: isComplete ? '#22c55e' : 'linear-gradient(90deg, #ef4444, #ff5252)',
                  transition: 'width 0.5s ease-out',
                }} />
              </div>
            </div>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isComplete ? 'rgba(34,197,94,0.2)' : isActive ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.05)',
              border: isComplete ? '1px solid rgba(34,197,94,0.4)' : 'none',
              flexShrink: 0,
            }}>
              {isComplete ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : isActive ? (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ff5252',
                  boxShadow: '0 0 8px rgba(239,68,68,0.8)',
                }} />
              ) : (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  {done}/{ex.sets}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutActivePage;
