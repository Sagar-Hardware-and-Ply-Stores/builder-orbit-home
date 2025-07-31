// Authentication utilities for localStorage management

export interface User {
  username: string;
  password: string;
}

export interface SessionUser {
  username: string;
}

const USERS_KEY = 'sagar_hardware_users';
const SESSION_KEY = 'sagar_hardware_session';

/**
 * Get all registered users from localStorage
 */
export function getStoredUsers(): User[] {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
}

/**
 * Store users array to localStorage
 */
export function storeUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error storing users to localStorage:', error);
  }
}

/**
 * Check if username already exists
 */
export function userExists(username: string): boolean {
  const users = getStoredUsers();
  return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

/**
 * Register a new user
 */
export function registerUser(username: string, password: string): { success: boolean; message: string } {
  if (!username.trim()) {
    return { success: false, message: 'Username is required' };
  }
  
  if (!password.trim()) {
    return { success: false, message: 'Password is required' };
  }

  if (userExists(username)) {
    return { success: false, message: 'Username already exists' };
  }

  const users = getStoredUsers();
  users.push({ username: username.trim(), password });
  storeUsers(users);
  
  return { success: true, message: 'User registered successfully' };
}

/**
 * Authenticate user credentials
 */
export function authenticateUser(username: string, password: string): { success: boolean; message: string } {
  if (!username.trim() || !password.trim()) {
    return { success: false, message: 'Username and password are required' };
  }

  const users = getStoredUsers();
  const user = users.find(u => 
    u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );

  if (user) {
    return { success: true, message: 'Authentication successful' };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

/**
 * Get current session user
 */
export function getCurrentUser(): SessionUser | null {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error reading session from localStorage:', error);
    return null;
  }
}

/**
 * Set current session user
 */
export function setCurrentUser(user: SessionUser): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing session to localStorage:', error);
  }
}

/**
 * Clear current session
 */
export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session from localStorage:', error);
  }
}

/**
 * Check if user is currently logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
