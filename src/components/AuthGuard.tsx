import { useEffect, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import useConnectUser from "../context/useConnectUser";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useConnectUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      void router.navigate({ to: "/login", replace: true });
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default AuthGuard;
