import { Session } from "@supabase/supabase-js"; // Make sure to install the @supabase/supabase-js types
import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

interface AuthContextProps {
  session: Session | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => authListener.subscription.unsubscribe();
  }, []);

  const value: AuthContextProps = {
    session
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
