import React from "react";
import { AuthProvider } from "../../authentication/auth";
import { RequireAuth } from "../../authentication/RequireAuth";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import AccountSettings from "../Account/AccountSettings";

function AccountRouter() {
  return (
    <>
      <AuthProvider>
        <RequireAuth>
          <IonPage>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route
                  exact={true}
                  path={`/account`}
                  component={AccountSettings}
                />
              </IonRouterOutlet>
            </IonReactRouter>
          </IonPage>
        </RequireAuth>
      </AuthProvider>
    </>
  );
}

export default AccountRouter;
