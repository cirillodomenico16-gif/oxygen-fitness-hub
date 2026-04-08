import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MEMBERS } from '../data/members';
import { callClaude, hasApiKey, getHistory, saveToHistory, pushNotification, PlanRecord } from '../lib/llm';
import { getProgressSummary } from '../data/progress';

type AgentType = 'scheda' | 'dieta';

interface Msg { from: 'agent' | 'user'; text: string; }

interface Question {
  key: string;
  text: string;
  type?: 'text' | 'number' | 'choice';
  choices?: string[];
}

const SCHEDA_AGENT = {
  title: 'Coach AI — Scheda Allenamento',
  subtitle: 'Personal Trainer Certificato NASM',
  accent: '#ef4444',
  accent2: '#b71c1c',
  intro: 'Ciao, sono il Coach AI specializzato in programmazione dell\'allenamento. Ti farò alcune domande per costruire una scheda personalizzata, scientificamente validata e adatta al socio.',
  questions: [
    { key: 'peso', text: 'Qual è il peso attuale del socio in kg?', type: 'number' as const },
    { key: 'altezza', text: 'Qual è l\'altezza in cm?', type: 'number' as const },
    { key: 'obiettivo', text: 'Qual è l\'obiettivo principale?', type: 'choice' as const,
      choices: ['Ipertrofia', 'Dimagrimento', 'Forza', 'Tonificazione', 'Resistenza'] },
    { key: 'livello', text: 'Qual è il livello di esperienza del socio?', type: 'choice' as const,
      choices: ['Principiante', 'Intermedio', 'Avanzato'] },
    { key: 'frequenza', text: 'Quanti giorni a settimana può allenarsi?', type: 'choice' as const,
      choices: ['3 giorni', '4 giorni', '5 giorni', '6 giorni'] },
    { key: 'infortuni', text: 'Ci sono infortuni o limitazioni fisiche? Scrivi "nessuno" se non ce ne sono.', type: 'text' as const },
    { key: 'attrezzi', text: 'Ha accesso a una palestra attrezzata?', type: 'choice' as const, choices: ['Sì, palestra completa', 'Solo manubri', 'Solo corpo libero'] },
  ] as Question[],
};

const DIETA_AGENT = {
  title: 'Nutrizionista AI — Piano Alimentare',
  subtitle: 'Biologo Nutrizionista specializzato in Sport Nutrition',
  accent: '#22c55e',
  accent2: '#15803d',
  intro: 'Ciao, sono il Nutrizionista AI. Progetterò un piano alimentare bilanciato e su misura. Mi servono alcune informazioni sul socio per procedere.',
  questions: [
    { key: 'peso', text: 'Peso attuale del socio in kg?', type: 'number' as const },
    { key: 'altezza', text: 'Altezza in cm?', type: 'number' as const },
    { key: 'attivita', text: 'Livello di attività giornaliera?', type: 'choice' as const,
      choices: ['Sedentario', 'Leggero', 'Moderato', 'Attivo', 'Molto attivo'] },
    { key: 'obiettivo', text: 'Obiettivo nutrizionale?', type: 'choice' as const,
      choices: ['Definizione (deficit)', 'Mantenimento', 'Massa (surplus)'] },
    { key: 'preferenze', text: 'Preferenze alimentari?', type: 'choice' as const,
      choices: ['Onnivoro', 'Vegetariano', 'Vegano', 'Pesco-vegetariano'] },
    { key: 'allergie', text: 'Allergie o intolleranze? Scrivi "nessuna" se non ce ne sono.', type: 'text' as const },
    { key: 'pasti', text: 'Quanti pasti preferisce al giorno?', type: 'choice' as const,
      choices: ['3 pasti', '4 pasti', '5 pasti'] },
  ] as Question[],
};

