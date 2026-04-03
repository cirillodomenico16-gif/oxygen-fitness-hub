import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Euro,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
  Brain,
  FileText,
  Calendar,
  Settings,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function AdminDashboard() {
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    setAnimatedStats(true);
  }, []);

  // Revenue data
  const revenueData = [
    { month: 'Gen', revenue: 6200 },
    { month: 'Feb', revenue: 7100 },
    { month: 'Mar', revenue: 7800 },
    { month: 'Apr', revenue: 8400 },
  ];

  // Recent activity data
  const activities = [
    {
      id: 1,
      name: 'Marco R.',
      action: 'Check-in palestra',
      status: 'ATTIVO',
      statusColor: '#22c55e',
      initials: 'MR',
      timeAgo: '2 min fa',
    },
    {
      id: 2,
      name: 'Anna S.',
      action: 'Rinnovo abbonamento',
      status: 'ATTIVO',
      statusColor: '#22c55e',
      initials: 'AS',
      timeAgo: '15 min fa',
    },
    {
      id: 3,
      name: 'Luigi B.',
      action: 'Abbonamento scaduto',
      status: 'SCADUTO',
      statusColor: '#e53935',
      initials: 'LB',
      timeAgo: '1 ora fa',
    },
    {
      id: 4,
      name: 'Sara M.',
      action: 'Nuova iscrizione',
      status: 'ATTIVO',
      statusColor: '#22c55e',
      initials: 'SM',
      timeAgo: '3 ore fa',
    },
    {
      id: 5,
      name: 'Paolo F.',
      action: 'Sospeso pagamento',
      status: 'SCADUTO',
      statusColor: '#e53935',
      initials: 'PF',
      timeAgo: '5 ore fa',
    },
  ];

  const nav = useNavigate();

  // Quick actions
  const quickActions = [
    {
      id: 1,
      label: 'Nuovo Socio',
      icon: Plus,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      route: '/admin/settings',
    },
    {
      id: 2,
      label: 'Scheda AI',
      icon: Brain,
      color: '#e53935',
      bgColor: 'rgba(229, 57, 53, 0.1)',
      route: '/admin/schede-ai',
    },
    {
      id: 3,
      label: 'Report',
      icon: FileText,
      color: '#22c55e',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      route: '/admin',
    },
    {
      id: 4,
      label: 'Corsi',
      icon: Calendar,
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.1)',
      route: '/admin/calendario',
    },
  ];

  // Stat card component
  const StatCard = ({ icon: Icon, label, value, color, delay }: { icon: any; label: string; value: string; color: string; delay: number }) => (
    <div
      style={{
        animation: animatedStats ? `slideUp 0.6s ease-out ${delay}s forwards` : 'none',
        opacity: animatedStats ? 1 : 0,
        transform: animatedStats ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}40`;
          e.currentTarget.style.boxShadow = `0 0 20px ${color}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={24} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '4px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflowY: 'auto',
        paddingBottom: '100px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '32px 32px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Dashboard
        </h1>
        <Settings size={24} color='rgba(255, 255, 255, 0.6)' />
      </div>

      {/* Stats Cards Row */}
      <div
        style={{
          padding: '32px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '1200px',
        }}
      >
        <StatCard
          icon={Users}
          label='Soci attivi'
          value='342'
          color='#3b82f6'
          delay={0}
        />
        <StatCard
          icon={Euro}
          label='Revenue'
          value='€8.4k'
          color='#22c55e'
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          label='Retention'
          value='91%'
          color='#a855f7'
          delay={0.2}
        />
        <StatCard
          icon={Clock}
          label='Oggi'
          value='28'
          color='#f59e0b'
          delay={0.3}
        />
      </div>

      {/* Revenue Trend Chart */}
      <div
        style={{
          padding: '32px',
          paddingTop: '24px',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#ffffff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Trend Revenue Mensile
        </h2>
        <div
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={revenueData}>
              <XAxis
                dataKey='month'
                stroke='rgba(255, 255, 255, 0.3)'
                style={{ fontSize: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
              <YAxis
                stroke='rgba(255, 255, 255, 0.3)'
                style={{ fontSize: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: '#ffffff',
                }}
                cursor={{ fill: 'rgba(229, 57, 53, 0.1)' }}
              />
              <Bar
                dataKey='revenue'
                fill='url(#redGradient)'
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
              />
              <defs>
                <linearGradient id='redGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#e53935' stopOpacity={0.8} />
                  <stop offset='100%' stopColor='#e53935' stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alert Banner */}
      <div
        style={{
          padding: '0 32px',
          marginTop: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <AlertTriangle size={20} color='#f59e0b' />
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                color: '#f59e0b',
                fontSize: '14px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              3 abbonamenti in scadenza domani
            </p>
          </div>
          <a
            href='#'
            style={{
              color: '#f59e0b',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            onClick={(e) => e.preventDefault()}
          >
            Gestisci →
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          padding: '32px',
          paddingTop: '24px',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#ffffff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Attività Recenti Membri
        </h2>
        <div
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              style={{
                padding: '16px 20px',
                borderBottom:
                  index !== activities.length - 1
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  flexShrink: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {activity.initials}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#ffffff',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {activity.name}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {activity.action}
                </p>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginRight: '12px',
                }}
              >
                <div
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: `${activity.statusColor}20`,
                    fontSize: '11px',
                    fontWeight: '600',
                    color: activity.statusColor,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {activity.status}
                </div>
              </div>

              {/* Time */}
              <span
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {activity.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          padding: '32px',
          paddingTop: '24px',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#ffffff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Azioni Rapide
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            maxWidth: '1200px',
          }}
        >
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div
                key={action.id}
                style={{
                  animation: animatedStats
                    ? `slideUp 0.6s ease-out ${0.4 + index * 0.1}s forwards`
                    : 'none',
                  opacity: animatedStats ? 1 : 0,
                  transform: animatedStats ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <div
                  onClick={() => (action as any).route && nav((action as any).route)}
                  style={{
                    backgroundColor: `${action.bgColor}`,
                    border: `2px solid ${action.color}40`,
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${action.color}80`;
                    e.currentTarget.style.backgroundColor = `${action.color}15`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${action.color}40`;
                    e.currentTarget.style.backgroundColor = `${action.bgColor}`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <IconComponent size={32} color={action.color} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#ffffff',
                      textAlign: 'center',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {action.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
