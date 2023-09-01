import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import { IonContent, IonLoading, useIonViewWillEnter } from "@ionic/react";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import formatDate from "../../helpers/formatDate";
import Table from "../../components/Table";
import AxiosInstance from "../../Http/AxiosInstance";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";
import { GridPaginationModel } from "@mui/x-data-grid";

function Logs() {
  const [logs, setLogs] = useState<any>();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const loading = useLoading();

  useUpdateEffect(() => {
    const get = async () => {
      setIsLoading((s) => true);
      await getData();
      setIsLoading((s) => false);
    };
    get();
  }, [paginationModel]);
  useIonViewWillEnter(async () => {
    loading?.setPageLoading();
    await getData();
    loading?.pageLoaded();
  });
  async function getData() {
    await queryData();
  }
  async function queryData() {
    try {
      const response = await AxiosInstance().get(
        `admin/activity-logs?page=${paginationModel.page}&size=${paginationModel.pageSize}`
      );
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  function onPageChanged(pagination: GridPaginationModel) {
    setPaginationModel(pagination);
  }
  return (
    <AdminHeader>
      <IonContent>
        <Loading>
          <div>
            {logs && (
              <Table
                columnHeaders={[
                  {
                    header: "Log Type",
                    field: "type",
                  },
                  {
                    header: "Description",
                    field: "description",
                  },
                  {
                    header: "Date",
                    field: "created_at",
                    renderCell: (params) => {
                      return <>{formatDate(params.value)}</>;
                    },
                  },
                ]}
                rowAutoHeight
                rowData={logs.data == null ? [] : logs.data}
                totalDataCount={logs.total}
                onPageSizeChanged={onPageChanged}
              />
            )}
          </div>
          {isLoading && <IonLoading isOpen={isLoading} />}
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default Logs;
