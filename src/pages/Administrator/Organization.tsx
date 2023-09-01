import {
  IonApp,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRouterLink,
  IonSearchbar,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import Table from "../../components/Table";
import { add, refresh } from "ionicons/icons";
import CreateOrganization from "../../components/Admin/CreateOrganization";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useHistory } from "react-router";
import renderCellStatus from "../../helpers/renderCellStatus";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import AdminMenu from "../../components/Layout/AdminMenu";
import useFirstLoadEfect from "../../customHooks/useFirstLoadEffect";
import AdminUserAccount from "../../components/Admin/AdminUserAccount";
import { useUser } from "../../context/useUser";
import AdminHeader from "../../components/Layout/AdminHeader";
import Refresh from "../../components/Refresh";
import renderCellLink from "../../helpers/renderCellLink";
import Loading from "../../components/Loading";
import { useLoading } from "../../context/useLoading";
import { FormProvider } from "../../context/useForm";

function Organization() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [rowData, setRowData] = useState<any>(null);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>();
  const [searchName, setSearchName] = useState("");
  const loading = useLoading();

  useIonViewWillEnter(() => {
    const get = async () => {
      loading?.setPageLoading();
      await queryData();
      loading?.pageLoaded();
    };
    get();
  });
  useUpdateEffect(() => {
    const get = async () => {
      await queryData(
        paginationModel?.pageSize,
        paginationModel?.page,
        searchName
      );
    };
    get();
  }, [searchName]);
  async function queryData(size = 5, page = 1, name = "") {
    try {
      const result = await AxiosInstance().get(
        `admin/organizations?size=${size}&page=${page}&name=${name}`
      );
      setRowData((r: any) => result.data.data);
      setTotalDataCount((t) => result.data.total);
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

  function handleSearch(event: any) {
    setSearchName((s) => event.target.value);
  }
  function onViewOrganization(id: number) {
    history.push(`/admin/organizations/${id}`, { data: id });
  }
  return (
    <AdminHeader>
      <IonContent>
        <Refresh onRefresh={queryData} />
        <div className="flex justify-between align-center my-1">
          <IonSearchbar
            showClearButton="always"
            className="me-2"
            debounce={150}
            onIonInput={handleSearch}
          ></IonSearchbar>
          <div>
            <IonButton
              size="small"
              onClick={() => setIsModalOpen((s) => true)}
              color="tertiary"
            >
              <IonIcon icon={add} className="me-1"></IonIcon>
              Create Organization
            </IonButton>
            <FormProvider>
              <CreateOrganization
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen((s) => false)}
                onCreateSuccess={handleCreateSuccess}
              />
            </FormProvider>
          </div>
        </div>
        <Loading isLoading={loading?.isPageLoading}>
          {rowData && (
            <Table
              rowAutoHeight={true}
              columnHeaders={[
                {
                  header: "Organization",
                  field: "name",
                  renderCell: (params) => {
                    return renderCellLink(
                      params.value,
                      params.row.id,
                      onViewOrganization
                    );
                  },
                },
                {
                  header: "Address",
                  field: "address",
                },
                {
                  header: "Status",
                  field: "active",
                  width: 100,
                  renderCell: (params: any) => {
                    return renderCellStatus(params.value);
                  },
                },
                //   {
                //     header: "Action",
                //     field: "id",
                //     width: 100,
                //     renderCell: (params: any) => {
                //       if (!params) {
                //         return <IonRouterLink></IonRouterLink>;
                //       }
                //       return (
                //         <IonButton
                //           size="small"
                //           color="tertiary"
                //           onClick={() => viewOrganization(params.value)}
                //         >
                //           View
                //         </IonButton>
                //       );
                //     },
                // },
              ]}
              rowData={rowData}
              totalDataCount={totalDataCount}
              onPageSizeChanged={handlePageSizeChange}
            ></Table>
          )}
        </Loading>
        <IonLoading isOpen={isDataLoading} />
      </IonContent>
    </AdminHeader>
  );
}

export default Organization;
