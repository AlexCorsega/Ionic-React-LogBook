import { IonButton, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";

interface Props {
  onChange: (logTypeId: number) => void;
}

function LogtypeSelect({ onChange }: Props) {
  const [data, setData] = useState<any>();
  const [selectedLogType, setSelectedLogType] = useState<any>("");
  useEffect(() => {
    AxiosInstance()
      .get("guard/log-types")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function onChangeLogtype(logtypeId: any) {
    setSelectedLogType(logtypeId);
    onChange(logtypeId);
  }
  return (
    <>
      <div className="spacing-x-2">
        <IonButton
          onClick={() => onChangeLogtype("")}
          color={selectedLogType == "" ? "primary" : "light"}
        >
          All Logs
        </IonButton>
        {data &&
          data.map((value: any) => {
            return (
              <IonButton
                color={selectedLogType == value.id ? "primary" : "light"}
                key={value.id}
                onClick={() => onChangeLogtype(value.id)}
              >
                {value.name}
              </IonButton>
            );
          })}
      </div>
    </>
  );
}

export default LogtypeSelect;
