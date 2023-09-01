import {
  IonContent,
  IonRouterLink,
  IonButton,
  IonLoading,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import { GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AxiosInstance from "../../Http/AxiosInstance";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import Table from "../../components/Table";
import AdminHeader from "../../components/Layout/AdminHeader";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";

function DeniedAccounts() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState<any>();
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>();
  const [searchName, setSearchName] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const loading = useLoading();

  useIonViewWillEnter(() => {
    queryData();
  });

  async function queryData(size = 5, page = 1) {
    try {
      loading?.setPageLoading();
      const response = await AxiosInstance().get(
        `admin/users/denied?size=${size}&page=${page}`
      );
      setRowData((r: any) => response.data.data);
      setTotalDataCount((t) => response.data.total);
      loading?.pageLoaded();
    } catch (error) {
      loading?.pageLoaded();
      console.error(error);
    }
  }
  function handlePageSizeChange(model: GridPaginationModel) {
    setPaginationModel(model);
    queryData(model.pageSize, model.page);
  }
  useUpdateEffect(() => {
    queryData(paginationModel?.pageSize, paginationModel?.page);
  }, [searchName]);

  async function acceptUser(id: number) {
    try {
      setShowLoader((s) => true);
      const response = await AxiosInstance().post(`admin/users/accept`, {
        id: id,
      });
      removeFromList(id);
      setShowLoader((s) => false);
    } catch (error) {
      console.error(error);
      setShowLoader((s) => false);
    }
  }
  function deleteUser(id: number) {
    setDisabledButton((s) => true);
    AxiosInstance()
      .post(`admin/users/delete`, {
        id: id,
      })
      .then((response) => {
        removeFromList(id);
        setDisabledButton((s) => false);
      })
      .catch((error) => {
        console.error(error);
        setDisabledButton((s) => false);
      });
  }
  function removeFromList(id: number) {
    setRowData((datas: any) => {
      return datas.filter((d: any) => d.id != id);
    });
  }

  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={loading?.isPageLoading}>
          <Table
            height={450}
            columnHeaders={[
              {
                header: "Fullname",
                field: "name",
                renderCell: (params) => {
                  return (
                    <p>
                      {params.row.firstname} {params.row.lastname}
                    </p>
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
              {
                header: "",
                field: "id",
                renderCell: (params: any) => {
                  if (!params) {
                    return <IonRouterLink></IonRouterLink>;
                  }
                  return (
                    <>
                      <IonButton
                        size="small"
                        color="success"
                        onClick={() => acceptUser(params.value)}
                      >
                        Accept
                      </IonButton>
                    </>
                  );
                },
              },
              //THIS IS FOR REMOVAL OF ACCOUNTS UNCOMMENT WHEN REMOVAL WILL BE  IMPLEMENTED
              // {
              //   header: "",
              //   field: "",
              //   renderCell: (params: any) => {
              //     if (!params) {
              //       return <IonRouterLink></IonRouterLink>;
              //     }
              //     return (
              //       <>
              //         <IonButton
              //           size="small"
              //           disabled={disabledButton}
              //           color="danger"
              //           onClick={() => deleteUser(params.row.id)}
              //         >
              //           Delete
              //         </IonButton>
              //       </>
              //     );
              //   },
              // },
            ]}
            rowData={rowData && rowData}
            totalDataCount={totalDataCount}
            onPageSizeChanged={handlePageSizeChange}
          ></Table>
          <IonLoading isOpen={showLoader} />
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default DeniedAccounts;
