import React, { useState } from 'react';

interface CourseBlock {
  id: number;
  day: number; // 0..6 (Lun..Dom)
  startHour: number; // e.g. 7
  duration: number; // hours
  name: string;
  room: string;
  coach: string;
  color: 'red' | 'orange';
  enrolled: number;
  capacity: number;
  waiting: number;
}

const COURSES: CourseBlock[] = [
  { id: 1, day: 0, startHour: 7, duration: 1, name: 'CrossFit Extreme', room: 'Sala A', coach: 'Luca', color: 'red', enrolled: 14, capacity: 20, waiting: 3 },
  { id: 2, day: 0, startHour: 10, duration: 1, name: 'Yoga Flow', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 12, capacity: 15, waiting: 0 },
  { id: 3, day: 2, startHour: 7, duration: 2, name: 'HIIT Blast', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 18, capacity: 20, waiting: 2 },
  { id: 4, day: 2, startHour: 9, duration: 1, name: 'Yoga Flow', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 10, capacity: 15, waiting: 0 },
  { id: 5, day: 3, startHour: 7, duration: 1, name: 'HIIT Blast', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 15, capacity: 20, waiting: 0 },
  { id: 6, day: 3, startHour: 12, duration: 1, name: 'Bosing Cardio', room: 'Sala A', coach: 'Coach', color: 'orange', enrolled: 8, capacity: 12, waiting: 0 },
  { id: 7, day: 4, startHour: 7, duration: 1, name: 'HIIT Blast', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 16, capacity: 20, waiting: 0 },
  { id: 8, day: 5, startHour: 7, duration: 1, name: 'CrossFit Extreme', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 13, capacity: 20, waiting: 0 },
  { id: 9, day: 6, startHour: 10, duration: 1, name: 'HIIT Blast', room: 'Sala A', coach: 'Coach', color: 'red', enrolled: 11, capacity: 20, waiting: 0 },
];

const DAYS = [
  { lbl: 'Lun', d: 24 },
  { lbl: 'Mar', d: 25 },
  { lbl: 'Mer', d: 26 },
  { lbl: 'Gio', d: 27 },
  { lbl: 'Ven', d: 28 },
  { lbl: 'Sab', d: 29 },
  { lbl: 'Dom', d: 30 },
];

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6); // 06:00 → 21:00

const AVATARS = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
];

