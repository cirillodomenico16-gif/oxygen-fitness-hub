import React, { useState } from 'react';
import { PHOTOS } from '../App';

interface Meal {
  name: string;
  time: string;
  items: string[];
  calories: number;
  type: 'breakfast' | 'snack' | 'lunch' | 'snack2' | 'dinner';
}

interface DayMeals {
  [key: string]: Meal[];
}

const DietaPage: React.FC = () => {
  const days = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
  const [selectedDay, setSelectedDay] = useState(0);

  const mealData: DayMeals = {
    LUN: [
      {
        name: 'Colazione',
        time: '07:00',
        items: ['Porridge proteico con banana e miele', 'Latte di mandorla 200ml'],
        calories: 450,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '10:00',
        items: ['Yogurt greco con noci e frutti di bosco'],
        calories: 200,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '13:00',
        items: [
          'Petto di pollo grigliato 200g',
          'Riso integrale 80g',
          'Verdure miste alla griglia',
        ],
        calories: 650,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '16:00',
        items: ['Shake proteico', '30g mandorle'],
        calories: 350,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:00',
        items: [
          'Salmone al forno 180g',
          'Patate dolci 150g',
          'Insalata mista con avocado',
        ],
        calories: 700,
        type: 'dinner',
      },
    ],
    MAR: [
      {
        name: 'Colazione',
        time: '07:00',
        items: ['Uova strapazzate 2', 'Pane integrale tostato 50g', 'Marmellata senza zuccheri'],
        calories: 420,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '10:00',
        items: ['Mela con burro di arachidi 15g'],
        calories: 220,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '13:00',
        items: ['Tonno in scatola al naturale 150g', 'Pasta integrale 60g', 'Broccoli al vapore'],
        calories: 620,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '16:00',
        items: ['Banana media', 'Proteine in polvere whey'],
        calories: 280,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:00',
        items: [
          'Petto di tacchino alla piastra 200g',
          'Patate al forno 150g',
          'Insalata verde mista',
        ],
        calories: 680,
        type: 'dinner',
      },
    ],
    MER: [
      {
        name: 'Colazione',
        time: '07:00',
        items: ['Smoothie proteico banana e spinaci', 'Granola 40g', 'Latte di cocco 200ml'],
        calories: 480,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '10:00',
        items: ['Arancia fresca', 'Mandorle 25g'],
        calories: 210,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '13:00',
        items: [
          'Filetto di merluzzo 200g',
          'Riso basmati 70g',
          'Carote e zucchine al vapore',
        ],
        calories: 640,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '16:00',
        items: ['Yogurt magro 150g', 'Bacche miste 60g'],
        calories: 160,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:00',
        items: [
          'Pollo al curry 180g',
          'Quinoa cotta 60g',
          'Cavolo riccio saltato in padella',
        ],
        calories: 720,
        type: 'dinner',
      },
    ],
    GIO: [
      {
        name: 'Colazione',
        time: '07:00',
        items: ['Pancake proteici 2', 'Sciroppo d\'acero 20ml', 'Caffè nero'],
        calories: 440,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '10:00',
        items: ['Pera fresca', 'Noci 20g'],
        calories: 190,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '13:00',
        items: ['Manzo magro 200g', 'Patate dolci 120g', 'Spinaci saltati'],
        calories: 660,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '16:00',
        items: ['Frullato proteico', 'Fragole 100g'],
        calories: 220,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:00',
        items: [
          'Orata al cartoccio 180g',
          'Riso integrale 70g',
          'Melanzane grigliate',
        ],
        calories: 710,
        type: 'dinner',
      },
    ],
    VEN: [
      {
        name: 'Colazione',
        time: '07:00',
        items: ['Avena 50g', 'Latte intero 200ml', 'Miele 10g', 'Cannella'],
        calories: 410,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '10:00',
        items: ['Kiwi 2', 'Anacardi 20g'],
        calories: 200,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '13:00',
        items: [
          'Petto di pollo 220g',
          'Farro perlato 60g',
          'Peperoni e cipolla grigliati',
        ],
        calories: 670,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '16:00',
        items: ['Formaggio magro 30g', 'Pane croccante 30g'],
        calories: 240,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:00',
        items: [
          'Trota al forno 190g',
          'Patate al vapore 140g',
          'Zucchine trifolate',
        ],
        calories: 690,
        type: 'dinner',
      },
    ],
    SAB: [
      {
        name: 'Colazione',
        time: '08:00',
        items: ['Waffle proteici', 'Fragole fresche 150g', 'Yogurt greco 100g'],
        calories: 460,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '11:00',
        items: ['Banana grande', 'Burro di mandorle 15g'],
        calories: 240,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '13:30',
        items: ['Bistecca magra 200g', 'Riso selvaggio 70g', 'Funghi grigliati'],
        calories: 680,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '17:00',
        items: ['Shake proteico', 'Avena 30g'],
        calories: 300,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:30',
        items: [
          'Branzino al sale 180g',
          'Patate dolci 140g',
          'Insalata con vinaigrette',
        ],
        calories: 700,
        type: 'dinner',
      },
    ],
    DOM: [
      {
        name: 'Colazione',
        time: '08:30',
        items: ['Frittata di verdure 3 uova', 'Pane integrale 60g', 'Succo d\'arancia 200ml'],
        calories: 470,
        type: 'breakfast',
      },
      {
        name: 'Spuntino',
        time: '11:30',
        items: ['Melone 200g', 'Pistacchio 25g'],
        calories: 180,
        type: 'snack',
      },
      {
        name: 'Pranzo',
        time: '14:00',
        items: [
          'Coscia di pollo 200g',
          'Orzo perlato 70g',
          'Verdure miste rosolate',
        ],
        calories: 650,
        type: 'lunch',
      },
      {
        name: 'Spuntino',
        time: '17:30',
        items: ['Yogurt greco 150g', 'Granola 30g', 'Miele 10g'],
        calories: 280,
        type: 'snack2',
      },
      {
        name: 'Cena',
        time: '20:00',
        items: [
          'Salmone affumicato 150g',
          'Riso bianco 80g',
          'Asparagi al vapore',
        ],
        calories: 680,
        type: 'dinner',
      },
    ],
  };

  const currentMeals = mealData[days[selectedDay]];
  const totalCalories = currentMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const remainingCalories = 2450 - totalCalories;
  const waterGlasses = 6;
  const totalWaterGlasses = 8;

  const getMealIcon = (type: string): string => {
    switch (type) {
      case 'breakfast':
        return '';
      case 'snack':
        return '';
      case 'lunch':
        return '';
      case 'snack2':
        return '';
      case 'dinner':
        return '';
      default:
        return '';
    }
  };

  const getMealBorderColor = (type: string): string => {
    switch (type) {
      case 'breakfast':
        return '#ff8c00';
      case 'snack':
        return '#a855f7';
      case 'lunch':
        return '#22c55e';
      case 'snack2':
        return '#a855f7';
      case 'dinner':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const CircularProgress: React.FC<{
    value: number;
    max: number;
    label: string;
    color: string;
    unit: string;
  }> = ({ value, max, label, color, unit }) => {
    const percentage = (value / max) * 100;
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(107, 114, 128, 0.3)"
            strokeWidth="4"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
          <text
            x="60"
            y="65"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="600"
            style={{ transform: 'rotate(90deg)', transformOrigin: '60px 60px' }}
          >
            {value}
            {unit}
          </text>
        </svg>
        <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>{label}</span>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: '#0a0e1a',
        minHeight: '100vh',
        color: '#f3f4f6',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        paddingBottom: '100px',
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 16px', paddingTop: '40px', paddingBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>La Mia Dieta</h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0' }}>
          Piano nutrizionale personalizzato
        </p>
      </div>

      {/* Nutrition Photo Banner */}
      <div style={{ margin: '0 16px 24px 16px', borderRadius: '16px', height: '100px', backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.85), rgba(10,14,26,0.2)), url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Macro Summary Card */}
      <div
        style={{
          margin: '0 16px 24px 16px',
          padding: '20px',
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          borderRadius: '16px',
          border: '1px solid rgba(75, 85, 99, 0.3)',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#d1d5db', marginBottom: '20px' }}>
          Macro Giornaliere
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <CircularProgress value={180} max={180} label="Proteine" color="#e53935" unit="g" />
          <CircularProgress value={250} max={250} label="Carboidrati" color="#3b82f6" unit="g" />
          <CircularProgress value={60} max={60} label="Grassi" color="#ff8c00" unit="g" />
          <CircularProgress value={totalCalories} max={2450} label="Totale" color="#22c55e" unit="kcal" />
        </div>
      </div>

      {/* Day Selector */}
      <div style={{ paddingBottom: '24px', overflowX: 'auto', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', minWidth: 'min-content', paddingBottom: '8px' }}>
          {days.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedDay === index ? '#e53935' : 'rgba(75, 85, 99, 0.4)',
                color: '#f3f4f6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Cards */}
      <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
        {currentMeals.map((meal, index) => (
          <div
            key={index}
            style={{
              marginBottom: '16px',
              backgroundColor: 'rgba(17, 24, 39, 0.85)',
              borderRadius: '16px',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              borderLeft: `4px solid ${getMealBorderColor(meal.type)}`,
              padding: '16px',
              display: 'flex',
              gap: '12px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(75, 85, 99, 0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(75, 85, 99, 0.3)';
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '40px',
              }}
            >
              {getMealIcon(meal.type)}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '600', margin: '0' }}>{meal.name}</h4>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{meal.time}</span>
              </div>
              <ul
                style={{
                  margin: '0',
                  padding: '0 0 0 16px',
                  listStyle: 'none',
                }}
              >
                {meal.items.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '13px',
                      color: '#d1d5db',
                      marginBottom: idx < meal.items.length - 1 ? '4px' : '0',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Calorie Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60px',
                padding: '8px 12px',
                backgroundColor: 'rgba(229, 57, 53, 0.15)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#ff6b6b',
              }}
            >
              {meal.calories}
              <br />
              <span style={{ fontSize: '11px' }}>kcal</span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Total Bar */}
      <div
        style={{
          margin: '0 16px 24px 16px',
          padding: '16px',
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          borderRadius: '16px',
          border: '1px solid rgba(75, 85, 99, 0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>Consumate</span>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>
            {totalCalories} / 2450 kcal
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(75, 85, 99, 0.3)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(totalCalories / 2450) * 100}%`,
              backgroundColor: '#22c55e',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#9ca3af' }}>
          Rimanenti: {remainingCalories} kcal
        </div>
      </div>

      {/* Water Tracker */}
      <div
        style={{
          margin: '0 16px 24px 16px',
          padding: '16px',
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          borderRadius: '16px',
          border: '1px solid rgba(75, 85, 99, 0.3)',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Acqua: {waterGlasses} / {totalWaterGlasses} bicchieri
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '8px' }}>
          {Array.from({ length: totalWaterGlasses }).map((_, index) => (
            <div
              key={index}
              style={{
                fontSize: '24px',
                textAlign: 'center',
                opacity: index < waterGlasses ? 1 : 0.3,
                transition: 'opacity 0.2s ease',
              }}
            >

            </div>
          ))}
        </div>
      </div>

      {/* Nutritionist Note */}
      <div
        style={{
          margin: '0 16px 24px 16px',
          padding: '16px',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '16px',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderLeft: '4px solid #22c55e',
        }}
      >
        <p style={{ margin: '0', fontSize: '13px', color: '#d1d5db', lineHeight: '1.5' }}>
          <strong style={{ color: '#22c55e' }}>Nota:</strong> Ricordati di bere almeno 2L di acqua al giorno
          e mangiare lentamente.
        </p>
      </div>
    </div>
  );
};

export default DietaPage;
