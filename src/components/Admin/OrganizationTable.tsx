import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import Table from "../Table";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useIonViewWillEnter } from "@ionic/react";

function OrganizationTable() {
  const [organizationReports, setOrganizationReports] = useState<any>(null);
  const [isDataFetch, setIsDataFetch] = useState(false);

  useEffect(() => {
    queryData();
  }, []);
  useIonViewWillEnter(() => {
    queryData();
  });
  function queryData(size = 5, page = 1) {
    AxiosInstance()
      .get(`admin/organizations?size=${size}&page=${page}`)
      .then((response) => {
        setOrganizationReports((s: any) => response.data);
        setIsDataFetch((s) => true);
      })
      .catch((err) => {
        console.error(err);
        setIsDataFetch((s) => true);
      });
  }
  function handlePageChange(model: GridPaginationModel) {
    queryData(model.pageSize, model.page);
  }

  return (
    <div>
      {organizationReports && (
        <Table
          columnHeaders={[
            {
              header: "Organization",
              field: "name",
            },
            {
              header: "Created",
              field: "created",
            },
            {
              header: "Guard",
              field: "",
              renderCell: (params) => {
                if (
                  Array.isArray(params.row.users) &&
                  params.row.users.length != 0
                ) {
                  return (
                    <p>
                      {params.row.users[0].firstname}{" "}
                      {params.row.users[0].lastname}
                    </p>
                  );
                }
                return <p></p>;
              },
            },
          ]}
          rowData={organizationReports == null ? [] : organizationReports.data}
          totalDataCount={
            organizationReports == null ? 1 : organizationReports.total
          }
          onPageSizeChanged={handlePageChange}
        />
      )}
    </div>
  );
}

export default OrganizationTable;
