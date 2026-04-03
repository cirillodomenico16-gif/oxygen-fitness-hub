import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PHOTOS } from '../App';

const ProgressPage: React.FC = () => {
  // Weight data for the chart
  const weightData = useMemo(() => [
    { week: 'W1', weight: 86 },
    { week: 'W2', weight: 85.2 },
    { week: 'W3', weight: 84.8 },
    { week: 'W4', weight: 84.1 },
    { week: 'W5', weight: 83.5 },
    { week: 'W6', weight: 83.0 },
    { week: 'W7', weight: 82.5 },
    { week: 'W8', weight: 82.1 },
  ], []);

  // Completed days for the calendar
  const completedDays = useMemo(() =>
    new Set([1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 14, 15, 17, 19, 20, 21, 22, 24, 26, 27]),
    []
  );

  const currentDay = 3; // "Today" is day 3 for the mockup

  // Body measurements data
  const measurements = [
    { label: 'Vita', current: 82, target: 78, color: '#00d4ff' },
    { label: 'Petto', current: 98, target: 100, color: '#22c55e' },
    { label: 'Gambe', current: 54, target: 56, color: '#ff8c00' },
  ];

  const getProgressPercentage = (current: number, target: number): number => {
    if (target >= current) {
      return (current / target) * 100;
    }
    return Math.min((target / current) * 100, 100);
  };

  const CircularProgress: React.FC<{ label: string; current: number; target: number; color: string }> =
    ({ label, current, target, color }) => {
      const percentage = getProgressPercentage(current, target);
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (percentage / 100) * circumference;

      return (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <svg
              width={120}
              height={120}
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Background circle */}
              <circle
                cx={60}
                cy={60}
                r={45}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={6}
              />
              {/* Progress circle */}
              <circle
                cx={60}
                cy={60}
                r={45}
                fill="none"
                stroke={color}
                strokeWidth={6}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            {/* Center text */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                {current}
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                cm
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
              {label}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
              Meta: {target} cm
            </div>
          </div>
        </div>
      );
    };

  const CalendarDay: React.FC<{ day: number; isCompleted: boolean; isToday: boolean }> =
    ({ day, isCompleted, isToday }) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: isCompleted ? '#e53935' : 'rgba(255,255,255,0.08)',
          border: isToday ? '2px solid #e53935' : 'none',
          fontSize: '12px',
          fontWeight: '500',
          color: isCompleted ? '#fff' : 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {day}
      </div>
    );

  const renderCalendarGrid = () => {
    const days = [];
    for (let day = 1; day <= 30; day++) {
      days.push(
        <CalendarDay
          key={day}
          day={day}
          isCompleted={completedDays.has(day)}
          isToday={day === currentDay}
        />
      );
    }
    return days;
  };

  const cardStyle = {
    backgroundColor: 'rgba(17,24,39,0.85)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '24px',
  };

  const cardAnimationStyle = (delay: number) => ({
    animation: `fadeInUp 0.6s ease-out ${delay}s both`,
  });

  return (
    <div
      style={{
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: '24px 16px 100px',
        overflow: 'auto',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          I Miei Progressi
        </h1>
      </div>

      {/* Weight Chart Card */}
      <div
        style={{
          ...cardStyle,
          marginBottom: '24px',
          ...cardAnimationStyle(0),
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
              margin: '0 0 12px 0',
            }}
          >
            Peso Corporeo
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>
              82.1 kg
            </span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#22c55e' }}>
              -4.1 kg
            </span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: '100%', height: '240px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weightData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e53935" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#e53935" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                stroke="rgba(255,255,255,0.2)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.2)"
                style={{ fontSize: '12px' }}
                domain={[80, 87]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17,24,39,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#e53935"
                strokeWidth={3}
                dot={{ fill: '#e53935', r: 5 }}
                fill="url(#weightGradient)"
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Body Measurements Card */}
      <div
        style={{
          ...cardStyle,
          marginBottom: '24px',
          ...cardAnimationStyle(0.1),
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            margin: '0 0 24px 0',
          }}
        >
          Misure Corporee
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {measurements.map((measurement) => (
            <CircularProgress
              key={measurement.label}
              label={measurement.label}
              current={measurement.current}
              target={measurement.target}
              color={measurement.color}
            />
          ))}
        </div>
      </div>

      {/* Streak Calendar Card */}
      <div
        style={{
          ...cardStyle,
          marginBottom: '24px',
          ...cardAnimationStyle(0.2),
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            margin: '0 0 20px 0',
          }}
        >
          Calendario Attività
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
          }}
        >
          {renderCalendarGrid()}
        </div>
      </div>

      {/* Before/After Card */}
      <div
        style={{
          ...cardStyle,
          marginBottom: '24px',
          ...cardAnimationStyle(0.3),
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            margin: '0 0 20px 0',
          }}
        >
          Trasformazione
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          {/* Prima */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(50,50,50,0.4) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: '300',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: '1',
              }}
            >
              +
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                fontSize: '12px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Prima
            </div>
          </div>

          {/* Dopo */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(50,50,50,0.4) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: '300',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: '1',
              }}
            >
              +
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                fontSize: '12px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Dopo
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime Stats Row */}
      <div
        style={{
          ...cardAnimationStyle(0.4),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {[
          { label: 'Allenamenti', value: '64' },
          { label: 'Kg Sollevati', value: '12.4k' },
          { label: 'Miglior Streak', value: '22g' },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              ...cardStyle,
              textAlign: 'center',
              minHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#e53935',
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: '500',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;
