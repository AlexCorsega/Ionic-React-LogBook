import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import AxiosInstance from "../../Http/AxiosInstance";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonItem,
  IonLabel,
  useIonViewWillEnter,
} from "@ionic/react";
import BasePaths from "../../Http/BasePaths";
import formatDate from "../../helpers/formatDate";

interface Props {
  isOpen: boolean;
  id: number;
  onClose: () => void;
}
function ViewOrganizationLogbookModal({ isOpen, id, onClose }: Props) {
  const [data, setData] = useState<any>();
  useEffect(() => {
    if (id > 0) queryData();
  }, [id]);
  useIonViewWillEnter(() => {
    queryData();
  });
  function queryData() {
    AxiosInstance()
      .get(`admin/organizations/logbooks/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Logbook Details">
      <IonGrid fixed={true}>
        <IonRow>
          <IonCol>
            <IonImg
              src={BasePaths.Images + data?.signature}
              alt="Signature Image"
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {data?.note && <IonImg src={BasePaths.Images + data?.note} />}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <h5>
                {data?.firstname} {data?.lastname}
              </h5>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <h5>{data?.description}</h5>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Type</IonLabel>
              <h5>{data?.logtype.name}</h5>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Date & Time</IonLabel>
              {data && <h5>{formatDate(data?.created_at)}</h5>}
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Security Guard</IonLabel>
              <h5>
                {data?.user.firstname} {data?.user.lastname}
              </h5>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </BaseModal>
  );
}

export default ViewOrganizationLogbookModal;
