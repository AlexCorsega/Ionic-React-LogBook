import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonPage,
  useIonViewWillEnter,
  IonSelect,
  IonSelectOption,
  IonLoading,
  useIonViewWillLeave,
} from "@ionic/react";
import { pencilSharp } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import AxiosInstance from "../../Http/AxiosInstance";
import Loading from "../../components/Loading";
import UpdateSecurityGuardModal, {
  AvailableOrganizationModel,
} from "../../components/Admin/UpdateSecurityGuardModal";
import SecurityGuardOrganizationHistoryTable from "../../components/Admin/SecurityGuardOrganizationHistoryTable";
import ButtonSpinner from "../../components/ButtonSpinner";
import { USERACCOUNTSTATUS } from "../../constants/userAccountStatus";
import renderCellUserStatus from "../../helpers/renderCellUserStatus";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from "../../components/Layout/AdminHeader";
import ActivityLogs from "../../components/ActivityLogs";
import formatDate from "../../helpers/formatDate";
import ResetEmployeePassword from "./ResetEmployeePassword";
import { useAuth } from "../../authentication/auth";
import { ROLES } from "../Login";
import GoogleMapComponent from "../../components/ExternalServices/GoogleMapComponent";

export interface SecurityGuardModel {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
  contact: string;
  created: string;
  accepted_at: string;
  email?: string;
  active: string;
  approve_at: string;
  organization: string;
  organization_id: number;
}

function ViewSecurityGuard() {
  const [id, setId] = useState<number>(history.state?.usr?.data);

  const [isUpdate, setIsUpdate] = useState(false);
  const [model, setModel] = useState<SecurityGuardModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [status, setStatus] = useState<string>();
  const [availableOrganization, setAvailableOrganization] =
    useState<AvailableOrganizationModel[]>();
  const organizationSelectRef = useRef<HTMLIonSelectElement>(null);
  const auth = useAuth();

  useEffect(() => {
    refresh();
  }, [id]);
  useIonViewWillEnter(() => {
    setId(history.state?.usr?.data);
  });
  async function refresh() {
    setIsLoading((s) => true);
    await queryGuard();
    await getAvailableOrganization();
    setIsLoading((s) => false);
  }
  async function getAvailableOrganization() {
    try {
      const response = await AxiosInstance().get(
        `admin/user-available-organizations/${id}`
      );
      setAvailableOrganization((s) => response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function queryGuard() {
    try {
      const response = await AxiosInstance().get(`admin/security-guards/${id}`);
      console.log(response);
      setModel(() => response.data);
      setStatus((s) => response.data.status.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }
  async function onAssignOrganization(orgId: number | undefined) {
    try {
      if (orgId != undefined && orgId != model?.organization_id) {
        setIsLoad((s) => true);
        await AxiosInstance().post(`admin/assign-organization`, {
          organization_id: orgId,
          user_id: id,
        });
        refresh();
        setIsLoad((s) => false);
      }
    } catch (error: any) {
      setIsLoad((s) => false);
      if (error.response.status == 403) {
        alert("You do not have permission to perform this action.");
      }
    }
  }
  function toggleUpdate() {
    setIsUpdate((s) => !s);
  }
  function onUpdateSuccess(model: SecurityGuardModel) {
    setModel(() => model);
    toggleUpdate();
  }
  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={isLoading}>
          <IonGrid fixed={true} className="w-100">
            <IonRow>
              <IonCol>
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <div className="flex justify-between align-center px-2 ps-1">
                        <div>
                          <IonButton
                            color="primary"
                            size="small"
                            onClick={() =>
                              organizationSelectRef.current?.open()
                            }
                          >
                            Assign Organization
                          </IonButton>
                          <IonSelect
                            hidden={true}
                            className="d-none"
                            ref={organizationSelectRef}
                            aria-label="organization"
                            label="Available Organization"
                            placeholder="Select Available Orgaization"
                            onIonChange={(e) =>
                              onAssignOrganization(e.target.value)
                            }
                            value={model?.organization_id}
                          >
                            {model?.organization_id && (
                              <IonSelectOption value={model?.organization_id}>
                                {model?.organization}
                              </IonSelectOption>
                            )}
                            {availableOrganization &&
                              availableOrganization.map((org, index) => {
                                return (
                                  <IonSelectOption key={index} value={org.id}>
                                    {org.name}
                                  </IonSelectOption>
                                );
                              })}
                          </IonSelect>
                          <IonLoading isOpen={isLoad} />
                        </div>
                        <div className="text-end">
                          <IonButton
                            slot="end"
                            color="light"
                            onClick={toggleUpdate}
                            size="small"
                          >
                            update
                          </IonButton>
                          <UpdateSecurityGuardModal
                            model={model}
                            isModalOpen={isUpdate}
                            onClose={() => toggleUpdate()}
                            onUpdateSuccess={onUpdateSuccess}
                          />
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                  {/* <IonRow className="ion-justify-items-center">
                    <IonCol size="12">
                      <IonItem lines="none">
                        {renderCellUserStatus(status ?? "", "md")}
                      </IonItem>
                    </IonCol>
                  </IonRow> */}
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
                        <IonLabel position="stacked">Organization</IonLabel>
                        <h5>{model?.organization}</h5>
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
                        <IonLabel position="stacked">Email</IonLabel>
                        <h5>{model?.email}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Account Status</IonLabel>
                        <h5>{model?.active ? "Active" : "Inactive"}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Created Date</IonLabel>
                        <h5> {formatDate(model?.created)}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="stacked">Accepted Date</IonLabel>
                        <h5> {formatDate(model?.approve_at)}</h5>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  {(auth?.getRole() == ROLES.ADMIN ||
                    auth?.getRole() == ROLES.SUPERADMIN) && (
                    <IonCol size="12">
                      <IonItem>
                        <ResetEmployeePassword id={id} />
                      </IonItem>
                    </IonCol>
                  )}
                </IonGrid>
              </IonCol>
              <IonCol size="12" sizeMd="6">
                <SecurityGuardOrganizationHistoryTable id={id} />
                <ActivityLogs id={id} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default ViewSecurityGuard;
