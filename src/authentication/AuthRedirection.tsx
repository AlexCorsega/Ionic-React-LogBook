import React, { ReactNode } from "react";
import { useAuth } from "./auth";
import { Redirect } from "react-router";
import { ROLES } from "../pages/Login";
import { IonReactRouter } from "@ionic/react-router";

interface Props {
  children: React.ReactNode;
}
export const AuthRedirection = ({ children }: Props): ReactNode | any => {
  const auth = useAuth();
  const role = auth?.getRole();
  if (!auth?.isAuthenticated) return <Redirect exact to="/login"></Redirect>;
  else if (role == ROLES.GUARD) return <Redirect exact to="/home"></Redirect>;
  else if (role == ROLES.ADMIN)
    return <Redirect exact to="/dashboard"></Redirect>;
  else return <p>Not Founded</p>;
};