// ----------- Plan generators (fallback deterministic) -----------
function generateScheda(a: Record<string, string>, memberName: string): string {
  const split4 = `GIORNO 1 — PETTO E TRICIPITI
- Panca piana con bilanciere: 4x8-10 (recupero 90s)
- Panca inclinata con manubri: 3x10-12
- Croci ai cavi: 3x12-15
- Dips alle parallele: 3xmax
- Pushdown al cavo: 3x12
- Estensioni sopra la testa: 3x12

GIORNO 2 — SCHIENA E BICIPITI
- Trazioni alla sbarra: 4xmax
- Rematore con bilanciere: 4x8-10
- Lat machine presa larga: 3x10-12
- Pulley basso: 3x12
- Curl con bilanciere: 3x10
- Curl su panca Scott: 3x12

GIORNO 3 — GAMBE E ADDOME
- Squat con bilanciere: 4x8-10 (recupero 120s)
- Leg press: 4x12
- Affondi con manubri: 3x12 per gamba
- Stacco rumeno: 3x10
- Leg curl: 3x12
- Crunch alla panca: 3x20

GIORNO 4 — SPALLE E CORE
- Military press: 4x8-10
- Alzate laterali: 4x12-15
- Alzate posteriori: 3x15
- Shrugs: 3x12
- Plank: 3x60s
- Russian twist: 3x20`;

  const split3 = `GIORNO 1 — UPPER BODY
- Panca piana: 4x8
- Rematore con bilanciere: 4x8
- Military press: 3x10
- Trazioni: 3xmax
- Curl con bilanciere: 3x10
- French press: 3x10

GIORNO 2 — LOWER BODY
- Squat: 4x8
- Stacco rumeno: 4x8
- Affondi: 3x12 per gamba
- Leg press: 3x12
- Leg curl: 3x15
- Calf raises: 4x15

GIORNO 3 — FULL BODY HIIT
- Circuito: 5 giri
  - Goblet squat: 15
  - Push-up: 12
  - Rematore con manubrio: 12 per lato
  - Burpees: 10
  - Plank: 45s`;

  const freq = parseInt(a.frequenza || '4');
  const base = freq >= 4 ? split4 : split3;

  return `SCHEDA PERSONALIZZATA — ${memberName}
Obiettivo: ${a.obiettivo} - Livello: ${a.livello} - Frequenza: ${a.frequenza}
Peso: ${a.peso}kg - Altezza: ${a.altezza}cm
Limitazioni: ${a.infortuni}
Setting: ${a.attrezzi}

${base}

NOTE DEL COACH:
- Riscaldamento 8-10 minuti di cardio leggero prima di ogni seduta
- Stretching finale di 5 minuti
- Progressione carichi: aggiungere 2.5kg appena completi tutte le serie
- Recupero di 48-72 ore per gruppo muscolare
- Scheda da mantenere 6-8 settimane, poi rivalutare
${a.infortuni !== 'nessuno' ? `- Attenzione a: ${a.infortuni}` : ''}`;
}

