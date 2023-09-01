import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
} from "@ionic/react";
import React from "react";
interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
function BaseModal({ isOpen, title, onClose, children }: Props) {
  return (
    <IonModal isOpen={isOpen} className="full-modal">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="text-center ms-5">{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onClose()} color="danger">
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
    </IonModal>
  );
}

export default BaseModal;
