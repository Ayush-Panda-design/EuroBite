import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  hashPassword,
  validateLogin,
  validateSignup,
  type AuthErrors,
} from "@/src/lib/auth";

const USERS_KEY = "@foodapp/users";
const SESSION_KEY = "@foodapp/session";
const ONBOARDING_KEY = "@foodapp/onboarding_complete";

export type User = {
  id: string;
  name: string;
  email: string;
};

type StoredUser = User & { passwordHash: string };

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<AuthErrors>;
  login: (email: string, password: string) => Promise<AuthErrors>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

async function saveUsers(users: StoredUser[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [session, onboarding] = await Promise.all([
          AsyncStorage.getItem(SESSION_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);
        if (session) setUser(JSON.parse(session) as User);
        setHasCompletedOnboarding(onboarding === "true");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) => {
      const errors = validateSignup({ name, email, password, confirmPassword });
      if (Object.keys(errors).length > 0) return errors;

      const normalizedEmail = email.trim().toLowerCase();
      const users = await readUsers();
      if (users.some((u) => u.email === normalizedEmail)) {
        return { email: "An account with this email already exists." };
      }

      const passwordHash = await hashPassword(password);
      const newUser: StoredUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      };
      await saveUsers([...users, newUser]);

      const session: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return {};
    },
    [],
  );

  const login = useCallback(async (email: string, password: string) => {
    const errors = validateLogin({ email, password });
    if (Object.keys(errors).length > 0) return errors;

    const normalizedEmail = email.trim().toLowerCase();
    const users = await readUsers();
    const found = users.find((u) => u.email === normalizedEmail);
    if (!found) {
      return { general: "No account found with this email. Please sign up first." };
    }

    const passwordHash = await hashPassword(password);
    if (found.passwordHash !== passwordHash) {
      return { password: "Incorrect password. Please try again." };
    }

    const session: User = { id: found.id, name: found.name, email: found.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return {};
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setHasCompletedOnboarding(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      hasCompletedOnboarding,
      signup,
      login,
      logout,
      completeOnboarding,
    }),
    [user, isLoading, hasCompletedOnboarding, signup, login, logout, completeOnboarding],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
