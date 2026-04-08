export type Role = 'user' | 'admin';
export interface AuthUser {
  email: string;
  name: string;
  role: Role;
}

const KEY = 'oxygen_auth';

export const CREDENTIALS: { email: string; password: string; user: AuthUser }[] = [
  {
    email: 'marco@oxygen.com',
    password: 'user123',
    user: { email: 'marco@oxygen.com', name: 'Marco Rossi', role: 'user' },
  },
  {
    email: 'admin@oxygen.com',
    password: 'admin123',
    user: { email: 'admin@oxygen.com', name: 'Admin Oxygen', role: 'admin' },
  },
];

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function login(email: string, password: string): AuthUser | null {
  const match = CREDENTIALS.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (!match) return null;
  localStorage.setItem(KEY, JSON.stringify(match.user));
  return match.user;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}
