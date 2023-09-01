import {
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ButtonSpinner from "../../components/ButtonSpinner";
import AxiosInstance from "../../Http/AxiosInstance";
import Loading from "../../components/Loading";
import AdminHeader from "../../components/Layout/AdminHeader";
import formatDate from "../../helpers/formatDate";

function ViewPendingAccount() {
  const [id, setId] = useState<number>(history.state?.usr?.data);
  const [model, setModel] = useState<any>();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    queryData();
  }, [id]);
  useIonViewWillEnter(() => {
    const pendingId = history.state?.usr?.data;
    if (pendingId != id) {
      setId((s) => pendingId);
    }
  });
  async function queryData() {
    try {
      setIsLoading((s) => true);
      const response = await AxiosInstance().get(`admin/users/pending/${id}`);
      setModel((m: any) => response.data);
      setIsLoading((s) => false);
    } catch (error) {
      console.error(error);
      setIsLoading((s) => false);
    }
  }
  async function acceptUser() {
    setDisabledButton((s) => true);
    setAcceptLoading((s) => true);
    try {
      await AxiosInstance().post(`admin/users/accept`, {
        id: id,
      });
      history.back();
    } catch (error: any) {
      if (error.response.status == 403) {
        alert("You do not have permission to perform this action.");
      }
    }
    setDisabledButton((s) => false);
    setAcceptLoading((s) => false);
  }
  async function declineUser() {
    setDisabledButton((s) => true);
    setDeclineLoading((s) => true);
    try {
      await AxiosInstance().post(`admin/users/decline`, {
        id: id,
      });
      history.back();
    } catch (error: any) {
      if (error.response.status == 403) {
        alert("You do not have permission to perform this action.");
      }
    }
    setDisabledButton((s) => false);
    setDeclineLoading((s) => false);
  }

  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={isLoading}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Name</IonLabel>
                  <h5>
                    {model?.firstname} {model?.lastname}
                  </h5>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Contact</IonLabel>
                  <h5>{model?.contact}</h5>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Created</IonLabel>
                  <h5>{formatDate(model?.created)}</h5>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Role</IonLabel>
                  <h5>{model?.role}</h5>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem lines="none">
                  <div className="text-center w-100 spacing-x-2 mt-2">
                    <ButtonSpinner
                      text="Accept"
                      showSpinner={acceptLoading}
                      disabled={disabledButton}
                      color="success"
                      onClick={acceptUser}
                    />
                    <ButtonSpinner
                      text="Decline"
                      disabled={disabledButton}
                      showSpinner={declineLoading}
                      color="danger"
                      onClick={declineUser}
                    />
                  </div>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default ViewPendingAccount;
