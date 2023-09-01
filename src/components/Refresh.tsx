import { IonRefresher, IonRefresherContent } from "@ionic/react";
import React from "react";

interface Props {
  onRefresh: () => void;
}
function Refresh({ onRefresh }: Props) {
  function handleRefresh(ev: any) {
    onRefresh();
    ev.detail.complete();
  }
  return (
    <IonRefresher slot="fixed" onIonRefresh={(ev) => handleRefresh(ev)}>
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
  );
}

export default Refresh;
