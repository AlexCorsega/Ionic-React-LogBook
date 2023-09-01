import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonSearchbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AxiosInstance from "../../Http/AxiosInstance";
import CreateOrganization from "../../components/Admin/CreateOrganization";
import renderCellStatus from "../../helpers/renderCellStatus";
import Table from "../../components/Table";
import renderCellUserStatus from "../../helpers/renderCellUserStatus";
import CreateUserModal from "../../components/Admin/CreateUserModal";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from "../../components/Layout/AdminHeader";
import renderCellLink from "../../helpers/renderCellLink";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";

function SecurityGuard() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [rowData, setRowData] = useState<any>();
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>();
  const [searchName, setSearchName] = useState("");
  const loading = useLoading();

  useIonViewWillEnter(async () => {
    loading?.setPageLoading();
    await queryData();
    loading?.pageLoaded();
  });
  useUpdateEffect(() => {
    queryData(paginationModel?.pageSize, paginationModel?.page, searchName);
  }, [searchName]);
  async function queryData(size = 5, page = 1, name = "") {
    try {
      const response = await AxiosInstance().get(
        `admin/security-guards?size=${size}&page=${page}&name=${name}`
      );
      setRowData((r: any) => response.data.data);
      setTotalDataCount((t) => response.data.total);
    } catch (error) {
      console.error(error);
    }
  }
  async function handlePageSizeChange(model: GridPaginationModel) {
    setIsDataLoading((s) => true);
    setPaginationModel(model);
    await queryData(model.pageSize, model.page);
    setIsDataLoading((s) => false);
  }
  function handleCreateSuccess(data: any) {
    setIsModalOpen((s) => false);
    setRowData((rd: any) => [data, ...rd]);
    setTotalDataCount((t) => t + 1);
  }

  function onViewSecurityGuard(id: number) {
    history.push(`/admin/guards/${id}`, { data: id });
  }
  return (
    <AdminHeader>
      <IonContent>
        <IonLoading isOpen={isDataLoading} />
        <IonCard>
          <div className="flex justify-between align-center my-1">
            <IonSearchbar
              showClearButton="always"
              className="me-2"
              debounce={150}
              onIonInput={(e) => setSearchName((s) => e.target.value ?? "")}
            ></IonSearchbar>
            <div>
              <IonButton
                size="small"
                onClick={() => setIsModalOpen((s) => true)}
                color="tertiary"
              >
                <IonIcon icon={add} className="me-1"></IonIcon>
                Create Security
              </IonButton>
              <CreateUserModal
                role="guard"
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen((s) => false)}
                onCreateSuccess={handleCreateSuccess}
              />
            </div>
          </div>
          <Loading isLoading={loading?.isPageLoading}>
            {rowData && (
              <Table
                rowAutoHeight={true}
                columnHeaders={[
                  {
                    header: "Security",
                    field: "name",
                    renderCell: (params: any) => {
                      const fullname =
                        params.row.firstname + " " + params.row.lastname;
                      return renderCellLink(
                        fullname,
                        params.row.id,
                        onViewSecurityGuard
                      );
                    },
                  },
                  {
                    header: "Contact",
                    field: "contact",
                  },
                  {
                    header: "Organization",
                    field: "organization",
                  },
                  {
                    header: "Status",
                    field: "status",
                    width: 100,
                    renderCell: (params: any) => {
                      return renderCellUserStatus(params.value);
                    },
                  },
                  // {
                  //   header: "Created",
                  //   field: "created",
                  // },
                  // {
                  //   header: "Action",
                  //   field: "id",
                  //   width: 100,
                  //   renderCell: (params: any) => {
                  //     if (!params) {
                  //       return <IonRouterLink></IonRouterLink>;
                  //     }
                  //     return (
                  //       <IonButton
                  //         size="small"
                  //         color="tertiary"
                  //         onClick={() => viewSecurityGuard(params.value)}
                  //       >
                  //         View
                  //       </IonButton>
                  //     );
                  //   },
                  // },
                ]}
                rowData={rowData && rowData}
                totalDataCount={totalDataCount}
                onPageSizeChanged={handlePageSizeChange}
              ></Table>
            )}
          </Loading>
        </IonCard>
      </IonContent>
    </AdminHeader>
  );
}

export default SecurityGuard;
