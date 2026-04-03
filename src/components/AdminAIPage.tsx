import { useState } from 'react';
import { COLORS } from '../config/theme';
import { members } from '../data/members';

type GenMode = 'scheda' | 'dieta';

const sampleScheda = `📋 SCHEDA ALLENAMENTO AI — Alessandro M.
━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: Massa Muscolare
📅 Durata: 4 settimane (ciclo ipertrofia)

GIORNO A — PUSH (Lunedì/Giovedì)
• Panca Piana: 4×8 @75% 1RM
• Overhead Press: 3×10 @65%
• Dips weighted: 3×12
• Lateral Raise: 4×15 superSet Cable Fly 3×15

GIORNO B — PULL (Martedì/Venerdì)
• Trazioni Zavorrate: 4×8
• Rematore bilanciere: 4×10
• Cable Row: 3×12
• Face Pull: 4×20 + Bicep Curl 3×12

GIORNO C — LEGS (Mercoledì/Sabato)
• Squat: 5×5 @80% 1RM
• Leg Press: 4×12
• Romanian Deadlift: 4×10
• Leg Curl + Calf Raise: 3×15

⚡ Cardio: 20 min LISS post-sessione
💊 Note: Aumentare carico del 2.5% ogni 2 settimane`;

const sampleDieta = `🥗 PIANO NUTRIZIONALE AI — Alessandro M.
━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: Lean Bulk (+200-300 kcal surplus)
⚖️ Peso: 82 kg | TDEE stimato: 2,850 kcal

📊 MACROS TARGET:
• Calorie: 3,100 kcal/giorno
• Proteine: 195g (2.4g/kg)
• Carboidrati: 360g (fuel allenamenti)
• Grassi: 85g (ormoni e sazietà)

🌅 COLAZIONE (700 kcal)
• 150g fiocchi avena + 30g whey + banana
• 4 uova strapazzate + 2 fette pane integrale

🍽️ PRANZO (900 kcal)
• 200g riso integrale + 200g pollo al forno
• Verdure a volontà + 1 cucchiaio olio EVO

🏋️ PRE-WORKOUT (300 kcal)
• 1 banana + 40g whey in acqua

🌆 CENA (900 kcal)
• 200g salmone o carne rossa 2×/sett
• 300g patate dolci + broccoli

🌙 SPUNTINO SERALE (300 kcal)
• 200g yogurt greco 0% + 30g frutta secca

💊 INTEGRAZIONE: Creatina 5g, Vit D3 2000UI`;

export default function AdminAIPage() {
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [mode, setMode] = useState<GenMode>('scheda');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const generate = () => {
    setGenerating(true);
    setShowResult(false);
    setResult('');
    setTimeout(() => {
      setGenerating(false);
      setResult(mode === 'scheda' ? sampleScheda : sampleDieta);
      setShowResult(true);
    }, 2200);
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
        {/* Member Selector */}
        <div>
          <p style={{ color: COLORS.textSec, fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>👤 Seleziona Socio</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {members.slice(0, 5).map(m => (
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
              <button key={m} onClick={() => { setMode(m); setShowResult(false); }} style={{
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
          <p style={{ color: COLORS.muted, fontSize: '12px', marginBottom: '10px' }}>Parametri per la generazione</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { k: 'Peso', v: `${selectedMember.weight} kg` },
              { k: 'Livello', v: `Lv.${selectedMember.level}` },
              { k: 'Streak', v: `${selectedMember.streak}gg` },
              { k: 'Obiettivo', v: selectedMember.goal },
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

        {/* Generate Button */}
        <button onClick={generate} disabled={generating} style={{
          background: generating ? COLORS.dark : COLORS.gradient,
          border: 'none', borderRadius: '16px', padding: '16px',
          color: 'white', fontSize: '16px', fontWeight: 800, cursor: generating ? 'wait' : 'pointer',
          boxShadow: generating ? 'none' : `0 6px 20px ${COLORS.primary}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}>
          {generating ? (
            <>
              <span style={{ fontSize: '20px', animation: 'spin 1s linear infinite' }}>⚙️</span>
              AI in elaborazione...
            </>
          ) : (
            <>🤖 Genera {mode === 'scheda' ? 'Scheda AI' : 'Piano Nutrizionale'}</>
          )}
        </button>

        {/* Result */}
        {showResult && (
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.borderBright}`,
            borderRadius: '16px', padding: '18px',
            boxShadow: `0 0 20px ${COLORS.primary}15`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: '14px' }}>✅ Generato con successo</p>
              <button style={{
                background: COLORS.gradient, border: 'none', borderRadius: '10px',
                padding: '6px 14px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              }}>📤 Invia al Socio</button>
            </div>
            <pre style={{
              color: COLORS.text, fontSize: '12px', lineHeight: '1.7',
              whiteSpace: 'pre-wrap', fontFamily: 'monospace',
            }}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
