import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonPage,
  useIonViewWillEnter,
  IonContent,
  IonBackButton,
  IonAlert,
  IonButton,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import AdminUserAccount from "../Admin/AdminUserAccount";
import { useUser } from "../../context/useUser";
import { useAdminMenu } from "./AdminMenu";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { useAuth } from "../../authentication/auth";

interface Props {
  children: React.ReactNode;
}
function AdminHeader({ children }: Props) {
  const [currentPage, setCurrentPage] = useState<string>();
  const adminMenu = useAdminMenu();
  const errorAlertRef = useRef<HTMLIonAlertElement>(null);
  const auth = useAuth();
  useIonViewWillEnter(() => {
    setCurrentPage(adminMenu?.getCurrentPage());
  });
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
            <IonBackButton></IonBackButton>
            <h5>{currentPage}</h5>
          </IonButtons>
          <IonButtons slot="end">
            <AdminUserAccount
              firstName={JSON.parse(auth?.user ?? "{}")?.firstname}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {children}
    </IonPage>
  );
}

export default AdminHeader;
