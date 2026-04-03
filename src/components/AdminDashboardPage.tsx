import { COLORS } from '../config/theme';
import { kpiData, revenueMonths, members } from '../data/members';

export default function AdminDashboardPage() {
  const maxRev = Math.max(...revenueMonths.map(r => r.v));

  const expiringMembers = members.filter(m => m.expiresIn <= 10);

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0a0202 0%, #060202 100%)',
        padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.borderBright}`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: `${COLORS.primary}15`, border: `1px solid ${COLORS.borderBright}`,
          borderRadius: '10px', padding: '5px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ color: COLORS.primary, fontSize: '10px' }}>⚙️</span>
          <span style={{ color: COLORS.primary, fontSize: '11px', fontWeight: 700 }}>ADMIN</span>
        </div>
        <h1 style={{ color: COLORS.text, fontSize: '22px', fontWeight: 800 }}>📊 Dashboard Admin</h1>
        <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '4px' }}>Marzo 2026 · Aggiornato ora</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { label: 'Soci Attivi', value: kpiData.activeSoci, sub: `+${kpiData.newThisMonth} questo mese`, color: COLORS.primary, emoji: '👥' },
            { label: 'Revenue', value: `€${(kpiData.revenue / 1000).toFixed(1)}k`, sub: `+${kpiData.revenueGrowth}% YoY`, color: COLORS.success, emoji: '💰' },
            { label: 'Retention', value: `${kpiData.retention}%`, sub: 'tasso fidelizzazione', color: COLORS.info, emoji: '❤️' },
            { label: 'Checkin/sett', value: kpiData.avgCheckins, sub: 'media per socio', color: COLORS.orange, emoji: '📍' },
          ].map(kpi => (
            <div key={kpi.label} style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ fontSize: '22px' }}>{kpi.emoji}</span>
                <div style={{
                  background: `${kpi.color}20`, borderRadius: '8px',
                  padding: '2px 8px',
                }}>
                  <span style={{ color: kpi.color, fontSize: '10px', fontWeight: 700 }}>LIVE</span>
                </div>
              </div>
              <p style={{ color: kpi.color, fontSize: '26px', fontWeight: 900 }}>{kpi.value}</p>
              <p style={{ color: COLORS.text, fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{kpi.label}</p>
              <p style={{ color: COLORS.muted, fontSize: '11px', marginTop: '2px' }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div style={{
          background: COLORS.card, border: `1px solid ${COLORS.border}`,
          borderRadius: '16px', padding: '18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>💰 Revenue Mensile</h3>
            <span style={{ color: COLORS.success, fontWeight: 700, fontSize: '13px' }}>+8.2% ↑</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
            {revenueMonths.map((r, i) => {
              const h = Math.round((r.v / maxRev) * 100);
              const isLast = i === revenueMonths.length - 1;
              return (
                <div key={r.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  {isLast && <p style={{ color: COLORS.primary, fontSize: '9px', fontWeight: 800 }}>€{(r.v/1000).toFixed(1)}k</p>}
                  {!isLast && <p style={{ opacity: 0 }}>.</p>}
                  <div style={{
                    width: '100%', height: `${h}%`,
                    background: isLast ? COLORS.gradient : `${COLORS.primary}35`,
                    borderRadius: '4px 4px 0 0',
                    minHeight: '4px',
                  }} />
                  <p style={{ color: COLORS.muted, fontSize: '9px' }}>{r.m}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>⚠️ Abbonamenti in Scadenza</h3>
            <span style={{
              background: `${COLORS.primary}20`, border: `1px solid ${COLORS.border}`,
              borderRadius: '10px', padding: '3px 10px',
              color: COLORS.primary, fontSize: '12px', fontWeight: 700,
            }}>{kpiData.expiringThisWeek} questa settimana</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {expiringMembers.map(m => (
              <div key={m.id} style={{
                background: COLORS.card,
                border: `1px solid ${m.expiresIn <= 3 ? COLORS.primary : COLORS.border}`,
                borderRadius: '12px', padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ fontSize: '24px' }}>{m.avatar}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: COLORS.text, fontWeight: 600, fontSize: '14px' }}>{m.name}</p>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>{m.plan} · {m.checkins} checkin totali</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    color: m.expiresIn <= 3 ? COLORS.primary : COLORS.warning,
                    fontWeight: 800, fontSize: '15px',
                  }}>{m.expiresIn}gg</p>
                  <p style={{ color: COLORS.muted, fontSize: '11px' }}>scade</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats row */}
        <div style={{
          display: 'flex', gap: '12px',
        }}>
          {[
            { label: 'Lista Attesa', value: kpiData.waitlistCount, color: COLORS.warning, emoji: '⏳' },
            { label: 'Nuovi Soci', value: kpiData.newThisMonth, color: COLORS.success, emoji: '🆕' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '14px', padding: '16px', textAlign: 'center',
            }}>
              <span style={{ fontSize: '28px' }}>{s.emoji}</span>
              <p style={{ color: s.color, fontSize: '28px', fontWeight: 900, marginTop: '6px' }}>{s.value}</p>
              <p style={{ color: COLORS.muted, fontSize: '12px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
