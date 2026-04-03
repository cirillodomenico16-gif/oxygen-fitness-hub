import { useState } from 'react';
import { COLORS } from '../config/theme';
import { NutritionQuestionnaireData } from '../services/PlanStorage';

interface Props {
  onSubmit: (data: NutritionQuestionnaireData) => void;
  isLoading?: boolean;
  userWeight?: number;
  userAge?: number;
}

export default function NutritionQuestionnaire({ onSubmit, isLoading, userWeight = 75, userAge = 30 }: Props) {
  const [formData, setFormData] = useState<NutritionQuestionnaireData>({
    dietaryPreference: 'omnivore',
    caloricIntake: 2500,
    mealFrequency: 4,
    allergies: [],
    cuisinePreferences: [],
    cookingSkillLevel: 'intermediate',
  });

  const dietaryOptions = [
    { value: 'omnivore', label: '🥩🥗 Onnivoro', desc: 'Tutto, senza restrizioni' },
    { value: 'vegetarian', label: '🥚🥗 Vegetariano', desc: 'Senza carne' },
    { value: 'vegan', label: '🥗 Vegano', desc: 'Solo vegetale' },
    { value: 'keto', label: '🥓🥬 Chetogenico', desc: 'Basso carb, alto grasso' },
    { value: 'high-protein', label: '🍗💪 Alto Proteico', desc: 'Massima proteina' },
  ];

  const allegyOptions = [
    'Lattosio', 'Noci', 'Arachidi', 'Pesce', 'Crostacei', 'Uova', 'Gluten', 'Soia'
  ];

  const cuisineOptions = [
    '🇮🇹 Italiana', '🇯🇵 Giapponese', '🇪🇸 Spagnola', '🇬🇷 Greca', '🇮🇳 Indiana', '🇲🇪 Messicana', '🇹🇭 Tailandese', '🇺🇸 Americana'
  ];

  // Calculate TDEE estimate
  const estimateTDEE = () => {
    const mifflinStJeor = userGender === 'M'
      ? (10 * userWeight) + (6.25 * userAge) - 161
      : (10 * userWeight) + (6.25 * userAge) - 5;

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    return Math.round(mifflinStJeor * activityMultipliers['moderate']);
  };

  const [userGender, setUserGender] = useState<'M' | 'F'>('M');
  const tdeeEstimate = estimateTDEE();

  const toggleAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const toggleCuisine = (cuisine: string) => {
    setFormData(prev => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(cuisine)
        ? prev.cuisinePreferences.filter(c => c !== cuisine)
        : [...prev.cuisinePreferences, cuisine]
    }));
  };

  const handleCalorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 1500;
    setFormData(prev => ({ ...prev, caloricIntake: Math.max(1500, Math.min(5000, val)) }));
  };

  const handleSubmit = () => {
    if (formData.caloricIntake < 1500) {
      alert('Le calorie minime sono 1500 kcal');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Dietary Preference */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🍽️ Preferenza Dietetica
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {dietaryOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFormData(prev => ({ ...prev, dietaryPreference: option.value as any }))}
              disabled={isLoading}
              style={{
                background: formData.dietaryPreference === option.value ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.dietaryPreference === option.value ? COLORS.primary : COLORS.border}`,
                borderRadius: '12px',
                padding: '12px 14px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'left',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '14px', margin: '0 0 2px 0' }}>
                {option.label}
              </p>
              <p style={{ color: COLORS.muted, fontSize: '12px', margin: 0 }}>
                {option.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Caloric Intake */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🔥 Intake Calorico Giornaliero
        </label>
        <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '6px' }}>
          TDEE stimato: {tdeeEstimate} kcal/giorno
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          {[
            { label: 'Deficit', val: Math.round(tdeeEstimate * 0.8), desc: '-20%' },
            { label: 'Mantenimento', val: tdeeEstimate, desc: '0%' },
            { label: 'Surplus', val: Math.round(tdeeEstimate * 1.15), desc: '+15%' },
          ].map(opt => (
            <button
              key={opt.label}
              onClick={() => setFormData(prev => ({ ...prev, caloricIntake: opt.val }))}
              disabled={isLoading}
              style={{
                flex: 1,
                background: formData.caloricIntake === opt.val ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.caloricIntake === opt.val ? COLORS.primary : COLORS.border}`,
                borderRadius: '10px',
                padding: '8px',
                cursor: isLoading ? 'wait' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '12px', margin: 0 }}>
                {opt.label}
              </p>
              <p style={{ color: COLORS.muted, fontSize: '11px', margin: 0 }}>
                {opt.val} kcal ({opt.desc})
              </p>
            </button>
          ))}
        </div>
        <input
          type="number"
          value={formData.caloricIntake}
          onChange={handleCalorieChange}
          disabled={isLoading}
          min="1500"
          max="5000"
          style={{
            width: '100%',
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '10px',
            padding: '10px 12px',
            color: COLORS.text,
            fontSize: '14px',
            boxSizing: 'border-box',
            cursor: isLoading ? 'wait' : 'text',
            opacity: isLoading ? 0.6 : 1,
          }}
        />
      </div>

      {/* Meal Frequency */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🍽️ Frequenza Pasti: {formData.mealFrequency} pasti al giorno
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[3, 4, 5, 6].map(freq => (
            <button
              key={freq}
              onClick={() => setFormData(prev => ({ ...prev, mealFrequency: freq }))}
              disabled={isLoading}
              style={{
                background: formData.mealFrequency === freq ? COLORS.gradient : COLORS.card,
                border: `1px solid ${formData.mealFrequency === freq ? COLORS.primary : COLORS.border}`,
                borderRadius: '10px',
                padding: '10px',
                color: formData.mealFrequency === freq ? 'white' : COLORS.text,
                fontWeight: 700,
                cursor: isLoading ? 'wait' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {freq} pasti
            </button>
          ))}
        </div>
        <p style={{ color: COLORS.muted, fontSize: '11px', marginTop: '8px' }}>
          ≈ {Math.round(formData.caloricIntake / formData.mealFrequency)} kcal per pasto
        </p>
      </div>

      {/* Allergies */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          ⚠️ Allergie / Intolleranze
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
          {allegyOptions.map(allergy => (
            <button
              key={allergy}
              onClick={() => toggleAllergy(allergy)}
              disabled={isLoading}
              style={{
                background: formData.allergies.includes(allergy) ? `${COLORS.orange}20` : COLORS.card,
                border: `1px solid ${formData.allergies.includes(allergy) ? COLORS.orange : COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 10px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '12px', margin: 0 }}>
                {allergy}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          🌍 Preferenze Culinarie
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
          {cuisineOptions.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              disabled={isLoading}
              style={{
                background: formData.cuisinePreferences.includes(cuisine) ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.cuisinePreferences.includes(cuisine) ? COLORS.primary : COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 10px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '12px', margin: 0 }}>
                {cuisine}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Skill */}
      <div>
        <label style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          👨‍🍳 Livello di Cucina
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { value: 'basic', label: '🆕 Base', desc: 'Ricette semplici' },
            { value: 'intermediate', label: '👨‍🍳 Intermedio', desc: 'Un po\' di esperienza' },
            { value: 'advanced', label: '🥘 Avanzato', desc: 'Cuoco esperto' },
          ].map(skill => (
            <button
              key={skill.value}
              onClick={() => setFormData(prev => ({ ...prev, cookingSkillLevel: skill.value as any }))}
              disabled={isLoading}
              style={{
                background: formData.cookingSkillLevel === skill.value ? `${COLORS.primary}20` : COLORS.card,
                border: `1px solid ${formData.cookingSkillLevel === skill.value ? COLORS.primary : COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 10px',
                cursor: isLoading ? 'wait' : 'pointer',
                textAlign: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '12px', margin: '0 0 2px 0' }}>
                {skill.label}
              </p>
              <p style={{ color: COLORS.muted, fontSize: '10px', margin: 0 }}>
                {skill.desc}
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
          '🚀 Genera Piano Nutrizionale'
        )}
      </button>
    </div>
  );
}
