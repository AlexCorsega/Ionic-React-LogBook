import { useEffect, useState } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import AxiosInstance from "../../Http/AxiosInstance";
import ActivityLogs from "../../components/ActivityLogs";
import formatDate from "../../helpers/formatDate";
import renderCellUserStatus from "../../helpers/renderCellUserStatus";
import Loading from "../../components/Loading";
import { useAuth } from "../../authentication/auth";
import { ROLES } from "../Login";
import ResetEmployeePassword from "./ResetEmployeePassword";
import GoogleMapComponent from "../../components/ExternalServices/GoogleMapComponent";
import { pencilSharp, settings, settingsOutline, toggle } from "ionicons/icons";
import UpdateSecurityGuardModal from "../../components/Admin/UpdateSecurityGuardModal";
import UpdateAdminModal from "../../components/Admin/UpdateAdminModal";
import { useHistory } from "react-router";

export interface AdminModel {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
  email: string;
  contact: string;
  created_at: string;
  approve_at: string;
  is_active: boolean;
  status: {
    id: number;
    name: string;
  };
}

function ViewAdministrator() {
  const [id, setId] = useState<number>(history.state?.usr?.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [adminDetails, setAdminDetails] = useState<AdminModel>();
  const auth = useAuth();
  const historyHook = useHistory();
  useEffect(() => {
    queryData();
  }, [id]);
  useIonViewWillEnter(() => {
    setId((s) => history.state?.usr?.data);
  });
  async function queryData() {
    try {
      setIsLoading((s) => true);
      const details = await AxiosInstance().get(
        `admin/employee/administrators/${id}`
      );
      setAdminDetails((s: any) => details.data);
      setIsLoading((s) => false);
    } catch (error) {
      console.error(error);
      setIsLoading((s) => false);
    }
  }
  function toggleUpdate() {
    setShowUpdate((s) => !s);
  }
  function onUpdateSuccess(model: AdminModel) {
    setAdminDetails((s) => model);
    toggleUpdate();
  }
  function onAdministratorAccountSettings() {
    historyHook.push(`/admin/administrators/${id}/account-settings`, {
      data: id,
    });
  }
  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={isLoading}>
          <IonGrid fixed={true} className="w-100">
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <div className="flex justify-between">
                        <IonButton
                          slot="end"
                          color="light"
                          onClick={toggleUpdate}
                          size="small"
                          className="ms-2"
                        >
                          update
                        </IonButton>
                        <IonButton
                          slot="end"
                          color="success"
                          onClick={onAdministratorAccountSettings}
                          size="small"
                        >
                          <IonIcon icon={settingsOutline} />
                        </IonButton>
                        <UpdateAdminModal
                          model={adminDetails}
                          isModalOpen={showUpdate}
                          onClose={() => toggleUpdate()}
                          onUpdateSuccess={onUpdateSuccess}
                        />
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <h5>
                          {adminDetails?.firstname} {adminDetails?.lastname}
                        </h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Contact</IonLabel>
                        <h5>{adminDetails?.contact}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <h5>{adminDetails?.email}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Account Status</IonLabel>
                        <h5>{adminDetails?.status?.name}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Created Date</IonLabel>
                        <h5> {formatDate(adminDetails?.created_at)}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Accepted Date</IonLabel>
                        <h5> {formatDate(adminDetails?.approve_at)}</h5>
                      </IonItem>
                    </IonCol>
                    {auth?.getRole() == ROLES.SUPERADMIN && (
                      <IonCol size="12">
                        <IonItem>
                          <ResetEmployeePassword id={id} />
                        </IonItem>
                      </IonCol>
                    )}
                  </IonRow>
                </IonGrid>
              </IonCol>
              <IonCol size="12" sizeMd="6">
                <ActivityLogs id={id} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default ViewAdministrator;
