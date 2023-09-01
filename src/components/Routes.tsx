import React, { Component, ReactComponentElement } from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Home from "../pages/Routers/GuardRouter";

interface Props {
  component: React.ComponentType<any>;
  path: string;
  exact: boolean;
}
const ProtectedRoute = ({ component, ...rest }: Props) => {
  const isAuthenticated = true;
  const comp = component;
  return (
    <Route
      {...rest}
      render={(props): any =>
        isAuthenticated ? { Component } : <Redirect to="/" />
      }
    />
  );
};
function Routes() {
  return (
    <>
      <Route path="/home" component={Home} />
      <Route path="/visitors/:id" component={Home} />
      <Route path="/reports" component={Home} />
      <Route path="/activitylogs" component={Home} />
      <Route component={NotFound} />
    </>
  );
}

export default ProtectedRoute;
