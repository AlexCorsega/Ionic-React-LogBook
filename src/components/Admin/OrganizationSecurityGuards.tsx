import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";

interface Props {
  securityGuards: any;
  onChange: (guardId: number) => void;
}
function OrganizationSecurityGuards({ securityGuards, onChange }: Props) {
  return (
    <IonItem className="">
      <IonSelect
        label="Security Guards"
        placeholder="Select Guard"
        onIonChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <IonSelectOption value="">Select Guard</IonSelectOption>
        {securityGuards &&
          securityGuards.map((value: any) => {
            return (
              <IonSelectOption key={value.id} value={value.id}>
                {value.firstname} {value.lastname}
              </IonSelectOption>
            );
          })}
      </IonSelect>
    </IonItem>
  );
}

export default OrganizationSecurityGuards;
