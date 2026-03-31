import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AuthContext,
  type AuthContextValue,
  type User,
} from '../model/authContext';
import { API_URL, TOKEN_KEY } from '../model/constants';
import { normalizeToken } from '../lib/normalizeToken';

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() =>
    normalizeToken(localStorage.getItem(TOKEN_KEY))
  );
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setIsLoading(false);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: token,
        },
      });

      const { email }: User = await response.json();
      setUser(email);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout, token]);

  const login = useCallback(async (nextToken: string) => {
    const normalizedToken = normalizeToken(nextToken);

    if (!normalizedToken) {
      return;
    }

    localStorage.setItem(TOKEN_KEY, normalizedToken);
    setToken(normalizedToken);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      refreshUser,
    }),
    [isLoading, login, logout, refreshUser, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
