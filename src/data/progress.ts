// Member progress: weight history, measurements, workout stats
// Shared by user ProgressPage + admin agents to ground AI in real data

export interface ProgressSnapshot {
  date: string; // YYYY-MM-DD
  weight: number; // kg
  bodyFat?: number; // %
  measurements?: {
    vita?: number;
    petto?: number;
    braccia?: number;
    gambe?: number;
    spalle?: number;
  };
  note?: string;
}

export interface MemberProgress {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  monthlyWorkouts: number;
  totalWorkouts: number;
  kgLifted: number;
  snapshots: ProgressSnapshot[];
}

export const PROGRESS: Record<string, MemberProgress> = {
  '1': {
    startWeight: 86.2, currentWeight: 82.1, targetWeight: 78.0,
    monthlyWorkouts: 18, totalWorkouts: 64, kgLifted: 12400,
    snapshots: [
      { date: '2025-11-01', weight: 86.2, bodyFat: 22, measurements: { vita: 92, petto: 102, braccia: 34, gambe: 58, spalle: 118 }, note: 'Inizio percorso' },
      { date: '2025-12-01', weight: 85.0, bodyFat: 21, measurements: { vita: 90, petto: 103, braccia: 35, gambe: 58, spalle: 119 } },
      { date: '2026-01-01', weight: 83.8, bodyFat: 20, measurements: { vita: 88, petto: 104, braccia: 35, gambe: 59, spalle: 120 } },
      { date: '2026-02-01', weight: 83.0, bodyFat: 19, measurements: { vita: 87, petto: 104, braccia: 36, gambe: 59, spalle: 121 }, note: 'Buona progressione su panca' },
      { date: '2026-03-01', weight: 82.5, bodyFat: 18, measurements: { vita: 86, petto: 105, braccia: 36, gambe: 60, spalle: 122 } },
      { date: '2026-04-01', weight: 82.1, bodyFat: 17, measurements: { vita: 85, petto: 105, braccia: 37, gambe: 60, spalle: 123 }, note: 'Plateau su squat, da rivedere' },
    ],
  },
  '2': {
    startWeight: 58.0, currentWeight: 56.2, targetWeight: 55.0,
    monthlyWorkouts: 14, totalWorkouts: 42, kgLifted: 6800,
    snapshots: [
      { date: '2026-01-15', weight: 58.0, bodyFat: 26, measurements: { vita: 72, gambe: 52 }, note: 'Iscrizione iniziale' },
      { date: '2026-02-15', weight: 57.3, bodyFat: 25 },
      { date: '2026-03-15', weight: 56.8, bodyFat: 24, measurements: { vita: 70, gambe: 52 } },
      { date: '2026-04-01', weight: 56.2, bodyFat: 23, note: 'Ottima costanza' },
    ],
  },
  '3': {
    startWeight: 95.0, currentWeight: 88.4, targetWeight: 82.0,
    monthlyWorkouts: 20, totalWorkouts: 102, kgLifted: 28500,
    snapshots: [
      { date: '2025-07-01', weight: 95.0, bodyFat: 28, measurements: { vita: 106, petto: 112, braccia: 38 }, note: 'Obiettivo dimagrimento' },
      { date: '2025-10-01', weight: 92.1, bodyFat: 25, measurements: { vita: 100, petto: 110, braccia: 39 } },
      { date: '2026-01-01', weight: 90.0, bodyFat: 23, measurements: { vita: 97, petto: 109, braccia: 40 } },
      { date: '2026-04-01', weight: 88.4, bodyFat: 21, measurements: { vita: 94, petto: 108, braccia: 40 }, note: 'Forza aumentata, bene panca e stacco' },
    ],
  },
  '4': {
    startWeight: 62.0, currentWeight: 60.5, targetWeight: 60.0,
    monthlyWorkouts: 16, totalWorkouts: 58, kgLifted: 9200,
    snapshots: [
      { date: '2025-10-01', weight: 62.0, bodyFat: 24, note: 'Mantenimento + tonificazione' },
      { date: '2026-01-01', weight: 61.2, bodyFat: 22 },
      { date: '2026-04-01', weight: 60.5, bodyFat: 21, measurements: { vita: 68, gambe: 55, spalle: 102 } },
    ],
  },
  '5': {
    startWeight: 102.0, currentWeight: 98.0, targetWeight: 88.0,
    monthlyWorkouts: 6, totalWorkouts: 24, kgLifted: 4100,
    snapshots: [
      { date: '2025-06-01', weight: 102.0, bodyFat: 32, note: 'Iscrizione iniziale - sovrappeso' },
      { date: '2025-09-01', weight: 100.5, bodyFat: 30 },
      { date: '2026-04-01', weight: 98.0, bodyFat: 29, note: 'Costanza bassa, da riattivare' },
    ],
  },
  '6': {
    startWeight: 65.0, currentWeight: 63.0, targetWeight: 62.0,
    monthlyWorkouts: 12, totalWorkouts: 36, kgLifted: 5500,
    snapshots: [
      { date: '2026-01-01', weight: 65.0, bodyFat: 25 },
      { date: '2026-02-01', weight: 64.3, bodyFat: 24 },
      { date: '2026-03-01', weight: 63.6, bodyFat: 23, measurements: { vita: 71 } },
      { date: '2026-04-01', weight: 63.0, bodyFat: 22 },
    ],
  },
};

export const getProgressSummary = (memberId: string): string => {
  const p = PROGRESS[memberId];
  if (!p) return 'Nessun dato di progresso disponibile.';
  const trend = p.currentWeight - p.startWeight;
  const trendStr = trend < 0 ? `${trend.toFixed(1)}kg` : `+${trend.toFixed(1)}kg`;
  const lastSnap = p.snapshots[p.snapshots.length - 1];
  return `Peso iniziale: ${p.startWeight}kg → attuale: ${p.currentWeight}kg (${trendStr}) · Obiettivo: ${p.targetWeight}kg
Allenamenti totali: ${p.totalWorkouts} · Ultimo mese: ${p.monthlyWorkouts} · Kg sollevati (cumulativi): ${p.kgLifted}
Body fat: ${p.snapshots[0].bodyFat}% → ${lastSnap.bodyFat}%
Storico misurazioni (ultime):
${p.snapshots.slice(-4).map(s => ` ${s.date}: ${s.weight}kg${s.bodyFat ? `, BF ${s.bodyFat}%` : ''}${s.measurements?.vita ? `, vita ${s.measurements.vita}cm` : ''}${s.note ? ` — ${s.note}` : ''}`).join('\n')}`;
};
