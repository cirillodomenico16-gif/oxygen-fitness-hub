import React, { useState } from 'react';

interface CourseBlock {
  id: string;
  name: string;
  day: string;
  time: string;
  color: string;
  instructor: string;
  enrolled: number;
  capacity: number;
  waitlist: number;
}

const AdminCalendar: React.FC = () => {
  const courseData: Record<string, CourseBlock> = {
    'crossfit-1': {
      id: 'crossfit-1',
      name: 'CrossFit Extreme',
      day: 'LUN',
      time: '09:00',
      color: '#e53935',
      instructor: 'Marco',
      enrolled: 14,
      capacity: 20,
      waitlist: 3,
    },
    'boxing-1': {
      id: 'boxing-1',
      name: 'Boxing',
      day: 'LUN',
      time: '18:00',
      color: '#a855f7',
      instructor: 'Marco',
      enrolled: 16,
      capacity: 18,
      waitlist: 2,
    },
    'yoga-1': {
      id: 'yoga-1',
      name: 'Yoga',
      day: 'MAR',
      time: '10:00',
      color: '#3b82f6',
      instructor: 'Sara',
      enrolled: 12,
      capacity: 16,
      waitlist: 1,
    },
    'spinning-1': {
      id: 'spinning-1',
      name: 'Spinning',
      day: 'MAR',
      time: '16:00',
      color: '#ff8c00',
      instructor: 'Luca',
      enrolled: 18,
      capacity: 20,
      waitlist: 0,
    },
    'pilates-1': {
      id: 'pilates-1',
      name: 'Pilates',
      day: 'MER',
      time: '09:00',
      color: '#22c55e',
      instructor: 'Anna',
      enrolled: 15,
      capacity: 16,
      waitlist: 2,
    },
    'crossfit-2': {
      id: 'crossfit-2',
      name: 'CrossFit Extreme',
      day: 'GIO',
      time: '09:00',
      color: '#e53935',
      instructor: 'Marco',
      enrolled: 14,
      capacity: 20,
      waitlist: 3,
    },
    'boxing-2': {
      id: 'boxing-2',
      name: 'Boxing',
      day: 'GIO',
      time: '18:00',
      color: '#a855f7',
      instructor: 'Marco',
      enrolled: 17,
      capacity: 18,
      waitlist: 1,
    },
    'yoga-2': {
      id: 'yoga-2',
      name: 'Yoga',
      day: 'VEN',
      time: '10:00',
      color: '#3b82f6',
      instructor: 'Sara',
      enrolled: 11,
      capacity: 16,
      waitlist: 0,
    },
    'functional-1': {
      id: 'functional-1',
      name: 'Functional',
      day: 'VEN',
      time: '14:00',
      color: '#00d4ff',
      instructor: 'Marco',
      enrolled: 13,
      capacity: 15,
      waitlist: 2,
    },
    'crossfit-3': {
      id: 'crossfit-3',
      name: 'CrossFit Extreme',
      day: 'SAB',
      time: '09:00',
      color: '#e53935',
      instructor: 'Marco',
      enrolled: 14,
      capacity: 20,
      waitlist: 3,
    },
  };

  const [selectedCourse, setSelectedCourse] = useState<CourseBlock>(courseData['crossfit-1']);

  const days = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '16:00', '18:00'];

  const getGridPosition = (day: string, time: string) => {
    const dayIndex = days.indexOf(day);
    const timeIndex = timeSlots.indexOf(time);
    if (dayIndex === -1 || timeIndex === -1) return null;
    return { dayIndex, timeIndex };
  };

  const stats = [
    { label: '8 Corsi/settimana', value: '8' },
    { label: '142 Presenze', value: '142' },
    { label: '89% Fill rate', value: '89%' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#fff',
        padding: '20px 16px 100px 16px',
        overflowX: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0' }}>
          Calendario Corsi
        </h1>
        <button
          style={{
            backgroundColor: '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          + Nuovo Corso
        </button>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'rgba(17,24,39,0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '16px 20px',
              flex: '1 1 0',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '4px',
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Calendar Grid */}
      <div
        style={{
          marginBottom: '32px',
          overflowX: 'auto',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          backgroundColor: 'rgba(17,24,39,0.5)',
        }}
      >
        <table
          style={{
            width: '100%',
            minWidth: '500px',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: '60px',
                  padding: '12px 8px',
                  textAlign: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Ora
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  style={{
                    flex: 1,
                    minWidth: '70px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time}>
                <td
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {time}
                </td>
                {days.map((day) => {
                  const course = Object.values(courseData).find(
                    (c) => c.day === day && c.time === time
                  );
                  return (
                    <td
                      key={`${day}-${time}`}
                      style={{
                        flex: 1,
                        minWidth: '70px',
                        padding: '8px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        borderRight: '1px solid rgba(255,255,255,0.06)',
                        verticalAlign: 'middle',
                      }}
                    >
                      {course && (
                        <button
                          onClick={() => setSelectedCourse(course)}
                          style={{
                            width: '100%',
                            padding: '8px 6px',
                            backgroundColor: `${course.color}33`,
                            border: `2px solid ${course.color}`,
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            lineHeight: '1.2',
                            whiteSpace: 'normal',
                            borderLeft: `4px solid ${course.color}`,
                          }}
                        >
                          {course.name}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Detail Popup */}
      {selectedCourse && (
        <div
          style={{
            backgroundColor: 'rgba(17,24,39,0.95)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '500px',
            marginTop: '24px',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: '0 0 12px 0',
              }}
            >
              {selectedCourse.name}
            </h2>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              Coach {selectedCourse.instructor}
            </div>
          </div>

          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '24px',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              {selectedCourse.enrolled}/{selectedCourse.capacity} iscritti
            </div>
            <div>{selectedCourse.waitlist} in lista d'attesa</div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                flex: '1 1 0',
                minWidth: '80px',
                padding: '10px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #3b82f6',
                color: '#3b82f6',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Modifica Corso
            </button>
            <button
              style={{
                flex: '1 1 0',
                minWidth: '80px',
                padding: '10px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #e53935',
                color: '#e53935',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Annulla Lezione
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
