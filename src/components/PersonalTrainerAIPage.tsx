import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../config/theme';

/* ─── Types ──────────────────────────────────────────────── */
type Goal = 'Perdere peso' | 'Aumentare massa' | 'Resistenza' | 'Definizione' | 'Forza' | 'Mobilità';
type Step = 'name' | 'age' | 'years' | 'goal' | 'days' | 'generating' | 'plan';

interface UserProfile {
  name: string;
  age: number;
  years: number;   // years training
  goal: Goal;
  days: number;    // days/week
}

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  muscle: string;
  tip: string;
  imgKey: string;
}

interface WorkoutSession {
  label: string;   // e.g. "Giorno A – Upper"
  exercises: Exercise[];
}

interface Mesocycle {
  months: string;   // e.g. "Gen – Mar"
  name: string;     // e.g. "Fondamenta"
  focus: string;
  rpe: string;
  goal: string;
  sessions: WorkoutSession[];
}

interface AnnualPlan {
  title: string;
  summary: string;
  weeklyStructure: string;
  mesocycles: Mesocycle[];
}

/* ─── Exercise images (Unsplash curated by category) ─────── */
const IMG: Record<string, string> = {
  squat:      'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=280&h=180&fit=crop&auto=format',
  deadlift:   'https://images.unsplash.com/photo-1534368786749-b63e05c8c5e6?w=280&h=180&fit=crop&auto=format',
  bench:      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f59b?w=280&h=180&fit=crop&auto=format',
  pullup:     'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=280&h=180&fit=crop&auto=format',
  row:        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=280&h=180&fit=crop&auto=format',
  ohp:        'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=280&h=180&fit=crop&auto=format',
  lunge:      'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=280&h=180&fit=crop&auto=format',
  plank:      'https://images.unsplash.com/photo-1544367567-0d81e9c3b876?w=280&h=180&fit=crop&auto=format',
  run:        'https://images.unsplash.com/photo-1476480862126-209bde6db4b9?w=280&h=180&fit=crop&auto=format',
  bike:       'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=280&h=180&fit=crop&auto=format',
  hiit:       'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=280&h=180&fit=crop&auto=format',
  yoga:       'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=280&h=180&fit=crop&auto=format',
  pushup:     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=280&h=180&fit=crop&auto=format',
  kettlebell: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=280&h=180&fit=crop&auto=format',
  cable:      'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=280&h=180&fit=crop&auto=format',
  legpress:   'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=280&h=180&fit=crop&auto=format',
  stretch:    'https://images.unsplash.com/photo-1544367567-0d81e9c3b876?w=280&h=180&fit=crop&auto=format',
  burpee:     'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=280&h=180&fit=crop&auto=format',
};

