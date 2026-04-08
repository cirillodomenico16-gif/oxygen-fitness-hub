import React, { useState } from 'react';

interface Challenge {
  id: number;
  title: string;
  emoji: string;
  days: number;
  completed: number;
  participants: number;
  description: string;
  reward: string;
  image: string;
}

interface Podium {
  name: string;
  xp: number;
  avatar: string;
  rank: 1 | 2 | 3;
}

interface Badge {
  id: number;
  name: string;
  emoji: string;
  locked?: boolean;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Monthly Challenge',
    emoji: '💪',
    days: 30,
    completed: 18,
    participants: 124,
    description: '30 Giorni Squat Challenge',
    reward: 'Badge Iron Legs + 500 XP',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Weekly Challenge',
    emoji: '🔥',
    days: 7,
    completed: 4,
    participants: 89,
    description: '7 Giorni HIIT Burn',
    reward: 'Badge Burn + 250 XP',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=400&fit=crop',
  },
];

const PODIUM: Podium[] = [
  { name: 'Sara B.', xp: 2210, rank: 2, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' },
  { name: 'Marco R.', xp: 2840, rank: 1, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Luca M.', xp: 1980, rank: 3, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
];

const BADGES: Badge[] = [
  { id: 1, name: 'Settimana Perfetta', emoji: '🔥' },
  { id: 2, name: '100 Allenamenti', emoji: '💎' },
  { id: 3, name: 'Iron Warrior', emoji: '⚔️' },
  { id: 4, name: 'Monk Warrior', emoji: '🏆', locked: true },
  { id: 5, name: 'Champion', emoji: '👑', locked: true },
];

const ACTIVITIES: Activity[] = [
  { id: 1, user: 'Marco', action: 'ha completato Upper Body', time: '13 min ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
  { id: 2, user: 'Sara', action: 'ha battuto il suo record', time: '16 min ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
  { id: 3, user: 'Luca', action: 'ha completato 10 serie', time: '32 min ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
  { id: 4, user: 'Elena', action: 'ha sbloccato Iron Warrior', time: '1 ora ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
  { id: 5, user: 'Giulia', action: 'ha iniziato Squat Challenge', time: '2 ore ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face' },
];

const CommunityPage: React.FC = () => {
  const [detailChallenge, setDetailChallenge] = useState<Challenge | null>(null);
  const [joined, setJoined] = useState<number[]>([1]);
  const [toast, setToast] = useState<string | null>(null);

  const handleJoin = (ch: Challenge) => {
    if (!joined.includes(ch.id)) {
      setJoined((prev) => [...prev, ch.id]);
      setToast(`Ti sei unito a ${ch.description}!`);
      setTimeout(() => setToast(null), 2200);
    }
    setDetailChallenge(null);
  };

  return (
    <div
      className="corsi-scroll"
      style={{
        backgroundColor: '#000000',
        height: '100%',
        padding: '12px 20px 120px 20px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: 'white',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        scrollbarColor: '#e53935 rgba(255,255,255,0.05)',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .corsi-scroll::-webkit-scrollbar { width: 8px; }
        .corsi-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.04);
          border-radius: 999px;
          margin: 8px 0;
        }
        .corsi-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ef4444, #e53935);
          border-radius: 999px;
          box-shadow: 0 0 12px rgba(229,57,53,0.5);
        }
        .challenge-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Title */}
      <div style={{ marginBottom: '22px', animation: 'fadeInUp 0.5s ease-out' }}>
        <h1 style={{
          fontSize: '34px',
          fontWeight: 800,
          color: 'white',
          margin: 0,
          letterSpacing: '-0.8px',
          lineHeight: 1,
        }}>Community</h1>
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.55)',
          margin: '6px 0 0 0',
        }}>Palestra Oxygen</p>
      </div>

      {/* Challenges carousel */}
      <div
        className="challenge-scroll"
        style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          marginBottom: '22px',
          paddingBottom: '4px',
          animation: 'fadeInUp 0.5s ease-out 0.1s both',
        }}
      >
        {CHALLENGES.map((ch) => (
          <div
            key={ch.id}
            onClick={() => setDetailChallenge(ch)}
            style={{
              flex: '0 0 88%',
              position: 'relative',
              borderRadius: '20px',
              padding: '22px',
              border: '1px solid rgba(229,57,53,0.45)',
              boxShadow: '0 0 30px rgba(229,57,53,0.25)',
              cursor: 'pointer',
              overflow: 'hidden',
              backgroundImage: `linear-gradient(135deg, rgba(239,68,68,0.55), rgba(120,20,25,0.85)), url(${ch.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <p style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              margin: '0 0 6px 0',
            }}>{ch.title}</p>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 16px 0',
              letterSpacing: '-0.3px',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}>{ch.emoji} {ch.description}</h3>
            <div style={{
              height: '8px',
              background: 'rgba(0,0,0,0.35)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '8px',
            }}>
              <div style={{
                width: `${(ch.completed / ch.days) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #fff, #ffd4d4)',
                boxShadow: '0 0 12px rgba(255,255,255,0.6)',
              }} />
            </div>
            <p style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 14px 0',
              textAlign: 'right',
            }}>{ch.completed}/{ch.days} days</p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 600,
              }}>👥 {ch.participants} iscritti</span>
              <button
                onClick={(e) => { e.stopPropagation(); setDetailChallenge(ch); }}
                style={{
                  background: 'white',
                  color: '#e53935',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '8px 18px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                }}
              >Join/View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Leaderboard */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(60,12,16,0.85), rgba(30,6,8,0.85))',
        border: '1px solid rgba(229,57,53,0.25)',
        borderRadius: '20px',
        padding: '22px 18px',
        marginBottom: '18px',
        animation: 'fadeInUp 0.5s ease-out 0.2s both',
      }}>
        <h3 style={{
          fontSize: '17px',
          fontWeight: 800,
          color: 'white',
          margin: '0 0 18px 4px',
        }}>Weekly Leaderboard</h3>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: '10px',
        }}>
          {PODIUM.map((p) => {
            const heights = { 1: 88, 2: 66, 3: 52 };
            const rankColors = { 1: '#e53935', 2: '#94a3b8', 3: '#f59e0b' };
            const rankBorder = rankColors[p.rank];
            return (
              <div key={p.rank} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '62px',
                  height: '62px',
                  borderRadius: '50%',
                  border: `3px solid ${rankBorder}`,
                  backgroundImage: `url(${p.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: p.rank === 1 ? '0 0 20px rgba(229,57,53,0.6)' : '0 4px 12px rgba(0,0,0,0.4)',
                  marginBottom: '-12px',
                  position: 'relative',
                  zIndex: 2,
                }} />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: rankBorder,
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '6px',
                  position: 'relative',
                  zIndex: 3,
                  border: '2px solid #0a0203',
                }}>{p.rank}</div>
                <div style={{
                  width: '100%',
                  height: `${heights[p.rank]}px`,
                  background: p.rank === 1
                    ? 'linear-gradient(180deg, rgba(229,57,53,0.4), rgba(229,57,53,0.1))'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  border: `1px solid ${p.rank === 1 ? 'rgba(229,57,53,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '10px 10px 0 0',
                  padding: '10px 4px 6px 4px',
                  textAlign: 'center',
                  marginTop: '4px',
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '2px',
                  }}>{p.name}</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#ff5252',
                    fontWeight: 700,
                  }}>🏅 {p.xp}XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div
        className="challenge-scroll"
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          background: 'linear-gradient(135deg, rgba(60,12,16,0.5), rgba(30,6,8,0.5))',
          border: '1px solid rgba(229,57,53,0.18)',
          borderRadius: '18px',
          padding: '18px 16px',
          marginBottom: '18px',
          animation: 'fadeInUp 0.5s ease-out 0.3s both',
        }}
      >
        {BADGES.map((b) => (
          <div key={b.id} style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '88px',
            opacity: b.locked ? 0.4 : 1,
          }}>
            <div style={{
              width: '68px',
              height: '76px',
              background: b.locked
                ? 'rgba(255,255,255,0.04)'
                : 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(120,20,25,0.5))',
              border: b.locked ? '2px solid rgba(255,255,255,0.1)' : '2px solid #ef4444',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              marginBottom: '8px',
              boxShadow: b.locked ? 'none' : '0 0 16px rgba(229,57,53,0.35)',
            }}>
              {b.locked ? '🔒' : b.emoji}
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.2,
            }}>{b.name}</div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <p style={{
        fontSize: '11px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        margin: '10px 0 10px 4px',
      }}>Attività Recenti</p>
      {ACTIVITIES.map((a) => (
        <div key={a.id} style={{
          background: 'linear-gradient(135deg, rgba(40,8,10,0.7), rgba(20,4,6,0.7))',
          border: '1px solid rgba(229,57,53,0.15)',
          borderRadius: '14px',
          padding: '12px 14px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeInUp 0.5s ease-out both',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundImage: `url(${a.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            border: '1px solid rgba(229,57,53,0.3)',
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '13px',
              color: 'white',
              margin: '0 0 2px 0',
              fontWeight: 500,
            }}>
              <strong style={{ fontWeight: 800 }}>{a.user}</strong> {a.action}
            </p>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              margin: 0,
            }}>{a.time}</p>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      ))}

      {/* Challenge Detail Modal */}
      {detailChallenge && (
        <div
          onClick={() => setDetailChallenge(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '430px',
              background: 'linear-gradient(180deg, #1a0608 0%, #0a0203 100%)',
              borderTop: '1px solid rgba(229,57,53,0.4)',
              borderRadius: '28px 28px 0 0',
              padding: 0,
              animation: 'slideUp 0.35s cubic-bezier(.2,.8,.2,1)',
              boxShadow: '0 -20px 60px rgba(229,57,53,0.3)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div style={{
              height: '180px',
              backgroundImage: `linear-gradient(180deg, rgba(10,0,2,0) 0%, rgba(10,2,3,0.95) 100%), url(${detailChallenge.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '28px 28px 0 0',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
            }}>
              <div style={{
                width: '44px',
                height: '4px',
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '999px',
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
              }} />
              <div>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ff5252',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: '0 0 4px 0',
                }}>{detailChallenge.title}</p>
                <h2 style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: 'white',
                  margin: 0,
                  letterSpacing: '-0.5px',
                  textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                }}>{detailChallenge.emoji} {detailChallenge.description}</h2>
              </div>
            </div>

            <div style={{ padding: '22px 24px 28px 24px' }}>
              {/* Progress */}
              <div style={{
                background: 'rgba(229,57,53,0.08)',
                border: '1px solid rgba(229,57,53,0.25)',
                borderRadius: '16px',
                padding: '16px 18px',
                marginBottom: '16px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Progresso Community</span>
                  <span style={{ fontSize: '13px', color: '#ff5252', fontWeight: 800 }}>{detailChallenge.completed}/{detailChallenge.days} days</span>
                </div>
                <div style={{
                  height: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${(detailChallenge.completed / detailChallenge.days) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #ef4444, #ff5252)',
                    boxShadow: '0 0 12px rgba(229,57,53,0.7)',
                  }} />
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '18px',
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '14px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff5252' }}>{detailChallenge.participants}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Iscritti</div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '14px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff5252' }}>{detailChallenge.days - detailChallenge.completed}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Giorni rimanenti</div>
                </div>
              </div>

              {/* Reward */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(234,179,8,0.12), rgba(234,179,8,0.04))',
                border: '1px solid rgba(234,179,8,0.3)',
                borderRadius: '14px',
                padding: '14px 16px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{ fontSize: '24px' }}>🏆</div>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(234,179,8,1)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ricompensa</div>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: 700, marginTop: '2px' }}>{detailChallenge.reward}</div>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.55,
                margin: '0 0 22px 0',
              }}>
                Unisciti alla sfida e allenati insieme alla community! Completa gli obiettivi giornalieri per avanzare e sbloccare la ricompensa finale.
              </p>

              {/* Join button */}
              {joined.includes(detailChallenge.id) ? (
                <button
                  disabled
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'rgba(34,197,94,0.18)',
                    color: '#22c55e',
                    border: '1px solid rgba(34,197,94,0.4)',
                    borderRadius: '14px',
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    cursor: 'default',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  ISCRITTO
                </button>
              ) : (
                <button
                  onClick={() => handleJoin(detailChallenge)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(180deg, #ef4444, #e53935)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: '0 8px 24px rgba(229,57,53,0.5)',
                  }}
                >JOIN CHALLENGE</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #22c55e, #16a34a)',
          color: 'white',
          padding: '14px 22px',
          borderRadius: '14px',
          fontSize: '14px',
          fontWeight: 700,
          zIndex: 200,
          boxShadow: '0 10px 30px rgba(34,197,94,0.4)',
          animation: 'fadeIn 0.3s ease-out',
        }}>
          🎉 {toast}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
