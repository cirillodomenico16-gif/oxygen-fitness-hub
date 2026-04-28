export interface Member {
  id: string;
  name: string;
  age: number;
  plan: string;
  status: 'ATTIVO' | 'SCADUTO';
  avatar: string;
  joined: string;
  phone: string;
  email: string;
}

export const MEMBERS: Member[] = [
  { id: '1', name: 'Marco Rossi', age: 28, plan: 'Annuale', status: 'ATTIVO', joined: '12/01/2024', phone: '+39 333 1234567', email: 'marco.rossi@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format&q=75' },
  { id: '2', name: 'Anna Siciliano',age: 24, plan: 'Mensile', status: 'ATTIVO', joined: '03/03/2024', phone: '+39 340 7654321', email: 'anna.sic@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&auto=format&q=75' },
  { id: '3', name: 'Luigi Bianchi', age: 35, plan: 'Semestrale', status: 'ATTIVO', joined: '21/11/2023', phone: '+39 347 9988776', email: 'luigi.b@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format&q=75' },
  { id: '4', name: 'Giulia Turco', age: 30, plan: 'Annuale', status: 'ATTIVO', joined: '02/06/2024', phone: '+39 320 1122334', email: 'giulia.t@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format&q=75' },
  { id: '5', name: 'Davide Parisi', age: 41, plan: 'Mensile', status: 'SCADUTO', joined: '10/09/2023', phone: '+39 338 4455667', email: 'davide.p@email.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&auto=format&q=75' },
  { id: '6', name: 'Sara Longo', age: 26, plan: 'Trimestrale', status: 'ATTIVO', joined: '15/02/2024', phone: '+39 345 6677889', email: 'sara.longo@email.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&auto=format&q=75' },
];
