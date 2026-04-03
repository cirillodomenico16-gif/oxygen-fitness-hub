import { useState, useRef, useCallback } from 'react';
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

export default function BookingPage() {
  const [selectedDay, setSelectedDay] = useState('Lun');
  const [booked, setBooked] = useState<Set<number>>(new Set([1]));
  const [toast, setToast] = useState('');
  const [scrollPct, setScrollPct] = useState(0);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? el.scrollTop / max : 0);
    setShowScrollBar(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowScrollBar(false), 1200);
  }, []);

  const todayCourses = courses.filter(c => c.day === selectedDay);

  const toggleBook = (course: Course) => {
    const isFull = course.bookedSpots >= course.spots && !booked.has(course.id);
    if (isFull) {
      setToast(`Lista d'attesa attivata per ${course.name} ✋`);
    } else if (booked.has(course.id)) {
      setBooked(prev => { const n = new Set(prev); n.delete(course.id); return n; });
      setToast(`Prenotazione annullata: ${course.name}`);
    } else {
      setBooked(prev => new Set(prev).add(course.id));
      setToast(`✅ Prenotato: ${course.name} alle ${course.time}`);
    }
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: COLORS.gradientDark, padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <h1 style={{ color: COLORS.text, fontSize: '24px', fontWeight: 800 }}>📅 Prenota Corsi</h1>
        <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '4px' }}>Settimana corrente — Marzo 2026</p>
      </div>

      {/* Day Selector */}
      <div style={{
        display: 'flex', gap: '8px',
        padding: '16px 20px', overflowX: 'auto',
        borderBottom: `1px solid ${COLORS.border}`,
        background: COLORS.dark,
      }}>
        {DAYS.map(day => {
          const count = courses.filter(c => c.day === day).length;
          return (
            <button key={day} onClick={() => setSelectedDay(day)} style={{
              background: selectedDay === day ? COLORS.gradient : COLORS.card,
              border: `1px solid ${selectedDay === day ? COLORS.primary : COLORS.border}`,
              borderRadius: '14px', padding: '10px 16px',
              color: selectedDay === day ? 'white' : COLORS.textSec,
              cursor: 'pointer', flexShrink: 0, textAlign: 'center', minWidth: 60,
              boxShadow: selectedDay === day ? `0 4px 14px ${COLORS.primary}40` : 'none',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{day}</div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>{count} corsi</div>
            </button>
          );
        })}
      </div>

      {/* Courses List */}
      <div style={{ position: 'relative' }}>
        {/* Scroll track */}
        <div style={{
          position: 'absolute', right: '6px', top: '12px',
          bottom: '12px', width: '3px',
          background: `${COLORS.border}`,
          borderRadius: '3px', zIndex: 10,
          opacity: todayCourses.length > 2 ? 1 : 0,
          transition: 'opacity 0.2s',
        }}>
          {/* Thumb */}
          <div style={{
            position: 'absolute',
            top: `${scrollPct * 85}%`,
            left: 0, right: 0,
            height: '15%',
            background: showScrollBar
              ? `linear-gradient(180deg, ${COLORS.primary}, ${COLORS.crimson})`
              : `${COLORS.primary}60`,
            borderRadius: '3px',
            transition: 'top 0.1s ease, background 0.3s ease',
            boxShadow: showScrollBar ? `0 0 6px ${COLORS.primary}80` : 'none',
          }} />
        </div>

        <div
          ref={listRef}
          onScroll={handleScroll}
          style={{
            padding: '20px', paddingRight: '20px',
            display: 'flex', flexDirection: 'column', gap: '12px',
            maxHeight: 'calc(100vh - 300px)',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
        >
        {todayCourses.length === 0 && (
          <div style={{ textAlign: 'center', color: COLORS.muted, padding: '40px 0', fontSize: '14px' }}>
            Nessun corso disponibile questo giorno 🛌
          </div>
        )}
        {todayCourses.map((course) => {
          const isBooked = booked.has(course.id);
          const isFull = course.bookedSpots >= course.spots;
          const pct = Math.min(100, Math.round((course.bookedSpots / course.spots) * 100));
          const catColor = categoryColors[course.category] || COLORS.primary;

          return (
            <div key={course.id} style={{
              background: COLORS.card,
              border: `1px solid ${isBooked ? COLORS.borderBright : COLORS.border}`,
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: isBooked ? `0 0 14px ${COLORS.primary}20` : 'none',
            }}>
              <div style={{
                height: '3px',
                background: `linear-gradient(90deg, ${catColor}, transparent)`,
              }} />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '12px',
                      background: `${catColor}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                    }}>{course.emoji}</div>
                    <div>
                      <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>{course.name}</p>
                      <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '2px' }}>
                        👤 {course.instructor} · ⏱ {course.duration}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: COLORS.text, fontWeight: 800, fontSize: '18px' }}>{course.time}</p>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '8px',
                      background: `${catColor}25`, color: catColor,
                    }}>{course.category}</span>
                  </div>
                </div>

                {/* Spots bar */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: COLORS.muted, fontSize: '11px' }}>Posti disponibili</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 700,
                      color: isFull ? COLORS.primary : pct > 80 ? COLORS.warning : COLORS.success,
                    }}>
                      {isFull ? 'COMPLETO' : `${course.spots - course.bookedSpots} / ${course.spots}`}
                    </span>
                  </div>
                  <div style={{ height: '5px', background: COLORS.dark, borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`, height: '100%',
                      background: isFull ? COLORS.primary : pct > 80 ? COLORS.warning : COLORS.success,
                      borderRadius: '5px',
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '10px',
                    background: COLORS.dark, color: COLORS.textSec, border: `1px solid ${COLORS.border}`,
                  }}>{course.level}</span>
                  <div style={{ flex: 1 }} />
                  <button onClick={() => toggleBook(course)} style={{
                    background: isBooked ? 'transparent' : (isFull ? COLORS.dark : COLORS.gradient),
                    border: `1px solid ${isBooked ? COLORS.primary : (isFull ? COLORS.border : 'transparent')}`,
                    borderRadius: '12px', padding: '9px 20px',
                    color: isBooked ? COLORS.primary : (isFull ? COLORS.muted : 'white'),
                    fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    boxShadow: isBooked ? 'none' : (!isFull ? `0 4px 12px ${COLORS.primary}40` : 'none'),
                  }}>
                    {isBooked ? '✓ Prenotato' : (isFull ? '+ Lista Attesa' : 'Prenota')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>{/* end scrollable list */}
      </div>{/* end relative wrapper */}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '110px', left: '50%', transform: 'translateX(-50%)',
          background: COLORS.card, border: `1px solid ${COLORS.borderBright}`,
          borderRadius: '14px', padding: '12px 20px',
          color: COLORS.text, fontSize: '13px', fontWeight: 600,
          zIndex: 2000, whiteSpace: 'nowrap',
          boxShadow: `0 8px 24px ${COLORS.primary}30`,
        }}>{toast}</div>
      )}
    </div>
  );
}