function generateDieta(a: Record<string, string>, memberName: string): string {
  const peso = parseFloat(a.peso) || 75;
  const altezza = parseFloat(a.altezza) || 175;
  const bmr = 10 * peso + 6.25 * altezza - 5 * 30 + 5;
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
Peso: ${peso}kg - Altezza: ${altezza}cm
Attività: ${a.attivita} - Preferenze: ${a.preferenze}
Allergie: ${a.allergie}

MACRONUTRIENTI CALCOLATI
- Calorie giornaliere: ${tdee} kcal
- Proteine: ${prot}g
- Carboidrati: ${carbo}g
- Grassi: ${grassi}g

SCHEMA TIPO — ${a.pasti}

COLAZIONE (${Math.round(tdee*0.25)} kcal)
- Avena 70g
- Latte parzialmente scremato 250ml
- Frutti di bosco 100g
- Mandorle 15g

SPUNTINO (${Math.round(tdee*0.10)} kcal)
- Yogurt greco 0% 150g
- Miele 10g
- 1 frutto

PRANZO (${Math.round(tdee*0.30)} kcal)
- Petto di pollo 150g (oppure tofu 200g se vegetariano)
- Riso basmati 80g peso crudo
- Verdure grigliate 200g
- Olio extravergine 10g

SPUNTINO (${Math.round(tdee*0.10)} kcal)
- Pane integrale 40g
- Bresaola 50g (oppure hummus 50g)
- 1 frutto

CENA (${Math.round(tdee*0.25)} kcal)
- Salmone 150g (oppure legumi 80g secchi)
- Patate dolci 200g
- Insalata mista 150g
- Olio extravergine 10g

NOTE DEL NUTRIZIONISTA:
- Bere almeno 2.5 litri di acqua al giorno
- Ridurre zuccheri raffinati e alcolici
- Un pasto libero a settimana concesso
- Consumare verdure a ogni pasto principale
${a.allergie !== 'nessuna' ? `- Evitare: ${a.allergie}` : ''}
- Rivalutazione raccomandata ogni 4 settimane`;
}

// ----------- LLM system prompts -----------
const SYSTEM_SCHEDA = `Sei un Personal Trainer certificato NASM con 15 anni di esperienza in sala pesi, specializzato in programmazione dell'allenamento. Stai lavorando nel software gestionale di Oxygen Fitness Hub per generare schede di allenamento altamente personalizzate.

LINEE GUIDA:
- Basa le scelte sui principi della scienza dell'esercizio: progressive overload, recupero, specificità
- Adatta volume e intensità al livello del socio
- Rispetta rigorosamente le limitazioni fisiche e gli infortuni dichiarati
- Considera lo storico delle schede precedenti e i dati di progresso del socio
- Se il socio è in plateau su un esercizio, varia stimolo o tecnica
- Se esiste uno storico di schede, progredisci logicamente: varia alcuni esercizi per stimolo nuovo ma mantieni continuità sui fondamentali
- Evidenzia in modo chiaro i cambiamenti rispetto alle schede passate
- Fornisci serie, ripetizioni e recuperi specifici per ogni esercizio
- Testo in italiano. Nessuna emoticon, nessun preambolo conversazionale
- Rispondi soltanto con la scheda, pronta da stampare e consegnare al socio`;

const SYSTEM_DIETA = `Sei un Biologo Nutrizionista specializzato in Sport Nutrition con 15 anni di esperienza. Stai lavorando nel software gestionale di Oxygen Fitness Hub per generare piani alimentari altamente personalizzati.

LINEE GUIDA:
- Calcola BMR e TDEE con la formula Mifflin-St Jeor
- Distribuisci i macronutrienti in base all'obiettivo: definizione, mantenimento, massa
- Rispetta rigorosamente allergie, intolleranze e preferenze alimentari
- Considera lo storico delle diete precedenti e i dati di progresso del socio
- Se la progressione è stagnante, ricalibra le calorie
- Varia le fonti alimentari rispetto ai piani precedenti per evitare monotonia
- Indica esplicitamente le modifiche rispetto ai piani precedenti
- Fornisci porzioni precise in grammi, ripartite nei pasti richiesti
- Includi calorie per pasto e totale giornaliero
- Testo in italiano. Nessuna emoticon, nessun preambolo conversazionale
- Rispondi soltanto con il piano alimentare, pronto da stampare e consegnare al socio`;

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
  const [draft, setDraft] = useState<string>('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const finalizeWithPlan = (plan: string) => {
    setGenerated(plan);
    setDraft(plan);
    setMessages((m) => [...m, { from: 'agent', text: 'Piano generato. Rivedi e modifica il testo, poi clicca "Valida e invia al socio" per renderlo ufficiale.' }]);
  };

  const runGeneration = async (finalAnswers: Record<string, string>) => {
    const llmMode = hasApiKey();
    if (!llmMode) {
      const plan = type === 'scheda'
        ? generateScheda(finalAnswers, member.name)
        : generateDieta(finalAnswers, member.name);
      setTimeout(() => finalizeWithPlan(plan), 900);
      return;
    }

    try {
      const history = getHistory(type, member.id);
      const progress = getProgressSummary(member.id);
      const historyBlock = history.length
        ? history.slice(0, 3).map((h, i) => `[Storico ${i + 1}] ${h.date}\n${h.plan}`).join('\n\n---\n\n')
        : 'Nessuna ' + (type === 'scheda' ? 'scheda' : 'dieta') + ' precedente.';
      const answersBlock = Object.entries(finalAnswers).map(([k, v]) => `- ${k}: ${v}`).join('\n');
      const userMsg = `Socio: ${member.name}, ${member.age} anni, piano ${member.plan}.

DATI DI PROGRESSO DEL SOCIO:
${progress}

STORICO PIANI PRECEDENTI (${type}):
${historyBlock}

RISPOSTE DELL'ADMIN AL QUESTIONARIO:
${answersBlock}

Genera ora la nuova ${type === 'scheda' ? 'scheda di allenamento' : 'dieta'} tenendo conto di progresso e storico.`;

      const out = await callClaude({
        system: type === 'scheda' ? SYSTEM_SCHEDA : SYSTEM_DIETA,
        messages: [{ role: 'user', content: userMsg }],
        max_tokens: 2500,
      });
      finalizeWithPlan(out.trim());
    } catch (e: any) {
      setError(e.message || 'Errore chiamata AI');
      // fallback to deterministic
      const plan = type === 'scheda'
        ? generateScheda(finalAnswers, member.name)
        : generateDieta(finalAnswers, member.name);
      finalizeWithPlan(plan);
    }
  };

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
        setMessages((m) => [...m, { from: 'agent', text: 'Perfetto, ho tutte le informazioni. Sto elaborando il piano personalizzato...' }]);
        runGeneration(newAnswers);
      }
    }, 600);
  };

  const validateAndSend = () => {
    const planToSave = draft.trim();
    if (!planToSave) return;
    const date = new Date().toLocaleDateString('it-IT');
    const record: PlanRecord = {
      date,
      timestamp: Date.now(),
      plan: planToSave,
      answers,
      source: hasApiKey() ? 'ai' : 'template',
    };
    saveToHistory(type, member.id, record);
    pushNotification(member.id, {
      type,
      title: type === 'scheda' ? 'Nuova scheda disponibile' : 'Nuova dieta disponibile',
      body: `Il tuo coach ha pubblicato una nuova ${type === 'scheda' ? 'scheda di allenamento' : 'dieta'}. Aprila per consultarla.`,
      date,
    });
    navigate(`/admin/membro/${member.id}`);
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
        }}>Indietro</button>
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

        {error && (
          <div style={{ fontSize: '11px', color: '#fca5a5', padding: '8px 12px', border: '1px solid #7f1d1d', borderRadius: 8, margin: '8px 0' }}>
            Avviso: {error}. È stato utilizzato il generatore locale di fallback.
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
              PIANO GENERATO — MODIFICABILE
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
              style={{
                width: '100%',
                minHeight: '320px',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${cfg.accent}55`,
                borderRadius: '10px',
                padding: '12px',
                color: 'rgba(255,255,255,0.95)',
                fontSize: '11px',
                lineHeight: 1.55,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => navigate(`/admin/membro/${member.id}`)} style={{
                flex: 1, padding: '12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px',
                color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Annulla</button>
              <button onClick={validateAndSend} style={{
                flex: 2, padding: '12px',
                background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent2})`,
                border: `1px solid ${cfg.accent}`, borderRadius: '10px',
                color: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Valida e invia al socio</button>
            </div>
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
                color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Invia</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentChat;
