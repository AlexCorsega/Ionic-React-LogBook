import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Route } from "react-router";
import Example1 from "./Example";
import Example2 from "./Example2";

function ExampleRouter() {
  return (
    <IonRouterOutlet>
      <Route exact={true} path={`/example1`} component={Example1} />
      <Route exact={true} path="/example2" component={Example2} />
    </IonRouterOutlet>
  );
}

export default ExampleRouter;
