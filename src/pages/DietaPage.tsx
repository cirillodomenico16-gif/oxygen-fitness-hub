import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Food {
  name: string;
  grams: string;
  kcal: number;
  image: string;
}

interface Meal {
  name: string;
  time: string;
  foods: Food[];
}

interface DayDiet {
  day: string;
  date: number;
  totalKcal: number;
  macros: { p: number; c: number; f: number };
  meals: Meal[];
}

const WEEK: DayDiet[] = [
  {
    day: 'Lunedì',
    date: 18,
    totalKcal: 2450,
    macros: { p: 180, c: 260, f: 75 },
    meals: [
      {
        name: 'Colazione',
        time: '08:00',
        foods: [
          { name: 'Avena', grams: '80g', kcal: 310, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop' },
          { name: 'Banana', grams: '120g', kcal: 105, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop' },
          { name: 'Yogurt greco', grams: '170g', kcal: 100, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Pranzo',
        time: '13:00',
        foods: [
          { name: 'Petto di pollo', grams: '200g', kcal: 330, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&h=200&fit=crop' },
          { name: 'Riso integrale', grams: '100g', kcal: 350, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&h=200&fit=crop' },
          { name: 'Broccoli', grams: '150g', kcal: 50, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Spuntino',
        time: '17:00',
        foods: [
          { name: 'Mandorle', grams: '30g', kcal: 170, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200&h=200&fit=crop' },
          { name: 'Mela', grams: '150g', kcal: 80, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Cena',
        time: '20:00',
        foods: [
          { name: 'Salmone', grams: '180g', kcal: 370, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop' },
          { name: 'Patate dolci', grams: '200g', kcal: 180, image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c23?w=200&h=200&fit=crop' },
          { name: 'Insalata mista', grams: '100g', kcal: 25, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
  {
    day: 'Martedì',
    date: 19,
    totalKcal: 2380,
    macros: { p: 175, c: 250, f: 72 },
    meals: [
      {
        name: 'Colazione',
        time: '08:00',
        foods: [
          { name: 'Pancakes proteici', grams: '2 pezzi', kcal: 320, image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=200&h=200&fit=crop' },
          { name: 'Frutti di bosco', grams: '100g', kcal: 60, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Pranzo',
        time: '13:00',
        foods: [
          { name: 'Tacchino', grams: '200g', kcal: 300, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&h=200&fit=crop' },
          { name: 'Quinoa', grams: '100g', kcal: 370, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop' },
          { name: 'Spinaci', grams: '150g', kcal: 35, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Cena',
        time: '20:00',
        foods: [
          { name: 'Merluzzo', grams: '200g', kcal: 220, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop' },
          { name: 'Zucchine grigliate', grams: '200g', kcal: 40, image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
  {
    day: 'Mercoledì',
    date: 20,
    totalKcal: 2500,
    macros: { p: 185, c: 270, f: 78 },
    meals: [
      {
        name: 'Colazione',
        time: '08:00',
        foods: [
          { name: 'Uova strapazzate', grams: '3 pezzi', kcal: 220, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
          { name: 'Pane integrale', grams: '80g', kcal: 200, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' },
          { name: 'Avocado', grams: '80g', kcal: 130, image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Pranzo',
        time: '13:00',
        foods: [
          { name: 'Manzo magro', grams: '200g', kcal: 400, image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&h=200&fit=crop' },
          { name: 'Pasta integrale', grams: '80g', kcal: 280, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Cena',
        time: '20:00',
        foods: [
          { name: 'Tonno', grams: '150g', kcal: 200, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=200&h=200&fit=crop' },
          { name: 'Fagioli', grams: '150g', kcal: 200, image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
  {
    day: 'Giovedì',
    date: 21,
    totalKcal: 2420,
    macros: { p: 178, c: 255, f: 74 },
    meals: [
      {
        name: 'Colazione',
        time: '08:00',
        foods: [
          { name: 'Porridge', grams: '200g', kcal: 300, image: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Pranzo',
        time: '13:00',
        foods: [
          { name: 'Pollo grigliato', grams: '200g', kcal: 330, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop' },
          { name: 'Cous cous', grams: '100g', kcal: 370, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
  {
    day: 'Venerdì',
    date: 22,
    totalKcal: 2450,
    macros: { p: 180, c: 260, f: 76 },
    meals: [
      {
        name: 'Colazione',
        time: '08:00',
        foods: [
          { name: 'Smoothie proteico', grams: '400ml', kcal: 350, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Pranzo',
        time: '13:00',
        foods: [
          { name: 'Insalata di pollo', grams: '350g', kcal: 450, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
  {
    day: 'Sabato',
    date: 23,
    totalKcal: 2600,
    macros: { p: 170, c: 300, f: 80 },
    meals: [
      {
        name: 'Colazione',
        time: '09:00',
        foods: [
          { name: 'French toast', grams: '2 pezzi', kcal: 380, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Pranzo',
        time: '13:30',
        foods: [
          { name: 'Pizza integrale', grams: '300g', kcal: 700, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
  {
    day: 'Domenica',
    date: 24,
    totalKcal: 2300,
    macros: { p: 170, c: 240, f: 70 },
    meals: [
      {
        name: 'Brunch',
        time: '11:00',
        foods: [
          { name: 'Eggs benedict', grams: '2 pezzi', kcal: 500, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=200&h=200&fit=crop' },
        ],
      },
      {
        name: 'Cena',
        time: '20:00',
        foods: [
          { name: 'Bistecca + verdure', grams: '300g', kcal: 600, image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=200&h=200&fit=crop' },
        ],
      },
    ],
  },
];

const DietaPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const validated = (() => {
    try { return JSON.parse(localStorage.getItem('oxy_dieta_1') || 'null'); }
    catch { return null; }
  })();

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    height: '100%',
    padding: '8px 20px 120px 20px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: 'white',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
    scrollbarColor: '#e53935 rgba(255,255,255,0.05)',
  };

  const weekTotal = WEEK.reduce((a, d) => a + d.totalKcal, 0);
  const avg = Math.round(weekTotal / WEEK.length);

  return (
    <div className="corsi-scroll" style={containerStyle}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
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
      `}</style>

      {validated && (
        <div style={{
          margin: '12px 0 18px', padding: '14px',
          background: 'rgba(34,197,94,0.08)',
          border: '1.5px solid rgba(34,197,94,0.55)',
          borderRadius: 14,
          boxShadow: '0 0 18px rgba(34,197,94,0.2)',
          animation: 'fadeInUp 0.4s ease-out',
        }}>
          <div style={{ fontSize: 11, letterSpacing: 1.3, color: '#86efac', fontWeight: 800, marginBottom: 6 }}>
            NUOVA DIETA VALIDATA DAL COACH · {validated.date}
          </div>
          <pre style={{
            whiteSpace: 'pre-wrap', fontFamily: 'inherit',
            fontSize: 11.5, lineHeight: 1.55, margin: 0,
            color: 'rgba(255,255,255,0.92)', maxHeight: 340, overflowY: 'auto',
          }}>{validated.plan}</pre>
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0 20px 0',
      }}>
        <button
          onClick={() => navigate('/profilo')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'white',
          margin: 0,
          letterSpacing: '-0.3px',
        }}>La Tua Dieta</h1>
        <div style={{ width: '22px' }} />
      </div>

      {/* Week summary card */}
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        marginBottom: '22px',
        overflow: 'hidden',
        border: '1px solid rgba(229,57,53,0.3)',
        boxShadow: '0 0 28px rgba(229,57,53,0.18)',
        animation: 'fadeInUp 0.5s ease-out',
        minHeight: '180px',
        backgroundImage: `linear-gradient(180deg, rgba(10,0,2,0.35) 0%, rgba(30,6,8,0.82) 55%, rgba(10,0,2,0.95) 100%), url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=600&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          padding: '22px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '180px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#ff5252',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>Settimana 18-24 Aprile</p>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: 'white',
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}>{avg} kcal / giorno</h2>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Obiettivo: massa muscolare
          </p>
        </div>
      </div>

      <p style={{
        fontSize: '12px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        margin: '0 0 14px 4px',
      }}>Seleziona un giorno</p>

      {/* Day cards */}
      {WEEK.map((d, idx) => {
        const expanded = expandedIdx === idx;
        return (
          <div
            key={idx}
            style={{
              background: 'linear-gradient(135deg, rgba(60,12,16,0.85), rgba(30,6,8,0.85))',
              border: '1px solid rgba(229,57,53,0.28)',
              borderLeft: '3px solid #ef4444',
              borderRadius: '16px',
              padding: '18px 18px',
              marginBottom: '12px',
              transition: 'all 0.3s ease',
              animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`,
            }}
          >
            <div
              onClick={() => setExpandedIdx(expanded ? null : idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ff5252',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>{d.day} {d.date}</span>
                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 800,
                  color: 'white',
                  margin: '4px 0',
                  letterSpacing: '-0.3px',
                }}>{d.totalKcal} kcal</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  P {d.macros.p}g · C {d.macros.c}g · F {d.macros.f}g
                </p>
              </div>
              <div style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                color: '#ff5252',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {expanded && (
              <div style={{ marginTop: '16px' }}>
                {d.meals.map((meal, mi) => (
                  <div key={mi} style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: '1px solid rgba(229,57,53,0.15)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    marginBottom: '10px',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '10px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>
                        {meal.name}
                      </span>
                      <span style={{ fontSize: '11px', color: '#ff8a80', fontWeight: 600 }}>
                        {meal.time}
                      </span>
                    </div>
                    {meal.foods.map((f, fi) => (
                      <div key={fi} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 0',
                        borderBottom: fi < meal.foods.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '10px',
                          backgroundImage: `url('${f.image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: '1px solid rgba(229,57,53,0.35)',
                          boxShadow: '0 0 10px rgba(229,57,53,0.2)',
                          flexShrink: 0,
                        }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>{f.name}</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginTop: '2px' }}>
                            {f.grams}
                          </div>
                        </div>
                        <div style={{ fontSize: '13px', color: '#ff5252', fontWeight: 800 }}>
                          {f.kcal} kcal
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DietaPage;
