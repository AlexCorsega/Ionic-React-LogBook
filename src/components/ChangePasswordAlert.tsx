import {
  IonButton,
  IonAlert,
  useIonViewWillEnter,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/useUser";
import { useAuth } from "../authentication/auth";
import { useHistory } from "react-router";

interface Props {
  redirectionLink: string;
  isOpen?: boolean;
  onDismiss?: () => void;
}
function ChangePasswordAlert({ redirectionLink, isOpen, onDismiss }: Props) {
  const auth = useAuth();
  const history = useHistory();
  const alertRef = useRef<HTMLIonAlertElement>(null);
  const hasShowedRef = useRef(false);

  useEffect(() => {
    if (isOpen) alertRef.current?.present();
    else alertRef.current?.dismiss();
  }, [isOpen]);

  useIonViewWillEnter(() => {
    const hasChangePasswordShowed = localStorage.getItem("changePassShowed");
    if (
      auth?.isChangePasswordRequired() == true &&
      !hasChangePasswordShowed &&
      !hasShowedRef.current
    ) {
      hasShowedRef.current = true;
      alertRef.current?.present();
    }
  });
  return (
    <>
      <IonAlert
        ref={alertRef}
        header="Change Password"
        subHeader="Changing your password is needed in cases where you initiate a reset request or when an administrator generates the account."
        buttons={[
          {
            text: "OK",
            role: "confirm",
            handler: () => {
              localStorage.setItem("changePassShowed", "0");
              history.push(redirectionLink);
              alertRef.current?.dismiss();
            },
          },
        ]}
        onDidDismiss={() => {
          alertRef.current?.dismiss();
          if (onDismiss) onDismiss();
        }}
      ></IonAlert>
    </>
  );
}

export default ChangePasswordAlert;
