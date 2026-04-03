import React, { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react';

interface Series {
  id: number;
  completed: boolean;
}

export default function WorkoutActivePage() {
  const [timeLeft, setTimeLeft] = useState(95);
  const [currentSeries, setCurrentSeries] = useState(3);
  const [series, setSeries] = useState<Series[]>([
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false },
    { id: 4, completed: false },
  ]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle series completion
  const handleSeriesCompleted = () => {
    setSeries((prevSeries) =>
      prevSeries.map((s) => (s.id === currentSeries ? { ...s, completed: true } : s))
    );

    if (currentSeries < 4) {
      setCurrentSeries((prev) => prev + 1);
      setTimeLeft(95);
    }
  };

  // Calculate circle progress
  const circumference = 2 * Math.PI * 95;
  const progress = (timeLeft / 95) * circumference;

  return (
    <div
      style={{
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
        }}
      >
        <button
          style={{
            position: 'absolute',
            left: '16px',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ margin: '0', fontSize: '20px', fontWeight: '600' }}>
          Allenamento in Corso
        </h1>
      </header>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 16px',
          gap: '32px',
          paddingBottom: '100px',
        }}
      >
        {/* Timer Circle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '220px',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: 'rotate(-90deg)',
              }}
              viewBox="0 0 200 200"
            >
              {/* Gray track background */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              {/* Red progress ring */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="#e53935"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 1s linear',
                }}
              />
            </svg>

            {/* Timer Text and Label */}
            <div
              style={{
                textAlign: 'center',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  lineHeight: '1',
                  marginBottom: '8px',
                }}
              >
                {timeLeft === 0 ? 'VAI!' : formatTime(timeLeft)}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '1px',
                }}
              >
                RIPOSO
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Info Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            backgroundColor: 'rgba(17,24,39,0.85)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: '0',
              color: '#fff',
            }}
          >
            Bench Press
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              margin: '0',
              fontWeight: '500',
            }}
          >
            Serie 3 di 4
          </p>

          {/* Info Pills */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(229,57,53,0.15)',
                border: '1px solid rgba(229,57,53,0.3)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ff7f7f',
              }}
            >
              10 reps
            </div>
            <div
              style={{
                backgroundColor: 'rgba(229,57,53,0.15)',
                border: '1px solid rgba(229,57,53,0.3)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ff7f7f',
              }}
            >
              80 kg
            </div>
          </div>
        </div>

        {/* Series Progress */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {series.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '14px',
                  ...(s.completed
                    ? {
                        backgroundColor: '#e53935',
                        color: '#fff',
                        border: '2px solid #e53935',
                      }
                    : s.id === currentSeries
                      ? {
                          backgroundColor: 'transparent',
                          color: '#e53935',
                          border: '2px solid #e53935',
                          animation: 'pulse 2s ease-in-out infinite',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: 'rgba(255,255,255,0.4)',
                          border: '2px solid rgba(255,255,255,0.2)',
                        }),
                }}
              >
                {s.completed ? <Check size={24} /> : s.id}
              </div>
              <span
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: '500',
                }}
              >
                Serie {s.id}
              </span>
            </div>
          ))}
        </div>

        {/* Next Exercise Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(17,24,39,0.85)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            Prossimo: Shoulder Press
          </span>
          <ArrowRight size={20} color="rgba(255,255,255,0.6)" />
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '16px',
          backgroundColor: 'rgba(10,14,26,0.95)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <button
          onClick={handleSeriesCompleted}
          style={{
            width: '100%',
            backgroundColor: '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '1px',
            boxShadow: '0 0 20px rgba(229,57,53,0.5)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(229,57,53,0.8)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(229,57,53,0.5)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          SERIE COMPLETATA
        </button>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(229, 57, 53, 0);
          }
        }
      `}</style>
    </div>
  );
}