const AdminCalendar: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(1);

  const course = COURSES.find((c) => c.id === selected);

  const rowH = 48;
  const colW = `calc((100% - 52px) / 7)`;

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, rgba(30,5,8,1), #000 60%)',
      padding: '14px 16px 120px 16px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: 'white',
      overflowY: 'auto',
    }}>
      <style>{`
        .corsi-scroll::-webkit-scrollbar { width:6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
        @keyframes fadeInUp { from {opacity:0; transform:translateY(14px);} to{opacity:1; transform:translateY(0);} }
        @keyframes slideUp { from {transform:translateY(100%);} to{transform:translateY(0);} }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', padding: '6px 6px 0 6px' }}>
        <span style={{ fontSize: '22px' }}>📅</span>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>Calendario Corsi</h1>
      </div>

      {/* Week selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(229,57,53,0.08)',
        border: '1.5px solid rgba(229,57,53,0.4)',
        borderRadius: '14px',
        padding: '10px 14px',
        marginBottom: '14px',
      }}>
        <button style={navBtn}>‹</button>
        <div style={{ fontSize: '14px', fontWeight: 800 }}>Sett. 24 – 30 Mar</div>
        <button style={navBtn}>›</button>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '18px' }}>
        {[
          { val: '8', lbl: 'Corsi settimana' },
          { val: '142', lbl: 'Presenze' },
          { val: '89%', lbl: 'Fill rate' },
        ].map((s) => (
          <div key={s.lbl} style={{
            background: 'rgba(229,57,53,0.06)',
            border: '1.5px solid rgba(229,57,53,0.4)',
            borderRadius: '14px',
            padding: '12px 4px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ff5252' }}>{s.val}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Day headers */}
      <div style={{ display: 'flex', marginBottom: '2px', paddingLeft: '52px' }}>
        {DAYS.map((d) => (
          <div key={d.lbl} style={{ width: colW, textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>{d.lbl}</div>
            <div style={{ fontSize: '11px', color: 'white', fontWeight: 800 }}>{d.d}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        position: 'relative',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(229,57,53,0.25)',
        borderRadius: '12px',
        padding: '6px 0 6px 0',
        marginBottom: '16px',
      }}>
        {HOURS.map((h, hi) => (
          <div key={h} style={{ display: 'flex', height: rowH, borderBottom: hi < HOURS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{
              width: '52px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'right',
              paddingRight: '8px',
              paddingTop: '2px',
            }}>
              {String(h).padStart(2, '0')}:00
            </div>
            {DAYS.map((_, di) => (
              <div key={di} style={{
                width: colW,
                borderLeft: '1px solid rgba(255,255,255,0.04)',
                position: 'relative',
              }} />
            ))}
          </div>
        ))}

        {/* Course blocks — absolute positioned inside */}
        {COURSES.map((c) => {
          const topOffset = 6 + (c.startHour - 6) * rowH;
          const leftPct = `calc(52px + ${c.day} * ${colW} + 2px)`;
          const widthCalc = `calc(${colW} - 4px)`;
          const isSelected = selected === c.id;
          const bg = c.color === 'orange'
            ? 'linear-gradient(180deg, #f97316, #c2410c)'
            : 'linear-gradient(180deg, #ef4444, #b71c1c)';
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                position: 'absolute',
                top: topOffset,
                left: leftPct,
                width: widthCalc,
                height: c.duration * rowH - 4,
                background: bg,
                border: isSelected ? '2px solid white' : '1px solid rgba(0,0,0,0.3)',
                borderRadius: '6px',
                padding: '4px 5px',
                fontSize: '8px',
                fontWeight: 800,
                color: 'white',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: isSelected ? '0 0 16px rgba(255,255,255,0.5)' : '0 0 8px rgba(229,57,53,0.5)',
                lineHeight: 1.15,
              }}
            >
              <div>{String(c.startHour).padStart(2, '0')}:00</div>
              <div style={{ fontSize: '9px', fontWeight: 900 }}>{c.name}</div>
              <div style={{ fontSize: '7px', opacity: 0.85, marginTop: '2px' }}>{c.room}</div>
              <div style={{ fontSize: '7px', opacity: 0.85 }}>· {c.coach}</div>
            </div>
          );
        })}
      </div>

      {/* New course button */}
      <button style={{
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(180deg, #ef4444, #e53935)',
        border: 'none',
        borderRadius: '999px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: '0 0 26px rgba(229,57,53,0.6)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginBottom: '16px',
      }}>
        + Nuovo Corso
      </button>

      {/* Course detail modal/card */}
      {course && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(60,12,16,0.95), rgba(30,6,8,0.95))',
          border: '1.5px solid rgba(229,57,53,0.55)',
          borderRadius: '18px',
          padding: '18px',
          boxShadow: '0 0 30px rgba(229,57,53,0.3)',
          animation: 'fadeInUp 0.35s ease-out',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(180deg, #ef4444, #b71c1c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
              boxShadow: '0 0 10px rgba(229,57,53,0.6)',
            }}>🏋️</div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{course.name}</h3>
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}>
            {DAYS[course.day].lbl}dì {String(course.startHour).padStart(2,'0')}:00 · {course.room} · Coach: {course.coach}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'white' }}>
              {course.enrolled}/{course.capacity} iscritti
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              {AVATARS.map((a, i) => (
                <div key={i} style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  backgroundImage: `url('${a}')`, backgroundSize: 'cover', backgroundPosition: 'center',
                  border: '2px solid #1a0004',
                  marginLeft: i === 0 ? 0 : '-8px',
                }} />
              ))}
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: 'rgba(229,57,53,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px', fontWeight: 800, marginLeft: '-8px',
                border: '2px solid #1a0004',
              }}>+9</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{
              width: `${(course.enrolled / course.capacity) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ef4444, #ff5252)',
              boxShadow: '0 0 10px rgba(229,57,53,0.7)',
            }} />
          </div>
          {course.waiting > 0 && (
            <div style={{ textAlign: 'right', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
              👥 {course.waiting} in lista d'attesa
            </div>
          )}
          <button style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '8px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Modifica Corso
          </button>
          <button style={{
            width: '100%',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            color: '#ff5252',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Annulla Lezione
          </button>
        </div>
      )}
    </div>
  );
};

const navBtn: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#ff5252',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '0 8px',
};

export default AdminCalendar;
