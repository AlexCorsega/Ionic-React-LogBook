import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Logbook from "../../components/Logbook";
import AccountSettings from "../Account/AccountSettings";
import Home from "../SecurityGuard/Home";
import Reports from "../SecurityGuard/Reports";
import GuardHeader from "../../components/Layout/GuardHeader";
import RoleAuth from "../../authentication/RoleAuth";
import ResetChangePassword from "../../components/ResetChangePassword";

function GuardRoutings() {
  return (
    <RoleAuth roles={["guard"]}>
      <IonRouterOutlet id="main">
        <Route exact={true} path={`/guard`}>
          <Redirect exact to={"/guard/home"} />
        </Route>
        <Route exact={true} path={`/guard/home`} render={() => <Home />} />
        <Route path={`/guard/reports`} render={() => <Reports />} />
        <Route path="/guard/logbooks/:id" component={Logbook} />
        <Route path="/guard/settings">
          <GuardHeader>
            <AccountSettings />
          </GuardHeader>
        </Route>
      </IonRouterOutlet>
    </RoleAuth>
  );
}

export default GuardRoutings;
