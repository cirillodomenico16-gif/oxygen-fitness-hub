export interface Course {
  id: number;
  name: string;
  instructor: string;
  time: string;
  duration: string;
  day: string;
  spots: number;
  bookedSpots: number;
  category: 'Cardio' | 'Forza' | 'Yoga' | 'HIIT' | 'Pilates' | 'Boxe';
  level: 'Principiante' | 'Intermedio' | 'Avanzato';
  emoji: string;
}

export const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export const courses: Course[] = [
  { id: 1, name: 'HIIT Totale', instructor: 'Marco Ricci', time: '07:00', duration: '45 min', day: 'Lun', spots: 15, bookedSpots: 12, category: 'HIIT', level: 'Intermedio', emoji: '🔥' },
  { id: 2, name: 'Yoga Mattutino', instructor: 'Sofia Bianchi', time: '09:00', duration: '60 min', day: 'Lun', spots: 12, bookedSpots: 8, category: 'Yoga', level: 'Principiante', emoji: '🧘' },
  { id: 3, name: 'Boxe Fitness', instructor: 'Luca Ferrari', time: '18:00', duration: '50 min', day: 'Lun', spots: 10, bookedSpots: 10, category: 'Boxe', level: 'Intermedio', emoji: '🥊' },
  { id: 4, name: 'Pilates Core', instructor: 'Elena Russo', time: '10:00', duration: '55 min', day: 'Mar', spots: 10, bookedSpots: 6, category: 'Pilates', level: 'Principiante', emoji: '⚖️' },
  { id: 5, name: 'Spinning Pro', instructor: 'Marco Ricci', time: '07:30', duration: '45 min', day: 'Mar', spots: 20, bookedSpots: 18, category: 'Cardio', level: 'Avanzato', emoji: '🚴' },
  { id: 6, name: 'Power Training', instructor: 'Andrea Costa', time: '19:00', duration: '60 min', day: 'Mar', spots: 12, bookedSpots: 9, category: 'Forza', level: 'Avanzato', emoji: '💪' },
  { id: 7, name: 'HIIT Express', instructor: 'Luca Ferrari', time: '12:30', duration: '30 min', day: 'Mer', spots: 15, bookedSpots: 11, category: 'HIIT', level: 'Intermedio', emoji: '⚡' },
  { id: 8, name: 'Yoga Flow', instructor: 'Sofia Bianchi', time: '18:30', duration: '60 min', day: 'Mer', spots: 12, bookedSpots: 5, category: 'Yoga', level: 'Principiante', emoji: '🌿' },
  { id: 9, name: 'Cardio Dance', instructor: 'Elena Russo', time: '20:00', duration: '45 min', day: 'Mer', spots: 20, bookedSpots: 14, category: 'Cardio', level: 'Principiante', emoji: '💃' },
  { id: 10, name: 'Forza Funzionale', instructor: 'Andrea Costa', time: '07:00', duration: '60 min', day: 'Gio', spots: 12, bookedSpots: 10, category: 'Forza', level: 'Intermedio', emoji: '🏋️' },
  { id: 11, name: 'Pilates Avanzato', instructor: 'Sofia Bianchi', time: '09:30', duration: '55 min', day: 'Gio', spots: 8, bookedSpots: 7, category: 'Pilates', level: 'Avanzato', emoji: '🎯' },
  { id: 12, name: 'Boxe Avanzata', instructor: 'Luca Ferrari', time: '19:30', duration: '60 min', day: 'Gio', spots: 10, bookedSpots: 8, category: 'Boxe', level: 'Avanzato', emoji: '🥊' },
  { id: 13, name: 'HIIT Weekend', instructor: 'Marco Ricci', time: '09:00', duration: '50 min', day: 'Sab', spots: 20, bookedSpots: 16, category: 'HIIT', level: 'Intermedio', emoji: '🔥' },
  { id: 14, name: 'Yoga Ristorativo', instructor: 'Sofia Bianchi', time: '11:00', duration: '75 min', day: 'Sab', spots: 15, bookedSpots: 9, category: 'Yoga', level: 'Principiante', emoji: '🧘' },
  { id: 15, name: 'Full Body Sunday', instructor: 'Andrea Costa', time: '10:00', duration: '60 min', day: 'Dom', spots: 15, bookedSpots: 12, category: 'Forza', level: 'Intermedio', emoji: '💥' },
];
