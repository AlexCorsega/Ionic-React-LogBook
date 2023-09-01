import React, { useEffect, useState } from "react";
import BasicCard from "./Cards/BasicCard";
import Table from "./Table";
import { GridPaginationModel } from "@mui/x-data-grid";
import AxiosInstance from "../Http/AxiosInstance";
import { useIonViewWillEnter } from "@ionic/react";
import formatDate from "../helpers/formatDate";

interface Props {
  id: number;
}
function ActivityLogs({ id }: Props) {
  const [model, setModel] = useState<any>();
  useEffect(() => {
    queryData();
  }, []);
  // useIonViewWillEnter(() => {
  //   queryData();
  // });
  function handlePageChange(pageModel: GridPaginationModel) {
    queryData(pageModel.pageSize, pageModel.page);
  }
  function queryData(size = 5, page = 1) {
    AxiosInstance()
      .get(`admin/user-logs-history?user_id=${id}&size=${size}&page=${page}`)
      .then((response) => {
        setModel((s: any) => response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <BasicCard title="Activity Logs" titleSlot="center">
        <Table
          height={500}
          columnHeaders={[
            {
              header: "Type",
              field: "type",
            },
            {
              header: "Description",
              field: "description",
            },
            {
              header: "Created",
              field: "created_at",
              renderCell: (params) => {
                return <>{formatDate(params.value)}</>;
              },
            },
          ]}
          rowData={model ?? []}
          totalDataCount={model?.total}
          onPageSizeChanged={handlePageChange}
        />
      </BasicCard>
    </>
  );
}

export default ActivityLogs;
