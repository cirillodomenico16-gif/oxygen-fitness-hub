import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEMBERS } from '../data/members';

const DOMAIN = 'oxygenfitnesshub.it';
const SENDER = `no-reply@${DOMAIN}`;

const CAMPAIGNS = [
  {
    id: 'spring',
    label: ' Promo Primavera',
    subject: 'Torna in forma per l\'estate — 30% di sconto',
  },
  {
    id: 'renewal',
    label: ' Rinnovo Abbonamento',
    subject: 'Rinnova ora e ricevi 1 mese gratis',
  },
  {
    id: 'pt',
    label: ' Personal Trainer',
    subject: 'Prova gratuita con il Personal Trainer',
  },
  {
    id: 'nutrition',
    label: ' Consulenza Nutrizionale',
    subject: 'Consulenza nutrizionale gratuita per i soci Oxygen',
  },
];

const TEMPLATES: Record<string, (name: string) => string> = {
  spring: (name) => `Ciao ${name},

L'estate è più vicina di quanto pensi! 

Da Oxygen Fitness Hub lanciamo una promo esclusiva per i nostri soci:
 30% di sconto sul rinnovo annuale
 2 sessioni di Personal Trainer incluse
 Accesso illimitato ai corsi di gruppo

L'offerta è valida solo per i prossimi 7 giorni.

Prenota subito la tua consulenza gratuita rispondendo a questa mail o passando in palestra.

Ti aspettiamo,
Il team di Oxygen Fitness Hub
 Via dello Sport 12 · ${DOMAIN}`,

  renewal: (name) => `Ciao ${name},

Il tuo abbonamento Oxygen sta per scadere.

Rinnovalo entro il 30/04 e ricevi in regalo:
 1 mese di abbonamento in più
 1 sessione PT personalizzata
 Ingresso SPA per un amico

Non perdere questa occasione esclusiva dedicata ai nostri soci storici.

Rispondi a questa mail per confermare il rinnovo o passa in segreteria.

A presto,
Il team di Oxygen Fitness Hub
 ${DOMAIN}`,

  pt: (name) => `Ciao ${name},

Stai cercando risultati più rapidi e un percorso davvero su misura?

I nostri Personal Trainer certificati ti offrono:
 Scheda allenamento personalizzata (AI + expertise umana)
 Monitoraggio progressi settimanale
 Correzione tecnica e motivazione costante

Ti regaliamo una prima sessione di prova GRATUITA.

Rispondi a questa mail per prenotare il tuo slot.

Il team di Oxygen Fitness Hub
 ${DOMAIN}`,

  nutrition: (name) => `Ciao ${name},

L'allenamento da solo non basta: il 70% dei risultati dipende dall'alimentazione.

Per i soci Oxygen offriamo una consulenza nutrizionale GRATUITA con il nostro biologo nutrizionista:
 Analisi composizione corporea
 Piano alimentare personalizzato
 Follow-up mensile

Prenota il tuo appuntamento rispondendo a questa mail.

Il team di Oxygen Fitness Hub
 ${DOMAIN}`,
};

