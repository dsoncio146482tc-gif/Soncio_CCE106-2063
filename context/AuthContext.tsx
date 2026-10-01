/* eslint-disable @typescript-eslint/no-unused-vars -- Setters and imports are reserved for exam TODOs. */
import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'user_auth_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (accessToken: string, userData: User) => {
    try {
      // TODO EXAM: Save the access token with SecureStore.setItemAsync().
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      }
      // TODO EXAM: Update token state and user state with the supplied arguments.
      // TODO EXAM: Handle storage failures; never store the password.
      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  };

  const logout = async () => {
    try {
      // TODO EXAM: Delete the saved token using SecureStore.deleteItemAsync().
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error deleting auth token:', error);
    } finally {
      // TODO EXAM: Clear token state and user state.
      // TODO EXAM: Handle storage errors and redirect to /sign-in after logout.
      setToken(null);
      setUser(null);
    }
  };

  const restoreSession = async () => {
    // TODO EXAM: Set authLoading while restoring the session.
    setAuthLoading(true);
    try {
      // TODO EXAM: Read the saved token with SecureStore.getItemAsync().
      let savedToken: string | null = null;
      if (Platform.OS !== 'web') {
        savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      }

      if (savedToken) {
        // TODO EXAM: Validate the token via GET /profile with a Bearer token.
        // TODO EXAM: Update token and user state for a valid session.
        setToken(savedToken);
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
  };

  useEffect(() => {
    // TODO EXAM: Call restoreSession() on startup.
    restoreSession();
  }, []);

  // SecureStore is native-only. The web skeleton makes no storage calls.
  // TODO EXAM: Check platform availability before storage calls; test persistence on Android/iOS.
  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}