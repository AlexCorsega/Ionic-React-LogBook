import { IonAlertCustomEvent } from "@ionic/core";
import {
  IonButton,
  IonAlert,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import { add } from "ionicons/icons";
import { LogTypeDTO } from "../../DTO/LogTypeDTO";

interface Props {
  onDidDismissCallback: (
    params: IonAlertCustomEvent<OverlayEventDetail<any>>
  ) => void;
}

function AlertLogType({ onDidDismissCallback }: Props) {
  const [data, setData] = useState<LogTypeDTO[]>();
  useEffect(() => {
    AxiosInstance()
      .get("logtype/all")
      .then((response) => {
        setData((s) => response.data);
      })
      .catch((err) => {
        alert(err);
        return err;
      });
  }, []);
  return (
    <>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton size="small" id="note-alert">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>{" "}
      <IonAlert
        onDidDismiss={(ev) => onDidDismissCallback(ev)}
        trigger="note-alert"
        header="Select the type of log"
        buttons={["OK"]}
        inputs={
          data?.map((s) => {
            return { label: s.name, type: "radio", value: s };
          }) ?? [{}]
        }
      ></IonAlert>
      {/* <IonAlert
        onDidDismiss={(detail) => onDidDismissCallback(detail)}
        trigger="note-alert"
        header="Select your favorite color"
        buttons={["OK"]}
        inputs={data?.map((d) => {
          return { label: d.name, type: "radio", value: d.id };
        })}
      ></IonAlert> */}
    </>
  );
}

export default AlertLogType;
