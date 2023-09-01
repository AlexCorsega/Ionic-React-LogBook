import {
  IonContent,
  IonCard,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonRouterLink,
  IonPage,
  useIonViewWillEnter,
  IonLoading,
} from "@ionic/react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AxiosInstance from "../../Http/AxiosInstance";
import CreateOrganization from "../../components/Admin/CreateOrganization";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import renderCellStatus from "../../helpers/renderCellStatus";
import Table from "../../components/Table";
import AdminHeader from "../../components/Layout/AdminHeader";
import renderCellLink from "../../helpers/renderCellLink";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";

function PendingAccounts() {
  const history = useHistory();
  const [rowData, setRowData] = useState<any>();
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>();
  const [searchName, setSearchName] = useState("");
  const loading = useLoading();

  useEffect(() => {
    queryData();
  }, []);
  useIonViewWillEnter(async () => {
    loading?.setPageLoading();
    await queryData();
    loading?.pageLoaded();
  });

  async function queryData(size = 5, page = 1) {
    try {
      const response = await AxiosInstance().get(
        `admin/users/pending?size=${size}&page=${page}`
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
  useUpdateEffect(() => {
    queryData(paginationModel?.pageSize, paginationModel?.page);
  }, [searchName]);
  function handleSearch(event: any) {
    setSearchName((s) => event.target.value);
  }
  function onViewPendingAccount(id: number) {
    history.push(`/admin/users/pending/${id}`, { data: id });
  }
  return (
    <AdminHeader>
      <IonContent>
        <IonLoading isOpen={isDataLoading} />
        <Loading isLoading={loading?.isPageLoading}>
          {rowData && (
            <Table
              rowAutoHeight
              height={500}
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
                      onViewPendingAccount
                    );
                  },
                },
                {
                  header: "Contact",
                  field: "contact",
                },
                {
                  header: "Role",
                  field: "role",
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
                //         onClick={() => viewPendingAccount(params.value)}
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
      </IonContent>
    </AdminHeader>
  );
}

export default PendingAccounts;
