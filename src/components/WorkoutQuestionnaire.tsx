import { useState } from 'react';
import { COLORS } from '../config/theme';
import { WorkoutQuestionnaireData } from '../services/PlanStorage';

interface Props {
  onSubmit: (data: WorkoutQuestionnaireData) => void;
  isLoading?: boolean;
}

export default function WorkoutQuestionnaire({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<WorkoutQuestionnaireData>({
    fitnessLevel: 'intermediate',
    trainingGoals: [],
    equipment: [],
    trainingFrequency: 4,
    sessionDuration: 60,
    focusAreas: [],
    exercisesToAvoid: [],
  });

  const fitnessLevels = [
    { value: 'beginner', label: 'Principiante (< 1 anno)', desc: 'Nuovo al fitness' },
    { value: 'intermediate', label: 'Intermedio (1-3 anni)', desc: 'Esperienza di base' },
    { value: 'advanced', label: 'Avanzato (> 3 anni)', desc: 'Allenamento regolare' },
  ];

  const goalsOptions = [
    { value: 'muscle_gain', label: '💪 Guadagno Muscolare', icon: '💪' },
    { value: 'fat_loss', label: '🔥 Perdita Grasso', icon: '🔥' },
    { value: 'strength', label: '⚡ Forza Massima', icon: '⚡' },
    { value: 'endurance', label: '🏃 Resistenza', icon: '🏃' },
    { value: 'toning', label: '✨ Tonificazione', icon: '✨' },
  ];

  const equipmentOptions = [
    { value: 'dumbbells', label: '🏋️ Manubri' },
    { value: 'barbell', label: '🏋️‍♂️ Bilanciere' },
    { value: 'machines', label: '🤖 Macchine' },
    { value: 'bodyweight', label: '💪 Calisthenics' },
    { value: 'cables', label: '🔗 Cavi' },
    { value: 'kettlebells', label: '🎯 Kettlebell' },
  ];

  const focusAreasOptions = [
    { value: 'chest', label: 'Petto' },
    { value: 'back', label: 'Schiena' },
    { value: 'shoulders', label: 'Spalle' },
    { value: 'arms', label: 'Braccia' },
    { value: 'legs', label: 'Gambe' },
    { value: 'glutes', label: 'Glutei' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
  ];

  const exercisesToAvoidOptions = [
    'Squat', 'Deadlift', 'Panca Piana', 'Trazioni', 'Spalle', 'Ginocchia', 'Schiena', 'Anca'
  ];

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      trainingGoals: prev.trainingGoals.includes(goal)
        ? prev.trainingGoals.filter(g => g !== goal)
        : [...prev.trainingGoals, goal]
    }));
  };

  const toggleEquipment = (eq: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(eq)
        ? prev.equipment.filter(e => e !== eq)
        : [...prev.equipment, eq]
    }));
  };

  const toggleFocusArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const toggleExerciseToAvoid = (ex: string) => {
    setFormData(prev => ({
      ...prev,
      exercisesToAvoid: prev.exercisesToAvoid.includes(ex)
        ? prev.exercisesToAvoid.filter(e => e !== ex)
        : [...prev.exercisesToAvoid, ex]
    }));
  };

  const handleSubmit = () => {
    if (!formData.trainingGoals.length) {
      alert('Seleziona almeno un obiettivo di allenamento');
      return;
    }
    if (!formData.equipment.length) {
      alert('Seleziona almeno un tipo di attrezzatura');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Fitness Level */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          📊 Livello di Fitness
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {fitnessLevels.map(level => (
            <button
              key={level.value}
              onClick={() => setFormData(prev => ({ ...prev, fitnessLevel: level.value as any }))}
              disabled={isLoading}
              style={{
                background: formData.fitnessLevel === level.value ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.fitnessLevel === level.value ? COLORS.primary : COLORS.border}`,
                borderRadius: '12px',
                padding: '12px 14px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'left',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '14px', margin: '0 0 2px 0' }}>
                {level.label}
              </p>
              <p style={{ color: COLORS.muted, fontSize: '12px', margin: 0 }}>
                {level.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Training Goals */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🎯 Obiettivi di Allenamento (seleziona almeno 1)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
          {goalsOptions.map(goal => (
            <button
              key={goal.value}
              onClick={() => toggleGoal(goal.value)}
              disabled={isLoading}
              style={{
                background: formData.trainingGoals.includes(goal.value) ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.trainingGoals.includes(goal.value) ? COLORS.primary : COLORS.border}`,
                borderRadius: '12px',
                padding: '10px 12px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '13px', margin: 0 }}>
                {goal.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Available */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🏋️ Attrezzatura Disponibile (seleziona almeno 1)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
          {equipmentOptions.map(eq => (
            <button
              key={eq.value}
              onClick={() => toggleEquipment(eq.value)}
              disabled={isLoading}
              style={{
                background: formData.equipment.includes(eq.value) ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.equipment.includes(eq.value) ? COLORS.primary : COLORS.border}`,
                borderRadius: '12px',
                padding: '10px 12px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '13px', margin: 0 }}>
                {eq.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Training Frequency */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          📅 Frequenza di Allenamento: {formData.trainingFrequency}x per settimana
        </label>
        <input
          type="range"
          min="3"
          max="6"
          value={formData.trainingFrequency}
          onChange={e => setFormData(prev => ({ ...prev, trainingFrequency: parseInt(e.target.value) }))}
          disabled={isLoading}
          style={{
            width: '100%',
            cursor: isLoading ? 'wait' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {[3, 4, 5, 6].map(n => (
            <span key={n} style={{ color: COLORS.muted, fontSize: '12px' }}>{n}x</span>
          ))}
        </div>
      </div>

      {/* Session Duration */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          ⏱️ Durata per Sessione
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[30, 45, 60, 90].map(duration => (
            <button
              key={duration}
              onClick={() => setFormData(prev => ({ ...prev, sessionDuration: duration }))}
              disabled={isLoading}
              style={{
                background: formData.sessionDuration === duration ? COLORS.gradient : COLORS.card,
                border: `1px solid ${formData.sessionDuration === duration ? COLORS.primary : COLORS.border}`,
                borderRadius: '10px',
                padding: '10px',
                color: formData.sessionDuration === duration ? 'white' : COLORS.text,
                fontWeight: 700,
                cursor: isLoading ? 'wait' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {duration}'
            </button>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🎯 Gruppi Muscolari da Enfatizzare
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
          {focusAreasOptions.map(area => (
            <button
              key={area.value}
              onClick={() => toggleFocusArea(area.value)}
              disabled={isLoading}
              style={{
                background: formData.focusAreas.includes(area.value) ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.focusAreas.includes(area.value) ? COLORS.primary : COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 10px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '12px', margin: 0 }}>
                {area.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Exercises to Avoid */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          ⚠️ Esercizi da Evitare (per infortuni/dolori)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
          {exercisesToAvoidOptions.map(ex => (
            <button
              key={ex}
              onClick={() => toggleExerciseToAvoid(ex)}
              disabled={isLoading}
              style={{
                background: formData.exercisesToAvoid.includes(ex) ? `${COLORS.orange}20` : COLORS.card,
                border: `1px solid ${formData.exercisesToAvoid.includes(ex) ? COLORS.orange : COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 10px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '12px', margin: 0 }}>
                {ex}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          background: isLoading ? COLORS.dark : COLORS.gradient,
          border: 'none',
          borderRadius: '14px',
          padding: '14px',
          color: 'white',
          fontWeight: 700,
          fontSize: '15px',
          cursor: isLoading ? 'wait' : 'pointer',
          boxShadow: isLoading ? 'none' : `0 4px 12px ${COLORS.primary}40`,
          opacity: isLoading ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {isLoading ? (
          <>
            <span style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}>⚙️</span>
            Generazione in corso...
          </>
        ) : (
          '🚀 Genera Scheda Allenamento'
        )}
      </button>
    </div>
  );
}
