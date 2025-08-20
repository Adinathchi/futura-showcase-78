import bcrypt from 'bcryptjs';

const ADMIN_PASSWORD = 'adinath2005';
const SESSION_KEY = 'admin_session';

export interface AdminSession {
  isAuthenticated: boolean;
  timestamp: number;
}

// Hash the password for comparison
const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);

export const authenticateAdmin = (password: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const createSession = (): AdminSession => {
  const session: AdminSession = {
    isAuthenticated: true,
    timestamp: Date.now()
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const getSession = (): AdminSession | null => {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;
    
    const session: AdminSession = JSON.parse(sessionData);
    
    // Check if session is expired (24 hours)
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    if (Date.now() - session.timestamp > TWENTY_FOUR_HOURS) {
      clearSession();
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  const session = getSession();
  return session?.isAuthenticated ?? false;
};