import { GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import Table from "../Table";
import renderCellUserStatus from "../../helpers/renderCellUserStatus";
import { useIonViewWillEnter } from "@ionic/react";
interface Props {
  height?: number;
}

function SecurityGuardTable({ height }: Props) {
  const [guardReports, setGuardReports] = useState<any>(null);

  useEffect(() => {
    queryData();
  }, []);
  useIonViewWillEnter(() => {
    queryData();
  });
  function queryData(size = 5, page = 1) {
    AxiosInstance()
      .get(`admin/guards?size=${size}&page=${page}`)
      .then((response) => {
        setGuardReports((s: any) => response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handlePageChange(model: GridPaginationModel) {
    queryData(model.pageSize, model.page);
  }

  return (
    <>
      {guardReports && (
        <>
          <Table
            columnHeaders={[
              {
                header: "Guard",
                field: "name",
              },
              {
                header: "Organization",
                field: "organization",
              },
              {
                header: "Status",
                field: "status",
                renderCell: (params: any) => {
                  return renderCellUserStatus(params.value);
                },
              },
            ]}
            rowData={
              guardReports == null
                ? []
                : guardReports.data.map((d: any) => {
                    return {
                      id: d.id,
                      name: `${d.firstname} ${d.lastname}`,
                      organization: d.organization?.name,
                      status: d.status,
                    };
                  })
            }
            totalDataCount={guardReports == null ? 1 : guardReports.total}
            onPageSizeChanged={handlePageChange}
          />
        </>
      )}
    </>
  );
}

export default SecurityGuardTable;
