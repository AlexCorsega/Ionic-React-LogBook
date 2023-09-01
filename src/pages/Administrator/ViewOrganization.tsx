import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import AxiosInstance from "../../Http/AxiosInstance";
import Loading from "../../components/Loading";
import OrganizationSecurityGuardTable from "../../components/Admin/OrganizationSecurityGuardTable";
import UpdateOrganizationModal from "../../components/Admin/UpdateOrganizationModal";
import AdminHeader from "../../components/Layout/AdminHeader";
import formatDate from "../../helpers/formatDate";
import OrganizationSecurityGuardHistoryTable from "../../components/Admin/OrganizationSecurityGuardHistoryTable";

export interface OrganizationModel {
  id: number;
  name: string;
  description: string;
  street?: string;
  barangay: string;
  city: string;
  zip_code: number;
  address: string;
  active: boolean;
  created: string;
  security_guard: number;
  active_guard: number;
  inactive_guard: number;
}
const ViewOrganization: React.FC<RouteComponentProps> = ({ match }) => {
  const [id, setId] = useState<number>(history.state?.usr?.data);
  const historyHook = useHistory();
  //States
  const [model, setModel] = useState<OrganizationModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  useEffect(() => {
    queryData();
  }, [id]);
  useIonViewWillEnter(() => {
    setId((id) => history.state?.usr?.data);
  });
  async function queryData() {
    try {
      setIsLoading((s) => true);
      const response = await AxiosInstance().get(`admin/organizations/${id}`);
      setModel((s) => response.data);
      setIsLoading((s) => false);
    } catch (error) {
      console.error(error);
      setIsLoading((s) => false);
    }
  }
  function toggleUpdateModal() {
    setShowUpdateModal((s) => !s);
  }
  function onUpdateSuccess(newModel: OrganizationModel) {
    setModel((s) => newModel);
    toggleUpdateModal();
  }
  function onViewLogbook() {
    historyHook.push(`/admin/organizations/${id}/logbook`, { data: id });
  }
  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={isLoading}>
          <IonGrid fixed={true} className="w-100">
            <IonRow>
              <IonCol size="4">
                <IonItem lines="none" color="primary" className="rounded">
                  <div className="text-center w-100">
                    <h5>{model?.security_guard}</h5>
                    <IonLabel>Security Guards</IonLabel>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="4">
                <IonItem lines="none" color="success" className="rounded">
                  <div className="text-center w-100">
                    <h5>{model?.active_guard}</h5>
                    <IonLabel>Active Guards</IonLabel>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="4">
                <IonItem lines="none" color="warning" className="rounded">
                  <div className="text-center w-100 text-light">
                    <h5>{model?.inactive_guard}</h5>
                    <IonLabel>Inactive Guards</IonLabel>
                  </div>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonButton
                    className="w-100 my-2"
                    color="tertiary"
                    size="default"
                    onClick={onViewLogbook}
                  >
                    View Logbooks
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <div className="text-end">
                        <IonButton
                          color="primary"
                          slot="end"
                          size="small"
                          onClick={toggleUpdateModal}
                        >
                          update
                        </IonButton>
                        <UpdateOrganizationModal
                          model={model}
                          isModalOpen={showUpdateModal}
                          onClose={toggleUpdateModal}
                          onUpdateSuccess={onUpdateSuccess}
                        />
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <h5>{model?.name}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <h5>{model?.description}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Address</IonLabel>
                        <h5>{model?.address}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Status</IonLabel>
                        <h5>{model?.active ? "Active" : "Inactive"}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Created Date</IonLabel>
                        <h5>{formatDate(model?.created)}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
              <IonCol size="12">
                <OrganizationSecurityGuardTable id={id} />
              </IonCol>
              <IonCol size="12">
                <OrganizationSecurityGuardHistoryTable organization_id={id} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </Loading>
      </IonContent>
    </AdminHeader>
  );
};

export default ViewOrganization;
