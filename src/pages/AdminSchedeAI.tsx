import React, { useState, useEffect } from 'react';
import { Brain, Lock, Clipboard, Sparkles, Utensils } from 'lucide-react';

interface ClientData {
  eta: number;
  sesso: 'Maschio' | 'Femmina';
  peso: number;
  altezza: number;
  obiettivo: 'Massa Muscolare' | 'Dimagrimento' | 'Tonificazione' | 'Mantenimento';
  livello: 'Principiante' | 'Intermedio' | 'Avanzato';
  allergie: string;
  giorniAllenamento: number;
  note: string;
}

interface WorkoutPlan {
  giorno: string;
  tipo: string;
  descrizione: string;
  esercizi: Array<{ nome: string; serie: number; ripetizioni: string | number }>;
  isRiposo?: boolean;
  colore: string;
}

interface Macros {
  proteine: number;
  carboidrati: number;
  grassi: number;
  kcal: number;
}

interface Meal {
  nome: string;
  descrizione: string;
  macros?: { p: number; c: number; g: number; kcal: number };
}

const AdminSchedeAI: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isWorkoutGenerated, setIsWorkoutGenerated] = useState(false);
  const [isDietGenerated, setIsDietGenerated] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan[]>([]);
  const [dietPlan, setDietPlan] = useState<Meal[]>([]);
  const [macros, setMacros] = useState<Macros>({ proteine: 0, carboidrati: 0, grassi: 0, kcal: 0 });

  const [clientData, setClientData] = useState<ClientData>({
    eta: 28,
    sesso: 'Maschio',
    peso: 82,
    altezza: 178,
    obiettivo: 'Massa Muscolare',
    livello: 'Intermedio',
    allergie: 'Nessuna',
    giorniAllenamento: 5,
    note: '',
  });

  const members = [
    { id: 1, name: 'Marco R.', initials: 'MR' },
    { id: 2, name: 'Anna S.', initials: 'AS' },
    { id: 3, name: 'Luigi B.', initials: 'LB' },
    { id: 4, name: 'Giulia T.', initials: 'GT' },
  ];

  // Calculate BMR and TDEE
  const calculateMetabolism = () => {
    const { eta, sesso, peso, altezza } = clientData;
    const isMale = sesso === 'Maschio';
    const bmr = 10 * peso + 6.25 * altezza - 5 * eta + (isMale ? 5 : -161);
    const tdee = bmr * (clientData.giorniAllenamento >= 5 ? 1.725 : 1.55);
    return { bmr, tdee };
  };

  const generateWorkoutPlan = () => {
    const { obiettivo, livello } = clientData;

    const basePlan = [
      {
        giorno: 'Lun',
        tipo: 'Upper Body',
        descrizione: 'Petto, spalle, tricipiti',
        colore: '#e53935',
        esercizi: [
          { nome: 'Panca piana', serie: 4, ripetizioni: obiettivo === 'Massa Muscolare' ? '6-8' : '10-12' },
          { nome: 'Distensioni manubri', serie: 3, ripetizioni: obiettivo === 'Massa Muscolare' ? '8-10' : '12-15' },
          { nome: 'Spalle pesi', serie: 3, ripetizioni: '8-12' },
          { nome: 'Pulldown tricipiti', serie: 3, ripetizioni: '10-15' },
        ],
      },
      {
        giorno: 'Mar',
        tipo: 'Lower Body',
        descrizione: 'Gambe, glutei',
        colore: '#3b82f6',
        esercizi: [
          { nome: 'Squat', serie: 4, ripetizioni: obiettivo === 'Massa Muscolare' ? '6-8' : '10-12' },
          { nome: 'Leg press', serie: 3, ripetizioni: '8-12' },
          { nome: 'Leg curl', serie: 3, ripetizioni: '10-12' },
          { nome: 'Stacchi rumeni', serie: 3, ripetizioni: '8-10' },
        ],
      },
      {
        giorno: 'Mer',
        tipo: 'Riposo',
        descrizione: 'Recupero attivo',
        colore: '#6b7280',
        isRiposo: true,
        esercizi: [],
      },
      {
        giorno: 'Gio',
        tipo: 'Push',
        descrizione: 'Petto, spalle, tricipiti',
        colore: '#f97316',
        esercizi: [
          { nome: 'Panca inclinata', serie: 4, ripetizioni: '8-10' },
          { nome: 'Military press', serie: 3, ripetizioni: '6-8' },
          { nome: 'Spalle laterali', serie: 3, ripetizioni: '12-15' },
          { nome: 'Dips', serie: 3, ripetizioni: livello === 'Principiante' ? '6-8' : '10-12' },
        ],
      },
      {
        giorno: 'Ven',
        tipo: 'Pull',
        descrizione: 'Schiena, bicipiti',
        colore: '#8b5cf6',
        esercizi: [
          { nome: 'Trazioni', serie: 4, ripetizioni: livello === 'Principiante' ? '5-8' : '8-12' },
          { nome: 'Rematore bilanciere', serie: 3, ripetizioni: '6-10' },
          { nome: 'Curl bilanciere', serie: 3, ripetizioni: '8-12' },
          { nome: 'Face pulls', serie: 3, ripetizioni: '12-15' },
        ],
      },
      {
        giorno: 'Sab',
        tipo: obiettivo === 'Dimagrimento' ? 'Cardio HIIT' : 'Cardio',
        descrizione: obiettivo === 'Dimagrimento' ? 'Cardio intenso' : 'Cardio moderato',
        colore: '#22c55e',
        esercizi: [
          { nome: 'Tapis roulant/bici', serie: 1, ripetizioni: obiettivo === 'Dimagrimento' ? '30 min HIIT' : '45 min' },
        ],
      },
      {
        giorno: 'Dom',
        tipo: 'Riposo',
        descrizione: 'Recupero completo',
        colore: '#6b7280',
        isRiposo: true,
        esercizi: [],
      },
    ];

    return basePlan.filter(
      (day) => livello === 'Principiante' ? !day.tipo.includes('Pull') || day.tipo === 'Pull' : true
    );
  };

  const generateDietPlan = () => {
    const { peso, obiettivo, sesso } = clientData;
    const { tdee } = calculateMetabolism();

    let targetCals = tdee;
    let proteinRatio = 0.35;

    if (obiettivo === 'Massa Muscolare') {
      targetCals = tdee + 300;
      proteinRatio = 0.40;
    } else if (obiettivo === 'Dimagrimento') {
      targetCals = tdee - 500;
      proteinRatio = 0.40;
    }

    const proteine = Math.round((targetCals * proteinRatio) / 4);
    const grassi = Math.round((targetCals * 0.25) / 9);
    const carboidrati = Math.round((targetCals - proteine * 4 - grassi * 9) / 4);

    setMacros({
      proteine,
      carboidrati,
      grassi,
      kcal: Math.round(targetCals),
    });

    const meals: Meal[] = [
      {
        nome: 'Colazione',
        descrizione: 'Uova, pane integrale, frutta',
        macros: { p: Math.round(proteine * 0.15), c: Math.round(carboidrati * 0.25), g: Math.round(grassi * 0.15), kcal: Math.round(targetCals * 0.20) },
      },
      {
        nome: 'Spuntino Mattina',
        descrizione: 'Shake proteico con banana',
        macros: { p: Math.round(proteine * 0.20), c: Math.round(carboidrati * 0.15), g: Math.round(grassi * 0.10), kcal: Math.round(targetCals * 0.15) },
      },
      {
        nome: 'Pranzo',
        descrizione: 'Pollo/pesce, riso, verdure',
        macros: { p: Math.round(proteine * 0.30), c: Math.round(carboidrati * 0.30), g: Math.round(grassi * 0.30), kcal: Math.round(targetCals * 0.30) },
      },
      {
        nome: 'Spuntino Pomeriggio',
        descrizione: 'Frutta secca, yogurt greco',
        macros: { p: Math.round(proteine * 0.15), c: Math.round(carboidrati * 0.15), g: Math.round(grassi * 0.25), kcal: Math.round(targetCals * 0.15) },
      },
      {
        nome: 'Cena',
        descrizione: 'Salmone/manzo, patate dolci, insalata',
        macros: { p: Math.round(proteine * 0.20), c: Math.round(carboidrati * 0.15), g: Math.round(grassi * 0.20), kcal: Math.round(targetCals * 0.20) },
      },
    ];

    return meals;
  };

  const handleGenerateWorkout = async () => {
    setIsLoading(true);
    setIsWorkoutGenerated(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setWorkoutPlan(generateWorkoutPlan());
    setIsWorkoutGenerated(true);
    setIsLoading(false);
  };

  const handleGenerateDiet = async () => {
    setIsLoading(true);
    setIsDietGenerated(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDietPlan(generateDietPlan());
    setIsDietGenerated(true);
    setIsLoading(false);
  };

  const MacroCircle: React.FC<{
    label: string;
    value: number;
    percentage: number;
    color: string;
  }> = ({ label, value, percentage, color }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
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
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>{label}</div>
      </div>
    );
  };

  const PulsingDots = () => (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#e53935',
            animation: `pulse 1.4s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );

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
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '8px', scrollBehavior: 'smooth' }}>
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
              <span style={{ fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }}>{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Client Data Form Section */}
      <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <Clipboard size={24} color="#e53935" />
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Dati Cliente</h2>
        </div>

        <div
          style={{
            background: 'rgba(17,24,39,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Età */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Età</label>
            <input
              type="number"
              min="16"
              max="100"
              value={clientData.eta}
              onChange={(e) => setClientData({ ...clientData, eta: parseInt(e.target.value) || 0 })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          {/* Sesso */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Sesso</label>
            <select
              value={clientData.sesso}
              onChange={(e) => setClientData({ ...clientData, sesso: e.target.value as 'Maschio' | 'Femmina' })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              <option value="Maschio">Maschio</option>
              <option value="Femmina">Femmina</option>
            </select>
          </div>

          {/* Peso */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Peso (kg)</label>
            <input
              type="number"
              min="30"
              max="300"
              value={clientData.peso}
              onChange={(e) => setClientData({ ...clientData, peso: parseInt(e.target.value) || 0 })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          {/* Altezza */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Altezza (cm)</label>
            <input
              type="number"
              min="140"
              max="230"
              value={clientData.altezza}
              onChange={(e) => setClientData({ ...clientData, altezza: parseInt(e.target.value) || 0 })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          {/* Obiettivo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Obiettivo</label>
            <select
              value={clientData.obiettivo}
              onChange={(e) => setClientData({ ...clientData, obiettivo: e.target.value as any })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              <option value="Massa Muscolare">Massa Muscolare</option>
              <option value="Dimagrimento">Dimagrimento</option>
              <option value="Tonificazione">Tonificazione</option>
              <option value="Mantenimento">Mantenimento</option>
            </select>
          </div>

          {/* Livello */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Livello</label>
            <select
              value={clientData.livello}
              onChange={(e) => setClientData({ ...clientData, livello: e.target.value as any })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzato">Avanzato</option>
            </select>
          </div>

          {/* Allergie */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Allergie/Intolleranze</label>
            <input
              type="text"
              value={clientData.allergie}
              onChange={(e) => setClientData({ ...clientData, allergie: e.target.value })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          {/* Giorni Allenamento */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Giorni Allenamento/Settimana</label>
            <input
              type="number"
              min="1"
              max="7"
              value={clientData.giorniAllenamento}
              onChange={(e) => setClientData({ ...clientData, giorniAllenamento: parseInt(e.target.value) || 1 })}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          {/* Note - Full Width */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Note</label>
            <textarea
              value={clientData.note}
              onChange={(e) => setClientData({ ...clientData, note: e.target.value })}
              rows={3}
              style={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                resize: 'vertical',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e53935')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>
        </div>
      </div>

      {/* AI Generation Buttons */}
      <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button
            onClick={handleGenerateWorkout}
            disabled={isLoading}
            style={{
              background: isLoading ? '#dc2626' : '#e53935',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 24px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 0 20px rgba(229,57,53,0.3)',
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-4px)';
                (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 30px rgba(229,57,53,0.5), 0 8px 16px rgba(229,57,53,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 20px rgba(229,57,53,0.3)';
              }
            }}
          >
            GENERA SCHEDA AI
          </button>

          <button
            onClick={handleGenerateDiet}
            disabled={isLoading}
            style={{
              background: isLoading ? '#15803d' : '#22c55e',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 24px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 0 20px rgba(34,197,94,0.3)',
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-4px)';
                (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 30px rgba(34,197,94,0.5), 0 8px 16px rgba(34,197,94,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 20px rgba(34,197,94,0.3)';
              }
            }}
          >
            GENERA DIETA AI
          </button>
        </div>
      </div>

      {/* Generated Workout Plan */}
      {isWorkoutGenerated && (
        <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <PulsingDots />
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Sparkles size={24} color="#e53935" />
                <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Scheda Generata</h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                {workoutPlan.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      background: day.isRiposo ? 'rgba(17,24,39,0.5)' : 'rgba(17,24,39,0.85)',
                      border: `2px solid ${day.colore}`,
                      borderLeftWidth: '8px',
                      borderRadius: '12px',
                      padding: '16px',
                      opacity: day.isRiposo ? 0.7 : 1,
                    }}
                  >
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                      {day.giorno}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: day.colore }}>
                      {day.tipo}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                      {day.descrizione}
                    </div>
                    {day.esercizi.length > 0 && (
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                        {day.esercizi.map((ex, i) => (
                          <div key={i}>
                            {ex.nome}: {ex.serie}x{ex.ripetizioni}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                <button
                  style={{
                    background: '#d97706',
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
                    (e.target as HTMLButtonElement).style.background = '#b45309';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = '#d97706';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  Assegna a {members[selectedMember].name}
                </button>

                <button
                  onClick={handleGenerateWorkout}
                  style={{
                    background: 'transparent',
                    border: '2px solid #e53935',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    color: '#e53935',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(229,57,53,0.1)';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'transparent';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  Rigenera
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Generated Diet Plan */}
      {isDietGenerated && (
        <div style={{ padding: '32px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <PulsingDots />
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Utensils size={24} color="#22c55e" />
                <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Dieta Generata</h2>
              </div>

              {/* Macro Circles */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '24px',
                  marginBottom: '32px',
                }}
              >
                <MacroCircle label="Proteine" value={macros.proteine} percentage={Math.round((macros.proteine * 4) / macros.kcal * 100)} color="#e53935" />
                <MacroCircle label="Carboidrati" value={macros.carboidrati} percentage={Math.round((macros.carboidrati * 4) / macros.kcal * 100)} color="#3b82f6" />
                <MacroCircle label="Grassi" value={macros.grassi} percentage={Math.round((macros.grassi * 9) / macros.kcal * 100)} color="#ff8c00" />
                <MacroCircle label="Kcal" value={macros.kcal} percentage={100} color="#22c55e" />
              </div>

              {/* Meals */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                {dietPlan.map((meal, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(17,24,39,0.85)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      padding: '20px',
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                      {meal.nome}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                      {meal.descrizione}
                    </div>
                    {meal.macros && (
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                        P: {meal.macros.p}g | C: {meal.macros.c}g | G: {meal.macros.g}g | {meal.macros.kcal} kcal
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                <button
                  style={{
                    background: '#d97706',
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
                    (e.target as HTMLButtonElement).style.background = '#b45309';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = '#d97706';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  Assegna Dieta
                </button>

                <button
                  onClick={handleGenerateDiet}
                  style={{
                    background: 'transparent',
                    border: '2px solid #22c55e',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    color: '#22c55e',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(34,197,94,0.1)';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'transparent';
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  Rigenera
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSchedeAI;
