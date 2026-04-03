import { useState, useEffect } from 'react';
import { COLORS } from '../config/theme';

interface Exercise {
  name: string;
  emoji: string;
  sets: { reps: number; weight: number; done: boolean }[];
  restTime: number;
}

interface WorkoutPlan {
  content: string;
  generatedAt: string;
}

const initialExercises: Exercise[] = [
  {
    name: 'Squat Bilanciere', emoji: '🏋️',
    sets: [
      { reps: 12, weight: 80, done: true },
      { reps: 12, weight: 80, done: true },
      { reps: 10, weight: 85, done: false },
      { reps: 10, weight: 85, done: false },
    ],
    restTime: 90,
  },
  {
    name: 'Stacco Rumeno', emoji: '💪',
    sets: [
      { reps: 10, weight: 70, done: false },
      { reps: 10, weight: 70, done: false },
      { reps: 10, weight: 70, done: false },
    ],
    restTime: 90,
  },
  {
    name: 'Leg Press', emoji: '🦵',
    sets: [
      { reps: 15, weight: 120, done: false },
      { reps: 15, weight: 120, done: false },
      { reps: 12, weight: 130, done: false },
    ],
    restTime: 75,
  },
  {
    name: 'Leg Curl', emoji: '🎯',
    sets: [
      { reps: 12, weight: 40, done: false },
      { reps: 12, weight: 40, done: false },
      { reps: 10, weight: 45, done: false },
    ],
    restTime: 60,
  },
];

