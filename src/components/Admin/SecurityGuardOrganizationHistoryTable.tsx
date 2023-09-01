import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import BasicCard from "../Cards/BasicCard";
import Table from "../Table";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useIonViewWillEnter } from "@ionic/react";

interface Props {
  id: number;
}
interface Model {
  date: string;
  organization: string;
}
function SecurityGuardOrganizationHistoryTable({ id }: Props) {
  const [model, setModel] = useState<Model[]>();
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    queryData();
  }, []);
  useIonViewWillEnter(() => {
    queryData();
  });
  function handlePageChange(pageModel: GridPaginationModel) {
    queryData(pageModel.pageSize, pageModel.page);
  }
  function queryData(size = 5, page = 1) {
    AxiosInstance()
      .get(`admin/security-guards/history?id=${id}&size=${size}&page=${page}`)
      .then((response) => {
        setModel((s) => response.data.data);
        setTotalData((s) => response.data.total);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <BasicCard title="Organizations History" titleSlot="center">
        <Table
          height={500}
          columnHeaders={[
            {
              header: "Organization",
              field: "organization",
            },
            {
              header: "date",
              field: "date",
            },
          ]}
          rowData={model ?? []}
          totalDataCount={totalData}
          onPageSizeChanged={handlePageChange}
        />
      </BasicCard>
    </>
  );
}

export default SecurityGuardOrganizationHistoryTable;
