import React, { ReactNode } from "react";
import { Redirect } from "react-router";
import { useAuth } from "./auth";
import { IonReactRouter } from "@ionic/react-router";
import { ROLES } from "../pages/Login";
import ChangePassword from "../components/ChangePassword";
import ChangePasswordAlert from "../components/ChangePasswordAlert";

interface Props {
  roles?: string[];
  children: React.ReactNode;
}
interface AuthProps {
  children: React.ReactNode;
}
export const RoleAuth = ({ roles, children }: Props): ReactNode | any => {
  const auth = useAuth();
  const role = auth?.getRole() ?? "";
  if (!auth?.isAuthenticated()) {
    history.replaceState(null, "", "/");
    window.location.assign("/");
    // return <Redirect exact to="/"></Redirect>
    return null;
  } else if (roles != undefined && !roles.includes(role)) {
    if (role == ROLES.GUARD) return <Redirect exact to="/guard"></Redirect>;
    else if (role == ROLES.ADMIN)
      return <Redirect exact to="/admin"></Redirect>;
  }
  return <>{children}</>;
};
export const AuthenticatedPage = ({ children }: AuthProps): ReactNode | any => {
  const auth = useAuth();
  if (!auth?.isAuthenticated()) return <Redirect exact to="/login"></Redirect>;
  return <>{children}</>;
};
export default RoleAuth;
