import { COLORS } from '../config/theme';

const leaderboard = [
  { rank: 1, name: 'Lorenzo T.', avatar: '🧑', xp: 8900, streak: 67, badge: '👑' },
  { rank: 2, name: 'Federica L.', avatar: '👩', xp: 6100, streak: 42, badge: '🥈' },
  { rank: 3, name: 'Alessandro M.', avatar: '👨', xp: 4200, streak: 28, badge: '🥉', isMe: true },
  { rank: 4, name: 'Valeria M.', avatar: '👩', xp: 3400, streak: 21, badge: '' },
  { rank: 5, name: 'Simone V.', avatar: '👨', xp: 1900, streak: 9, badge: '' },
  { rank: 6, name: 'Giulia R.', avatar: '👩', xp: 1800, streak: 15, badge: '' },
];

const challenges = [
  {
    title: 'Iron March 🏋️',
    desc: '20 sessioni entro fine marzo',
    progress: 14, total: 20,
    reward: '500 XP + Badge Ferro',
    color: COLORS.primary, days: 2,
  },
  {
    title: 'Cardio Blast 🚴',
    desc: '8 corsi cardio questo mese',
    progress: 5, total: 8,
    reward: '300 XP + Badge Cardio',
    color: COLORS.info, days: 2,
  },
  {
    title: 'Yoga 7 Days 🧘',
    desc: '7 sessioni yoga consecutive',
    progress: 3, total: 7,
    reward: '250 XP + Badge Zen',
    color: '#22c55e', days: 4,
  },
];

const activityFeed = [
  { user: 'Lorenzo T.', action: 'ha completato Iron March! 🏆', time: '5 min fa', avatar: '🧑' },
  { user: 'Federica L.', action: 'ha raggiunto il Livello 15 ⭐', time: '1 ora fa', avatar: '👩' },
  { user: 'Valeria M.', action: 'ha prenotato Yoga Flow', time: '2 ore fa', avatar: '👩' },
  { user: 'Matteo B.', action: 'ha iniziato la challenge Cardio Blast', time: '3 ore fa', avatar: '🧑' },
  { user: 'Tu', action: 'hai completato 14 sessioni questo mese! 💪', time: 'Oggi', avatar: '👨', isMe: true },
];

const badges = [
  { name: 'Ferro', emoji: '🏋️', earned: true },
  { name: '30 Giorni', emoji: '📅', earned: true },
  { name: 'Maratoneta', emoji: '🏃', earned: true },
  { name: 'Yoga Master', emoji: '🧘', earned: false },
  { name: 'Campione', emoji: '🏆', earned: false },
  { name: 'Elite', emoji: '👑', earned: false },
];

export default function CommunityPage() {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: COLORS.gradientDark, padding: '60px 20px 20px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <h1 style={{ color: COLORS.text, fontSize: '24px', fontWeight: 800 }}>👥 Community</h1>
        <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '4px' }}>Challenge, classifica e achievement</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Leaderboard */}
        <div>
          <h2 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>🏆 Classifica Mensile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaderboard.map((user) => (
              <div key={user.rank} style={{
                background: user.isMe ? `${COLORS.primary}10` : COLORS.card,
                border: `1px solid ${user.isMe ? COLORS.primary : COLORS.border}`,
                borderRadius: '14px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: user.rank <= 3 ? COLORS.gradient : COLORS.dark,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0,
                }}>{user.rank}</div>
                <div style={{ fontSize: '24px' }}>{user.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: user.isMe ? COLORS.primary : COLORS.text,
                    fontWeight: user.isMe ? 800 : 600, fontSize: '14px',
                  }}>{user.name}{user.isMe ? ' (Tu)' : ''}</p>
                  <p style={{ color: COLORS.muted, fontSize: '11px' }}>🔥 {user.streak} streak · {user.xp.toLocaleString()} XP</p>
                </div>
                {user.badge && <span style={{ fontSize: '22px' }}>{user.badge}</span>}
                {!user.badge && (
                  <span style={{ color: COLORS.muted, fontSize: '13px', fontWeight: 700 }}>#{user.rank}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h2 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>🎯 Challenge Attive</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {challenges.map((ch) => {
              const pct = Math.round((ch.progress / ch.total) * 100);
              return (
                <div key={ch.title} style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: '16px', padding: '16px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '15px' }}>{ch.title}</p>
                      <p style={{ color: COLORS.muted, fontSize: '12px' }}>{ch.desc}</p>
                    </div>
                    <div style={{
                      background: `${ch.color}20`, border: `1px solid ${ch.color}40`,
                      borderRadius: '10px', padding: '4px 10px', textAlign: 'center',
                      alignSelf: 'flex-start',
                    }}>
                      <p style={{ color: ch.color, fontWeight: 800, fontSize: '13px' }}>{ch.days}gg</p>
                      <p style={{ color: COLORS.muted, fontSize: '10px' }}>rimasti</p>
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ color: COLORS.muted, fontSize: '11px' }}>{ch.progress} / {ch.total}</span>
                      <span style={{ color: ch.color, fontWeight: 700, fontSize: '11px' }}>{pct}%</span>
                    </div>
                    <div style={{ height: '5px', background: COLORS.dark, borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`, height: '100%', background: ch.color,
                        borderRadius: '5px', boxShadow: `0 0 6px ${ch.color}50`,
                      }} />
                    </div>
                  </div>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>🎁 Premio: {ch.reward}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>🏅 I Tuoi Badge</h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px',
          }}>
            {badges.map((b) => (
              <div key={b.name} style={{
                background: b.earned ? `${COLORS.primary}12` : COLORS.card,
                border: `1px solid ${b.earned ? COLORS.borderBright : COLORS.border}`,
                borderRadius: '14px', padding: '16px 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                opacity: b.earned ? 1 : 0.4,
              }}>
                <span style={{ fontSize: '28px', filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.emoji}</span>
                <p style={{ color: b.earned ? COLORS.text : COLORS.muted, fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>{b.name}</p>
                {!b.earned && <p style={{ color: COLORS.muted, fontSize: '10px' }}>Bloccato</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 style={{ color: COLORS.text, fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>📣 Attività Recenti</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activityFeed.map((item, i) => (
              <div key={i} style={{
                background: item.isMe ? `${COLORS.primary}10` : COLORS.card,
                border: `1px solid ${item.isMe ? COLORS.borderBright : COLORS.border}`,
                borderRadius: '12px', padding: '12px 14px',
                display: 'flex', gap: '10px', alignItems: 'center',
              }}>
                <span style={{ fontSize: '24px' }}>{item.avatar}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ color: item.isMe ? COLORS.primary : COLORS.text, fontWeight: 700, fontSize: '13px' }}>{item.user} </span>
                  <span style={{ color: COLORS.textSec, fontSize: '13px' }}>{item.action}</span>
                </div>
                <p style={{ color: COLORS.muted, fontSize: '11px', whiteSpace: 'nowrap' }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
