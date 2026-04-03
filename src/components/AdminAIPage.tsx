import { useState } from 'react';
import { COLORS } from '../config/theme';
import { members } from '../data/members';
import WorkoutQuestionnaire from './WorkoutQuestionnaire';
import NutritionQuestionnaire from './NutritionQuestionnaire';
import { planGenerator } from '../services/PlanGenerator';
import { planStorage, WorkoutQuestionnaireData, NutritionQuestionnaireData } from '../services/PlanStorage';

type GenMode = 'scheda' | 'dieta';
type AdminState = 'member-select' | 'questionnaire' | 'result' | 'history';

export default function AdminAIPage() {
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [mode, setMode] = useState<GenMode>('scheda');
  const [adminState, setAdminState] = useState<AdminState>('member-select');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<any>(null);

  const handleWorkoutSubmit = async (formData: WorkoutQuestionnaireData) => {
    setGenerating(true);
    try {
      const generatedPlan = await planGenerator.generateWorkoutPlan(
        selectedMember.name,
        selectedMember.weight,
        30, // age - could be from member data
        formData
      );

      planStorage.saveWorkoutPlan(selectedMember.id, selectedMember.name, generatedPlan, formData);
      setResult(generatedPlan);
      setAdminState('result');
    } catch (err) {
      console.error('Error generating workout plan:', err);
      alert('Errore nella generazione della scheda');
    } finally {
      setGenerating(false);
    }
  };

  const handleNutritionSubmit = async (formData: NutritionQuestionnaireData) => {
    setGenerating(true);
    try {
      const generatedPlan = await planGenerator.generateNutritionPlan(
        selectedMember.name,
        selectedMember.weight,
        30, // age - could be from member data
        'M', // gender - could be from member data
        'moderate', // activity level
        formData
      );

      planStorage.saveNutritionPlan(selectedMember.id, selectedMember.name, generatedPlan, formData);
      setResult(generatedPlan);
      setAdminState('result');
    } catch (err) {
      console.error('Error generating nutrition plan:', err);
      alert('Errore nella generazione del piano nutrizionale');
    } finally {
      setGenerating(false);
    }
  };

  const handleViewHistory = () => {
    const userHistory = planStorage.getHistory(selectedMember.id);
    setHistory(userHistory);
    setAdminState('history');
  };

  const handleSendToMember = () => {
    alert(`Piano ${mode === 'scheda' ? 'di allenamento' : 'nutrizionale'} inviato a ${selectedMember.name}!`);
  };

  const handleNewGeneration = () => {
    setAdminState('member-select');
    setResult('');
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0a0202 0%, #060202 100%)',
        padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.borderBright}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: 42, height: 42, borderRadius: '12px',
            background: COLORS.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
            boxShadow: `0 0 16px ${COLORS.primary}40`,
          }}>🤖</div>
          <div>
            <h1 style={{ color: COLORS.text, fontSize: '20px', fontWeight: 800 }}>Schede AI & Diete</h1>
            <p style={{ color: COLORS.muted, fontSize: '12px' }}>Generazione personalizzata con AI</p>
          </div>
        </div>
        <div style={{
          background: `${COLORS.primary}10`, border: `1px solid ${COLORS.border}`,
          borderRadius: '10px', padding: '10px 14px', marginTop: '8px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '14px' }}>⚙️</span>
          <p style={{ color: COLORS.textSec, fontSize: '12px' }}>
            Funzione <strong style={{ color: COLORS.primary }}>esclusiva admin</strong> — i soci non vedono questo pannello
          </p>
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {adminState === 'member-select' && (
          <>
            {/* Member Selector */}
            <div>
              <p style={{ color: COLORS.textSec, fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>👤 Seleziona Socio</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {members.map(m => (
                  <button key={m.id} onClick={() => setSelectedMember(m)} style={{
                    background: selectedMember.id === m.id ? `${COLORS.primary}12` : COLORS.card,
                    border: `1px solid ${selectedMember.id === m.id ? COLORS.primary : COLORS.border}`,
                    borderRadius: '12px', padding: '12px 14px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                    <span style={{ fontSize: '24px' }}>{m.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: selectedMember.id === m.id ? COLORS.primary : COLORS.text, fontWeight: 600, fontSize: '14px' }}>{m.name}</p>
                      <p style={{ color: COLORS.muted, fontSize: '11px' }}>{m.plan} · Obiettivo: {m.goal} · {m.weight}kg</p>
                    </div>
                    <span style={{
                      fontSize: '11px', padding: '2px 8px', borderRadius: '8px',
                      background: m.plan === 'Elite' ? `${COLORS.primary}20` : m.plan === 'Premium' ? `${COLORS.orange}20` : COLORS.dark,
                      color: m.plan === 'Elite' ? COLORS.primary : m.plan === 'Premium' ? COLORS.orange : COLORS.muted,
                      fontWeight: 700,
                    }}>{m.plan}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Toggle */}
            <div>
              <p style={{ color: COLORS.textSec, fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>🎯 Cosa generare?</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {([['scheda', '🏋️ Scheda Allenamento'], ['dieta', '🥗 Piano Nutrizionale']] as [GenMode, string][]).map(([m, label]) => (
                  <button key={m} onClick={() => setMode(m)} style={{
                    flex: 1, background: mode === m ? COLORS.gradient : COLORS.card,
                    border: `1px solid ${mode === m ? COLORS.primary : COLORS.border}`,
                    borderRadius: '14px', padding: '14px',
                    color: mode === m ? 'white' : COLORS.textSec,
                    fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                    boxShadow: mode === m ? `0 4px 14px ${COLORS.primary}40` : 'none',
                  }}>{label}</button>
                ))}
              </div>
            </div>

            {/* Selected Member Info */}
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '14px', padding: '14px 16px',
            }}>
              <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '10px' }}>Parametri di {selectedMember.name}</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { k: 'Peso', v: `${selectedMember.weight} kg` },
                  { k: 'Livello', v: `Lv.${selectedMember.level}` },
                  { k: 'Streak', v: `${selectedMember.streak}gg` },
                  { k: 'Obiettivo', v: selectedMember.goal },
                  { k: 'Plan', v: selectedMember.plan },
                ].map(p => (
                  <div key={p.k} style={{
                    background: COLORS.dark, borderRadius: '10px', padding: '6px 12px',
                  }}>
                    <p style={{ color: COLORS.muted, fontSize: '10px' }}>{p.k}</p>
                    <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '13px' }}>{p.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setAdminState('questionnaire')}
                style={{
                  flex: 1,
                  background: COLORS.gradient,
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: `0 4px 12px ${COLORS.primary}40`,
                }}
              >
                ➕ Nuova {mode === 'scheda' ? 'Scheda' : 'Dieta'}
              </button>
              <button
                onClick={handleViewHistory}
                style={{
                  flex: 1,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '14px',
                  padding: '14px',
                  color: COLORS.text,
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                📜 Cronologia
              </button>
            </div>
          </>
        )}

        {adminState === 'questionnaire' && (
          <>
            <button
              onClick={() => setAdminState('member-select')}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 14px',
                color: COLORS.text,
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Indietro
            </button>
            <div style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '14px',
              padding: '16px',
            }}>
              <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
                {mode === 'scheda' ? '🏋️ Genera Scheda Allenamento' : '🥗 Genera Piano Nutrizionale'}
              </h3>
              {mode === 'scheda' ? (
                <WorkoutQuestionnaire onSubmit={handleWorkoutSubmit} isLoading={generating} />
              ) : (
                <NutritionQuestionnaire
                  onSubmit={handleNutritionSubmit}
                  isLoading={generating}
                  userWeight={selectedMember.weight}
                  userAge={30}
                />
              )}
            </div>
          </>
        )}

        {adminState === 'result' && (
          <>
            <button
              onClick={handleNewGeneration}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 14px',
                color: COLORS.text,
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Nuova Generazione
            </button>
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.borderBright}`,
              borderRadius: '16px', padding: '18px',
              boxShadow: `0 0 20px ${COLORS.primary}15`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: '14px' }}>
                  ✅ {mode === 'scheda' ? 'Scheda' : 'Piano'} Generato con Successo
                </p>
                <button
                  onClick={handleSendToMember}
                  style={{
                    background: COLORS.gradient, border: 'none', borderRadius: '10px',
                    padding: '8px 14px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  📤 Invia a {selectedMember.name}
                </button>
              </div>
              <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '12px' }}>
                Generato: {new Date().toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div style={{
                background: COLORS.bg, borderRadius: '12px', padding: '14px',
                maxHeight: '400px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '11px',
                color: COLORS.textSec, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                lineHeight: '1.6', border: `1px solid ${COLORS.border}`,
              }}>
                {result}
              </div>
            </div>
          </>
        )}

        {adminState === 'history' && (
          <>
            <button
              onClick={() => setAdminState('member-select')}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '10px',
                padding: '8px 14px',
                color: COLORS.text,
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Indietro
            </button>
            <div style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '14px',
              padding: '16px',
            }}>
              <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>
                📜 Cronologia Piani di {selectedMember.name}
              </h3>
              {history && (Object.keys(history).length === 0 || (history.workout.length === 0 && history.nutrition.length === 0)) ? (
                <p style={{ color: COLORS.muted, fontSize: '13px' }}>Nessun piano generato ancora</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {history?.workout && history.workout.length > 0 && (
                    <div>
                      <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                        🏋️ Schede di Allenamento ({history.workout.length})
                      </p>
                      {history.workout.map((h: any, i: number) => (
                        <div key={i} style={{
                          background: COLORS.dark, borderRadius: '10px', padding: '10px 12px',
                          marginBottom: '6px', border: `1px solid ${COLORS.border}`,
                        }}>
                          <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0' }}>
                            {new Date(h.generatedAt).toLocaleDateString('it-IT')}
                          </p>
                          <p style={{ color: COLORS.textSec, fontSize: '12px', margin: 0 }}>
                            Frequenza: {h.parameters?.trainingFrequency}x/sett · Durata: {h.parameters?.sessionDuration}'
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {history?.nutrition && history.nutrition.length > 0 && (
                    <div>
                      <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                        🥗 Piani Nutrizionali ({history.nutrition.length})
                      </p>
                      {history.nutrition.map((h: any, i: number) => (
                        <div key={i} style={{
                          background: COLORS.dark, borderRadius: '10px', padding: '10px 12px',
                          marginBottom: '6px', border: `1px solid ${COLORS.border}`,
                        }}>
                          <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0' }}>
                            {new Date(h.generatedAt).toLocaleDateString('it-IT')}
                          </p>
                          <p style={{ color: COLORS.textSec, fontSize: '12px', margin: 0 }}>
                            Calorie: {h.parameters?.caloricIntake} kcal · Pasti: {h.parameters?.mealFrequency}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
