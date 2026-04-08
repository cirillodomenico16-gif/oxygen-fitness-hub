import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedAIChat } from '../components/ui/animated-ai-chat';

interface Msg { from: 'agent' | 'user'; text: string; }

const QUESTIONS = [
  { key: 'periodo', text: 'Che tipo di programmazione vuoi generare?', type: 'choice', choices: ['Settimanale', 'Mensile'] },
  { key: 'sale', text: 'Perfetto. Quante sale hai disponibili per i corsi?', type: 'choice', choices: ['2 sale', '3 sale', '4 sale', '5 sale'] },
  { key: 'pt', text: 'Quanti Personal Trainer hai in organico?', type: 'choice', choices: ['2 PT', '3 PT', '4 PT', '5+ PT'] },
  { key: 'tipologie', text: 'Quali tipologie di corsi eroghi abitualmente?', type: 'choice', choices: ['Fitness classico', 'Mix fitness + yoga', 'Alta intensità', 'Tutto incluso'] },
  { key: 'adesione', text: 'Dallo storico, qual è l\'adesione media ai corsi?', type: 'choice', choices: ['Bassa (<50%)', 'Media (50-75%)', 'Alta (>75%)'] },
  { key: 'fascia', text: 'Quali fasce orarie vuoi coprire?', type: 'choice', choices: ['Solo mattina', 'Solo sera', 'Mattina + sera', 'Tutto il giorno'] },
  { key: 'giorni', text: 'Quanti giorni a settimana deve essere attiva la programmazione?', type: 'choice', choices: ['5 giorni', '6 giorni', '7 giorni'] },
];

function generateSchedule(a: Record<string, string>): string {
  const isMensile = a.periodo === 'Mensile';
  const nSale = parseInt(a.sale);
  const nPT = parseInt(a.pt);
  const giorni = parseInt(a.giorni);
  const adesione = a.adesione.includes('Alta') ? 'alta' : a.adesione.includes('Bassa') ? 'bassa' : 'media';
  const tipologie = a.tipologie;

  const coursesByType: Record<string, string[]> = {
    'Fitness classico': ['Pump', 'Functional', 'Spinning', 'Zumba', 'Stretching'],
    'Mix fitness + yoga': ['Yoga Flow', 'Pilates', 'Pump', 'Functional', 'Stretching'],
    'Alta intensità': ['HIIT Blast', 'CrossFit', 'Boxing Cardio', 'Functional', 'Spinning'],
    'Tutto incluso': ['HIIT Blast', 'Yoga Flow', 'Pump', 'Spinning', 'Boxing Cardio', 'Pilates', 'CrossFit'],
  };
  const pool = coursesByType[tipologie] || coursesByType['Tutto incluso'];

  const timeSlots = a.fascia === 'Solo mattina' ? ['07:00', '09:00', '10:30', '12:00']
                  : a.fascia === 'Solo sera' ? ['17:00', '18:30', '20:00', '21:00']
                  : a.fascia === 'Mattina + sera' ? ['07:00', '09:30', '18:00', '19:30', '21:00']
                  : ['07:00', '09:00', '10:30', '12:00', '17:00', '18:30', '20:00'];

  const dayNames = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'].slice(0, giorni);
  const rooms = Array.from({ length: nSale }, (_, i) => `Sala ${String.fromCharCode(65 + i)}`);
  const trainers = Array.from({ length: nPT }, (_, i) => ['Luca M.', 'Anna C.', 'Giulio F.', 'Sara B.', 'Matteo R.'][i] || `PT ${i + 1}`);

  let schedule = '';
  let idx = 0;
  let totalSlots = 0;

  dayNames.forEach((day) => {
    schedule += `\n━━━ ${day} ━━━\n`;
    timeSlots.forEach((slot) => {
      const howMany = Math.min(nSale, adesione === 'alta' ? nSale : adesione === 'media' ? Math.max(1, nSale - 1) : 1);
      for (let r = 0; r < howMany; r++) {
        const course = pool[idx % pool.length];
        const room = rooms[r];
        const trainer = trainers[idx % trainers.length];
        schedule += `${slot} ${course.padEnd(16)} · ${room} · ${trainer}\n`;
        idx++;
        totalSlots++;
      }
    });
  });

  const mult = isMensile ? 4 : 1;
  const weeklyCapacity = totalSlots * 15;
  const periodCapacity = weeklyCapacity * mult;
  const expectedFill = adesione === 'alta' ? 85 : adesione === 'media' ? 65 : 45;
  const periodLabel = isMensile ? 'MENSILE (4 settimane)' : 'SETTIMANALE';

  return `PROGRAMMAZIONE CORSI ${periodLabel}
Generata da Agente AI specializzato in Gym Scheduling

═══════════════════════════════
PARAMETRI
• Periodo: ${a.periodo}
• Sale: ${nSale}
• Personal Trainer: ${nPT}
• Giorni attivi: ${giorni}
• Tipologie: ${tipologie}
• Fascia: ${a.fascia}
• Adesione storica: ${adesione}
═══════════════════════════════
${isMensile ? 'SCHEMA BASE (replicato per 4 settimane)' : ''}
${schedule}
═══════════════════════════════
KPI STIMATI ${isMensile ? '(mese)' : '(settimana)'}
• Corsi totali: ${totalSlots * mult}
• Capacità: ~${periodCapacity} posti
• Fill rate atteso: ${expectedFill}%
• Presenze stimate: ~${Math.round(periodCapacity * expectedFill / 100)}${isMensile ? `\n• Media settimanale: ~${Math.round(weeklyCapacity * expectedFill / 100)} presenze` : ''}

═══════════════════════════════
NOTE DELL'AGENTE:
• I corsi più richiesti sono posizionati in fasce prime time
• Distribuzione bilanciata tra sale e PT per evitare sovraccarichi
• Prevedere 15 min di buffer tra corsi consecutivi in stessa sala
• Rivalutare il piano dopo 4 settimane in base alla presenza effettiva
• Per adesione ${adesione}, valutare ${adesione === 'bassa' ? 'promozioni sui corsi meno frequentati' : 'apertura lista d\'attesa'}`;
}

