import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MEMBERS } from '../data/members';

type AgentType = 'scheda' | 'dieta';

interface Msg { from: 'agent' | 'user'; text: string; }

interface Question {
  key: string;
  text: string;
  type?: 'text' | 'number' | 'choice';
  choices?: string[];
}

const SCHEDA_AGENT = {
  title: '🤖 Coach AI — Scheda Allenamento',
  subtitle: 'Personal Trainer Certificato NASM',
  accent: '#ef4444',
  accent2: '#b71c1c',
  intro: 'Ciao! Sono il tuo Coach AI specializzato in programmazione dell\'allenamento. Ti farò alcune domande per costruire una scheda personalizzata, scientificamente validata e adatta al socio.',
  questions: [
    { key: 'peso',      text: 'Qual è il peso attuale del socio? (kg)', type: 'number' as const },
    { key: 'altezza',   text: 'Qual è l\'altezza? (cm)', type: 'number' as const },
    { key: 'obiettivo', text: 'Qual è l\'obiettivo principale?', type: 'choice' as const,
      choices: ['Ipertrofia', 'Dimagrimento', 'Forza', 'Tonificazione', 'Resistenza'] },
    { key: 'livello',   text: 'Qual è il livello di esperienza del socio?', type: 'choice' as const,
      choices: ['Principiante', 'Intermedio', 'Avanzato'] },
    { key: 'frequenza', text: 'Quanti giorni a settimana può allenarsi?', type: 'choice' as const,
      choices: ['3 giorni', '4 giorni', '5 giorni', '6 giorni'] },
    { key: 'infortuni', text: 'Ci sono infortuni o limitazioni fisiche? (scrivi "nessuno" se non ci sono)', type: 'text' as const },
    { key: 'attrezzi',  text: 'Ha accesso a una palestra attrezzata?', type: 'choice' as const, choices: ['Sì, palestra completa', 'Solo manubri', 'Solo corpo libero'] },
  ] as Question[],
};

const DIETA_AGENT = {
  title: '🥗 Nutrizionista AI — Piano Alimentare',
  subtitle: 'Biologo Nutrizionista - Specializzato in Sport Nutrition',
  accent: '#22c55e',
  accent2: '#15803d',
  intro: 'Ciao! Sono il tuo Nutrizionista AI. Progetterò un piano alimentare bilanciato e su misura. Ti servono alcune informazioni sul socio per procedere.',
  questions: [
    { key: 'peso',      text: 'Peso attuale del socio? (kg)', type: 'number' as const },
    { key: 'altezza',   text: 'Altezza? (cm)', type: 'number' as const },
    { key: 'attivita',  text: 'Livello di attività giornaliera?', type: 'choice' as const,
      choices: ['Sedentario', 'Leggero', 'Moderato', 'Attivo', 'Molto attivo'] },
    { key: 'obiettivo', text: 'Obiettivo nutrizionale?', type: 'choice' as const,
      choices: ['Definizione (deficit)', 'Mantenimento', 'Massa (surplus)'] },
    { key: 'preferenze', text: 'Preferenze alimentari?', type: 'choice' as const,
      choices: ['Onnivoro', 'Vegetariano', 'Vegano', 'Pesco-vegetariano'] },
    { key: 'allergie',  text: 'Allergie o intolleranze? (scrivi "nessuna" se non ce ne sono)', type: 'text' as const },
    { key: 'pasti',     text: 'Quanti pasti preferisce al giorno?', type: 'choice' as const,
      choices: ['3 pasti', '4 pasti', '5 pasti'] },
  ] as Question[],
};

