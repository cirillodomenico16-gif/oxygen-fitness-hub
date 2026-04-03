import React, { useState } from 'react';
import { PHOTOS } from '../constants';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

interface DayWorkout {
  day: string;
  dayName: string;
  type: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  exercises: Exercise[] | string[];
  isRest?: boolean;
}

const SchedaPage: React.FC = () => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const getWeekDates = (offset: number) => {
    const today = new Date(2026, 3, 3); // April 3, 2026
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff + offset * 7));

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const formatDateRange = (dates: Date[]) => {
    const start = dates[0];
    const end = dates[6];
    return `${start.getDate()} - ${end.getDate()} Aprile`;
  };

  const workouts: DayWorkout[] = [
    {
      day: 'Lunedì',
      dayName: 'Monday',
      type: 'Upper Body',
      subtitle: 'Petto, Spalle, Tricipiti',
      gradient: 'linear-gradient(135deg, rgba(229,57,53,0.4), rgba(10,14,26,0.9))',
      borderColor: '#e53935',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 10, weight: 80 },
        { name: 'Military Press', sets: 3, reps: 12, weight: 40 },
        { name: 'Dips', sets: 3, reps: 15 },
        { name: 'Lateral Raises', sets: 3, reps: 12, weight: 12 },
        { name: 'Tricep Pushdown', sets: 3, reps: 15, weight: 25 },
      ],
    },
    {
      day: 'Martedì',
      dayName: 'Tuesday',
      type: 'Lower Body',
      subtitle: 'Gambe, Glutei',
      gradient: 'linear-gradient(135deg, rgba(33,150,243,0.4), rgba(10,14,26,0.9))',
      borderColor: '#2196f3',
      exercises: [
        { name: 'Squat', sets: 4, reps: 8, weight: 100 },
        { name: 'Leg Press', sets: 4, reps: 12, weight: 150 },
        { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 80 },
        { name: 'Leg Curl', sets: 3, reps: 12, weight: 40 },
        { name: 'Calf Raises', sets: 4, reps: 15, weight: 60 },
      ],
    },
    {
      day: 'Mercoledì',
      dayName: 'Wednesday',
      type: 'Riposo',
      subtitle: 'Recupero Attivo',
      gradient: 'linear-gradient(135deg, rgba(80,80,80,0.3), rgba(10,14,26,0.9))',
      borderColor: '#606060',
      exercises: ['Stretching 20 min', 'Camminata leggera'],
      isRest: true,
    },
    {
      day: 'Giovedì',
      dayName: 'Thursday',
      type: 'Push',
      subtitle: 'Petto, Spalle',
      gradient: 'linear-gradient(135deg, rgba(255,152,0,0.4), rgba(10,14,26,0.9))',
      borderColor: '#ff9800',
      exercises: [
        { name: 'Incline Bench Press', sets: 4, reps: 10, weight: 70 },
        { name: 'Arnold Press', sets: 3, reps: 10, weight: 16 },
        { name: 'Cable Fly', sets: 3, reps: 12, weight: 15 },
        { name: 'Front Raises', sets: 3, reps: 12, weight: 10 },
        { name: 'Overhead Tricep Extension', sets: 3, reps: 12, weight: 20 },
      ],
    },
    {
      day: 'Venerdì',
      dayName: 'Friday',
      type: 'Pull',
      subtitle: 'Schiena, Bicipiti',
      gradient: 'linear-gradient(135deg, rgba(76,175,80,0.4), rgba(10,14,26,0.9))',
      borderColor: '#4caf50',
      exercises: [
        { name: 'Deadlift', sets: 4, reps: 6, weight: 120 },
        { name: 'Pull-ups', sets: 4, reps: 8 },
        { name: 'Barbell Row', sets: 3, reps: 10, weight: 70 },
        { name: 'Face Pull', sets: 3, reps: 15, weight: 15 },
        { name: 'Barbell Curl', sets: 3, reps: 12, weight: 30 },
      ],
    },
    {
      day: 'Sabato',
      dayName: 'Saturday',
      type: 'Cardio HIIT',
      subtitle: 'Alta Intensità',
      gradient: 'linear-gradient(135deg, rgba(156,39,176,0.4), rgba(10,14,26,0.9))',
      borderColor: '#9c27b0',
      exercises: [
        'Circuit: 4 rounds',
        'Burpees x 10',
        'Mountain Climbers x 20',
        'Box Jumps x 15',
        'Battle Ropes 30s',
      ],
    },
    {
      day: 'Domenica',
      dayName: 'Sunday',
      type: 'Riposo',
      subtitle: 'Recupero Completo',
      gradient: 'linear-gradient(135deg, rgba(80,80,80,0.3), rgba(10,14,26,0.9))',
      borderColor: '#606060',
      exercises: ['Riposo completo', 'Recupero muscolare'],
      isRest: true,
    },
  ];

  const renderExercise = (exercise: Exercise | string, index: number) => {
    if (typeof exercise === 'string') {
      return (
        <div
          key={index}
          style={{
            padding: '12px 0',
            fontSize: '14px',
            color: '#9ca3af',
            fontStyle: exercise.includes(':') ? 'normal' : 'italic',
          }}
        >
          {exercise}
        </div>
      );
    }

    return (
      <div
        key={index}
        style={{
          padding: '14px 0',
          borderBottom: index < (workouts[0].exercises as Exercise[]).length - 1 ? '1px solid rgba(107,114,128,0.2)' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: index % 2 === 0 ? 'transparent' : 'rgba(107,114,128,0.05)',
          paddingLeft: '12px',
          paddingRight: '12px',
          marginLeft: '-12px',
          marginRight: '-12px',
        }}
      >
        <span style={{ color: '#e5e7eb', fontWeight: '500' }}>{exercise.name}</span>
        <span style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'right' }}>
          {exercise.sets}x{exercise.reps}
          {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        background: '#0a0e1a',
        minHeight: '100vh',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        color: '#e5e7eb',
        overflow: 'auto',
        paddingBottom: '100px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(107,114,128,0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 4px 0',
            color: '#f3f4f6',
          }}
        >
          La Mia Scheda
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#9ca3af',
            margin: '0',
          }}
        >
          Piano settimanale personalizzato
        </p>
      </div>

      {/* Workout Photo Banner */}
      <div style={{ margin: '0 20px 16px', borderRadius: '16px', height: '100px', backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.85), rgba(10,14,26,0.2)), url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Week Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid rgba(107,114,128,0.2)',
        }}
      >
        <button
          onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
          style={{
            background: 'rgba(17,24,39,0.7)',
            border: '1px solid rgba(107,114,128,0.3)',
            color: '#e5e7eb',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.background = 'rgba(17,24,39,0.9)';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(107,114,128,0.5)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.background = 'rgba(17,24,39,0.7)';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(107,114,128,0.3)';
          }}
        >
          ←
        </button>

        <div
          style={{
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#9ca3af',
              margin: '0 0 4px 0',
            }}
          >
            Settimana del
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#f3f4f6',
              margin: '0',
            }}
          >
            {formatDateRange(weekDates)}
          </p>
        </div>

        <button
          onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
          style={{
            background: 'rgba(17,24,39,0.7)',
            border: '1px solid rgba(107,114,128,0.3)',
            color: '#e5e7eb',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.background = 'rgba(17,24,39,0.9)';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(107,114,128,0.5)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.background = 'rgba(17,24,39,0.7)';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(107,114,128,0.3)';
          }}
        >
          →
        </button>
      </div>

      {/* Workout Cards */}
      <div
        style={{
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {workouts.map((workout, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(17,24,39,0.85)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(107,114,128,0.2)',
              borderLeft: `4px solid ${workout.borderColor}`,
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(107,114,128,0.4)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(107,114,128,0.2)';
            }}
          >
            {/* Banner Image Area */}
            <div
              style={{
                background: workout.gradient,
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '16px',
                position: 'relative',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  margin: '0 0 4px 0',
                  color: '#f3f4f6',
                }}
              >
                {workout.type}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(243,244,246,0.8)',
                  margin: '0',
                }}
              >
                {workout.subtitle}
              </p>
            </div>

            {/* Day Label */}
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(107,114,128,0.05)',
                borderBottom: '1px solid rgba(107,114,128,0.1)',
                fontSize: '12px',
                fontWeight: '600',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {workout.day}
            </div>

            {/* Exercise List */}
            <div
              style={{
                padding: '16px',
                opacity: workout.isRest ? 0.7 : 1,
              }}
            >
              {Array.isArray(workout.exercises) && workout.exercises.length > 0 ? (
                workout.exercises.map((exercise, exIdx) =>
                  renderExercise(exercise, exIdx)
                )
              ) : (
                <p
                  style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    margin: '0',
                  }}
                >
                  No exercises
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '40px 20px 20px',
          textAlign: 'center',
          borderTop: '1px solid rgba(107,114,128,0.2)',
          marginTop: '20px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: '#6b7280',
            margin: '0 0 12px 0',
          }}
        >
          Scheda generata il 1 Aprile 2026
        </p>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '12px',
            color: '#60a5fa',
            fontWeight: '500',
          }}
        >
          Generata da AI Personal Trainer
        </div>
      </div>
    </div>
  );
};

export default SchedaPage;
