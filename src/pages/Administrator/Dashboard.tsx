import { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonLoading,
  IonRow,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircleSharp } from "ionicons/icons";
import DataReport from "../../components/DataReport";
import Loading from "../../components/Loading";
import OrganizationTable from "../../components/Admin/OrganizationTable";
import SecurityGuardTable from "../../components/Admin/SecurityGuardTable";
import BasicCard from "../../components/Cards/BasicCard";
import AdminHeader from "../../components/Layout/AdminHeader";
import Refresh from "../../components/Refresh";
import { useLoading } from "../../context/useLoading";
import GoogleMapComponent from "../../components/ExternalServices/GoogleMapComponent";
import { APIKEYS } from "../../Keys/APIKEYS";
import GoogleMapJsComponent, {
  PlacesAutocomplete,
} from "../../components/ExternalServices/GoogleMapJsComponent";
import { useHistory } from "react-router";
import { ADMINPAGES } from "../../components/Layout/AdminMenu";

// interface DashboardModel{
//     status:{}
// }
function Dashboard() {
  const [dashboardModel, setDashboardModel] = useState<any>(null);
  const loading = useLoading();
  const history = useHistory();
  useEffect(() => {
    refreshData();
  }, []);
  useIonViewWillEnter(async () => {
    await queryData();
  });
  async function queryData() {
    try {
      const response = await AxiosInstance().get("admin/dashboard");
      setDashboardModel((s: any) => response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function refreshData() {
    loading?.setPageLoading();
    await queryData();
    loading?.pageLoaded();
  }
  return (
    <AdminHeader>
      <IonContent>
        {/* <IonLoading isOpen={}/> */}
        <Refresh onRefresh={refreshData} />
        <IonGrid>
          <Loading isLoading={loading?.isPageLoading}>
            {dashboardModel && (
              <>
                <IonCard color="tertiary" className="py-2">
                  <IonRow className="ion-justify-content-center">
                    {dashboardModel && (
                      <>
                        <IonCol size="12" sizeSm="4">
                          <DataReport
                            routerLink="/admin/users/pending"
                            actualData={dashboardModel.pendingAccounts}
                            icon={personCircleSharp}
                            color="primary"
                            iconColor="primary"
                            label={ADMINPAGES.PENDINGACCOUNTS}
                          />
                        </IonCol>
                        <IonCol size="12" sizeSm="4">
                          <DataReport
                            actualData={dashboardModel.guards.total}
                            icon={personCircleSharp}
                            routerLink="/admin/guards"
                            color="tertiary"
                            iconColor="tertiary"
                            label={ADMINPAGES.GUARD}
                          />
                        </IonCol>
                        <IonCol size="12" sizeSm="4">
                          <DataReport
                            actualData={dashboardModel.organizations.total}
                            routerLink="/admin/organizations"
                            icon={personCircleSharp}
                            color="warning"
                            iconColor="warning"
                            label={ADMINPAGES.ORGANIZATION}
                          />
                        </IonCol>
                      </>
                    )}
                  </IonRow>
                </IonCard>
              </>
            )}
          </Loading>
          <IonRow>
            <IonCol
              size="12"
              className={!loading?.isPageLoading ? "" : "d-none"}
            >
              <BasicCard title="Organizations Table" titleSlot="center">
                <OrganizationTable />
              </BasicCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              size="12"
              className={!loading?.isPageLoading ? "" : "d-none"}
            >
              <BasicCard title="Security Guards Table" titleSlot="center">
                <SecurityGuardTable />
              </BasicCard>
              {dashboardModel && (
                <>
                  <GoogleMapJsComponent
                    center={
                      dashboardModel.organizations.data
                        ? {
                            lat: dashboardModel.organizations.data[0].latitude,
                            lon: dashboardModel.organizations.data[0].longitude,
                          }
                        : { lat: 8.48585, lon: 124.64796 }
                    }
                    zoom={11}
                    markers={dashboardModel.organizations.data.map(
                      (org: any) => {
                        return {
                          lat: org.latitude,
                          lon: org.longitude,
                          draggable: false,
                          isLabelShown: true,
                          label: org.name,
                        };
                      }
                    )}
                  />
                </>
              )}
              {/* {dashboardModel && (
                  <GoogleMapComponent
                    center={
                      dashboardModel.organizations.data
                        ? {
                            lat: dashboardModel.organizations.data[0].latitude,
                            lon: dashboardModel.organizations.data[0].longitude,
                          }
                        : { lat: 8.48585, lon: 124.64796 }
                    }
                    zoom={11}
                    markers={dashboardModel.organizations.data.map(
                      (org: any) => {
                        return {
                          lat: org.latitude,
                          lon: org.longitude,
                          draggable: false,
                          isLabelShown: true,
                        };
                      }
                    )}
                  />
                )} */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </AdminHeader>
  );
}

export default Dashboard;
