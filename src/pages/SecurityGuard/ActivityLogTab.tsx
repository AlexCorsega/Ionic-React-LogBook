import {
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import Loading from "../../components/Loading";

export const ACTIVITY_TYPE = {
  LOGIN: "Attendance",
  LOGOUT: "Logout",
};

interface ActivityLogModel {
  type: string;
  description: string | undefined;
  date: string;
  organization: string;
}
function ActivityLogTab() {
  const [data, setData] = useState<ActivityLogModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AxiosInstance()
      .get("guard/log-history")
      .then((s) => {
        setIsLoading(false);
        setData(s.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  }, []);

  return (
    <IonContent>
      <h1 className="ion-text-center">My recent activities</h1>
      <Loading isLoading={isLoading}>
        <IonGrid>
          <IonRow>
            <IonCol size="3">
              <h6>Type</h6>
            </IonCol>
            <IonCol size="3">
              <h6>Description</h6>
            </IonCol>
            <IonCol size="3">
              <h6>Date</h6>
            </IonCol>
            <IonCol size="3">
              <h6>Organization</h6>
            </IonCol>
          </IonRow>
          {data.map((d, index) => {
            return (
              <IonItem
                key={index}
                lines="none"
                className="w-100 ion-no-padding"
              >
                <IonRow
                  key={index}
                  className="ion-justify-content-between w-100 ion-align-items-center border-b py-1"
                >
                  <IonCol size="3">
                    <IonLabel>{d.type}</IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonLabel>{d.description}</IonLabel>
                  </IonCol>
                  <IonCol size="3" className="ion-text-wrap">
                    <IonLabel>{d.date}</IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonLabel>{d.organization}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonItem>
            );
          })}
        </IonGrid>
      </Loading>
    </IonContent>
  );
}

export default ActivityLogTab;
