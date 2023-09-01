import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCard,
} from "@ionic/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  titleSlot?: "center" | "end";
  subtitle?: string;
}
function BasicCard({ title, titleSlot, subtitle, children }: Props) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className={"text-" + titleSlot}>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>

      {children}
    </IonCard>
  );
}

export default BasicCard;