export default function WorkoutPage() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [activeEx, setActiveEx] = useState(0);
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  // Load workout plan from localStorage
  useEffect(() => {
    try {
      const userId = localStorage.getItem('currentUserId') || 'default';
      const planKey = `o2_plans_${userId}_workout`;
      const storedPlan = localStorage.getItem(planKey);
      if (storedPlan) {
        const parsed = JSON.parse(storedPlan);
        if (parsed.content) {
          setWorkoutPlan(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading workout plan:', err);
    }
  }, []);

  // Session timer
  useEffect(() => {
    const t = setInterval(() => setSessionTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Rest timer countdown
  useEffect(() => {
    if (!timerRunning || restTimer === null) return;
    if (restTimer <= 0) { setTimerRunning(false); setRestTimer(null); return; }
    const t = setTimeout(() => setRestTimer(r => (r ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [timerRunning, restTimer]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleSet = (exIdx: number, setIdx: number) => {
    setExercises(prev => {
      const updated = prev.map((ex, ei) => ei !== exIdx ? ex : {
        ...ex,
        sets: ex.sets.map((s, si) => si !== setIdx ? s : { ...s, done: !s.done }),
      });
      return updated;
    });
    // Start rest timer
    const ex = exercises[exIdx];
    setRestTimer(ex.restTime);
    setTimerRunning(true);
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const doneSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.done).length, 0);
  const pct = Math.round((doneSets / totalSets) * 100);
  const xpGained = doneSets * 15;

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: COLORS.gradientDark, padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: COLORS.text, fontSize: '22px', fontWeight: 800 }}>💪 Allenamento Attivo</h1>
            <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '4px' }}>Gambe & Glutei — Domenica</p>
          </div>
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: '14px', padding: '10px 16px', textAlign: 'center',
          }}>
            <p style={{ color: COLORS.primary, fontSize: '22px', fontWeight: 800 }}>{formatTime(sessionTime)}</p>
            <p style={{ color: COLORS.muted, fontSize: '11px' }}>durata</p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: COLORS.textSec, fontSize: '12px' }}>{doneSets} / {totalSets} serie completate</span>
            <span style={{ color: COLORS.primary, fontSize: '12px', fontWeight: 700 }}>+{xpGained} XP 🌟</span>
          </div>
          <div style={{ height: '6px', background: COLORS.dark, borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              width: `${pct}%`, height: '100%', background: COLORS.gradient,
              borderRadius: '10px', transition: 'width 0.3s ease',
              boxShadow: `0 0 8px ${COLORS.primary}50`,
            }} />
          </div>
        </div>
      </div>

      {/* Rest Timer */}
      {timerRunning && restTimer !== null && (
        <div style={{
          margin: '16px 20px 0',
          background: `${COLORS.primary}15`,
          border: `1px solid ${COLORS.primary}40`,
          borderRadius: '16px', padding: '16px',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: COLORS.primary, fontSize: '32px', fontWeight: 900 }}>{restTimer}s</p>
            <p style={{ color: COLORS.muted, fontSize: '11px' }}>RIPOSO</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: '4px', background: COLORS.dark, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${(restTimer / exercises[activeEx]?.restTime) * 100}%`,
                height: '100%', background: COLORS.gradient,
                transition: 'width 1s linear',
              }} />
            </div>
            <p style={{ color: COLORS.textSec, fontSize: '12px', marginTop: '6px' }}>Recupero in corso... ottimo lavoro! 💪</p>
          </div>
          <button onClick={() => { setTimerRunning(false); setRestTimer(null); }} style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: '10px', padding: '8px 14px',
            color: COLORS.textSec, fontSize: '12px', cursor: 'pointer',
          }}>Skip</button>
        </div>
      )}

      {/* Exercise Tabs */}
      <div style={{
        display: 'flex', gap: '8px', padding: '16px 20px',
        overflowX: 'auto', borderBottom: `1px solid ${COLORS.border}`,
      }}>
        {exercises.map((ex, i) => {
          const allDone = ex.sets.every(s => s.done);
          return (
            <button key={ex.name} onClick={() => setActiveEx(i)} style={{
              background: activeEx === i ? COLORS.gradient : COLORS.card,
              border: `1px solid ${activeEx === i ? COLORS.primary : (allDone ? COLORS.success : COLORS.border)}`,
              borderRadius: '12px', padding: '8px 14px',
              color: activeEx === i ? 'white' : (allDone ? COLORS.success : COLORS.textSec),
              cursor: 'pointer', flexShrink: 0, fontSize: '13px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span>{ex.emoji}</span>
              <span>{ex.name.split(' ')[0]}</span>
              {allDone && <span>✓</span>}
            </button>
          );
        })}
      </div>

      {/* Scheda Settimanale (Weekly Workout Schedule) */}
      {workoutPlan && (
        <div style={{ padding: '20px', borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: '16px', padding: '16px', marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px' }}>📋</span>
              <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700 }}>Scheda Settimanale</h3>
            </div>
            <p style={{ color: COLORS.muted, fontSize: '11px', marginBottom: '10px' }}>
              Generata: {new Date(workoutPlan.generatedAt).toLocaleDateString('it-IT')}
            </p>
            <div style={{
              background: COLORS.bg, borderRadius: '12px', padding: '14px',
              maxHeight: '300px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '11px',
              color: COLORS.textSec, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              lineHeight: '1.5',
            }}>
              {workoutPlan.content}
            </div>
          </div>
        </div>
      )}

      {/* Active Exercise */}
      <div style={{ padding: '20px' }}>
        {exercises[activeEx] && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ color: COLORS.text, fontSize: '19px', fontWeight: 800 }}>
                  {exercises[activeEx].emoji} {exercises[activeEx].name}
                </h2>
                <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '3px' }}>
                  Riposo: {exercises[activeEx].restTime}s · {exercises[activeEx].sets.length} serie
                </p>
              </div>
            </div>

            {/* Sets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exercises[activeEx].sets.map((set, si) => (
                <div key={si} style={{
                  background: set.done ? `${COLORS.primary}10` : COLORS.card,
                  border: `1px solid ${set.done ? COLORS.primary : COLORS.border}`,
                  borderRadius: '14px', padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: set.done ? COLORS.gradient : COLORS.dark,
                    border: `2px solid ${set.done ? COLORS.primary : COLORS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '13px', fontWeight: 800, flexShrink: 0,
                  }}>{set.done ? '✓' : si + 1}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: COLORS.text, fontSize: '15px', fontWeight: 700 }}>
                      {set.reps} reps × {set.weight} kg
                    </p>
                    {set.done && <p style={{ color: COLORS.success, fontSize: '11px' }}>+{set.reps * 2} XP guadagnati</p>}
                  </div>
                  {!set.done && (
                    <button onClick={() => toggleSet(activeEx, si)} style={{
                      background: COLORS.gradient, border: 'none',
                      borderRadius: '10px', padding: '9px 16px',
                      color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                      boxShadow: `0 4px 12px ${COLORS.primary}40`,
                    }}>Fatto ✓</button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