const AgentProgrammazione: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'agent', text: 'Ciao! Sono l\'Agente Programmazione AI. Analizzerò le tue risorse e lo storico per generarti un calendario ottimale dei corsi.' },
    { from: 'agent', text: QUESTIONS[0].text },
  ]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState(''); // eslint-disable-line @typescript-eslint/no-unused-vars
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, generated]);

  const send = (value: string) => {
    if (!value.trim()) return;
    const q = QUESTIONS[step];
    const newAnswers = { ...answers, [q.key]: value };
    setAnswers(newAnswers);
    setMessages((m) => [...m, { from: 'user', text: value }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const next = step + 1;
      if (next < QUESTIONS.length) {
        setMessages((m) => [...m, { from: 'agent', text: QUESTIONS[next].text }]);
        setStep(next);
      } else {
        setMessages((m) => [...m, { from: 'agent', text: ' Sto analizzando le risorse disponibili e ottimizzando la programmazione...' }]);
        setTimeout(() => {
          setGenerated(generateSchedule(newAnswers));
          setMessages((m) => [...m, { from: 'agent', text: ' Programmazione ottimale generata. Controlla il piano qui sotto.' }]);
        }, 1600);
      }
    }, 700);
  };

  const q = QUESTIONS[step];

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
        .chat-scroll::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 999px; }
      `}</style>

      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        borderBottom: '2px solid #a78bfa',
        display: 'flex', alignItems: 'center', gap: '12px',
        boxShadow: '0 4px 20px rgba(139,92,246,0.55)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => navigate('/admin/calendario')} style={{
          background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '10px', padding: '6px 10px', color: '#fff',
          fontSize: '12px', cursor: 'pointer', fontWeight: 700,
        }}>←</button>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800 }}> Agente Programmazione AI</div>
          <div style={{ fontSize: '10px', opacity: 0.85, marginTop: '2px' }}>Gym Scheduling Specialist</div>
        </div>
      </div>

      <div ref={scrollRef} className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
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
                : 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.08))',
              border: m.from === 'user'
                ? '1px solid rgba(255,255,255,0.15)'
                : '1px solid rgba(167,139,250,0.55)',
              borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '10px 14px',
              fontSize: '13px', lineHeight: 1.5,
              color: '#fff',
              boxShadow: m.from === 'agent' ? '0 2px 10px rgba(139,92,246,0.3)' : 'none',
            }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: '4px', padding: '10px 14px' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#a78bfa', animation: `dot 1.4s infinite`,
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
        )}

        {generated && (
          <div style={{
            marginTop: '16px',
            background: 'rgba(0,0,0,0.6)',
            border: '1.5px solid #8b5cf6',
            borderRadius: '14px', padding: '14px',
            boxShadow: '0 4px 20px rgba(139,92,246,0.55)',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#a78bfa', marginBottom: '8px' }}>
               PROGRAMMAZIONE GENERATA
            </div>
            <pre style={{
              whiteSpace: 'pre-wrap', fontFamily: 'inherit',
              fontSize: '10.5px', lineHeight: 1.55, margin: 0,
              color: 'rgba(255,255,255,0.92)',
            }}>{generated}</pre>
            <button onClick={() => navigate('/admin/calendario')} style={{
              marginTop: '14px', width: '100%', padding: '12px',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              border: '1px solid #a78bfa', borderRadius: '10px',
              color: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}> APPLICA AL CALENDARIO</button>
          </div>
        )}
      </div>

      {!generated && q && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            {q.choices.map((c) => (
              <button key={c} onClick={() => send(c)} style={{
                padding: '10px 14px',
                background: 'rgba(139,92,246,0.12)',
                border: '1.5px solid rgba(167,139,250,0.65)',
                borderRadius: '999px',
                color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{c}</button>
            ))}
          </div>
          <AnimatedAIChat
            title="Risposta libera"
            subtitle="Oppure scrivi qui la tua risposta"
            placeholder="Scrivi una risposta libera..."
            agentName="prog"
            suggestions={[]}
            onSend={(val) => { send(val); setInput(''); }}
          />
        </div>
      )}
    </div>
  );
};

export default AgentProgrammazione;
