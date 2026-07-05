import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { isAuthenticated } from "../lib/auth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"checking" | "yes" | "no">("checking");

  useEffect(() => {
    let alive = true;
    isAuthenticated().then((ok) => {
      if (alive) setState(ok ? "yes" : "no");
    });
    return () => {
      alive = false;
    };
  }, []);

  if (state === "checking") {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" aria-label="Memuat" />
      </div>
    );
  }
  if (state === "no") return <Navigate to="/login" replace />;
  return <>{children}</>;
}
