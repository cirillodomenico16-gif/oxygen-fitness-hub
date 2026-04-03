import React, { useState } from 'react';
import { Clock, MapPin, Zap } from 'lucide-react';
import { PHOTOS } from '../App';

interface Course {
  id: number;
  name: string;
  time: string;
  duration: string;
  room: string;
  instructor: string;
  intensity: 'Alta intensità' | 'Media intensità' | 'Bassa intensità';
  current: number;
  capacity: number;
  type: 'crossfit' | 'yoga' | 'pilates' | 'spinning' | 'boxing';
}

const DAYS = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];

const COURSE_COLORS: Record<string, string> = {
  crossfit: '#e53935',
  yoga: '#1e88e5',
  pilates: '#43a047',
  spinning: '#fb8c00',
  boxing: '#8e24aa',
};

const COURSES: Course[] = [
  {
    id: 1,
    name: 'CrossFit Extreme',
    time: '09:00',
    duration: '60 min',
    room: 'Sala CrossFit',
    instructor: 'Coach Marco',
    intensity: 'Alta intensità',
    current: 14,
    capacity: 20,
    type: 'crossfit',
  },
  {
    id: 2,
    name: 'Yoga Flow',
    time: '10:30',
    duration: '45 min',
    room: 'Sala Yoga',
    instructor: 'Sara B.',
    intensity: 'Media intensità',
    current: 18,
    capacity: 20,
    type: 'yoga',
  },
  {
    id: 3,
    name: 'Pilates Core',
    time: '14:00',
    duration: '50 min',
    room: 'Sala 2',
    instructor: 'Giulia T.',
    intensity: 'Bassa intensità',
    current: 8,
    capacity: 20,
    type: 'pilates',
  },
  {
    id: 4,
    name: 'Spinning Power',
    time: '16:00',
    duration: '45 min',
    room: 'Sala Spinning',
    instructor: 'Luca M.',
    intensity: 'Alta intensità',
    current: 20,
    capacity: 20,
    type: 'spinning',
  },
  {
    id: 5,
    name: 'Boxing Cardio',
    time: '18:00',
    duration: '60 min',
    room: 'Palestra B',
    instructor: 'Andrea R.',
    intensity: 'Alta intensità',
    current: 15,
    capacity: 20,
    type: 'boxing',
  },
];

const CorsiPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getIntensityIndicator = (intensity: string) => {
    switch (intensity) {
      case 'Alta intensità':
        return '●●●';
      case 'Media intensità':
        return '●●○';
      case 'Bassa intensità':
        return '●○○';
      default:
        return '●●●';
    }
  };

  const isFull = (course: Course) => course.current >= course.capacity;

  return (
    <div
      style={{
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: 'white',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
          }}
        >
          Corsi di Oggi
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            margin: '0',
            textTransform: 'capitalize',
          }}
        >
          {formattedDate}
        </p>
      </div>

      {/* Day Selector */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '16px 20px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {DAYS.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            style={{
              minWidth: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor:
                index === selectedDay
                  ? '#e53935'
                  : 'rgba(255,255,255,0.1)',
              color: index === selectedDay ? 'white' : 'rgba(255,255,255,0.7)',
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Photo Banner */}
      <div style={{ margin: '0 20px 16px', borderRadius: '16px', height: '120px', backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.85), rgba(10,14,26,0.2)), url(${PHOTOS.sala})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
        <div style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>Le nostre sale</div>
      </div>

      {/* Courses List */}
      <div
        style={{
          padding: '16px 20px 100px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {COURSES.map((course, index) => (
          <div
            key={course.id}
            style={{
              backgroundColor: 'rgba(17,24,39,0.85)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderLeft: `3px solid ${COURSE_COLORS[course.type]}`,
              padding: '16px',
              animation: `slideIn 0.4s ease ${index * 0.05}s both`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <style>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(16px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {/* Course Name */}
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: 'white',
              }}
            >
              {course.name}
            </h3>

            {/* Detail Pills */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {/* Time */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                }}
              >
                <Clock size={14} style={{ color: '#e53935' }} />
                <span>{course.time}</span>
              </div>

              {/* Duration */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                }}
              >
                <Clock size={14} style={{ opacity: 0.6 }} />
                <span>{course.duration}</span>
              </div>

              {/* Room */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                }}
              >
                <MapPin size={14} style={{ opacity: 0.6 }} />
                <span>{course.room}</span>
              </div>
            </div>

            {/* Instructor & Intensity */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  margin: '0',
                }}
              >
                {course.instructor}
              </p>
              <div
                style={{
                  fontSize: '14px',
                  color: '#e53935',
                  letterSpacing: '2px',
                }}
              >
                {getIntensityIndicator(course.intensity)}
              </div>
            </div>

            {/* Capacity & Button Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '12px',
              }}
            >
              {/* Capacity */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '6px',
                    fontWeight: '500',
                  }}
                >
                  {course.current}/{course.capacity} posti
                </div>
                <div
                  style={{
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: COURSE_COLORS[course.type],
                      width: `${(course.current / course.capacity) * 100}%`,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                style={{
                  padding: isFull(course) ? '8px 16px' : '8px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: isFull(course) ? 'not-allowed' : 'pointer',
                  backgroundColor: isFull(course)
                    ? 'rgba(255,255,255,0.1)'
                    : '#e53935',
                  color: isFull(course)
                    ? 'rgba(255,255,255,0.5)'
                    : 'white',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!isFull(course)) {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      '#d32f2f';
                    (e.target as HTMLButtonElement).style.transform =
                      'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isFull(course)) {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      '#e53935';
                    (e.target as HTMLButtonElement).style.transform =
                      'scale(1)';
                  }
                }}
                disabled={isFull(course)}
              >
                {isFull(course) ? 'COMPLETO' : 'PRENOTA'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorsiPage;
