import { Redirect } from "react-router";
import { useAuth } from "./auth";
import { ReactNode } from "react";

interface Props {
  children: React.ReactNode;
}
export const RequireAuth = ({ children }: Props): ReactNode | any => {
  const auth = useAuth();
  if (!auth?.user || !auth) return <Redirect to="/login"></Redirect>;
  else return <>{children}</>;
};
