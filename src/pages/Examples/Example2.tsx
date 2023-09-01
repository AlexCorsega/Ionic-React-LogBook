import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function Example2() {
  console.log("Example 2");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem routerLink="/example3">go to example asd 3</IonItem>
        <IonItem routerLink="/example3">go to example asd 3</IonItem>
        <IonItem routerLink="/example3">go to example asd 3</IonItem>
      </IonContent>
    </IonPage>
  );
}

export default Example2;
