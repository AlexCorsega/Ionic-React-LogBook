import { IonContent, IonItem, IonPage, IonRouterLink } from "@ionic/react";
import GuardLayout from "../../components/Layout/GuardLayout";

function Example3() {
  return (
    <IonPage>
      <IonContent>
        <IonItem routerLink="/example2">go to example 2 </IonItem>
      </IonContent>
    </IonPage>
  );
}

export default Example3;