// ----------- Plan generators -----------
function generateScheda(a: Record<string, string>, memberName: string): string {
  const split4 = `GIORNO 1 — PETTO & TRICIPITI
- Panca piana con bilanciere: 4×8-10 (90s rec)
- Panca inclinata manubri: 3×10-12
- Croci ai cavi: 3×12-15
- Dips alle parallele: 3×max
- Pushdown al cavo: 3×12
- Estensioni sopra la testa: 3×12

GIORNO 2 — SCHIENA & BICIPITI
- Trazioni alla sbarra: 4×max
- Rematore bilanciere: 4×8-10
- Lat machine presa larga: 3×10-12
- Pulley basso: 3×12
- Curl bilanciere: 3×10
- Curl panca Scott: 3×12

GIORNO 3 — GAMBE & ADDOME
- Squat con bilanciere: 4×8-10 (120s rec)
- Leg press: 4×12
- Affondi con manubri: 3×12 per gamba
- Stacco rumeno: 3×10
- Leg curl: 3×12
- Crunch alla panca: 3×20

GIORNO 4 — SPALLE & CORE
- Military press: 4×8-10
- Alzate laterali: 4×12-15
- Alzate posteriori: 3×15
- Shrugs: 3×12
- Plank: 3×60s
- Russian twist: 3×20`;

  const split3 = `GIORNO 1 — UPPER BODY
- Panca piana: 4×8
- Rematore bilanciere: 4×8
- Military press: 3×10
- Trazioni: 3×max
- Curl bilanciere: 3×10
- French press: 3×10

GIORNO 2 — LOWER BODY
- Squat: 4×8
- Stacco rumeno: 4×8
- Affondi: 3×12 per gamba
- Leg press: 3×12
- Leg curl: 3×15
- Calf raises: 4×15

GIORNO 3 — FULL BODY HIIT
- Circuito: 5 giri
  • Goblet squat: 15
  • Push-up: 12
  • Rematore manubrio: 12 per lato
  • Burpees: 10
  • Plank: 45s`;

  const freq = parseInt(a.frequenza || '4');
  const base = freq >= 4 ? split4 : split3;

  return `SCHEDA PERSONALIZZATA — ${memberName}
Obiettivo: ${a.obiettivo} · Livello: ${a.livello} · Frequenza: ${a.frequenza}
Peso: ${a.peso}kg · Altezza: ${a.altezza}cm
Limitazioni: ${a.infortuni}
Setting: ${a.attrezzi}

══════════════════════════════
${base}

══════════════════════════════
NOTE DEL COACH AI:
• Riscaldamento 8-10 min cardio leggero prima di ogni seduta
• Stretching finale 5 min
• Progressione carichi: +2.5kg appena completi tutte le serie
• Recupero 48-72h per gruppo muscolare
• Scheda da mantenere 6-8 settimane, poi rivalutare
${a.infortuni !== 'nessuno' ? `• ⚠ Attenzione a: ${a.infortuni}` : ''}`;
}

function generateDieta(a: Record<string, string>, memberName: string): string {
  const peso = parseFloat(a.peso) || 75;
  const altezza = parseFloat(a.altezza) || 175;
  const bmr = 10 * peso + 6.25 * altezza - 5 * 30 + 5; // simplified Mifflin
  const actMap: Record<string, number> = {
    'Sedentario': 1.2, 'Leggero': 1.375, 'Moderato': 1.55, 'Attivo': 1.725, 'Molto attivo': 1.9,
  };
  let tdee = Math.round(bmr * (actMap[a.attivita] || 1.55));
  if (a.obiettivo.includes('Definizione')) tdee -= 400;
  if (a.obiettivo.includes('Massa')) tdee += 400;
  const prot = Math.round(peso * 2);
  const grassi = Math.round(peso * 0.9);
  const carbo = Math.round((tdee - (prot * 4 + grassi * 9)) / 4);

  return `PIANO ALIMENTARE — ${memberName}
Obiettivo: ${a.obiettivo}
Peso: ${peso}kg · Altezza: ${altezza}cm
Attività: ${a.attivita} · Preferenze: ${a.preferenze}
Allergie: ${a.allergie}

══════════════════════════════
MACRONUTRIENTI CALCOLATI
• Calorie giornaliere: ${tdee} kcal
• Proteine: ${prot}g (${Math.round(prot*4/tdee*100)}%)
• Carboidrati: ${carbo}g (${Math.round(carbo*4/tdee*100)}%)
• Grassi: ${grassi}g (${Math.round(grassi*9/tdee*100)}%)

══════════════════════════════
SCHEMA TIPO — ${a.pasti}

🌅 COLAZIONE (${Math.round(tdee*0.25)} kcal)
- Avena 70g
- Latte parzialmente scremato 250ml
- Frutti di bosco 100g
- Mandorle 15g

🍎 SPUNTINO (${Math.round(tdee*0.10)} kcal)
- Yogurt greco 0% 150g
- Miele 10g
- 1 frutto

🍽 PRANZO (${Math.round(tdee*0.30)} kcal)
- Petto di pollo 150g (o tofu 200g se vegetariano)
- Riso basmati 80g (peso crudo)
- Verdure grigliate 200g
- Olio EVO 10g

🥪 SPUNTINO (${Math.round(tdee*0.10)} kcal)
- Pane integrale 40g
- Bresaola 50g (o hummus 50g)
- 1 frutto

🌙 CENA (${Math.round(tdee*0.25)} kcal)
- Salmone 150g (o legumi 80g secchi)
- Patate dolci 200g
- Insalata mista 150g
- Olio EVO 10g

══════════════════════════════
NOTE DEL NUTRIZIONISTA AI:
• Bere almeno 2.5L di acqua al giorno
• Ridurre zuccheri raffinati e alcolici
• 1 pasto libero a settimana concesso
• Consumare verdure ad ogni pasto principale
${a.allergie !== 'nessuna' ? `• ⚠ Evitare: ${a.allergie}` : ''}
• Rivalutazione raccomandata ogni 4 settimane`;
}

