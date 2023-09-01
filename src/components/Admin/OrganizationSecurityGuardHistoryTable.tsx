import { useIonViewWillEnter, IonButton, IonIcon } from "@ionic/react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AxiosInstance from "../../Http/AxiosInstance";
import renderCellStatus from "../../helpers/renderCellStatus";
import BasicCard from "../Cards/BasicCard";
import AddOrganizationSecurityModal from "./AddOrganizationSecurityModal";
import Table from "../Table";

interface Props {
  organization_id: number;
}
function OrganizationSecurityGuardHistoryTable({ organization_id }: Props) {
  const [data, setData] = useState<any>();
  const [totalDataCount, settotalDataCount] = useState(0);
  const [showAddSecurityModal, setShowAddSecurityModal] = useState(false);
  const history = useHistory();
  useEffect(() => {
    refreshData();
  }, []);
  useIonViewWillEnter(() => {
    refreshData();
  });
  function refreshData() {
    queryData();
  }

  function queryData(size = 5, page = 1) {
    AxiosInstance()
      .get(
        `admin/organizations/security-guard-history?organization_id=${organization_id}&size=${size}&page=${page}`
      )
      .then((response) => {
        setData((s: any) => response.data.data);
        settotalDataCount((s) => response.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handlePageChange(model: GridPaginationModel) {
    queryData(model.pageSize, model.page);
  }

  function onViewDetailsClick(id: number) {
    history.push(`/admin/guards/${id}`, { data: id });
  }
  function toggleAddSecurityModal() {
    setShowAddSecurityModal((s) => !s);
  }

  return (
    <>
      {data && (
        <BasicCard title="Security Guard History" titleSlot="center">
          <Table
            columnHeaders={[
              {
                header: "Security",
                field: "name",
                renderCell: (params: any) => {
                  return (
                    <div>
                      {params.row.user.firstname} {params.row.user.lastname}
                    </div>
                  );
                },
              },
              {
                header: "Date",
                field: "created_at",
                renderCell: (params: any) => {
                  return <>{params.value.split("T")[0]}</>;
                },
              },
            ]}
            rowData={data == null ? [] : data}
            totalDataCount={totalDataCount}
            onPageSizeChanged={handlePageChange}
          />
        </BasicCard>
      )}
    </>
  );
}

export default OrganizationSecurityGuardHistoryTable;
