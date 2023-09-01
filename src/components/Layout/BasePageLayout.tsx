import { IonPage, IonContent, IonGrid } from "@ionic/react";
import React from "react";

function BasePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding">
        {children}
      </IonContent>
    </IonPage>
  );
}

export default BasePageLayout;