// ----------- Component -----------
const AgentChat: React.FC<{ type: AgentType }> = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const member = MEMBERS.find((m) => m.id === id) || MEMBERS[0];
  const cfg = type === 'scheda' ? SCHEDA_AGENT : DIETA_AGENT;

  const [messages, setMessages] = useState<Msg[]>([
    { from: 'agent', text: cfg.intro },
    { from: 'agent', text: `Socio: ${member.name}, ${member.age} anni.` },
    { from: 'agent', text: cfg.questions[0].text },
  ]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState('');
  const [generated, setGenerated] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (value: string) => {
    if (!value.trim()) return;
    const q = cfg.questions[step];
    const newAnswers = { ...answers, [q.key]: value };
    setAnswers(newAnswers);
    setMessages((m) => [...m, { from: 'user', text: value }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const next = step + 1;
      if (next < cfg.questions.length) {
        setMessages((m) => [...m, { from: 'agent', text: cfg.questions[next].text }]);
        setStep(next);
      } else {
        // finish — generate plan
        setMessages((m) => [...m, { from: 'agent', text: 'Perfetto, ho tutte le informazioni necessarie. Sto elaborando il piano personalizzato... 🧠' }]);
        setTimeout(() => {
          const plan = type === 'scheda'
            ? generateScheda(newAnswers, member.name)
            : generateDieta(newAnswers, member.name);
          const date = new Date().toLocaleDateString('it-IT');
          localStorage.setItem(`oxy_${type}_${member.id}`, JSON.stringify({ plan, date, answers: newAnswers }));
          setGenerated(plan);
          setMessages((m) => [...m, { from: 'agent', text: '✅ Piano generato e salvato nel profilo del socio.' }]);
        }, 1400);
      }
    }, 700);
  };

  const q = cfg.questions[step];
  const isChoice = q?.type === 'choice';

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#000',
      display: 'flex', flexDirection: 'column',
      color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif",
      paddingBottom: '80px',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }
        @keyframes dot { 0%,60%,100%{opacity:0.3} 30%{opacity:1} }
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: ${cfg.accent}; border-radius: 999px; }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent2})`,
        borderBottom: `2px solid ${cfg.accent}`,
        display: 'flex', alignItems: 'center', gap: '12px',
        boxShadow: `0 4px 20px ${cfg.accent}55`,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => navigate(`/admin/membro/${member.id}`)} style={{
          background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '10px', padding: '6px 10px', color: '#fff',
          fontSize: '12px', cursor: 'pointer', fontWeight: 700,
        }}>←</button>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800 }}>{cfg.title}</div>
          <div style={{ fontSize: '10px', opacity: 0.85, marginTop: '2px' }}>{cfg.subtitle}</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="chat-scroll" style={{
        flex: 1, overflowY: 'auto', padding: '20px 16px',
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', marginBottom: '12px',
            justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
            animation: 'fadeInUp 0.3s ease-out',
          }}>
            <div style={{
              maxWidth: '78%',
              background: m.from === 'user'
                ? 'rgba(255,255,255,0.08)'
                : `linear-gradient(135deg, ${cfg.accent}22, ${cfg.accent}11)`,
              border: m.from === 'user'
                ? '1px solid rgba(255,255,255,0.15)'
                : `1px solid ${cfg.accent}66`,
              borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '10px 14px',
              fontSize: '13px', lineHeight: 1.5,
              color: '#fff',
              boxShadow: m.from === 'agent' ? `0 2px 10px ${cfg.accent}33` : 'none',
            }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: '4px', padding: '10px 14px' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: cfg.accent, animation: `dot 1.4s infinite`,
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
        )}

        {generated && (
          <div style={{
            marginTop: '16px',
            background: 'rgba(0,0,0,0.6)',
            border: `1.5px solid ${cfg.accent}`,
            borderRadius: '14px', padding: '14px',
            boxShadow: `0 4px 20px ${cfg.accent}55`,
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: cfg.accent, marginBottom: '8px' }}>
              📄 PIANO GENERATO
            </div>
            <pre style={{
              whiteSpace: 'pre-wrap', fontFamily: 'inherit',
              fontSize: '11px', lineHeight: 1.55, margin: 0,
              color: 'rgba(255,255,255,0.9)',
            }}>{generated}</pre>
            <button onClick={() => navigate(`/admin/membro/${member.id}`)} style={{
              marginTop: '14px', width: '100%', padding: '12px',
              background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent2})`,
              border: `1px solid ${cfg.accent}`, borderRadius: '10px',
              color: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>✓ TORNA AL PROFILO</button>
          </div>
        )}
      </div>

      {/* Input area */}
      {!generated && (
        <div style={{
          padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)',
          background: '#0a0a0a',
        }}>
          {isChoice ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {q.choices!.map((c) => (
                <button key={c} onClick={() => send(c)} style={{
                  padding: '10px 14px',
                  background: `${cfg.accent}18`,
                  border: `1.5px solid ${cfg.accent}88`,
                  borderRadius: '999px',
                  color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{c}</button>
              ))}
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                autoFocus
                type={q?.type === 'number' ? 'number' : 'text'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi la risposta..."
                style={{
                  flex: 1, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${cfg.accent}55`,
                  borderRadius: '12px', color: '#fff', fontSize: '13px',
                  outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
              <button type="submit" style={{
                padding: '12px 18px',
                background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent2})`,
                border: `1px solid ${cfg.accent}`, borderRadius: '12px',
                color: '#fff', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>➤</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentChat;
