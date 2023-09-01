import React, { useState } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonLoading,
  IonRouterLink,
  IonSearchbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { GridPaginationModel } from "@mui/x-data-grid";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import AxiosInstance from "../../Http/AxiosInstance";
import { add } from "ionicons/icons";
import renderCellUserStatus from "../../helpers/renderCellUserStatus";
import Table from "../../components/Table";
import CreateUserModal from "../../components/Admin/CreateUserModal";
import { useHistory } from "react-router";
import renderCellLink from "../../helpers/renderCellLink";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";
import formatDate from "../../helpers/formatDate";

function Administrators() {
  const history = useHistory();
  const [data, setData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>();
  const [searchName, setSearchName] = useState("");
  const loading = useLoading();

  useIonViewWillEnter(() => {
    queryData();
  });
  useUpdateEffect(() => {
    queryData(paginationModel?.pageSize, paginationModel?.page, searchName);
  }, [searchName]);
  async function queryData(size = 5, page = 1, name = "") {
    try {
      loading?.setLoading();
      const response = await AxiosInstance().get(
        `admin/employee/administrators?size=${size}&page=${page}&name=${name}`
      );
      setData((r: any) => response.data);
      loading?.loaded();
    } catch (error) {
      console.error(error);
    }
  }
  function handleCreateSuccess(data: any) {
    setIsModalOpen((s) => false);
    setData((rd: any) => {
      rd.data = [data, ...rd.data];
      rd.total = parseInt(rd.total) + 1;
      return { ...rd };
    });
  }
  async function handlePageSizeChange(model: GridPaginationModel) {
    setIsDataLoading((s) => true);
    setPaginationModel(model);
    await queryData(model.pageSize, model.page);
    setIsDataLoading((s) => false);
  }
  function onViewAdministrator(id: number) {
    history.push(`admin/administrators/${id}`, { data: id });
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
                Create Administrator
              </IonButton>
              <CreateUserModal
                role="admin"
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen((s) => false)}
                onCreateSuccess={handleCreateSuccess}
              />
            </div>
          </div>
          <Loading isLoading={loading?.isLoading}>
            {data && (
              <Table
                rowAutoHeight={true}
                columnHeaders={[
                  {
                    header: "Fullname",
                    field: "name",
                    renderCell: (params: any) => {
                      const fullname =
                        params.row.firstname + " " + params.row.lastname;
                      return renderCellLink(
                        fullname,
                        params.row.id,
                        onViewAdministrator
                      );
                    },
                  },
                  {
                    header: "Contact",
                    field: "contact",
                  },
                  {
                    header: "Approve Date",
                    field: "approve_at",
                    renderCell: (params: any) => {
                      return <p>{formatDate(params.value)}</p>;
                    },
                  },
                  {
                    header: "Status",
                    field: "status",
                    width: 100,
                    renderCell: (params: any) => {
                      return renderCellUserStatus(params.value.name);
                    },
                  },
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
                  //         onClick={() => onViewAdministrator(params.value)}
                  //       >
                  //         View
                  //       </IonButton>
                  //     );
                  //   },
                  // },
                ]}
                rowData={data.data}
                totalDataCount={data.total}
                onPageSizeChanged={handlePageSizeChange}
              ></Table>
            )}
          </Loading>
        </IonCard>
      </IonContent>
    </AdminHeader>
  );
}

export default Administrators;
