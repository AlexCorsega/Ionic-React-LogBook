import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonLoading,
  IonPopover,
} from "@ionic/react";
import React, { useState } from "react";
import generateGuid from "../../helpers/generateGuid";
import AxiosInstance from "../../Http/AxiosInstance";
import { useAuth } from "../../authentication/auth";
import { useHistory } from "react-router";
interface Props {
  firstName: string;
}
function AdminUserAccount({ firstName }: Props) {
  const guid = generateGuid();
  const auth = useAuth();
  const history = useHistory();
  async function onLogout() {
    auth?.logout();
  }
  function handleRouterLink(routerLink: string) {
    history.push(routerLink);
  }
  return (
    <>
      <IonChip id={guid} color="none">
        <IonAvatar>
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <IonLabel className="text-light">Hi, {firstName}</IonLabel>
      </IonChip>
      <IonPopover trigger={guid} size="auto" showBackdrop={false}>
        <IonContent class="ion-padding">
          <IonItem
            onClick={() => handleRouterLink("/admin/account/settings")}
            className="ion-no-padding cursor-pointer"
            lines="none"
          >
            Account Settings
          </IonItem>
          <IonButton
            color="danger"
            fill="outline"
            className="w-100"
            onClick={onLogout}
          >
            Logout
          </IonButton>
        </IonContent>
      </IonPopover>
      <IonLoading
        // trigger="addLog"
        message="Logout..."
        isOpen={auth?.isLoggingOut}
        duration={1500}
        spinner="circular"
        className="text-danger"
      />
    </>
  );
}

export default AdminUserAccount;
