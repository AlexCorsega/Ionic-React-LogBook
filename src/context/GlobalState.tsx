import React from "react";
import { AuthProvider } from "../authentication/auth";
import { LoadingProvider } from "./useLoading";
import { ErrorProvider } from "./useErrorHandler";

interface Props {
  children: React.ReactNode;
}
function GlobalState({ children }: Props) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ErrorProvider>{children}</ErrorProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default GlobalState;
