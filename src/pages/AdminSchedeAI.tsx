import React, { useState } from 'react';
import { Brain, Lock } from 'lucide-react';

const AdminSchedeAI: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState(0);

  const members = [
    { id: 1, name: 'Marco R.', initials: 'MR' },
    { id: 2, name: 'Anna S.', initials: 'AS' },
    { id: 3, name: 'Luigi B.', initials: 'LB' },
    { id: 4, name: 'Giulia T.', initials: 'GT' },
  ];

  const weeklyPlan = [
    { day: 'Lun', name: 'Upper Body', description: 'petto, spalle, tricipiti', isRest: false },
    { day: 'Mar', name: 'Lower Body', description: 'gambe, glutei', isRest: false },
    { day: 'Mer', name: 'Riposo', description: 'recupero attivo', isRest: true },
    { day: 'Gio', name: 'Push', description: 'petto, spalle', isRest: false },
    { day: 'Ven', name: 'Pull', description: 'schiena, bicipiti', isRest: false },
    { day: 'Sab', name: 'Cardio HIIT', description: '', isRest: false },
    { day: 'Dom', name: 'Riposo', description: '', isRest: true },
  ];

  const meals = [
    { name: 'Colazione', emoji: '🥣', description: 'Porridge proteico, frutta fresca' },
    { name: 'Pranzo', emoji: '🍗', description: 'Pollo grigliato, riso integrale, verdure' },
    { name: 'Spuntino', emoji: '🥤', description: 'Shake proteico, mandorle' },
    { name: 'Cena', emoji: '🐟', description: 'Salmone, patate dolci, insalata' },
  ];

  const macros = [
    { label: 'Proteine', value: '180g', percentage: 45, color: '#e53935' },
    { label: 'Carboidrati', value: '250g', percentage: 35, color: '#3b82f6' },
    { label: 'Grassi', value: '60g', percentage: 10, color: '#ff8c00' },
    { label: 'Kcal', value: '2450', percentage: 100, color: '#22c55e' },
  ];

  const MacroCircle: React.FC<{
    label: string;
    value: string;
    percentage: number;
    color: string;
  }> = ({ label, value, percentage, color }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div style={{ textAlign: 'center', marginTop: '-50px', zIndex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>{value}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{percentage}%</div>
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
          {label}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background: '#0a0e1a',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#fff',
        paddingBottom: '100px',
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: 0, flex: 1 }}>Schede AI & Diete</h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(229,57,53,0.15)',
              border: '1px solid #e53935',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#e53935',
            }}
          >
            <Lock size={14} />
            SOLO ADMIN
          </div>
        </div>
      </div>

      {/* Member Carousel */}
      <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollBehavior: 'smooth',
          }}
        >
          {members.map((member, index) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(index)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                minWidth: 'fit-content',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '700',
                  border: selectedMember === index ? '3px solid #e53935' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                {member.initials}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Plan Section */}
      <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Brain size={24} color="#e53935" />
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Scheda Settimanale AI</h2>
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '0 0 20px 0' }}>
          Generata per {members[selectedMember].name}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {weeklyPlan.map((day, index) => (
            <div
              key={index}
              style={{
                background: day.isRest ? 'rgba(17,24,39,0.5)' : 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '16px',
                opacity: day.isRest ? 0.7 : 1,
              }}
            >
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                {day.day}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                {day.name}
              </div>
              {day.description && (
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  {day.description}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          style={{
            background: '#e53935',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = '#d32f2f';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = '#e53935';
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          GENERA NUOVA SCHEDA AI
        </button>
      </div>

      {/* Nutrition Section */}
      <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 24px 0' }}>Piano Nutrizionale AI</h2>

        {/* Macro Circles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {macros.map((macro, index) => (
            <MacroCircle
              key={index}
              label={macro.label}
              value={macro.value}
              percentage={macro.percentage}
              color={macro.color}
            />
          ))}
        </div>

        {/* Meals Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {meals.map((meal, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{meal.emoji}</div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                {meal.name}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                {meal.description}
              </div>
            </div>
          ))}
        </div>

        <button
          style={{
            background: '#22c55e',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = '#16a34a';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = '#22c55e';
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          GENERA DIETA AI
        </button>
      </div>
    </div>
  );
};

export default AdminSchedeAI;