const AdminCampagna: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(CAMPAIGNS[0]);
  const [subject, setSubject] = useState(CAMPAIGNS[0].subject);
  const [body, setBody] = useState(TEMPLATES.spring('Marco'));
  const [target, setTarget] = useState<'all' | 'expiring'>('all');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setSubject(selected.subject);
    setBody(TEMPLATES[selected.id]('[Nome Socio]'));
  }, [selected]);

  const recipients = target === 'expiring'
    ? MEMBERS.filter((m) => m.status === 'SCADUTO')
    : MEMBERS;

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      const bcc = recipients.map((m) => m.email).join(',');
      const mailto = `mailto:?bcc=${bcc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh', backgroundColor: '#000',
      padding: '18px 22px 120px', color: '#fff',
      fontFamily: "'Plus Jakarta Sans', sans-serif", overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(12px);} to {opacity:1; transform: translateY(0);} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
      `}</style>

      <button onClick={() => navigate('/admin')} style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', marginBottom: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>← Indietro</button>

      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>MARKETING AUTOMATION</div>
      <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '2px 0 4px', letterSpacing: '-0.5px' }}> Campagna Promo</h1>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginBottom: '18px' }}>
        Agente AI Marketing · invia da <b style={{ color: '#ff5252' }}>{SENDER}</b>
      </div>

      {/* Campaign selector */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '8px', letterSpacing: '0.5px' }}>
          TIPO DI CAMPAGNA
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {CAMPAIGNS.map((c) => {
            const active = c.id === selected.id;
            return (
              <button key={c.id} onClick={() => setSelected(c)} style={{
                padding: '12px 10px',
                background: active ? 'linear-gradient(135deg,#ef4444,#b71c1c)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${active ? '#ff5252' : 'rgba(229,57,53,0.35)'}`,
                borderRadius: '12px', color: '#fff', fontSize: '11px', fontWeight: 800,
                cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: active ? '0 4px 14px rgba(229,57,53,0.5)' : 'none',
                textAlign: 'left',
              }}>{c.label}</button>
            );
          })}
        </div>
      </div>

      {/* Target */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '8px', letterSpacing: '0.5px' }}>
          DESTINATARI
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {([
            { k: 'all', l: `Tutti i soci (${MEMBERS.length})` },
            { k: 'expiring', l: `Solo in scadenza (${MEMBERS.filter(m => m.status === 'SCADUTO').length})` },
          ] as const).map((o) => {
            const active = target === o.k;
            return (
              <button key={o.k} onClick={() => setTarget(o.k)} style={{
                flex: 1, padding: '11px',
                background: active ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${active ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: '10px', color: active ? '#ff5252' : '#fff',
                fontSize: '11px', fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{o.l}</button>
            );
          })}
        </div>
      </div>

      {/* Agent status */}
      <div style={{
        background: 'rgba(34,197,94,0.08)',
        border: '1.5px solid rgba(34,197,94,0.4)',
        borderRadius: '12px', padding: '12px 14px', marginBottom: '16px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} />
        <div style={{ fontSize: '11px' }}>
          <b style={{ color: '#4ade80' }}>Agente Marketing AI attivo</b><br />
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Mail precompilata basata sul tipo campagna — modificabile</span>
        </div>
      </div>

      {/* Email editor */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(229,57,53,0.35)',
        borderRadius: '14px', padding: '14px', marginBottom: '16px',
      }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>DA</div>
        <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '12px', color: '#ff5252' }}>{SENDER}</div>

        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>A (BCC)</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
          {recipients.length} destinatari selezionati
        </div>

        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>OGGETTO</div>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: '100%', padding: '10px 12px', marginBottom: '12px',
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(229,57,53,0.35)',
            borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 700,
            outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: 'border-box',
          }}
        />

        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>CORPO MAIL</div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={14}
          style={{
            width: '100%', padding: '12px',
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(229,57,53,0.35)',
            borderRadius: '10px', color: '#fff', fontSize: '12px', lineHeight: 1.55,
            outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            resize: 'vertical', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Send button */}
      <button onClick={handleSend} disabled={sending || sent} style={{
        width: '100%', padding: '16px',
        background: sent
          ? 'linear-gradient(135deg,#22c55e,#15803d)'
          : 'linear-gradient(135deg,#ef4444,#b71c1c)',
        border: `1px solid ${sent ? '#4ade80' : '#ff5252'}`,
        borderRadius: '14px', color: '#fff', fontSize: '14px', fontWeight: 800,
        letterSpacing: '0.5px', cursor: sending ? 'wait' : 'pointer',
        boxShadow: sent ? '0 6px 20px rgba(34,197,94,0.5)' : '0 6px 20px rgba(229,57,53,0.5)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        opacity: sending ? 0.7 : 1,
      }}>
        {sending ? '⏳ INVIO IN CORSO...' : sent ? ` CAMPAGNA INVIATA A ${recipients.length} SOCI` : ` INVIA CAMPAGNA (${recipients.length} soci)`}
      </button>
    </div>
  );
};

export default AdminCampagna;
