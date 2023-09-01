import {
  IonButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonPage,
} from "@ionic/react";
import React, { useState } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import OrganizationLogbooksTable from "../../components/Admin/OrganizationLogbooksTable";
import DateTimeButton from "../../components/Buttons/DateTimeButton";
import formatDate from "../../helpers/formatDate";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import ViewOrganizationLogbookModal from "../../components/Admin/ViewOrganizationLogbookModal";

function OrganizationLogbook() {
  const [logbookId, setLogbookId] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  function onLogbookDetailsClick(id: number) {
    setLogbookId(id);
    toggleModal();
  }
  function toggleModal() {
    setOpenModal((s) => !s);
  }
  return (
    <AdminHeader>
      <IonContent className="ion-padding">
        <OrganizationLogbooksTable
          onLogbookDetailsClick={onLogbookDetailsClick}
        />
      </IonContent>
      <ViewOrganizationLogbookModal
        isOpen={openModal}
        onClose={toggleModal}
        id={logbookId}
      />
    </AdminHeader>
  );
}

export default OrganizationLogbook;