/* ─── Plan generator ─────────────────────────────────────── */
function buildPlan(p: UserProfile): AnnualPlan {
  const lvl = p.years <= 1 ? 'base' : p.years <= 3 ? 'mid' : 'adv';
  const freq = p.days;

  /* Weekly structure */
  const structure: Record<string, string> = {
    base: freq <= 3 ? 'Full Body × 3 gg (Lun / Mer / Ven)' : 'Upper/Lower × 4 gg',
    mid:  freq <= 3 ? 'Push/Pull/Legs × 3 gg' : freq === 4 ? 'Upper/Lower × 4 gg' : 'PPL + Full Body × 5 gg',
    adv:  freq <= 4 ? 'Upper/Lower Pesante/Volume × 4 gg' : 'Torso/Gambe/Push/Pull/Full × 5 gg',
  };

  /* Sessions based on goal + level */
  const sessionMap: Record<string, Record<string, WorkoutSession[]>> = {
    'Perdere peso': {
      base: [
        { label: 'Full Body + Cardio', exercises: [
          { name: 'Squat corpo libero', sets: '4', reps: '15', rest: '45s', muscle: 'Gambe', tip: 'Ginocchia sopra le punte', imgKey: 'squat' },
          { name: 'Push-up', sets: '4', reps: '12', rest: '45s', muscle: 'Petto', tip: 'Gomiti a 45°', imgKey: 'pushup' },
          { name: 'Plank', sets: '3', reps: '40s', rest: '30s', muscle: 'Core', tip: 'Glutei contratti', imgKey: 'plank' },
          { name: 'Corsa 20 min Z2', sets: '1', reps: '20 min', rest: '–', muscle: 'Cardio', tip: 'Frequenza cardiaca 130-145 bpm', imgKey: 'run' },
        ]},
        { label: 'HIIT Circuit', exercises: [
          { name: 'Burpees', sets: '4', reps: '12', rest: '40s', muscle: 'Full body', tip: 'Esplodi sul salto', imgKey: 'burpee' },
          { name: 'Kettlebell Swing', sets: '4', reps: '20', rest: '45s', muscle: 'Glutei + Dorsali', tip: 'Potenza dai fianchi', imgKey: 'kettlebell' },
          { name: 'Affondi', sets: '3', reps: '16', rest: '45s', muscle: 'Quadricipiti + Glutei', tip: 'Busto dritto', imgKey: 'lunge' },
        ]},
      ],
      mid: [
        { label: 'Push + Cardio', exercises: [
          { name: 'Panca piana manubri', sets: '4', reps: '12', rest: '60s', muscle: 'Petto', tip: 'Scapole fisse', imgKey: 'bench' },
          { name: 'Shoulder Press', sets: '4', reps: '12', rest: '60s', muscle: 'Spalle', tip: 'No iperestensione lombari', imgKey: 'ohp' },
          { name: 'HIIT Bike 10×30s', sets: '10', reps: '30s max', rest: '30s', muscle: 'Cardio', tip: '95%+ sforzo massimale', imgKey: 'bike' },
        ]},
        { label: 'Pull + Legs', exercises: [
          { name: 'Lat Machine presa larga', sets: '4', reps: '12', rest: '60s', muscle: 'Dorsali', tip: 'Coda del sopraspinato', imgKey: 'cable' },
          { name: 'Leg Press', sets: '4', reps: '15', rest: '60s', muscle: 'Gambe', tip: 'Range completo', imgKey: 'legpress' },
          { name: 'Corsa 25 min Z2-Z3', sets: '1', reps: '25 min', rest: '–', muscle: 'Cardio', tip: 'Progressivo ultimi 5 min', imgKey: 'run' },
        ]},
      ],
      adv: [
        { label: 'Metcon Pesante', exercises: [
          { name: 'Squat bilanciere', sets: '5', reps: '8 @70%', rest: '2min', muscle: 'Gambe', tip: 'Profondità completa', imgKey: 'squat' },
          { name: 'Kettlebell Complex 5×5', sets: '5', reps: '5', rest: '90s', muscle: 'Full body', tip: 'Swing→Clean→Press→Squat', imgKey: 'kettlebell' },
          { name: 'HIIT 8×45s', sets: '8', reps: '45s', rest: '15s', muscle: 'Cardio', tip: 'Cambio esercizio ogni serie', imgKey: 'hiit' },
        ]},
        { label: 'Forza + Circuit', exercises: [
          { name: 'Deadlift', sets: '4', reps: '5 @75%', rest: '3min', muscle: 'Posteriore', tip: 'Tensione prima del pull', imgKey: 'deadlift' },
          { name: 'Pull-up', sets: '4', reps: '8', rest: '90s', muscle: 'Dorsali + Bicipiti', tip: 'Full hang, no kipping', imgKey: 'pullup' },
          { name: 'Circuit finale 5 min', sets: '1', reps: '5 min AMRAP', rest: '–', muscle: 'Full body', tip: 'Max reps in 5 min', imgKey: 'burpee' },
        ]},
      ],
    },
    'Aumentare massa': {
      base: [
        { label: 'Full Body A', exercises: [
          { name: 'Squat bilanciere', sets: '3', reps: '8', rest: '2min', muscle: 'Gambe', tip: 'Scarpe flat, cintura alta', imgKey: 'squat' },
          { name: 'Panca piana bilanciere', sets: '3', reps: '8', rest: '2min', muscle: 'Petto', tip: 'Pausa 1s sul petto', imgKey: 'bench' },
          { name: 'Trazioni (assistite se serve)', sets: '3', reps: '6-8', rest: '2min', muscle: 'Dorsali', tip: 'Full hang, torna lentamente', imgKey: 'pullup' },
        ]},
        { label: 'Full Body B', exercises: [
          { name: 'Deadlift', sets: '3', reps: '5', rest: '3min', muscle: 'Posteriore', tip: 'Schiena neutra, testa neutrale', imgKey: 'deadlift' },
          { name: 'Overhead Press', sets: '3', reps: '8', rest: '2min', muscle: 'Spalle + Tricipiti', tip: 'Core bracing, no arch', imgKey: 'ohp' },
          { name: 'Rematore bilanciere', sets: '3', reps: '8', rest: '2min', muscle: 'Dorsali + Bicipiti', tip: 'Gomiti vicini corpo', imgKey: 'row' },
        ]},
      ],
      mid: [
        { label: 'Push Day', exercises: [
          { name: 'Panca piana bilanciere', sets: '5', reps: '5', rest: '3min', muscle: 'Petto', tip: 'Progressione +2.5kg/sett', imgKey: 'bench' },
          { name: 'Panca inclinata manubri', sets: '4', reps: '10', rest: '90s', muscle: 'Petto alto', tip: 'Inclinazione 30°', imgKey: 'bench' },
          { name: 'Overhead Press', sets: '4', reps: '8', rest: '2min', muscle: 'Spalle', tip: 'Glutei stretti', imgKey: 'ohp' },
          { name: 'Cable Fly', sets: '3', reps: '15', rest: '60s', muscle: 'Petto', tip: 'Stretch massimo in apertura', imgKey: 'cable' },
        ]},
        { label: 'Pull Day', exercises: [
          { name: 'Trazioni pronazione', sets: '5', reps: '5', rest: '3min', muscle: 'Dorsali', tip: 'No kipping, range completo', imgKey: 'pullup' },
          { name: 'Rematore bilanciere', sets: '4', reps: '8', rest: '2min', muscle: 'Dorsali + Bicipiti', tip: 'Gomiti 45° dal corpo', imgKey: 'row' },
          { name: 'Face Pull cavi', sets: '4', reps: '15', rest: '60s', muscle: 'Cuffia rotatori', tip: 'Mai skippare!', imgKey: 'cable' },
        ]},
        { label: 'Leg Day', exercises: [
          { name: 'Squat bilanciere', sets: '5', reps: '5', rest: '3min', muscle: 'Gambe', tip: 'Cintura alta, sguardo fisso', imgKey: 'squat' },
          { name: 'Romanian Deadlift', sets: '4', reps: '10', rest: '90s', muscle: 'Femorali + Glutei', tip: 'Schiena piatta, tirare i bicipiti femorali', imgKey: 'deadlift' },
          { name: 'Leg Press', sets: '4', reps: '12', rest: '90s', muscle: 'Quadricipiti', tip: 'Piedi bassi per quads', imgKey: 'legpress' },
        ]},
      ],
      adv: [
        { label: 'Upper Forza', exercises: [
          { name: 'Panca piana 5×3 @82.5%', sets: '5', reps: '3', rest: '4min', muscle: 'Petto', tip: 'RPE 8, tecnica perfetta', imgKey: 'bench' },
          { name: 'Weighted Pull-up', sets: '4', reps: '6', rest: '3min', muscle: 'Dorsali', tip: '+peso con dip belt', imgKey: 'pullup' },
          { name: 'DB Row pesante', sets: '4', reps: '8', rest: '2min', muscle: 'Dorsali', tip: 'Bloccato sulla panca', imgKey: 'row' },
          { name: 'OHP 4×5', sets: '4', reps: '5', rest: '3min', muscle: 'Spalle', tip: 'Barra sfiora il naso in discesa', imgKey: 'ohp' },
        ]},
        { label: 'Lower Forza + Volume', exercises: [
          { name: 'Squat 1×1 @92% + 4×5 @77%', sets: '5', reps: 'vedi schema', rest: '4min', muscle: 'Gambe', tip: 'Top set poi back-off pesante', imgKey: 'squat' },
          { name: 'Deadlift 3×3 @85%', sets: '3', reps: '3', rest: '5min', muscle: 'Posteriore', tip: 'Scarica sui talloni', imgKey: 'deadlift' },
          { name: 'Hack Squat', sets: '4', reps: '10', rest: '2min', muscle: 'Quadricipiti', tip: 'Piedi bassi, range completo', imgKey: 'legpress' },
        ]},
      ],
    },
    'Forza': {
      base: [
        { label: 'Forza A (SL)', exercises: [
          { name: 'Squat bilanciere', sets: '3', reps: '5', rest: '3min', muscle: 'Gambe', tip: 'Tecnica PRIMA del peso', imgKey: 'squat' },
          { name: 'Panca piana bilanciere', sets: '3', reps: '5', rest: '3min', muscle: 'Petto', tip: 'Bilanciere sul palmo', imgKey: 'bench' },
          { name: 'Deadlift', sets: '1', reps: '5', rest: '5min', muscle: 'Posteriore', tip: '1 serie pesante al giorno A', imgKey: 'deadlift' },
        ]},
        { label: 'Forza B (SL)', exercises: [
          { name: 'Squat bilanciere', sets: '3', reps: '5', rest: '3min', muscle: 'Gambe', tip: '+2.5kg rispetto al giorno A', imgKey: 'squat' },
          { name: 'Overhead Press', sets: '3', reps: '5', rest: '3min', muscle: 'Spalle', tip: 'No arch, core attivo', imgKey: 'ohp' },
          { name: 'Rematore bilanciere', sets: '3', reps: '5', rest: '3min', muscle: 'Dorsali', tip: 'Schiena parallela', imgKey: 'row' },
        ]},
      ],
      mid: [
        { label: 'Squat Focus', exercises: [
          { name: 'Squat 5×3 @82.5%', sets: '5', reps: '3', rest: '4min', muscle: 'Gambe', tip: 'RPE 8 target', imgKey: 'squat' },
          { name: 'Leg Press 4×6', sets: '4', reps: '6', rest: '3min', muscle: 'Quadricipiti', tip: 'Supplemento forza gambe', imgKey: 'legpress' },
          { name: 'Romanian Deadlift', sets: '4', reps: '8', rest: '2min', muscle: 'Femorali', tip: 'Catena posteriore', imgKey: 'deadlift' },
        ]},
        { label: 'Panca + Stacco', exercises: [
          { name: 'Panca piana 5×3 @82.5%', sets: '5', reps: '3', rest: '4min', muscle: 'Petto', tip: 'Paused bench', imgKey: 'bench' },
          { name: 'Deadlift 3×3 @85%', sets: '3', reps: '3', rest: '5min', muscle: 'Posteriore', tip: 'Setup preciso', imgKey: 'deadlift' },
          { name: 'OHP 4×5', sets: '4', reps: '5', rest: '3min', muscle: 'Spalle', tip: 'Spalla supplementare', imgKey: 'ohp' },
        ]},
      ],
      adv: [
        { label: 'Heavy Squat', exercises: [
          { name: 'Squat 1×1 @95%', sets: '1', reps: '1 top set', rest: '6min', muscle: 'Gambe', tip: 'Riscaldamento preciso', imgKey: 'squat' },
          { name: 'Back-off 4×5 @80%', sets: '4', reps: '5', rest: '3min', muscle: 'Gambe', tip: 'Bar speed su ogni rep', imgKey: 'squat' },
          { name: 'Box Squat 5×3', sets: '5', reps: '3', rest: '2.5min', muscle: 'Gambe', tip: 'Accelerazione in buca', imgKey: 'squat' },
        ]},
        { label: 'Heavy Panca + Stacco', exercises: [
          { name: 'Panca 1×1 @95%', sets: '1', reps: '1 top set', rest: '6min', muscle: 'Petto', tip: 'Leg drive, arch controllato', imgKey: 'bench' },
          { name: 'Deficit DL 3×3 @80%', sets: '3', reps: '3', rest: '5min', muscle: 'Posteriore', tip: '+5cm deficit', imgKey: 'deadlift' },
          { name: 'Floor Press 4×5', sets: '4', reps: '5', rest: '3min', muscle: 'Petto', tip: 'Blocco fase bassa spinta', imgKey: 'bench' },
        ]},
      ],
    },
    'Resistenza': {
      base: [
        { label: 'Cardio + Core', exercises: [
          { name: 'Corsa lenta 25 min Z2', sets: '1', reps: '25 min', rest: '–', muscle: 'Cardiovascolare', tip: '130-145 bpm, parlare è ok', imgKey: 'run' },
          { name: 'Plank 3×30s', sets: '3', reps: '30s', rest: '30s', muscle: 'Core', tip: 'Respira normalmente', imgKey: 'plank' },
          { name: 'Affondi', sets: '3', reps: '16', rest: '45s', muscle: 'Gambe', tip: 'Postura dritta', imgKey: 'lunge' },
        ]},
        { label: 'Bike + Circuit', exercises: [
          { name: 'Bike @60% 30 min', sets: '1', reps: '30 min', rest: '–', muscle: 'Cardiovascolare', tip: 'Cadenza 80-90 rpm', imgKey: 'bike' },
          { name: 'Squat corpo libero', sets: '3', reps: '20', rest: '45s', muscle: 'Gambe', tip: 'Continuità di movimento', imgKey: 'squat' },
          { name: 'Push-up', sets: '3', reps: '12', rest: '45s', muscle: 'Petto', tip: 'Controllo discesa', imgKey: 'pushup' },
        ]},
      ],
      mid: [
        { label: 'Tempo Run + Pesi', exercises: [
          { name: 'Corsa soglia 5km Z3-4', sets: '1', reps: '5 km', rest: '–', muscle: 'Cardiovascolare', tip: 'Ritmo scomodo ma sostenibile', imgKey: 'run' },
          { name: 'Squat 4×20 @50%', sets: '4', reps: '20', rest: '90s', muscle: 'Gambe', tip: 'Respira ogni 5 reps', imgKey: 'squat' },
          { name: 'Affondi camminati', sets: '4', reps: '16', rest: '60s', muscle: 'Gambe', tip: 'Passo lungo e controllato', imgKey: 'lunge' },
        ]},
        { label: 'Bike HIIT + Core', exercises: [
          { name: 'Bike 4×8min @85%', sets: '4', reps: '8 min', rest: '3min', muscle: 'Cardiovascolare', tip: 'Watt costanti', imgKey: 'bike' },
          { name: 'Plank varianti 4×45s', sets: '4', reps: '45s', rest: '15s', muscle: 'Core', tip: 'Laterale, frontale, pike', imgKey: 'plank' },
        ]},
      ],
      adv: [
        { label: 'Long Run Progressivo', exercises: [
          { name: '12km: 6Z2 + 4Z4 + 2Z2', sets: '1', reps: '12 km', rest: '–', muscle: 'Cardiovascolare', tip: 'Negative split ultimi 4 km', imgKey: 'run' },
          { name: 'Core + Mobilità 15 min', sets: '1', reps: '15 min', rest: '–', muscle: 'Core + Flessibilità', tip: 'Chiudi sempre la sessione', imgKey: 'stretch' },
        ]},
        { label: 'VO2max Intervals', exercises: [
          { name: '5×1000m @5K pace', sets: '5', reps: '1000m', rest: '90s', muscle: 'Cardiovascolare', tip: 'RPE 9 su ogni ripetuta', imgKey: 'run' },
          { name: 'Kettlebell Swing 4×25', sets: '4', reps: '25', rest: '45s', muscle: 'Posteriore + Cardio', tip: 'Potenza esplosiva', imgKey: 'kettlebell' },
        ]},
      ],
    },
    'Definizione': {
      base: [
        { label: 'Upper Toning', exercises: [
          { name: 'Push-up varianti', sets: '4', reps: '12', rest: '45s', muscle: 'Petto + Tricipiti', tip: 'Largo, stretto, diamante', imgKey: 'pushup' },
          { name: 'Rematore con manubri', sets: '4', reps: '12', rest: '45s', muscle: 'Dorsali', tip: 'Gomiti vicini al corpo', imgKey: 'row' },
          { name: 'Alzate laterali', sets: '3', reps: '15', rest: '45s', muscle: 'Spalle', tip: 'Leggero, forma prima del carico', imgKey: 'ohp' },
          { name: 'Plank 3×40s', sets: '3', reps: '40s', rest: '30s', muscle: 'Core', tip: 'Respira regolarmente', imgKey: 'plank' },
        ]},
        { label: 'Lower Toning + Cardio', exercises: [
          { name: 'Sumo squat', sets: '4', reps: '20', rest: '45s', muscle: 'Glutei + Gambe', tip: 'Punte a 45°', imgKey: 'squat' },
          { name: 'Affondi camminati', sets: '4', reps: '16', rest: '45s', muscle: 'Quadricipiti + Glutei', tip: 'Busto dritto', imgKey: 'lunge' },
          { name: 'Corsa 20 min Z2-3', sets: '1', reps: '20 min', rest: '–', muscle: 'Cardio', tip: 'Fine seduta per bruciare glicogeno', imgKey: 'run' },
        ]},
      ],
      mid: [
        { label: 'Superset Full Body', exercises: [
          { name: 'Squat + Shoulder Press', sets: '4', reps: '12+10', rest: '45s', muscle: 'Full body', tip: 'Superset senza pausa tra i due', imgKey: 'squat' },
          { name: 'RDL + Curl manubri', sets: '4', reps: '12+12', rest: '45s', muscle: 'Posteriore + Bicipiti', tip: 'Catena posteriore totale', imgKey: 'deadlift' },
          { name: 'Push-up + Rematore', sets: '4', reps: '12+12', rest: '45s', muscle: 'Petto + Dorsali', tip: 'Antagonisti — si recuperano a vicenda', imgKey: 'pushup' },
          { name: 'HIIT 15 min finale', sets: '1', reps: '15 min', rest: '–', muscle: 'Cardio', tip: '30s on / 15s off', imgKey: 'hiit' },
        ]},
      ],
      adv: [
        { label: 'Giant Set × 4 round', exercises: [
          { name: 'Squat + Affondi + Step-up', sets: '4', reps: '10+10+10', rest: '90s', muscle: 'Gambe (giant set)', tip: 'Completa i 3 esercizi poi riposa', imgKey: 'squat' },
          { name: 'Pull-up + Row + Face Pull', sets: '4', reps: '8+10+15', rest: '90s', muscle: 'Schiena (giant set)', tip: 'Schiena completa in 3 angoli', imgKey: 'pullup' },
          { name: 'Panca + Dip + Cable Fly', sets: '4', reps: '8+10+15', rest: '90s', muscle: 'Petto (giant set)', tip: 'Forza → potenza → isolamento', imgKey: 'bench' },
          { name: 'HIIT 10 min finale', sets: '1', reps: '10 min', rest: '–', muscle: 'Cardio finisher', tip: '40s max / 20s rest', imgKey: 'hiit' },
        ]},
      ],
    },
    'Mobilità': {
      base: [
        { label: 'Mobilità Globale', exercises: [
          { name: 'World Greatest Stretch', sets: '3', reps: '5 per lato', rest: '–', muscle: 'Full body mobilità', tip: 'Il re degli esercizi di mobilità', imgKey: 'stretch' },
          { name: 'Squat profondo passivo', sets: '3', reps: '60s', rest: '30s', muscle: 'Anca + Caviglie', tip: 'Talloni a terra, gambe larghe', imgKey: 'squat' },
          { name: 'Hip 90/90', sets: '3', reps: '45s per lato', rest: '–', muscle: 'Anca', tip: 'Ruota interna ed esterna', imgKey: 'yoga' },
          { name: 'Rotazione toracica', sets: '3', reps: '10 per lato', rest: '–', muscle: 'Colonna', tip: 'Sblocca la torace', imgKey: 'stretch' },
        ]},
      ],
      mid: [
        { label: 'Daily Mobility Flow', exercises: [
          { name: 'Cossack Squat', sets: '4', reps: '8 per lato', rest: '30s', muscle: 'Anca laterale', tip: 'Mobilità anca in laterale', imgKey: 'squat' },
          { name: 'Shoulder CARs', sets: '3', reps: '5 per lato', rest: '–', muscle: 'Spalla', tip: 'Controlled Articular Rotation', imgKey: 'ohp' },
          { name: 'Jefferson Curl', sets: '3', reps: '8 lenti', rest: '30s', muscle: 'Colonna', tip: 'Vertebra per vertebra — leggero!', imgKey: 'stretch' },
          { name: 'Pigeon Pose 2×60s', sets: '2', reps: '60s per lato', rest: '–', muscle: 'Anca posteriore', tip: 'Rilassa completamente il peso', imgKey: 'yoga' },
        ]},
      ],
      adv: [
        { label: 'FRC Avanzato', exercises: [
          { name: 'PAILS/RAILS anca', sets: '3', reps: '20s contrazione', rest: '60s', muscle: 'Anca', tip: 'Neuromuscular stretching avanzato', imgKey: 'yoga' },
          { name: 'Pistol Squat progression', sets: '5', reps: '5 per gamba', rest: '60s', muscle: 'Gambe + Anca', tip: 'Forza + mobilità unilaterale', imgKey: 'squat' },
          { name: 'Bridge + Shoulder stand', sets: '4', reps: '30s', rest: '30s', muscle: 'Catena posteriore', tip: 'Completo', imgKey: 'stretch' },
        ]},
      ],
    },
  };

  const lvlKey = lvl === 'base' ? 'base' : lvl === 'mid' ? 'mid' : 'adv';
  const sessions = sessionMap[p.goal]?.[lvlKey] ?? sessionMap['Perdere peso']['base'];

  /* Periodization — 4 mesocycles */
  const mesoNames = ['Fondamenta', 'Sviluppo', 'Picco', 'Consolidamento'];
  const mesoMonths = [
    'Gen – Mar', 'Apr – Giu', 'Lug – Set', 'Ott – Dic',
  ];
  const mesoRPE = ['6-7', '7-8', '8-9', '6-7'];
  const mesoGoal = [
    'Costruire abitudini e tecnica di base',
    'Aumentare il volume e l\'intensità progressivamente',
    'Spingere al massimo — risultati visibili',
    'Mantenere i risultati e recuperare per il ciclo successivo',
  ];
  const mesoFocus = [
    `Tecnica, frequenza, adattamento — ${freq} gg/settimana`,
    `Volume progressivo, carichi crescenti ogni settimana`,
    `Intensità massima, deload ogni 4ª settimana`,
    `Volume ridotto −30%, recupero attivo, rifinitura`,
  ];

  const mesocycles: Mesocycle[] = mesoNames.map((name, i) => ({
    months: mesoMonths[i],
    name,
    focus: mesoFocus[i],
    rpe: mesoRPE[i],
    goal: mesoGoal[i],
    sessions: i < 3 ? sessions : sessions.slice(0, 1),
  }));

  const lvlLabel = lvl === 'base' ? 'Principiante' : lvl === 'mid' ? 'Intermedio' : 'Avanzato';

  return {
    title: `Piano Annuale — ${p.goal}`,
    summary: `${p.name}, ${p.age} anni · ${lvlLabel} · ${p.days} gg/settimana`,
    weeklyStructure: structure[lvl],
    mesocycles,
  };
}

