/* eslint-disable @typescript-eslint/no-unused-vars -- Setters and imports are reserved for exam TODOs. */
import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'user_auth_token';
const USER_KEY = 'user_auth_data';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = useCallback(async (userData: User) => {
    const accessToken = `mock-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      // TODO EXAM: Save the access token with SecureStore.setItemAsync().
      if (Platform.OS !== 'web') {
        if (!(await SecureStore.isAvailableAsync())) {
          throw new Error('SecureStore is unavailable on this device.');
        }
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      } else {
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      }
      
      // TODO EXAM: Update token state and user state with the supplied arguments.
      // TODO EXAM: Handle storage failures; never store the password.
      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // TODO EXAM: Delete the saved token using SecureStore.deleteItemAsync().
      if (Platform.OS !== 'web') {
        if (!(await SecureStore.isAvailableAsync())) {
          throw new Error('SecureStore is unavailable on this device.');
        }
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.error('Error deleting auth token:', error);
    } finally {
      // TODO EXAM: Clear token state and user state.
      // TODO EXAM: Handle storage errors and redirect to /sign-in after logout.
      setToken(null);
      setUser(null);
    }
  }, []);

  const restoreSession = useCallback(async () => {
    // TODO EXAM: Set authLoading while restoring the session.
    setAuthLoading(true);
    try {
      // TODO EXAM: Read the saved token with SecureStore.getItemAsync().
      let savedToken: string | null = null;
      let savedUser: string | null = null;

      if (Platform.OS !== 'web') {
        if (!(await SecureStore.isAvailableAsync())) {
          throw new Error('SecureStore is unavailable on this device.');
        }
        savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        savedUser = await SecureStore.getItemAsync(USER_KEY);
      } else {
        savedToken = localStorage.getItem(TOKEN_KEY);
        savedUser = localStorage.getItem(USER_KEY);
      }

      if (savedToken) {
        // TODO EXAM: Restore the locally persisted mock token and user session.
        try {
          const parsedUser: unknown = savedUser ? JSON.parse(savedUser) : null;
          if (
            savedToken.startsWith('mock-') &&
            parsedUser !== null &&
            typeof parsedUser === 'object' &&
            'email' in parsedUser &&
            typeof parsedUser.email === 'string'
          ) {
            setToken(savedToken);
            setUser(parsedUser as User);
          } else {
            await logout();
          }
        } catch {
          await logout();
        }
      }
    } catch (error) {
      // TODO EXAM: Handle 401 Unauthorized / expired sessions and clear invalid credentials.
      console.error('Failed to restore session:', error);
      setToken(null);
      setUser(null);
    } finally {
      // TODO EXAM: Handle errors and stop authLoading in finally.
      setAuthLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    // TODO EXAM: Call restoreSession() on startup.
    restoreSession();
  }, [restoreSession]);

  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}
