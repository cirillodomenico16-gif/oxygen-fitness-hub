import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COURSE_TYPES = ['CrossFit Extreme', 'Yoga Flow', 'HIIT Blast', 'Boxing Cardio', 'Pilates', 'Spinning', 'Zumba', 'Functional Training', 'Pump', 'Stretching'];
const ROOMS = ['Sala A', 'Sala B', 'Sala C', 'Sala Pesi', 'Sala Spin'];
const TRAINERS = ['Luca Moretti', 'Anna Costa', 'Giulio Ferri', 'Sara Bianchi', 'Matteo Rinaldi'];
const DURATIONS = ['30 min', '45 min', '60 min', '75 min', '90 min'];

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

const INITIAL_COURSES: CourseBlock[] = [
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
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseBlock[]>(INITIAL_COURSES);
  const [selected, setSelected] = useState<number | null>(1);
  const [weekOffset, setWeekOffset] = useState(0);

  // Compute Monday of the current week + offset
  const today = new Date();
  const monday = new Date(today);
  const dow = (today.getDay() + 6) % 7; // 0 = Monday
  monday.setDate(today.getDate() - dow + weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  const MONTHS = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
  const weekLabel = `${weekDays[0].getDate()} ${MONTHS[weekDays[0].getMonth()]} – ${weekDays[6].getDate()} ${MONTHS[weekDays[6].getMonth()]}`;
  const [showNew, setShowNew] = useState(false);
  const [editCourse, setEditCourse] = useState<CourseBlock | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<CourseBlock | null>(null);
  const [form, setForm] = useState({ tipo: COURSE_TYPES[0], giorno: 'Lun', orario: '10:00', durata: '60 min', pt: TRAINERS[0], sala: ROOMS[0], capacita: '15' });
  const [toast, setToast] = useState<string | null>(null);

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourse) return;
    setCourses(courses.map((c) => c.id === editCourse.id ? editCourse : c));
    setToast(`✅ Corso "${editCourse.name}" modificato`);
    setEditCourse(null);
    setTimeout(() => setToast(null), 3000);
  };

  const cancelLesson = () => {
    if (!confirmCancel) return;
    setCourses(courses.filter((c) => c.id !== confirmCancel.id));
    setToast(`❌ Lezione "${confirmCancel.name}" annullata`);
    if (selected === confirmCancel.id) setSelected(null);
    setConfirmCancel(null);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNew(false);
    setToast(`✅ Corso "${form.tipo}" creato per ${form.giorno} ${form.orario}`);
    setTimeout(() => setToast(null), 3500);
  };

  const course = courses.find((c) => c.id === selected);

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
        <button onClick={() => setWeekOffset(weekOffset - 1)} style={navBtn}>‹</button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800 }}>{weekLabel}</div>
          {weekOffset !== 0 && (
            <button onClick={() => setWeekOffset(0)} style={{
              background: 'transparent', border: 'none', color: '#ff5252',
              fontSize: '9px', fontWeight: 700, cursor: 'pointer', padding: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.5px',
            }}>↻ Torna a oggi</button>
          )}
        </div>
        <button onClick={() => setWeekOffset(weekOffset + 1)} style={navBtn}>›</button>
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
        {['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map((lbl, i) => {
          const isToday = weekDays[i].toDateString() === new Date().toDateString();
          return (
            <div key={lbl} style={{ width: colW, textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: isToday ? '#ff5252' : 'rgba(255,255,255,0.55)', fontWeight: 700 }}>{lbl}</div>
              <div style={{ fontSize: '11px', color: isToday ? '#ff5252' : 'white', fontWeight: 800 }}>{weekDays[i].getDate()}</div>
            </div>
          );
        })}
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
        {courses.map((c) => {
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

      {/* Action buttons */}
      <button onClick={() => setShowNew(true)} style={{
        width: '100%', padding: '14px',
        background: 'linear-gradient(180deg, #ef4444, #e53935)',
        border: 'none', borderRadius: '999px',
        color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
        boxShadow: '0 0 26px rgba(229,57,53,0.6)',
        fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '10px',
      }}>+ Nuovo Corso</button>

      <button onClick={() => navigate('/admin/calendario/agent-programmazione')} style={{
        width: '100%', padding: '14px',
        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        border: '1px solid #a78bfa', borderRadius: '999px',
        color: 'white', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
        boxShadow: '0 0 26px rgba(139,92,246,0.55)',
        fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '16px',
        letterSpacing: '0.3px',
      }}>🤖 GENERA PROGRAMMAZIONE AI</button>

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
          <button onClick={() => setEditCourse({ ...course })} style={{
            width: '100%', padding: '12px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '10px', color: 'white',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            marginBottom: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>✏️ Modifica Corso</button>
          <button onClick={() => setConfirmCancel(course)} style={{
            width: '100%', padding: '8px',
            background: 'transparent', border: 'none',
            color: '#ff5252', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>❌ Annulla Lezione</button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg,#ef4444,#b71c1c)', color: '#fff',
          padding: '12px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: 800,
          boxShadow: '0 8px 24px rgba(229,57,53,0.6)', zIndex: 300,
          border: '1px solid #ff5252', maxWidth: '90%', textAlign: 'center',
        }}>{toast}</div>
      )}

      {/* Edit Course Modal */}
      {editCourse && (
        <div onClick={() => setEditCourse(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 220, backdropFilter: 'blur(4px)',
        }}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={saveEdit} style={{
            width: '100%', maxWidth: '430px', background: '#0a0a0a',
            border: '1.5px solid rgba(229,57,53,0.6)',
            borderRadius: '24px 24px 0 0', padding: '22px 22px 26px',
            boxShadow: '0 -10px 40px rgba(229,57,53,0.4)',
            animation: 'slideUp 0.3s ease-out',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', margin: '0 auto 14px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#ff5252' }}>✏️ Modifica Corso</h2>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', margin: '0 0 18px' }}>{editCourse.name}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>GIORNO</div>
                <select value={editCourse.day} onChange={(e) => setEditCourse({ ...editCourse, day: parseInt(e.target.value) })} style={modalInput}>
                  {['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map((d, i) => <option key={d} value={i} style={{ background: '#0a0a0a' }}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>ORARIO</div>
                <select value={editCourse.startHour} onChange={(e) => setEditCourse({ ...editCourse, startHour: parseInt(e.target.value) })} style={modalInput}>
                  {Array.from({length:16},(_,i)=>i+6).map((h) => <option key={h} value={h} style={{ background: '#0a0a0a' }}>{String(h).padStart(2,'0')}:00</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>SALA</div>
              <select value={editCourse.room} onChange={(e) => setEditCourse({ ...editCourse, room: e.target.value })} style={modalInput}>
                {ROOMS.map((r) => <option key={r} style={{ background: '#0a0a0a' }}>{r}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>PERSONAL TRAINER</div>
              <select value={editCourse.coach} onChange={(e) => setEditCourse({ ...editCourse, coach: e.target.value })} style={modalInput}>
                {TRAINERS.map((t) => <option key={t} style={{ background: '#0a0a0a' }}>{t}</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>DURATA (ore)</div>
                <select value={editCourse.duration} onChange={(e) => setEditCourse({ ...editCourse, duration: parseInt(e.target.value) })} style={modalInput}>
                  {[1,2,3].map((d) => <option key={d} value={d} style={{ background: '#0a0a0a' }}>{d}h</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>CAPACITÀ</div>
                <input type="number" min="1" value={editCourse.capacity} onChange={(e) => setEditCourse({ ...editCourse, capacity: parseInt(e.target.value) || 1 })} style={modalInput} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setEditCourse(null)} style={{
                flex: 1, padding: '13px', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Annulla</button>
              <button type="submit" style={{
                flex: 2, padding: '13px',
                background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
                border: '1px solid #ff5252', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px',
                cursor: 'pointer', boxShadow: '0 6px 18px rgba(229,57,53,0.5)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>💾 SALVA MODIFICHE</button>
            </div>
          </form>
        </div>
      )}

      {/* Confirm Cancel */}
      {confirmCancel && (
        <div onClick={() => setConfirmCancel(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 230, backdropFilter: 'blur(4px)', padding: '20px',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', maxWidth: '360px', background: '#0a0a0a',
            border: '1.5px solid rgba(239,68,68,0.6)', borderRadius: '18px',
            padding: '22px', textAlign: 'center',
            boxShadow: '0 0 40px rgba(239,68,68,0.5)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            <div style={{ fontSize: '36px', marginBottom: '6px' }}>⚠️</div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px', color: '#ff5252' }}>Annullare la lezione?</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '0 0 18px', lineHeight: 1.5 }}>
              Stai per annullare <b>{confirmCancel.name}</b> del giorno {DAYS[confirmCancel.day].lbl} {String(confirmCancel.startHour).padStart(2,'0')}:00. {confirmCancel.enrolled} soci verranno notificati.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmCancel(null)} style={{
                flex: 1, padding: '12px', background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>No, torna indietro</button>
              <button onClick={cancelLesson} style={{
                flex: 1, padding: '12px',
                background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
                border: '1px solid #ff5252', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(229,57,53,0.5)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Sì, annulla</button>
            </div>
          </div>
        </div>
      )}

      {/* New Course Modal */}
      {showNew && (
        <div onClick={() => setShowNew(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 200, backdropFilter: 'blur(4px)',
        }}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={handleCreate} style={{
            width: '100%', maxWidth: '430px',
            background: '#0a0a0a',
            border: '1.5px solid rgba(229,57,53,0.6)',
            borderRadius: '24px 24px 0 0',
            padding: '22px 22px 26px',
            boxShadow: '0 -10px 40px rgba(229,57,53,0.4)',
            animation: 'slideUp 0.3s ease-out',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', margin: '0 auto 14px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#ff5252' }}>+ Nuovo Corso</h2>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', margin: '0 0 18px' }}>Compila i dati per pianificare il corso</p>

            {[
              { k: 'tipo', l: 'TIPO CORSO', opts: COURSE_TYPES },
              { k: 'giorno', l: 'GIORNO', opts: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'] },
              { k: 'durata', l: 'DURATA', opts: DURATIONS },
              { k: 'pt', l: 'PERSONAL TRAINER', opts: TRAINERS },
              { k: 'sala', l: 'SALA', opts: ROOMS },
            ].map((f) => (
              <div key={f.k} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>{f.l}</div>
                <select
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  style={{
                    width: '100%', padding: '12px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1.5px solid rgba(229,57,53,0.4)', borderRadius: '12px',
                    color: '#fff', fontSize: '13px', outline: 'none',
                    fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box',
                  }}>
                  {f.opts.map((o) => <option key={o} style={{ background: '#0a0a0a' }}>{o}</option>)}
                </select>
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>ORARIO</div>
                <input type="time" value={form.orario} onChange={(e) => setForm({ ...form, orario: e.target.value })} style={{
                  width: '100%', padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(229,57,53,0.4)', borderRadius: '12px',
                  color: '#fff', fontSize: '13px', outline: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box',
                }} />
              </div>
              <div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>CAPACITÀ</div>
                <input type="number" min="1" value={form.capacita} onChange={(e) => setForm({ ...form, capacita: e.target.value })} style={{
                  width: '100%', padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(229,57,53,0.4)', borderRadius: '12px',
                  color: '#fff', fontSize: '13px', outline: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setShowNew(false)} style={{
                flex: 1, padding: '13px', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Annulla</button>
              <button type="submit" style={{
                flex: 2, padding: '13px',
                background: 'linear-gradient(135deg,#ef4444,#b71c1c)',
                border: '1px solid #ff5252', borderRadius: '12px',
                color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px',
                cursor: 'pointer', boxShadow: '0 6px 18px rgba(229,57,53,0.5)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>✅ CREA CORSO</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const modalInput: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(229,57,53,0.4)', borderRadius: '12px',
  color: '#fff', fontSize: '13px', outline: 'none',
  fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box',
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
