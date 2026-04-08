import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';
import { getNotifications } from '../lib/llm';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest?: number; // recovery time in seconds
  image?: string;
}

// Real exercise photos from yuhonas/free-exercise-db (CC0 public domain)
const FE = (slug: string) =>
  `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${slug}/0.jpg`;

const EX_IMG: Record<string, string> = {
  'Bench Press': FE('Barbell_Bench_Press_-_Medium_Grip'),
  'Shoulder Press': FE('Dumbbell_Shoulder_Press'),
  'Lat Pulldown': FE('Wide-Grip_Lat_Pulldown'),
  'Bicep Curl': FE('Dumbbell_Bicep_Curl'),
  'Tricep Pushdown': FE('Tricep_Dumbbell_Kickback'),
  'Squat': FE('Barbell_Squat'),
  'Leg Press': FE('Leg_Press'),
  'Romanian Deadlift': FE('Romanian_Deadlift'),
  'Leg Curl': FE('Lying_Leg_Curls'),
  'Calf Raises': FE('Standing_Calf_Raises'),
  'Incline Bench Press': FE('Barbell_Incline_Bench_Press_-_Medium_Grip'),
  'Arnold Press': FE('Dumbbell_Arnold_Press'),
  'Cable Fly': FE('Cable_Crossover'),
  'Front Raises': FE('Front_Dumbbell_Raise'),
  'Overhead Tricep Ext.': FE('Seated_Dumbbell_Triceps_Extension'),
  'Deadlift': FE('Barbell_Deadlift'),
  'Pull-ups': FE('Pullups'),
  'Barbell Row': FE('Bent_Over_Barbell_Row'),
  'Face Pull': FE('Face_Pull'),
  'Barbell Curl': FE('Barbell_Curl'),
  'Burpees': FE('Burpee'),
  'Mountain Climbers': FE('Mountain_Climbers'),
  'Box Jumps': FE('Box_Jump'),
  'Battle Ropes 30s': FE('Battling_Ropes'),
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
      { name: 'Bench Press', sets: 4, reps: 10, rest: 90 },
      { name: 'Shoulder Press', sets: 4, reps: 10, rest: 75 },
      { name: 'Lat Pulldown', sets: 3, reps: 12, rest: 75 },
      { name: 'Bicep Curl', sets: 3, reps: 12, rest: 60 },
      { name: 'Tricep Pushdown', sets: 3, reps: 15, rest: 60 },
    ],
  },
  {
    day: 'Martedì',
    date: 19,
    type: 'Lower Body',
    subtitle: 'Gambe · Glutei',
    duration: '60 min',
    exercises: [
      { name: 'Squat', sets: 4, reps: 8, rest: 120 },
      { name: 'Leg Press', sets: 4, reps: 12, rest: 90 },
      { name: 'Romanian Deadlift', sets: 3, reps: 10, rest: 90 },
      { name: 'Leg Curl', sets: 3, reps: 12, rest: 60 },
      { name: 'Calf Raises', sets: 4, reps: 15, rest: 45 },
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
      { name: 'Incline Bench Press', sets: 4, reps: 10, rest: 90 },
      { name: 'Arnold Press', sets: 3, reps: 10, rest: 75 },
      { name: 'Cable Fly', sets: 3, reps: 12, rest: 60 },
      { name: 'Front Raises', sets: 3, reps: 12, rest: 45 },
      { name: 'Overhead Tricep Ext.', sets: 3, reps: 12, rest: 60 },
    ],
  },
  {
    day: 'Venerdì',
    date: 22,
    type: 'Pull',
    subtitle: 'Schiena · Bicipiti',
    duration: '55 min',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: 6, rest: 150 },
      { name: 'Pull-ups', sets: 4, reps: 8, rest: 90 },
      { name: 'Barbell Row', sets: 3, reps: 10, rest: 90 },
      { name: 'Face Pull', sets: 3, reps: 15, rest: 45 },
      { name: 'Barbell Curl', sets: 3, reps: 12, rest: 60 },
    ],
  },
  {
    day: 'Sabato',
    date: 23,
    type: 'Cardio HIIT',
    subtitle: 'Alta Intensità',
    duration: '30 min',
    exercises: [
      { name: 'Burpees', sets: 4, reps: 10, rest: 30 },
      { name: 'Mountain Climbers', sets: 4, reps: 20, rest: 30 },
      { name: 'Box Jumps', sets: 4, reps: 15, rest: 45 },
      { name: 'Battle Ropes 30s', sets: 4, reps: 1, rest: 30 },
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
  const location = useLocation();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const validated = (() => {
    try { return JSON.parse(localStorage.getItem('oxy_scheda_1') || 'null'); }
    catch { return null; }
  })();
  const hasUnread = getNotifications('1').some((n) => n.type === 'scheda' && !n.read);
  const forceShow = new URLSearchParams(location.search).get('show') === '1';
  const [overlayOpen, setOverlayOpen] = useState(!!validated && (hasUnread || forceShow));

  const dismissOverlay = () => {
    setOverlayOpen(false);
    try {
      const list = getNotifications('1').map((n) => n.type === 'scheda' ? { ...n, read: true } : n);
      localStorage.setItem('oxy_notif_1', JSON.stringify(list));
    } catch {}
  };

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

      {overlayOpen && validated && (
        <div
          onClick={dismissOverlay}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            animation: 'oxy-fade-up 0.25s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 430,
              maxHeight: '88dvh',
              background: 'linear-gradient(180deg, #120405 0%, #050000 100%)',
              borderTop: '2px solid #ef4444',
              borderRadius: '22px 22px 0 0',
              boxShadow: '0 -20px 60px rgba(239,68,68,0.35)',
              display: 'flex', flexDirection: 'column',
              animation: 'oxy-fade-up 0.35s ease-out',
            }}
          >
            <div style={{
              padding: '18px 20px 14px',
              borderBottom: '1px solid rgba(239,68,68,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', color: '#fca5a5', fontWeight: 800 }}>
                  NUOVA SCHEDA · {validated.date}
                </div>
                <div className="oxy-display" style={{ fontSize: 22, lineHeight: 1.05, marginTop: 4, color: '#fff' }}>
                  Il coach ti ha aggiornato
                </div>
              </div>
              <button onClick={dismissOverlay} style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <pre style={{
              flex: 1,
              whiteSpace: 'pre-wrap', fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12.5, lineHeight: 1.62, margin: 0,
              padding: '18px 22px',
              color: 'rgba(255,255,255,0.92)',
              overflowY: 'auto',
            }}>{validated.plan}</pre>
            <div style={{ padding: '12px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                onClick={dismissOverlay}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(180deg, #ef4444, #b71c1c)',
                  border: 'none', borderRadius: 14,
                  color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em',
                  cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 8px 28px rgba(239,68,68,0.4)',
                }}
              >INIZIA CON LA NUOVA SCHEDA</button>
            </div>
          </div>
        </div>
      )}

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
        <NotificationBell onOpenPlan={(t) => { if (t === 'scheda') setOverlayOpen(true); else navigate('/dieta?show=1'); }} />
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
                          {ex.sets}×{ex.reps} · rec {ex.rest}s
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
