import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Intensity = 'Alta Intensità' | 'Media Intensità' | 'Bassa Intensità';
type Status = 'available' | 'full' | 'almost_full';

interface Course {
  id: number;
  name: string;
  time: string;
  duration: string;
  room: string;
  instructor: string;
  intensity: Intensity;
  current: number;
  capacity: number;
  status: Status;
}

const DAYS = [
  { label: 'LUN', date: 18 },
  { label: 'Mar', date: 19 },
  { label: 'Mer', date: 20 },
  { label: 'Gio', date: 21 },
  { label: 'Ven', date: 22 },
  { label: 'Sab', date: 23 },
  { label: 'Dom', date: 24 },
];

const COURSES: Course[] = [
  {
    id: 1,
    name: 'CrossFit Extreme',
    time: '07:00',
    duration: '60 min',
    room: 'Sala A',
    instructor: 'Marco Rossi',
    intensity: 'Alta Intensità',
    current: 12,
    capacity: 20,
    status: 'available',
  },
  {
    id: 2,
    name: 'Boxing Power',
    time: '10:30',
    duration: '45 min',
    room: 'Ring',
    instructor: 'Giulia Bianchi',
    intensity: 'Media Intensità',
    current: 18,
    capacity: 18,
    status: 'full',
  },
  {
    id: 3,
    name: 'HIIT Burn',
    time: '18:00',
    duration: '30 min',
    room: 'Sala B',
    instructor: 'Luca Verdi',
    intensity: 'Alta Intensità',
    current: 15,
    capacity: 20,
    status: 'almost_full',
  },
  {
    id: 4,
    name: 'Functional Training',
    time: '20:00',
    duration: '55 min',
    room: 'Sala C',
    instructor: 'Sara Esposito',
    intensity: 'Media Intensità',
    current: 15,
    capacity: 20,
    status: 'available',
  },
  {
    id: 5,
    name: 'Yoga Flow',
    time: '21:00',
    duration: '60 min',
    room: 'Sala D',
    instructor: 'Elena Moretti',
    intensity: 'Bassa Intensità',
    current: 22,
    capacity: 25,
    status: 'available',
  },
];

const intensityDot = (intensity: Intensity): string => {
  if (intensity === 'Alta Intensità') return '#ef4444';
  if (intensity === 'Media Intensità') return '#f59e0b';
  return '#22c55e';
};

const CorsiPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);
  const [confirmCourse, setConfirmCourse] = useState<Course | null>(null);
  const [booked, setBooked] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0 24px 0',
  };

  const iconBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'white',
    margin: 0,
    letterSpacing: '-0.3px',
  };

  const daySelectorStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '20px',
    overflowX: 'auto',
  };

  const renderDay = (d: typeof DAYS[0], idx: number) => {
    const active = idx === selectedDay;
    return (
      <button
        key={idx}
        onClick={() => setSelectedDay(idx)}
        style={{
          background: active ? 'linear-gradient(180deg, #ef4444, #e53935)' : 'transparent',
          border: 'none',
          borderRadius: '14px',
          padding: active ? '10px 14px' : '10px 8px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          minWidth: '44px',
          boxShadow: active ? '0 4px 16px rgba(229,57,53,0.5)' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: active ? 'white' : 'rgba(255,255,255,0.5)',
          textTransform: active ? 'uppercase' : 'none',
          letterSpacing: active ? '0.5px' : 0,
        }}>{d.label}</span>
        <span style={{
          fontSize: '18px',
          fontWeight: 800,
          color: active ? 'white' : 'rgba(255,255,255,0.75)',
          lineHeight: 1,
        }}>{d.date}</span>
      </button>
    );
  };

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    background: 'linear-gradient(135deg, rgba(60, 12, 16, 0.85) 0%, rgba(30, 6, 8, 0.85) 100%)',
    border: '1px solid rgba(229, 57, 53, 0.25)',
    borderLeft: '3px solid #ef4444',
    borderRadius: '16px',
    padding: '18px 16px',
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    animation: 'fadeInUp 0.5s ease-out both',
  };

  const buttonBase: React.CSSProperties = {
    border: 'none',
    borderRadius: '999px',
    padding: '10px 18px',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    flexShrink: 0,
  };

  const renderButton = (course: Course) => {
    const isBooked = booked.includes(course.id);
    if (isBooked) {
      return (
        <button style={{
          ...buttonBase,
          background: 'rgba(34,197,94,0.18)',
          color: '#22c55e',
          border: '1px solid rgba(34,197,94,0.4)',
          cursor: 'default',
        }}>PRENOTATO</button>
      );
    }
    if (course.status === 'full') {
      return (
        <button style={{
          ...buttonBase,
          background: 'rgba(120, 30, 35, 0.6)',
          color: 'rgba(255,255,255,0.55)',
          cursor: 'not-allowed',
        }}>COMPLETO</button>
      );
    }
    const isAlmostFull = course.status === 'almost_full';
    return (
      <button
        onClick={() => setConfirmCourse(course)}
        style={{
          ...buttonBase,
          background: isAlmostFull ? 'linear-gradient(180deg, #fb923c, #f97316)' : 'linear-gradient(180deg, #ef4444, #e53935)',
          color: 'white',
          boxShadow: isAlmostFull ? '0 4px 14px rgba(249,115,22,0.4)' : '0 4px 14px rgba(229,57,53,0.45)',
        }}
      >PRENOTA</button>
    );
  };

  const handleConfirm = () => {
    if (!confirmCourse) return;
    setBooked((prev) => [...prev, confirmCourse.id]);
    setConfirmCourse(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2200);
  };

  return (
    <div className="corsi-scroll" style={containerStyle}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .corsi-scroll::-webkit-scrollbar {
          width: 8px;
        }
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
        .corsi-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ff5252, #ef4444);
        }
      `}</style>

      {/* Header */}
      <div style={headerStyle}>
        <button style={iconBtnStyle} onClick={() => navigate('/')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 style={headerTitleStyle}>Corsi di Oggi</h1>
        <button style={iconBtnStyle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="7" y1="12" x2="17" y2="12"></line>
            <line x1="10" y1="18" x2="14" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Day Selector */}
      <div style={daySelectorStyle}>
        {DAYS.map(renderDay)}
      </div>

      {/* Courses */}
      {COURSES.map((c, idx) => (
        <div key={c.id} style={{ ...cardStyle, animationDelay: `${idx * 0.06}s` }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: '17px',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 6px 0',
              letterSpacing: '-0.2px',
            }}>{c.name}</h3>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.78)',
              margin: '0 0 4px 0',
            }}>
              {c.time} · {c.duration} · {c.room}
            </p>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.58)',
              margin: '0 0 10px 0',
            }}>{c.instructor}</p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              fontSize: '12px',
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'rgba(255,255,255,0.78)',
                fontWeight: 500,
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: intensityDot(c.intensity),
                  display: 'inline-block',
                }}></span>
                {c.intensity}
              </span>
              {c.status === 'almost_full' ? (
                <span style={{
                  color: '#f97316',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316">
                    <path d="M12 2L1 21h22L12 2zm0 6l7 12H5l7-12zm-1 4v3h2v-3h-2zm0 4v2h2v-2h-2z"/>
                  </svg>
                  {c.capacity - c.current} posti rimasti
                </span>
              ) : (
                <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  {c.current}/{c.capacity} posti
                </span>
              )}
            </div>
          </div>
          {renderButton(c)}
        </div>
      ))}

      {/* Confirm Modal */}
      {confirmCourse && (
        <div
          onClick={() => setConfirmCourse(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '430px',
              background: 'linear-gradient(180deg, #1a0608 0%, #0a0203 100%)',
              borderTop: '1px solid rgba(229,57,53,0.35)',
              borderRadius: '28px 28px 0 0',
              padding: '24px 22px 32px 22px',
              animation: 'slideUp 0.35s cubic-bezier(.2,.8,.2,1)',
              boxShadow: '0 -20px 60px rgba(229,57,53,0.25)',
            }}
          >
            <div style={{
              width: '44px',
              height: '4px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '999px',
              margin: '0 auto 20px auto',
            }} />

            <p style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#ff5252',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '0 0 8px 0',
              textAlign: 'center',
            }}>Conferma Prenotazione</p>

            <h2 style={{
              fontSize: '26px',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 22px 0',
              textAlign: 'center',
              letterSpacing: '-0.5px',
            }}>{confirmCourse.name}</h2>

            <div style={{
              backgroundColor: 'rgba(229,57,53,0.08)',
              border: '1px solid rgba(229,57,53,0.25)',
              borderRadius: '16px',
              padding: '18px 16px',
              marginBottom: '22px',
            }}>
              {[
                { label: 'Orario', value: `${confirmCourse.time} · ${confirmCourse.duration}` },
                { label: 'Sala', value: confirmCourse.room },
                { label: 'Istruttore', value: confirmCourse.instructor },
                { label: 'Intensità', value: confirmCourse.intensity },
                { label: 'Posti', value: `${confirmCourse.current}/${confirmCourse.capacity}` },
              ].map((row, idx, arr) => (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{row.label}</span>
                  <span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setConfirmCourse(null)}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >Annulla</button>
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1.4,
                  padding: '16px',
                  background: 'linear-gradient(180deg, #ef4444, #e53935)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 8px 24px rgba(229,57,53,0.5)',
                }}
              >CONFERMA</button>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #22c55e, #16a34a)',
          color: 'white',
          padding: '14px 22px',
          borderRadius: '14px',
          fontSize: '14px',
          fontWeight: 700,
          zIndex: 200,
          boxShadow: '0 10px 30px rgba(34,197,94,0.4)',
          animation: 'fadeIn 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Prenotazione confermata!
        </div>
      )}
    </div>
  );
};

export default CorsiPage;
