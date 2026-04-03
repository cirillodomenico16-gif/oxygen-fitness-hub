export interface Member {
  id: number;
  name: string;
  avatar: string;
  plan: 'Base' | 'Premium' | 'Elite';
  expiresIn: number; // days
  streak: number;
  level: number;
  xp: number;
  weight: number;
  goal: string;
  joinDate: string;
  checkins: number;
}

export const members: Member[] = [
  { id: 1, name: 'Alessandro M.', avatar: '👨‍💪', plan: 'Elite', expiresIn: 45, streak: 28, level: 12, xp: 4200, weight: 82, goal: 'Massa Muscolare', joinDate: '2024-01-15', checkins: 156 },
  { id: 2, name: 'Giulia R.', avatar: '👩‍💪', plan: 'Premium', expiresIn: 8, streak: 15, level: 8, xp: 2800, weight: 63, goal: 'Dimagrimento', joinDate: '2024-03-20', checkins: 98 },
  { id: 3, name: 'Matteo B.', avatar: '🧑‍💪', plan: 'Base', expiresIn: 3, streak: 5, level: 4, xp: 1200, weight: 90, goal: 'Tonificazione', joinDate: '2024-06-01', checkins: 42 },
  { id: 4, name: 'Federica L.', avatar: '👩', plan: 'Elite', expiresIn: 60, streak: 42, level: 15, xp: 6100, weight: 58, goal: 'Performance', joinDate: '2023-11-10', checkins: 210 },
  { id: 5, name: 'Simone V.', avatar: '👨', plan: 'Premium', expiresIn: 22, streak: 9, level: 6, xp: 1900, weight: 78, goal: 'Resistenza', joinDate: '2024-04-05', checkins: 67 },
  { id: 6, name: 'Chiara P.', avatar: '👩', plan: 'Base', expiresIn: 5, streak: 3, level: 3, xp: 850, weight: 70, goal: 'Benessere', joinDate: '2024-07-12', checkins: 28 },
  { id: 7, name: 'Lorenzo T.', avatar: '🧑', plan: 'Elite', expiresIn: 90, streak: 67, level: 20, xp: 8900, weight: 85, goal: 'Powerlifting', joinDate: '2023-08-01', checkins: 312 },
  { id: 8, name: 'Valeria M.', avatar: '👩', plan: 'Premium', expiresIn: 15, streak: 21, level: 10, xp: 3400, weight: 61, goal: 'Yoga & Flessibilità', joinDate: '2024-02-18', checkins: 134 },
];

export const kpiData = {
  activeSoci: 247,
  newThisMonth: 18,
  revenue: 12840,
  revenueGrowth: 8.2,
  retention: 87.4,
  avgCheckins: 3.2,
  expiringThisWeek: 12,
  waitlistCount: 34,
};

export const revenueMonths = [
  { m: 'Set', v: 9200 }, { m: 'Ott', v: 10100 }, { m: 'Nov', v: 11400 },
  { m: 'Dic', v: 10800 }, { m: 'Gen', v: 11900 }, { m: 'Feb', v: 12200 },
  { m: 'Mar', v: 12840 },
];
