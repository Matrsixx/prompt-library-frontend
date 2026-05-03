import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { RoleContext as RoleCtx } from "../types";

const ROLE_KEY = "promptlib.role";

type SessionRoleValue = {
  role: RoleCtx | null;
  setRole: (role: RoleCtx) => void;
  clearRole: () => void;
};

const SessionRole = createContext<SessionRoleValue | null>(null);

function loadRole(): RoleCtx | null {
  try {
    const raw = sessionStorage.getItem(ROLE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RoleCtx;
    if (!parsed.role?.trim()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function SessionRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<RoleCtx | null>(() => loadRole());

  useEffect(() => {
    if (role && role.role.trim()) {
      sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
    }
  }, [role]);

  const setRole = useCallback((r: RoleCtx) => setRoleState(r), []);
  const clearRole = useCallback(() => {
    sessionStorage.removeItem(ROLE_KEY);
    setRoleState(null);
  }, []);

  return (
    <SessionRole.Provider value={{ role, setRole, clearRole }}>{children}</SessionRole.Provider>
  );
}

export function useSessionRole(): SessionRoleValue {
  const ctx = useContext(SessionRole);
  if (!ctx) throw new Error("useSessionRole must be used inside SessionRoleProvider");
  return ctx;
}
