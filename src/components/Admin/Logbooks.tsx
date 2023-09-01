import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React from "react";
import { chevronForwardOutline } from "ionicons/icons";
import { VisitorModel } from "../../Models/VisitorModel";
import formatDate from "../../helpers/formatDate";
interface Props {
  data: any[];
}
function Logbooks({ data }: Props) {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <h6>Name</h6>
        </IonCol>
        <IonCol>
          <h6>Type</h6>
        </IonCol>
        <IonCol>
          <h6>Date</h6>
        </IonCol>
      </IonRow>
      {data && data.length == 0 && (
        <h5 className="text-center">No results found.</h5>
      )}
      {data &&
        data.map((d, index) => {
          return (
            <IonItem
              key={index}
              routerLink={`/guard/logbooks/${d.id}`}
              lines="none"
              className="w-100 ion-no-padding"
            >
              <IonRow
                key={index}
                className="ion-justify-content-between w-100 ion-align-items-center border-b py-1"
              >
                <IonCol size="4">
                  <IonLabel>
                    {d.firstname} {d.lastname}
                  </IonLabel>
                </IonCol>
                <IonCol size="4" className="align-self-center">
                  <IonLabel>{d.logtype.name}</IonLabel>
                </IonCol>
                <IonCol size="4">
                  <IonLabel>{formatDate(d.created_at)}</IonLabel>
                </IonCol>
              </IonRow>
            </IonItem>
          );
        })}
    </IonGrid>
  );
}

export default Logbooks;
