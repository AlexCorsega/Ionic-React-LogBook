import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { MouseEventHandler } from "react";

interface Props {
  X: "center" | "end" | "start" | undefined;
  Y: "center" | "top" | "bottom" | undefined;
  onClick: MouseEventHandler<HTMLIonFabButtonElement>;
  size: "small" | undefined;
}
function FabComponent({ X, Y, size, onClick }: Props) {
  return (
    <IonFab vertical={Y} horizontal={X}>
      <IonFabButton size={size ?? "small"} onClick={onClick}>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}

export default FabComponent;
