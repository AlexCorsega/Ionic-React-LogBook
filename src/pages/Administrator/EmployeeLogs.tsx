import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import {
  IonContent,
  IonItem,
  IonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import EmployeeLogTable from "../../components/Admin/EmployeeLogTable";
import AxiosInstance from "../../Http/AxiosInstance";
import { GridPagination, GridPaginationModel } from "@mui/x-data-grid";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import EmployeesSelect from "../../components/Selects/EmployeesSelect";

function EmployeeLogs() {
  const [employeeLogs, setEmployeeLogs] = useState<any>();
  const [totalLogs, setTotalLogs] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 1,
  });
  const [selectedUserId, setSelectedUserId] = useState<any>();
  const [dataLoading, setDataLoading] = useState(false);
  const loading = useLoading();

  useUpdateEffect(() => {
    getData();
  }, [paginationModel, selectedUserId]);
  useIonViewWillEnter(async () => {
    loading?.setPageLoading();
    await getData();
    loading?.pageLoaded();
  });
  async function getData() {
    setDataLoading((s) => true);
    await queryData();
    setDataLoading((s) => false);
  }
  async function queryData() {
    var endpoint = `admin/employee-logs?size=${paginationModel?.pageSize}&page=${paginationModel?.page}`;
    if (selectedUserId != undefined && selectedUserId != null) {
      endpoint += `&user_id=${selectedUserId}`;
    }
    try {
      const response = await AxiosInstance().get(endpoint);
      setEmployeeLogs(response.data.data);
      setTotalLogs(response.data.total);
    } catch (error) {
      console.error(error);
    }
  }
  function onPageChange(gridPagination: GridPaginationModel) {
    setPaginationModel((s) => gridPagination);
  }
  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={loading?.isPageLoading}>
          <div className="my-2 ms-1">
            <EmployeesSelect
              onChange={(id) => {
                setSelectedUserId(id);
              }}
            />
          </div>
          <EmployeeLogTable
            totalLogs={totalLogs}
            employeeLogs={employeeLogs}
            onPageChange={onPageChange}
          />
          <IonLoading isOpen={dataLoading} />
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default EmployeeLogs;
