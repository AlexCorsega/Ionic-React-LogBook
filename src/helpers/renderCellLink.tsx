import { IonButton, IonItem, IonRouterLink } from "@ionic/react";
import React from "react";

function renderCellLink(
  text: string,
  params: any,
  onClick: (params: any) => void
) {
  return (
    <IonRouterLink
      onClick={() => onClick(params)}
      className="rounded bg-primary text-light p-1 my-1 cursor-pointer"
    >
      {text}
    </IonRouterLink>
  );
}

export default renderCellLink;
