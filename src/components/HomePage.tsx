import { useState } from 'react';
import { COLORS } from '../config/theme';

interface HomePageProps {
  onNavigate: (page: 'booking' | 'workout' | 'progress' | 'community') => void;
}

const todayWorkout = [
  { name: 'Squat', sets: 4, reps: '12', done: true },
  { name: 'Stacco Rumeno', sets: 3, reps: '10', done: true },
  { name: 'Leg Press', sets: 3, reps: '15', done: false },
  { name: 'Leg Curl', sets: 3, reps: '12', done: false },
];

const upcomingCourses = [
  { name: 'HIIT Totale', time: '18:30', instructor: 'Marco R.', emoji: '🔥' },
  { name: 'Yoga Flow', time: '20:00', instructor: 'Sofia B.', emoji: '🧘' },
];

const stats = [
  { label: 'Sessioni', value: '24', unit: 'questo mese', emoji: '🏋️' },
  { label: 'Calorie', value: '12.4k', unit: 'bruciate', emoji: '🔥' },
  { label: 'Streak', value: '18', unit: 'giorni', emoji: '⚡' },
  { label: 'XP', value: '3.2k', unit: 'punti', emoji: '⭐' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Buongiorno';
    if (h < 18) return 'Buon pomeriggio';
    return 'Buonasera';
  });

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: COLORS.gradientDark,
        padding: '60px 20px 24px',
        borderBottom: `1px solid ${COLORS.border}`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -40,
          width: 200, height: 200,
          background: `radial-gradient(circle, ${COLORS.primary}18 0%, transparent 70%)`,
          borderRadius: '50%',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: COLORS.muted, fontSize: '13px', marginBottom: '4px' }}>{greeting} 👋</p>
            <h1 style={{ color: COLORS.text, fontSize: '26px', fontWeight: 800 }}>Alessandro</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <div style={{
                background: COLORS.gradient, borderRadius: '20px',
                padding: '3px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '12px' }}>⚡</span>
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>18 giorni di streak</span>
              </div>
            </div>
          </div>
          <div style={{
            width: 50, height: 50,
            background: COLORS.gradient,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', boxShadow: `0 0 20px ${COLORS.primary}40`,
          }}>A</div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '12px', marginBottom: '24px',
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '16px',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.emoji}</div>
              <div style={{ color: COLORS.text, fontSize: '22px', fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: COLORS.muted, fontSize: '11px', marginTop: '2px' }}>{s.label} · {s.unit}</div>
            </div>
          ))}
        </div>

        {/* XP Progress Bar */}
        <div style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '16px', padding: '18px', marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <span style={{ color: COLORS.text, fontWeight: 700 }}>Livello 12</span>
              <span style={{
                marginLeft: '10px', background: COLORS.gradient,
                borderRadius: '10px', padding: '2px 8px',
                color: 'white', fontSize: '11px', fontWeight: 700,
              }}>⭐ ELITE</span>
            </div>
            <span style={{ color: COLORS.muted, fontSize: '13px' }}>3,200 / 4,000 XP</span>
          </div>
          <div style={{
            height: '8px', background: COLORS.dark, borderRadius: '10px', overflow: 'hidden',
          }}>
            <div style={{
              width: '80%', height: '100%', background: COLORS.gradient,
              borderRadius: '10px',
              boxShadow: `0 0 10px ${COLORS.primary}60`,
            }} />
          </div>
          <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '8px' }}>800 XP al prossimo livello 🚀</p>
        </div>

        {/* Today's Workout */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ color: COLORS.text, fontSize: '17px', fontWeight: 700 }}>💪 Allenamento di Oggi</h2>
            <button onClick={() => onNavigate('workout')} style={{
              background: 'none', border: 'none', color: COLORS.primary,
              fontSize: '13px', cursor: 'pointer', fontWeight: 600,
            }}>Vai →</button>
          </div>
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: '16px', overflow: 'hidden',
          }}>
            {todayWorkout.map((ex, i) => (
              <div key={ex.name} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                borderBottom: i < todayWorkout.length - 1 ? `1px solid ${COLORS.border}` : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: ex.done ? COLORS.gradient : COLORS.dark,
                  border: `2px solid ${ex.done ? COLORS.primary : COLORS.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', flexShrink: 0,
                }}>
                  {ex.done ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: ex.done ? COLORS.textSec : COLORS.text, fontSize: '14px', fontWeight: 600 }}>{ex.name}</p>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>{ex.sets} serie × {ex.reps} reps</p>
                </div>
                {ex.done && <span style={{ color: COLORS.success, fontSize: '12px', fontWeight: 700 }}>FATTO</span>}
              </div>
            ))}
            <div style={{ padding: '14px 16px' }}>
              <button onClick={() => onNavigate('workout')} style={{
                width: '100%', background: COLORS.gradient, border: 'none',
                borderRadius: '12px', padding: '12px',
                color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                boxShadow: `0 4px 15px ${COLORS.primary}40`,
              }}>
                🏋️ Continua Allenamento
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Courses */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ color: COLORS.text, fontSize: '17px', fontWeight: 700 }}>📅 Corsi di Oggi</h2>
            <button onClick={() => onNavigate('booking')} style={{
              background: 'none', border: 'none', color: COLORS.primary,
              fontSize: '13px', cursor: 'pointer', fontWeight: 600,
            }}>Tutti →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {upcomingCourses.map((c) => (
              <div key={c.name} style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: '14px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '14px',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: `${COLORS.primary}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>{c.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: COLORS.text, fontSize: '14px', fontWeight: 700 }}>{c.name}</p>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>{c.instructor} · {c.time}</p>
                </div>
                <button style={{
                  background: COLORS.gradient, border: 'none',
                  borderRadius: '10px', padding: '7px 14px',
                  color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                }}>Prenota</button>
              </div>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.card}, #1e0505)`,
          border: `1px solid ${COLORS.borderBright}`,
          borderRadius: '16px', padding: '20px',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <div style={{ fontSize: '40px' }}>🏆</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>Challenge del Mese</p>
            <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '3px' }}>
              Sei al 3° posto — ancora 2 sessioni per scalare la classifica!
            </p>
          </div>
          <button onClick={() => onNavigate('community')} style={{
            background: COLORS.gradient, border: 'none',
            borderRadius: '10px', padding: '8px 14px',
            color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>Vedi →</button>
        </div>
      </div>
    </div>
  );
}
