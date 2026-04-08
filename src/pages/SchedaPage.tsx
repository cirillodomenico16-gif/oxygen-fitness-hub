import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  image?: string;
}

const EX_IMG: Record<string, string> = {
  'Bench Press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
  'Shoulder Press': 'https://images.unsplash.com/photo-1584863231364-2edc166de576?w=200&h=200&fit=crop',
  'Lat Pulldown': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=200&h=200&fit=crop',
  'Bicep Curl': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop',
  'Tricep Pushdown': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
  'Squat': 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=200&h=200&fit=crop',
  'Leg Press': 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=200&h=200&fit=crop',
  'Romanian Deadlift': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop',
  'Leg Curl': 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=200&h=200&fit=crop',
  'Calf Raises': 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200&h=200&fit=crop',
  'Incline Bench Press': 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?w=200&h=200&fit=crop',
  'Arnold Press': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
  'Cable Fly': 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=200&h=200&fit=crop',
  'Front Raises': 'https://images.unsplash.com/photo-1583454122114-40ffbfd01cd9?w=200&h=200&fit=crop',
  'Overhead Tricep Ext.': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=200&h=200&fit=crop',
  'Deadlift': 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=200&h=200&fit=crop',
  'Pull-ups': 'https://images.unsplash.com/photo-1598971639058-bb2e5a35bdf9?w=200&h=200&fit=crop',
  'Barbell Row': 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=200&h=200&fit=crop',
  'Face Pull': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&h=200&fit=crop',
  'Barbell Curl': 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=200&h=200&fit=crop',
  'Burpees': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
  'Mountain Climbers': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200&h=200&fit=crop',
  'Box Jumps': 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=200&h=200&fit=crop',
  'Battle Ropes 30s': 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=200&h=200&fit=crop',
};

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
        position: 'relative',
        borderRadius: '20px',
        marginBottom: '22px',
        overflow: 'hidden',
        border: '1px solid rgba(229,57,53,0.3)',
        boxShadow: '0 0 28px rgba(229,57,53,0.18)',
        animation: 'fadeInUp 0.5s ease-out',
        minHeight: '180px',
        backgroundImage: `linear-gradient(180deg, rgba(10,0,2,0.35) 0%, rgba(30,6,8,0.82) 55%, rgba(10,0,2,0.95) 100%), url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&h=600&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          padding: '22px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '180px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#ff5252',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>Settimana 18-24 Aprile</p>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: 'white',
            margin: 0,
            letterSpacing: '-0.5px',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}>5 Allenamenti</h2>
        </div>
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
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: i < w.exercises.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        backgroundImage: `url('${EX_IMG[ex.name] || 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop'}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid rgba(229,57,53,0.35)',
                        boxShadow: '0 0 10px rgba(229,57,53,0.2)',
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>{ex.name}</div>
                        <div style={{ fontSize: '11px', color: '#ff8a80', fontWeight: 600, marginTop: '2px' }}>
                          {ex.sets}×{ex.reps}{ex.weight ? ` · ${ex.weight}kg` : ''}
                        </div>
                      </div>
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
