import { useState } from 'react';
import { COLORS } from '../config/theme';
import { courses, DAYS, Course } from '../data/courses';

const categoryColors: Record<string, string> = {
  HIIT: COLORS.primary,
  Yoga: '#22c55e',
  Boxe: COLORS.orange,
  Pilates: '#a855f7',
  Cardio: '#3b82f6',
  Forza: '#f59e0b',
};

export default function AdminCalendarPage() {
  const [selectedDay, setSelectedDay] = useState('Lun');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const dayCourses = courses.filter(c => c.day === selectedDay);

  const totalSlots = dayCourses.reduce((a, c) => a + c.spots, 0);
  const usedSlots = dayCourses.reduce((a, c) => a + c.bookedSpots, 0);
  const fillRate = totalSlots > 0 ? Math.round((usedSlots / totalSlots) * 100) : 0;

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0a0202 0%, #060202 100%)',
        padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.borderBright}`,
      }}>
        <h1 style={{ color: COLORS.text, fontSize: '22px', fontWeight: 800 }}>📅 Calendario Corsi</h1>
        <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '4px' }}>
          Gestione presenze e lista d'attesa
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
          {[
            { label: 'Corsi oggi', value: dayCourses.length, color: COLORS.primary },
            { label: 'Posti usati', value: `${usedSlots}/${totalSlots}`, color: COLORS.info },
            { label: 'Fill rate', value: `${fillRate}%`, color: fillRate > 80 ? COLORS.warning : COLORS.success },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px', padding: '10px', textAlign: 'center',
            }}>
              <p style={{ color: s.color, fontWeight: 800, fontSize: '16px' }}>{s.value}</p>
              <p style={{ color: COLORS.muted, fontSize: '10px', marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Day Selector */}
      <div style={{
        display: 'flex', gap: '8px', padding: '14px 20px',
        overflowX: 'auto', background: COLORS.dark,
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        {DAYS.map(day => {
          const cnt = courses.filter(c => c.day === day).length;
          const isFull = courses.filter(c => c.day === day).some(c => c.bookedSpots >= c.spots);
          return (
            <button key={day} onClick={() => { setSelectedDay(day); setSelectedCourse(null); }} style={{
              background: selectedDay === day ? COLORS.gradient : COLORS.card,
              border: `1px solid ${selectedDay === day ? COLORS.primary : COLORS.border}`,
              borderRadius: '12px', padding: '9px 14px',
              color: selectedDay === day ? 'white' : COLORS.textSec,
              cursor: 'pointer', flexShrink: 0, textAlign: 'center', minWidth: 55,
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{day}</div>
              <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>
                {cnt} {isFull ? '🔴' : '🟢'}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {dayCourses.map((course) => {
          const pct = Math.round((course.bookedSpots / course.spots) * 100);
          const isFull = course.bookedSpots >= course.spots;
          const catColor = categoryColors[course.category] || COLORS.primary;
          const isSelected = selectedCourse?.id === course.id;

          return (
            <div key={course.id}>
              <div
                onClick={() => setSelectedCourse(isSelected ? null : course)}
                style={{
                  background: isSelected ? `${COLORS.primary}08` : COLORS.card,
                  border: `1px solid ${isSelected ? COLORS.borderBright : COLORS.border}`,
                  borderRadius: '16px', padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '12px',
                    background: `${catColor}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', flexShrink: 0,
                  }}>{course.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>{course.name}</p>
                      <p style={{ color: COLORS.text, fontWeight: 800, fontSize: '16px' }}>{course.time}</p>
                    </div>
                    <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '2px' }}>
                      {course.instructor} · {course.duration} · {course.level}
                    </p>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: COLORS.muted, fontSize: '11px' }}>
                          {course.bookedSpots} / {course.spots} prenotati
                        </span>
                        <span style={{
                          color: isFull ? COLORS.primary : pct > 80 ? COLORS.warning : COLORS.success,
                          fontWeight: 700, fontSize: '11px',
                        }}>{pct}%</span>
                      </div>
                      <div style={{ height: '4px', background: COLORS.dark, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${pct}%`, height: '100%',
                          background: isFull ? COLORS.primary : pct > 80 ? COLORS.warning : COLORS.success,
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Admin Actions */}
              {isSelected && (
                <div style={{
                  background: COLORS.dark, border: `1px solid ${COLORS.border}`,
                  borderRadius: '0 0 14px 14px', borderTop: 'none',
                  padding: '14px 16px', marginTop: '-8px',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{
                      background: COLORS.gradient, border: 'none', borderRadius: '10px',
                      padding: '8px 14px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                    }}>✏️ Modifica Corso</button>
                    <button style={{
                      background: COLORS.card, border: `1px solid ${COLORS.border}`,
                      borderRadius: '10px', padding: '8px 14px',
                      color: COLORS.textSec, fontSize: '12px', cursor: 'pointer',
                    }}>👥 Vedi Presenti ({course.bookedSpots})</button>
                    {isFull && (
                      <button style={{
                        background: `${COLORS.warning}20`, border: `1px solid ${COLORS.warning}40`,
                        borderRadius: '10px', padding: '8px 14px',
                        color: COLORS.warning, fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                      }}>⏳ Lista Attesa</button>
                    )}
                    <button style={{
                      background: `${COLORS.primary}15`, border: `1px solid ${COLORS.border}`,
                      borderRadius: '10px', padding: '8px 14px',
                      color: COLORS.primary, fontSize: '12px', cursor: 'pointer',
                    }}>📣 Notifica Soci</button>
                  </div>
                  <p style={{ color: COLORS.muted, fontSize: '11px' }}>
                    💡 Lista d'attesa: {isFull ? '3 persone in coda' : 'Nessuno in attesa'}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Course Button */}
        <button style={{
          background: 'none', border: `2px dashed ${COLORS.border}`,
          borderRadius: '16px', padding: '16px',
          color: COLORS.muted, fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          ➕ Aggiungi Nuovo Corso
        </button>
      </div>
    </div>
  );
}
