import React, { useEffect, useState } from "react";
import Table from "../Table";
import { GridPaginationModel } from "@mui/x-data-grid";
import formatDate from "../../helpers/formatDate";
import useUpdateEffect from "../../customHooks/useUpdateEffect";

interface Props {
  employeeLogs: any;
  totalLogs: number;
  onPageChange: (parameters: GridPaginationModel) => void;
}
function EmployeeLogTable({ employeeLogs, totalLogs, onPageChange }: Props) {
  const [logs, setLogs] = useState(employeeLogs);

  useUpdateEffect(() => {
    setLogs(employeeLogs);
  }, [logs]);
  return (
    <div>
      {logs && (
        <Table
          columnHeaders={[
            {
              header: "Employee",
              field: "",
              renderCell: (params) => {
                return (
                  <>
                    {params.row.user.firstname} {params.row.user.lastname}
                  </>
                );
              },
            },
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
          rowData={employeeLogs == null ? [] : employeeLogs}
          totalDataCount={totalLogs}
          onPageSizeChanged={onPageChange}
        />
      )}
    </div>
  );
}

export default EmployeeLogTable;
