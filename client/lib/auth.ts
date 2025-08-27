// Authentication utilities for localStorage management

export interface User {
  username: string;
  password: string;
}

export interface SessionUser {
  username: string;
}

const USERS_KEY = "sagar_hardware_users";
const SESSION_KEY = "sagar_hardware_session";
const ADMIN_SESSION_KEY = "sagar_hardware_admin_session";

// Admin credentials - In production, these should be environment variables
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "SagarAdmin2025!",
};

/**
 * Get all registered users from localStorage
 */
export function getStoredUsers(): User[] {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
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
    console.error("Error storing users to localStorage:", error);
  }
}

/**
 * Check if username already exists
 */
export function userExists(username: string): boolean {
  const users = getStoredUsers();
  return users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );
}

/**
 * Register a new user
 */
export function registerUser(
  username: string,
  password: string,
): { success: boolean; message: string } {
  if (!username.trim()) {
    return { success: false, message: "Username is required" };
  }

  if (!password.trim()) {
    return { success: false, message: "Password is required" };
  }

  if (userExists(username)) {
    return { success: false, message: "Username already exists" };
  }

  const users = getStoredUsers();
  users.push({ username: username.trim(), password });
  storeUsers(users);

  return { success: true, message: "User registered successfully" };
}

/**
 * Authenticate user credentials
 */
export function authenticateUser(
  username: string,
  password: string,
): { success: boolean; message: string } {
  if (!username.trim() || !password.trim()) {
    return { success: false, message: "Username and password are required" };
  }

  const users = getStoredUsers();
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password,
  );

  if (user) {
    return { success: true, message: "Authentication successful" };
  } else {
    return { success: false, message: "Invalid username or password" };
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
    console.error("Error reading session from localStorage:", error);
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
    console.error("Error storing session to localStorage:", error);
  }
}

/**
 * Clear current session
 */
export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Error clearing session from localStorage:", error);
  }
}

/**
 * Check if user is currently logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Update user password
 */
export function updateUserPassword(
  username: string,
  newPassword: string,
): { success: boolean; message: string } {
  if (!username.trim() || !newPassword.trim()) {
    return {
      success: false,
      message: "Username and new password are required",
    };
  }

  const users = getStoredUsers();
  const userIndex = users.findIndex(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );

  if (userIndex === -1) {
    return { success: false, message: "User not found" };
  }

  users[userIndex].password = newPassword;
  storeUsers(users);

  return { success: true, message: "Password updated successfully" };
}

/**
 * Update username
 */
export function updateUsername(
  oldUsername: string,
  newUsername: string,
): { success: boolean; message: string } {
  if (!oldUsername.trim() || !newUsername.trim()) {
    return {
      success: false,
      message: "Both old and new usernames are required",
    };
  }

  if (oldUsername.toLowerCase() === newUsername.toLowerCase()) {
    return { success: false, message: "New username must be different" };
  }

  if (userExists(newUsername)) {
    return { success: false, message: "New username already exists" };
  }

  const users = getStoredUsers();
  const userIndex = users.findIndex(
    (u) => u.username.toLowerCase() === oldUsername.toLowerCase(),
  );

  if (userIndex === -1) {
    return { success: false, message: "User not found" };
  }

  users[userIndex].username = newUsername.trim();
  storeUsers(users);

  // Update session if it's the current user
  const currentUser = getCurrentUser();
  if (
    currentUser &&
    currentUser.username.toLowerCase() === oldUsername.toLowerCase()
  ) {
    setCurrentUser({ username: newUsername.trim() });
  }

  return { success: true, message: "Username updated successfully" };
}

/**
 * Delete user account
 */
export function deleteUser(username: string): {
  success: boolean;
  message: string;
} {
  if (!username.trim()) {
    return { success: false, message: "Username is required" };
  }

  const users = getStoredUsers();
  const userIndex = users.findIndex(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );

  if (userIndex === -1) {
    return { success: false, message: "User not found" };
  }

  users.splice(userIndex, 1);
  storeUsers(users);

  // Clear session if it's the current user being deleted
  const currentUser = getCurrentUser();
  if (
    currentUser &&
    currentUser.username.toLowerCase() === username.toLowerCase()
  ) {
    clearCurrentUser();
  }

  return { success: true, message: "User account deleted successfully" };
}

/**
 * Get all users (for admin purposes - without passwords)
 */
export function getAllUsers(): { username: string }[] {
  const users = getStoredUsers();
  return users.map((user) => ({ username: user.username }));
}

/**
 * Authenticate admin credentials
 */
export function authenticateAdmin(username: string, password: string): { success: boolean; message: string } {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return { success: true, message: "Admin authentication successful" };
  }
  return { success: false, message: "Invalid admin credentials" };
}

/**
 * Set admin session
 */
export function setAdminSession(): void {
  try {
    const adminSession = {
      isAdmin: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));
  } catch (error) {
    console.error("Error storing admin session:", error);
  }
}

/**
 * Clear admin session
 */
export function clearAdminSession(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (error) {
    console.error("Error clearing admin session:", error);
  }
}

/**
 * Check if current user is admin
 */
export function isAdmin(): boolean {
  try {
    const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!adminSession) return false;

    const session = JSON.parse(adminSession);
    // Admin session expires after 24 hours for security
    const sessionAge = Date.now() - session.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (sessionAge > maxAge) {
      clearAdminSession();
      return false;
    }

    return session.isAdmin === true;
  } catch (error) {
    console.error("Error checking admin session:", error);
    return false;
  }
}

/**
 * Logout all sessions (user and admin)
 */
export function logoutAll(): void {
  clearCurrentUser();
  clearAdminSession();
}
