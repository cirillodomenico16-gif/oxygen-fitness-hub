import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

interface DayWorkout {
  day: string;
  date: number;
  type: string;
  subtitle: string;
  duration: string;
  exercises: Exercise[];
  isRest?: boolean;
}

const WORKOUTS: DayWorkout[] = [
  {
    day: 'Lunedì',
    date: 18,
    type: 'Upper Body',
    subtitle: 'Petto · Spalle · Tricipiti',
    duration: '55 min',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 10, weight: 80 },
      { name: 'Shoulder Press', sets: 4, reps: 10, weight: 50 },
      { name: 'Lat Pulldown', sets: 3, reps: 12, weight: 60 },
      { name: 'Bicep Curl', sets: 3, reps: 12, weight: 18 },
      { name: 'Tricep Pushdown', sets: 3, reps: 15, weight: 25 },
    ],
  },
  {
    day: 'Martedì',
    date: 19,
    type: 'Lower Body',
    subtitle: 'Gambe · Glutei',
    duration: '60 min',
    exercises: [
      { name: 'Squat', sets: 4, reps: 8, weight: 100 },
      { name: 'Leg Press', sets: 4, reps: 12, weight: 150 },
      { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 80 },
      { name: 'Leg Curl', sets: 3, reps: 12, weight: 40 },
      { name: 'Calf Raises', sets: 4, reps: 15, weight: 60 },
    ],
  },
  {
    day: 'Mercoledì',
    date: 20,
    type: 'Riposo',
    subtitle: 'Recupero Attivo',
    duration: '—',
    exercises: [],
    isRest: true,
  },
  {
    day: 'Giovedì',
    date: 21,
    type: 'Push',
    subtitle: 'Petto · Spalle · Tricipiti',
    duration: '50 min',
    exercises: [
      { name: 'Incline Bench Press', sets: 4, reps: 10, weight: 70 },
      { name: 'Arnold Press', sets: 3, reps: 10, weight: 16 },
      { name: 'Cable Fly', sets: 3, reps: 12, weight: 15 },
      { name: 'Front Raises', sets: 3, reps: 12, weight: 10 },
      { name: 'Overhead Tricep Ext.', sets: 3, reps: 12, weight: 20 },
    ],
  },
  {
    day: 'Venerdì',
    date: 22,
    type: 'Pull',
    subtitle: 'Schiena · Bicipiti',
    duration: '55 min',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: 6, weight: 120 },
      { name: 'Pull-ups', sets: 4, reps: 8 },
      { name: 'Barbell Row', sets: 3, reps: 10, weight: 70 },
      { name: 'Face Pull', sets: 3, reps: 15, weight: 15 },
      { name: 'Barbell Curl', sets: 3, reps: 12, weight: 30 },
    ],
  },
  {
    day: 'Sabato',
    date: 23,
    type: 'Cardio HIIT',
    subtitle: 'Alta Intensità',
    duration: '30 min',
    exercises: [
      { name: 'Burpees', sets: 4, reps: 10 },
      { name: 'Mountain Climbers', sets: 4, reps: 20 },
      { name: 'Box Jumps', sets: 4, reps: 15 },
      { name: 'Battle Ropes 30s', sets: 4, reps: 1 },
    ],
  },
  {
    day: 'Domenica',
    date: 24,
    type: 'Riposo',
    subtitle: 'Recupero Completo',
    duration: '—',
    exercises: [],
    isRest: true,
  },
];

const SchedaPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const handleStart = (w: DayWorkout) => {
    if (w.isRest) return;
    navigate('/allenamento', { state: { workoutType: w.type, day: w.day, exercises: w.exercises } });
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    height: '100%',
    padding: '8px 20px 120px 20px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: 'white',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
    scrollbarColor: '#e53935 rgba(255,255,255,0.05)',
  };

  return (
    <div className="corsi-scroll" style={containerStyle}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
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

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0 20px 0',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'white',
          margin: 0,
          letterSpacing: '-0.3px',
        }}>La Tua Scheda</h1>
        <div style={{ width: '22px' }} />
      </div>

      {/* Week summary card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(60,12,16,0.85), rgba(30,6,8,0.85))',
        border: '1px solid rgba(229,57,53,0.3)',
        borderRadius: '20px',
        padding: '22px',
        marginBottom: '22px',
        textAlign: 'center',
        boxShadow: '0 0 28px rgba(229,57,53,0.18)',
        animation: 'fadeInUp 0.5s ease-out',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#ff5252',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          margin: '0 0 6px 0',
        }}>Settimana 18-24 Aprile</p>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: 'white',
          margin: '0 0 10px 0',
          letterSpacing: '-0.5px',
        }}>5 Allenamenti</h2>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          margin: 0,
        }}>Generata da AI Personal Trainer</p>
      </div>

      <p style={{
        fontSize: '12px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        margin: '0 0 14px 4px',
      }}>Seleziona un allenamento</p>

      {/* Day cards */}
      {WORKOUTS.map((w, idx) => {
        const expanded = expandedIdx === idx;
        return (
          <div
            key={idx}
            style={{
              background: w.isRest
                ? 'linear-gradient(135deg, rgba(40,40,45,0.6), rgba(20,20,25,0.6))'
                : 'linear-gradient(135deg, rgba(60,12,16,0.85), rgba(30,6,8,0.85))',
              border: w.isRest
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(229,57,53,0.28)',
              borderLeft: w.isRest
                ? '3px solid rgba(255,255,255,0.15)'
                : '3px solid #ef4444',
              borderRadius: '16px',
              padding: '18px 18px',
              marginBottom: '12px',
              transition: 'all 0.3s ease',
              animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`,
              opacity: w.isRest ? 0.7 : 1,
            }}
          >
            <div
              onClick={() => setExpandedIdx(expanded ? null : idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: w.isRest ? 'default' : 'pointer',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px',
                  marginBottom: '4px',
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: w.isRest ? 'rgba(255,255,255,0.4)' : '#ff5252',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>{w.day} {w.date}</span>
                </div>
                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 800,
                  color: 'white',
                  margin: '0 0 4px 0',
                  letterSpacing: '-0.3px',
                }}>{w.type}</h3>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                }}>{w.subtitle} · {w.duration}</p>
              </div>
              {!w.isRest && (
                <div style={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: '#ff5252',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              )}
            </div>

            {expanded && !w.isRest && (
              <div style={{ marginTop: '18px' }}>
                <div style={{
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid rgba(229,57,53,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  marginBottom: '14px',
                }}>
                  {w.exercises.map((ex, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: i < w.exercises.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: 600,
                      }}>{ex.name}</span>
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.55)',
                        fontWeight: 500,
                      }}>
                        {ex.sets}×{ex.reps}{ex.weight ? ` · ${ex.weight}kg` : ''}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleStart(w)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(180deg, #ef4444, #e53935)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: '0 4px 20px rgba(229,57,53,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '12px' }}>▶</span> INIZIA ALLENAMENTO
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SchedaPage;
