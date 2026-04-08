import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminReport: React.FC = () => {
  const navigate = useNavigate();

  const revenue = [3.2, 3.4, 4.1, 5.2, 6.8, 7.9, 8.4];
  const members = [280, 295, 305, 318, 326, 335, 342];
  const expiring = [12, 10, 14, 9, 11, 8, 15];
  const maxR = 10, maxM = 400;
  const W = 320, H = 150;
  const padL = 38, padR = 8, padT = 10, padB = 22;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug'];

  const pts = (arr: number[], max: number) => arr.map((v, i) => {
    const x = padL + (i / (arr.length - 1)) * plotW;
    const y = padT + (1 - v / max) * plotH;
    return [x, y] as const;
  });
  const toPath = (p: readonly (readonly [number, number])[]) =>
    p.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

  const revPts = pts(revenue, maxR);
  const memPts = pts(members, maxM);
  const expPts = pts(expiring, 20);

  const revPath = toPath(revPts);
  const revArea = revPath + ` L ${revPts[revPts.length - 1][0]} ${padT + plotH} L ${revPts[0][0]} ${padT + plotH} Z`;
  const memPath = toPath(memPts);
  const expPath = toPath(expPts);

  return (
    <div className="corsi-scroll" style={{
      minHeight: '100vh', backgroundColor: '#000',
      padding: '18px 22px 120px', color: '#fff',
      fontFamily: "'Plus Jakarta Sans', sans-serif", overflowY: 'auto',
    }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform: translateY(0);} }
        .corsi-scroll::-webkit-scrollbar { width: 6px; }
        .corsi-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#ef4444,#b71c1c); border-radius: 999px; }
      `}</style>

      <button onClick={() => navigate('/admin')} style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', borderRadius: '12px', padding: '8px 14px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>← Indietro</button>

      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>PANNELLO AMMINISTRATORE</div>
      <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '2px 0 18px', letterSpacing: '-0.5px' }}>📊 Report</h1>

      {/* Revenue chart */}
      <div style={{
        background: 'rgba(229,57,53,0.06)',
        border: '1.5px solid rgba(229,57,53,0.5)',
        borderRadius: '16px', padding: '16px', marginBottom: '18px',
        boxShadow: '0 0 20px rgba(229,57,53,0.2)',
        animation: 'fadeInUp 0.5s ease-out',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>💰 Entrate Mensili</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginBottom: '8px' }}>Totale anno: €39.0k</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id="rA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5252" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 5, 10].map((v) => {
            const y = padT + (1 - v / maxR) * plotH;
            return <text key={v} x={padL - 4} y={y + 3} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="end">€{v}k</text>;
          })}
          <path d={revArea} fill="url(#rA)" />
          <path d={revPath} fill="none" stroke="#ff5252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {revPts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#ff5252" stroke="#000" strokeWidth="1.5" />
          ))}
          {labels.map((m, i) => (
            <text key={m} x={padL + (i / 6) * plotW} y={H - 6} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle">{m}</text>
          ))}
        </svg>
      </div>

      {/* Members chart with expiring overlay */}
      <div style={{
        background: 'rgba(59,130,246,0.06)',
        border: '1.5px solid rgba(59,130,246,0.5)',
        borderRadius: '16px', padding: '16px', marginBottom: '18px',
        boxShadow: '0 0 20px rgba(59,130,246,0.2)',
        animation: 'fadeInUp 0.5s ease-out 0.08s both',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>👥 Andamento Soci</div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '10px', color: 'rgba(255,255,255,0.65)', marginBottom: '8px' }}>
          <span>🔵 Soci totali: <b style={{ color: '#60a5fa' }}>342</b></span>
          <span>🟠 In scadenza: <b style={{ color: '#fbbf24' }}>15</b></span>
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          {[0, 200, 400].map((v) => {
            const y = padT + (1 - v / maxM) * plotH;
            return <text key={v} x={padL - 4} y={y + 3} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="end">{v}</text>;
          })}
          <path d={memPath} fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {memPts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#60a5fa" stroke="#000" strokeWidth="1.5" />
          ))}
          {/* Expiring overlay (bars) */}
          {expPts.map(([x], i) => {
            const h = (expiring[i] / 20) * plotH * 0.4;
            return (
              <rect key={i}
                x={x - 4}
                y={padT + plotH - h}
                width="8"
                height={h}
                fill="#fbbf24"
                opacity="0.75"
                rx="2"
              />
            );
          })}
          {labels.map((m, i) => (
            <text key={m} x={padL + (i / 6) * plotW} y={H - 6} fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle">{m}</text>
          ))}
        </svg>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {[
          { l: 'Nuovi Soci (mese)', v: '+18', c: '#22c55e' },
          { l: 'Disdette (mese)', v: '-4', c: '#ef4444' },
          { l: 'Retention', v: '91%', c: '#60a5fa' },
          { l: 'Ticket medio', v: '€59', c: '#fbbf24' },
        ].map((s) => (
          <div key={s.l} style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${s.c}55`,
            borderRadius: '14px', padding: '14px',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReport;
