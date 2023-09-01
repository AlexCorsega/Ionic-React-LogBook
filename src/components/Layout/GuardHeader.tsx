import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenuButton,
  IonIcon,
  IonPage,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import React from "react";

interface Props {
  children: React.ReactNode;
}
function GuardHeader({ children }: Props) {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {children}
    </IonPage>
  );
}

export default GuardHeader;