/* ─── Wizard questions ───────────────────────────────────── */
const GOALS: Goal[] = ['Perdere peso', 'Aumentare massa', 'Resistenza', 'Definizione', 'Forza', 'Mobilità'];
const GOAL_EMOJI: Record<Goal, string> = {
  'Perdere peso': '🔥', 'Aumentare massa': '💪', 'Resistenza': '🏃',
  'Definizione': '⚡', 'Forza': '🏋️', 'Mobilità': '🧘',
};

/* ─── Main component ─────────────────────────────────────── */
export default function PersonalTrainerAIPage() {
  const [step, setStep] = useState<Step>('name');
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [plan, setPlan] = useState<AnnualPlan | null>(null);
  const [activeMeso, setActiveMeso] = useState(0);
  const [activeSession, setActiveSession] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [step]);

  const next = (update: Partial<UserProfile>) => {
    const updated = { ...profile, ...update };
    setProfile(updated);
    const order: Step[] = ['name', 'age', 'years', 'goal', 'days', 'generating', 'plan'];
    const cur = order.indexOf(step);
    const nextStep = order[cur + 1];
    if (nextStep === 'generating') {
      setStep('generating');
      setTimeout(() => {
        const p = updated as UserProfile;
        setPlan(buildPlan(p));
        setStep('plan');
      }, 2800);
    } else {
      setStep(nextStep);
    }
  };

  const reset = () => {
    setStep('name'); setProfile({}); setPlan(null);
    setActiveMeso(0); setActiveSession(0);
    setNameInput(''); setAgeInput('');
  };

  /* ── Colors for mesocycle ── */
  const mesoColors = [COLORS.info, COLORS.primary, '#a855f7', COLORS.success];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #0e0606 0%, #200808 100%)`,
        padding: '60px 20px 18px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%', background: COLORS.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
            boxShadow: `0 0 24px ${COLORS.primary}50`,
          }}>🤖</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: COLORS.text, fontSize: '19px', fontWeight: 800 }}>ALEX — Personal Trainer AI</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: 600 }}>Online · Analisi AI attiva</span>
            </div>
          </div>
          {step === 'plan' && (
            <button onClick={reset} style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: '10px', padding: '6px 12px',
              color: COLORS.muted, fontSize: '12px', cursor: 'pointer',
            }}>🔄 Nuovo</button>
          )}
        </div>

        {/* Progress steps */}
        {step !== 'plan' && step !== 'generating' && (
          <div style={{ display: 'flex', gap: '4px', marginTop: '16px' }}>
            {(['name','age','years','goal','days'] as Step[]).map((s, i) => {
              const done = ['name','age','years','goal','days'].indexOf(step) > i;
              const cur  = step === s;
              return (
                <div key={s} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: done ? COLORS.primary : cur ? `${COLORS.primary}70` : COLORS.border,
                  transition: 'background 0.3s',
                }} />
              );
            })}
          </div>
        )}
      </div>

      <div style={{ padding: '20px 16px' }}>

        {/* ── STEP: name ── */}
        {step === 'name' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AIBubble>Ciao! Sono Alex, il tuo personal trainer AI 🤖{'\n\n'}Per creare il tuo piano annuale personalizzato ho bisogno di conoscerti un po'. Iniziamo dal nome — come ti chiami?</AIBubble>
            <input
              autoFocus
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && nameInput.trim() && next({ name: nameInput.trim() })}
              placeholder="Il tuo nome..."
              style={inputStyle}
            />
            <CTAButton onClick={() => nameInput.trim() && next({ name: nameInput.trim() })}>
              Avanti →
            </CTAButton>
          </div>
        )}

        {/* ── STEP: age ── */}
        {step === 'age' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AIBubble>Piacere {profile.name}! 👋{'\n\n'}Quanti anni hai? L\'età influenza la programmazione (recupero, volume, intensità).</AIBubble>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['16-20','21-25','26-30','31-35','36-40','41-50','51+'].map(range => (
                <ChipButton key={range} onClick={() => {
                  const mid = range === '51+' ? 55 : parseInt(range.split('-')[0]) + 2;
                  next({ age: mid });
                }}>{range} anni</ChipButton>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={ageInput}
                onChange={e => setAgeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && parseInt(ageInput) > 0 && next({ age: parseInt(ageInput) })}
                placeholder="oppure scrivi l'età esatta..."
                type="number"
                style={{ ...inputStyle, flex: 1 }}
              />
              <CTAButton onClick={() => parseInt(ageInput) > 0 && next({ age: parseInt(ageInput) })}>→</CTAButton>
            </div>
          </div>
        )}

        {/* ── STEP: years ── */}
        {step === 'years' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AIBubble>Da quanti anni ti alleni con costanza?{'\n\n'}Questo determina il volume, l\'intensità e la complessità degli esercizi nel tuo piano.</AIBubble>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: '🌱 Meno di 1 anno', sub: 'Principiante — costruiamo le fondamenta', val: 0 },
                { label: '📈 1–2 anni', sub: 'Fase di sviluppo rapido', val: 1 },
                { label: '💪 3–4 anni', sub: 'Intermedio — carichi e tecnica solidi', val: 3 },
                { label: '🏆 5+ anni', sub: 'Avanzato — programmazione specifica', val: 5 },
              ].map(({ label, sub, val }) => (
                <button key={val} onClick={() => next({ years: val })} style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: '14px', padding: '14px 16px', cursor: 'pointer',
                  textAlign: 'left',
                }}>
                  <p style={{ color: COLORS.text, fontWeight: 700, fontSize: '14px' }}>{label}</p>
                  <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '3px' }}>{sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP: goal ── */}
        {step === 'goal' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AIBubble>Ottimo! Qual è il tuo obiettivo principale per i prossimi 12 mesi?{'\n\n'}Scegli quello che ti rappresenta di più — costruirò tutto il piano attorno a questo.</AIBubble>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {GOALS.map(g => (
                <button key={g} onClick={() => next({ goal: g })} style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: '14px', padding: '16px 12px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ fontSize: '28px' }}>{GOAL_EMOJI[g]}</span>
                  <span style={{ color: COLORS.text, fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{g}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP: days ── */}
        {step === 'days' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AIBubble>Quanti giorni a settimana puoi allenarti?{'\n\n'}Sii onesto — è meglio un piano sostenibile che uno perfetto sulla carta ma impossibile da seguire.</AIBubble>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[2,3,4,5,6].map(d => (
                <button key={d} onClick={() => next({ days: d })} style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: '14px', padding: '16px 20px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                  <span style={{ color: COLORS.primary, fontWeight: 900, fontSize: '24px' }}>{d}</span>
                  <span style={{ color: COLORS.muted, fontSize: '11px' }}>gg/sett</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── GENERATING ── */}
        {step === 'generating' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '20px' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: COLORS.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px',
              boxShadow: `0 0 40px ${COLORS.primary}60`,
              animation: 'pulse 1.5s infinite',
            }}>🤖</div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: COLORS.text, fontWeight: 800, fontSize: '18px' }}>Alex sta analizzando...</p>
              <p style={{ color: COLORS.muted, fontSize: '13px', marginTop: '6px' }}>Costruendo il tuo piano annuale personalizzato</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              {['Analisi del profilo in corso...', 'Calcolo periodizzazione annuale...', 'Selezione esercizi ottimali...', 'Generazione piano completo...'].map((t, i) => (
                <div key={i} style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: '10px', padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  opacity: 1,
                  animation: `fadeIn 0.5s ${i * 0.5}s both`,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.primary, flexShrink: 0, animation: 'pulse 1s infinite' }} />
                  <span style={{ color: COLORS.textSec, fontSize: '13px' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PLAN ── */}
        {step === 'plan' && plan && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Hero */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.crimson}10)`,
              border: `1px solid ${COLORS.borderBright}`,
              borderRadius: '18px', padding: '18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px' }}>🤖</span>
                <div>
                  <p style={{ color: COLORS.text, fontWeight: 800, fontSize: '16px' }}>Piano Annuale Generato!</p>
                  <p style={{ color: COLORS.muted, fontSize: '12px' }}>{plan.summary}</p>
                </div>
              </div>
              <div style={{
                background: COLORS.dark, borderRadius: '12px', padding: '12px',
                display: 'flex', flexDirection: 'column', gap: '6px',
              }}>
                <InfoRow label="Struttura settimanale" value={plan.weeklyStructure} />
                <InfoRow label="Durata ciclo" value="12 mesi — 4 mesocicli × 3 mesi" />
                <InfoRow label="Obiettivo" value={(profile as UserProfile).goal} />
              </div>
            </div>

            {/* Mesocycle tabs */}
            <div>
              <p style={{ color: COLORS.muted, fontSize: '12px', fontWeight: 700, marginBottom: '10px', letterSpacing: '1px' }}>
                PERIODIZZAZIONE ANNUALE
              </p>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
                {plan.mesocycles.map((m, i) => (
                  <button key={i} onClick={() => { setActiveMeso(i); setActiveSession(0); }} style={{
                    background: activeMeso === i ? mesoColors[i] : COLORS.card,
                    border: `1px solid ${activeMeso === i ? mesoColors[i] : COLORS.border}`,
                    borderRadius: '12px', padding: '8px 14px', cursor: 'pointer',
                    color: activeMeso === i ? 'white' : COLORS.muted,
                    fontWeight: 700, fontSize: '12px', flexShrink: 0,
                    boxShadow: activeMeso === i ? `0 4px 12px ${mesoColors[i]}40` : 'none',
                  }}>
                    {i + 1}. {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active mesocycle detail */}
            {(() => {
              const meso = plan.mesocycles[activeMeso];
              const mc = mesoColors[activeMeso];
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    background: COLORS.card, border: `1px solid ${mc}40`,
                    borderRadius: '16px', overflow: 'hidden',
                  }}>
                    <div style={{
                      background: `linear-gradient(90deg, ${mc}25, transparent)`,
                      padding: '14px 16px', borderBottom: `1px solid ${COLORS.border}`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: mc, fontWeight: 800, fontSize: '15px' }}>Mesociclo {activeMeso + 1}: {meso.name}</span>
                        <span style={{
                          background: `${mc}20`, color: mc, fontSize: '11px',
                          fontWeight: 700, padding: '3px 10px', borderRadius: '8px',
                          border: `1px solid ${mc}40`,
                        }}>RPE {meso.rpe}</span>
                      </div>
                      <p style={{ color: COLORS.muted, fontSize: '12px', marginTop: '4px' }}>📅 {meso.months}</p>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <InfoRow label="Focus" value={meso.focus} />
                      <InfoRow label="Obiettivo" value={meso.goal} />
                    </div>
                  </div>

                  {/* Session tabs */}
                  {meso.sessions.length > 1 && (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {meso.sessions.map((s, i) => (
                        <button key={i} onClick={() => setActiveSession(i)} style={{
                          background: activeSession === i ? `${mc}25` : COLORS.card,
                          border: `1px solid ${activeSession === i ? mc : COLORS.border}`,
                          borderRadius: '10px', padding: '7px 14px', cursor: 'pointer',
                          color: activeSession === i ? mc : COLORS.muted,
                          fontWeight: 700, fontSize: '12px', flexShrink: 0,
                        }}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Exercises with images */}
                  {meso.sessions[activeSession]?.exercises.map((ex, ei) => (
                    <ExerciseCard key={ei} ex={ex} color={mc} />
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.97)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */
function AIBubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <div style={{
        width: 34, height: 34, borderRadius: '50%', background: COLORS.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
      }}>🤖</div>
      <div style={{
        background: COLORS.card, border: `1px solid ${COLORS.border}`,
        borderRadius: '18px 18px 18px 4px', padding: '12px 14px', flex: 1,
      }}>
        <p style={{ color: COLORS.text, fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{children}</p>
      </div>
    </div>
  );
}

function ChipButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: COLORS.card, border: `1px solid ${COLORS.borderBright}`,
      borderRadius: '20px', padding: '9px 16px',
      color: COLORS.text, fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    }}>{children}</button>
  );
}

function CTAButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: COLORS.gradient, border: 'none',
      borderRadius: '14px', padding: '14px',
      color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
      boxShadow: `0 4px 16px ${COLORS.primary}40`,
    }}>{children}</button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
      <span style={{ color: COLORS.muted, fontSize: '12px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: COLORS.text, fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function ExerciseCard({ ex, color }: { ex: Exercise; color: string }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: '16px', overflow: 'hidden',
    }}>
      {/* Exercise image */}
      {!imgError ? (
        <div style={{ position: 'relative', height: 160, background: COLORS.dark }}>
          <img
            src={IMG[ex.imgKey] ?? IMG['squat']}
            alt={ex.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(6,2,2,0.9))',
            padding: '20px 14px 10px',
          }}>
            <p style={{ color: 'white', fontWeight: 800, fontSize: '14px' }}>{ex.name}</p>
            <p style={{ color: `${color}`, fontSize: '11px', fontWeight: 600 }}>{ex.muscle}</p>
          </div>
        </div>
      ) : (
        <div style={{
          height: 80, background: `${color}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: `1px solid ${COLORS.border}`,
        }}>
          <p style={{ color: color, fontWeight: 800, fontSize: '15px' }}>{ex.name}</p>
        </div>
      )}
      {/* Stats */}
      <div style={{ padding: '12px 14px', display: 'flex', gap: '8px' }}>
        <StatPill label="Serie" value={ex.sets} color={color} />
        <StatPill label="Reps" value={ex.reps} color={color} />
        <StatPill label="Recupero" value={ex.rest} color={color} />
      </div>
      <div style={{
        margin: '0 14px 12px',
        background: COLORS.dark, borderRadius: '10px', padding: '10px 12px',
        display: 'flex', gap: '8px', alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
        <p style={{ color: COLORS.textSec, fontSize: '12px', lineHeight: 1.5 }}>{ex.tip}</p>
      </div>
    </div>
  );
}

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      flex: 1, background: COLORS.dark, borderRadius: '10px',
      padding: '8px 6px', textAlign: 'center',
      border: `1px solid ${COLORS.border}`,
    }}>
      <p style={{ color: color, fontWeight: 800, fontSize: '14px' }}>{value}</p>
      <p style={{ color: COLORS.muted, fontSize: '10px', marginTop: '2px' }}>{label}</p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: COLORS.card, border: `1px solid ${COLORS.border}`,
  borderRadius: '14px', padding: '14px 16px', color: COLORS.text,
  fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box',
};
