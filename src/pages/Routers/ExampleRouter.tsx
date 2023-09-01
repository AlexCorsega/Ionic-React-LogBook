import { IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import Example1 from "../Examples/Example";
import Example2 from "../Examples/Example2";
import Example3 from "../Examples/Example3";

function ExampleRouter() {
  return (
    <IonPage>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact={true} path={`/example1`} component={Example1} />
          <Route exact={true} path={`/example2`} component={Example2} />
          <Route exact={true} path={`/example3`} component={Example3} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  );
}

export default ExampleRouter;
