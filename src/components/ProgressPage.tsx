import { useState, useEffect } from 'react';
import { COLORS } from '../config/theme';

interface NutritionPlan {
  content: string;
  generatedAt: string;
}

const weightData = [
  { m: 'Set', v: 88 }, { m: 'Ott', v: 86.5 }, { m: 'Nov', v: 85 },
  { m: 'Dic', v: 84 }, { m: 'Gen', v: 83 }, { m: 'Feb', v: 82.3 },
  { m: 'Mar', v: 82 },
];

const measures = [
  { label: 'Petto', value: '102 cm', delta: '-2 cm', good: true },
  { label: 'Vita', value: '82 cm', delta: '-4 cm', good: true },
  { label: 'Fianchi', value: '96 cm', delta: '-3 cm', good: true },
  { label: 'Bicipite', value: '38 cm', delta: '+1.5 cm', good: true },
  { label: 'Coscia', value: '58 cm', delta: '+1 cm', good: true },
  { label: 'Body Fat', value: '16.2%', delta: '-2.1%', good: true },
];

const streakDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  active: [1,2,3,5,6,8,9,10,11,12,14,15,16,17,18,20,21,22,23,24,26,27,28,29,30].includes(i + 1),
}));

const tabs = ['📊 Peso', '📏 Misure', '🔥 Streak'];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);

  // Load nutrition plan from localStorage
  useEffect(() => {
    try {
      const userId = localStorage.getItem('currentUserId') || 'default';
      const planKey = `o2_plans_${userId}_nutrition`;
      const storedPlan = localStorage.getItem(planKey);
      if (storedPlan) {
        const parsed = JSON.parse(storedPlan);
        if (parsed.content) {
          setNutritionPlan(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading nutrition plan:', err);
    }
  }, []);

  const maxW = Math.max(...weightData.map(d => d.v));
  const minW = Math.min(...weightData.map(d => d.v));

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: COLORS.gradientDark, padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <h1 style={{ color: COLORS.text, fontSize: '24px', fontWeight: 800 }}>📊 I Tuoi Progressi</h1>
        <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '4px' }}>Ottobre 2025 → Marzo 2026</p>

        {/* Summary badges */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
          {[
            { label: '-6 kg', sub: 'peso perso', color: COLORS.success },
            { label: '18 🔥', sub: 'streak attuale', color: COLORS.orange },
            { label: 'Lv.12', sub: 'livello raggiunto', color: COLORS.primary },
          ].map(b => (
            <div key={b.label} style={{
              background: `${b.color}18`, border: `1px solid ${b.color}40`,
              borderRadius: '12px', padding: '8px 14px',
            }}>
              <p style={{ color: b.color, fontWeight: 800, fontSize: '15px' }}>{b.label}</p>
              <p style={{ color: COLORS.muted, fontSize: '11px' }}>{b.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: '0', background: COLORS.dark,
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{
            flex: 1, background: 'none', border: 'none',
            borderBottom: `2px solid ${activeTab === i ? COLORS.primary : 'transparent'}`,
            padding: '14px 8px', color: activeTab === i ? COLORS.primary : COLORS.muted,
            fontSize: '13px', fontWeight: activeTab === i ? 700 : 400, cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        {/* PESO TAB */}
        {activeTab === 0 && (
          <div>
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '20px', marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>Peso attuale</p>
                  <p style={{ color: COLORS.text, fontSize: '32px', fontWeight: 900 }}>82.0 <span style={{ fontSize: '16px', color: COLORS.muted }}>kg</span></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>Obiettivo</p>
                  <p style={{ color: COLORS.success, fontSize: '18px', fontWeight: 700 }}>78 kg</p>
                  <p style={{ color: COLORS.muted, fontSize: '11px' }}>ancora 4 kg</p>
                </div>
              </div>
              {/* Chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px' }}>
                {weightData.map((d, i) => {
                  const h = ((d.v - minW + 1) / (maxW - minW + 2)) * 100;
                  const isLast = i === weightData.length - 1;
                  return (
                    <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <p style={{ color: isLast ? COLORS.primary : COLORS.muted, fontSize: '10px', fontWeight: isLast ? 800 : 400 }}>{d.v}</p>
                      <div style={{
                        width: '100%', height: `${h}%`,
                        background: isLast ? COLORS.gradient : `${COLORS.primary}30`,
                        borderRadius: '4px 4px 0 0',
                        boxShadow: isLast ? `0 0 8px ${COLORS.primary}50` : 'none',
                      }} />
                      <p style={{ color: COLORS.muted, fontSize: '10px' }}>{d.m}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MISURE TAB */}
        {activeTab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {measures.map(m => (
              <div key={m.label} style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: '14px', padding: '14px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <p style={{ color: COLORS.textSec, fontSize: '14px' }}>{m.label}</p>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>{m.value}</p>
                  <p style={{ color: COLORS.success, fontSize: '12px' }}>{m.delta} da inizio</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STREAK TAB */}
        {activeTab === 2 && (
          <div>
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center',
            }}>
              <p style={{ color: COLORS.text, fontSize: '64px', fontWeight: 900 }}>18</p>
              <p style={{ color: COLORS.orange, fontWeight: 700, fontSize: '16px' }}>🔥 Giorni di Streak Attivi</p>
              <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '6px' }}>
                Record personale: <strong style={{ color: COLORS.text }}>34 giorni</strong>
              </p>
            </div>
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '16px',
            }}>
              <p style={{ color: COLORS.text, fontWeight: 700, marginBottom: '14px', fontSize: '14px' }}>Marzo 2026</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {['L','M','M','G','V','S','D'].map((d, i) => (
                  <p key={i} style={{ color: COLORS.muted, fontSize: '11px', textAlign: 'center', marginBottom: '4px' }}>{d}</p>
                ))}
                {streakDays.map(({ day, active }) => (
                  <div key={day} style={{
                    aspectRatio: '1', borderRadius: '8px',
                    background: active ? COLORS.gradient : COLORS.dark,
                    border: `1px solid ${active ? COLORS.primary : COLORS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: active ? 'white' : COLORS.muted,
                    fontWeight: active ? 700 : 400,
                    boxShadow: active ? `0 0 6px ${COLORS.primary}40` : 'none',
                  }}>{active ? '🔥' : day}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dieta Settimanale (Weekly Diet Plan) */}
      {nutritionPlan && (
        <div style={{ padding: '20px', borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: '16px', padding: '16px', marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px' }}>🥗</span>
              <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700 }}>Dieta Settimanale</h3>
            </div>
            <p style={{ color: COLORS.muted, fontSize: '11px', marginBottom: '10px' }}>
              Generata: {new Date(nutritionPlan.generatedAt).toLocaleDateString('it-IT')}
            </p>
            <div style={{
              background: COLORS.bg, borderRadius: '12px', padding: '14px',
              maxHeight: '300px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '11px',
              color: COLORS.textSec, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              lineHeight: '1.5',
            }}>
              {nutritionPlan.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
