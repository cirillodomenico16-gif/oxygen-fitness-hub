import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { PHOTOS } from '../constants';

interface ActivityItem {
  id: number;
  avatar: string;
  name: string;
  action: string;
  timestamp: string;
}

const CommunityPage: React.FC = () => {
  const [activities] = useState<ActivityItem[]>([
    {
      id: 1,
      avatar: 'MR',
      name: 'Marco R.',
      action: 'ha completato Upper Body',
      timestamp: '2 ore fa',
    },
    {
      id: 2,
      avatar: 'SB',
      name: 'Sara B.',
      action: 'ha raggiunto 100 allenamenti!',
      timestamp: '5 ore fa',
    },
    {
      id: 3,
      avatar: 'LM',
      name: 'Luca M.',
      action: 'ha iniziato la Squat Challenge',
      timestamp: 'ieri',
    },
    {
      id: 4,
      avatar: 'GT',
      name: 'Giulia T.',
      action: 'nuovo record personale Squat!',
      timestamp: 'ieri',
    },
  ]);

  const leaderboardData = [
    { position: 2, name: 'Sara B.', xp: 2210, medal: 'silver' },
    { position: 1, name: 'Marco R.', xp: 2840, medal: 'gold' },
    { position: 3, name: 'Luca M.', xp: 1980, medal: 'bronze' },
  ];

  const badges = [
    { id: 1, title: 'Settimana Perfetta', icon: '●', bg: '#e53935' },
    { id: 2, title: '100 Allenamenti', icon: '●', bg: '#3b82f6' },
    { id: 3, title: 'Iron Warrior', icon: '●', bg: '#f97316' },
    { id: 4, title: 'Early Bird', icon: '●', bg: '#a855f7' },
  ];

  const getMedalColor = (medal: string) => {
    switch (medal) {
      case 'gold':
        return '#f59e0b';
      case 'silver':
        return '#94a3b8';
      case 'bronze':
        return '#d97706';
      default:
        return '#999';
    }
  };

  const getMedalEmoji = (medal: string) => {
    switch (medal) {
      case 'gold':
        return '1°';
      case 'silver':
        return '2°';
      case 'bronze':
        return '3°';
      default:
        return '●';
    }
  };

  return (
    <div
      style={{
        background: '#0a0e1a',
        minHeight: '100vh',
        color: 'white',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: 'auto',
        paddingBottom: '100px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0',
          }}
        >
          Community
        </h1>
        <Bell size={24} strokeWidth={2} />
      </div>

      {/* Content Container */}
      <div
        style={{
          padding: '24px',
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        {/* Community Photo Banner */}
        <div style={{ margin: '0 20px 16px', borderRadius: '16px', height: '120px', backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.85), rgba(10,14,26,0.2)), url(${PHOTOS.community})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
          <div style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>La nostra community</div>
        </div>

        {/* Monthly Challenge Card */}
        <div
          style={{
            background: 'rgba(17,24,39,0.85)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}
        >
          {/* Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #e53935 0%, #f44336 100%)',
              height: '80px',
            }}
          />

          {/* Content */}
          <div
            style={{
              padding: '24px',
            }}
          >
            <div
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                fontWeight: '500',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Sfida del Mese
            </div>

            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '0 0 20px 0',
              }}
            >
              30 Giorni Squat Challenge
            </h3>

            {/* Progress */}
            <div
              style={{
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontSize: '14px' }}>18/30 giorni</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  12 giorni rimanenti
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #e53935 0%, #f44336 100%)',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>

            {/* Participant Count */}
            <div
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
              }}
            >
              48 partecipanti
            </div>
          </div>
        </div>

        {/* Weekly Leaderboard */}
        <div
          style={{
            marginBottom: '32px',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 24px 0',
            }}
          >
            Classifica Settimanale
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {/* Silver (Position 2) - Left */}
            <div
              style={{
                flex: '1',
                maxWidth: '140px',
              }}
            >
              <div
                style={{
                  background: 'rgba(17,24,39,0.85)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  borderTop: `4px solid ${getMedalColor('silver')}`,
                  padding: '20px',
                  textAlign: 'center',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: `${getMedalColor('silver')}40`,
                    border: `2px solid ${getMedalColor('silver')}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontSize: '24px',
                  }}
                >
                  {getMedalEmoji('silver')}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  Sara B.
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: getMedalColor('silver'),
                  }}
                >
                  2210 XP
                </div>
              </div>
            </div>

            {/* Gold (Position 1) - Center */}
            <div
              style={{
                flex: '1',
                maxWidth: '140px',
              }}
            >
              <div
                style={{
                  background: 'rgba(17,24,39,0.85)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  borderTop: `4px solid ${getMedalColor('gold')}`,
                  padding: '20px',
                  textAlign: 'center',
                  minHeight: '270px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: `${getMedalColor('gold')}40`,
                    border: `2px solid ${getMedalColor('gold')}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontSize: '28px',
                  }}
                >
                  {getMedalEmoji('gold')}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    marginBottom: '8px',
                  }}
                >
                  Marco R.
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: getMedalColor('gold'),
                  }}
                >
                  2840 XP
                </div>
              </div>
            </div>

            {/* Bronze (Position 3) - Right */}
            <div
              style={{
                flex: '1',
                maxWidth: '140px',
              }}
            >
              <div
                style={{
                  background: 'rgba(17,24,39,0.85)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  borderTop: `4px solid ${getMedalColor('bronze')}`,
                  padding: '20px',
                  textAlign: 'center',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: `${getMedalColor('bronze')}40`,
                    border: `2px solid ${getMedalColor('bronze')}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontSize: '24px',
                  }}
                >
                  {getMedalEmoji('bronze')}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  Luca M.
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: getMedalColor('bronze'),
                  }}
                >
                  1980 XP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div
          style={{
            marginBottom: '32px',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 20px 0',
            }}
          >
            I Tuoi Traguardi
          </h2>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollBehavior: 'smooth',
            }}
          >
            {badges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  flex: '0 0 auto',
                  width: '100px',
                  background: 'rgba(17,24,39,0.85)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '120px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: badge.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                  }}
                >
                  {badge.icon}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: '1.2',
                  }}
                >
                  {badge.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 20px 0',
            }}
          >
            Attività Recenti
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {activities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  background: 'rgba(17,24,39,0.85)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e53935 0%, #f44336 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                    flexShrink: 0,
                  }}
                >
                  {activity.avatar}
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontWeight: '700' }}>{activity.name}</span>{' '}
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {activity.action}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
