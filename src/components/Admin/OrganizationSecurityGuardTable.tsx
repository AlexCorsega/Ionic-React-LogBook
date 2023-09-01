import React, { useEffect, useRef, useState } from "react";
import Table from "../Table";
import { GridPaginationModel } from "@mui/x-data-grid";
import AxiosInstance from "../../Http/AxiosInstance";
import renderCellStatus from "../../helpers/renderCellStatus";
import BasicCard from "../Cards/BasicCard";
import {
  IonButton,
  IonIcon,
  IonLoading,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from "react-router";
import AddOrganizationSecurityModal from "./AddOrganizationSecurityModal";

interface Props {
  id: number;
}
interface Model {
  users: {
    id: number;
    firstname: string;
    lastname: string;
    contact: string;
    active: boolean;
    created: string;
  }[];
}

function OrganizationSecurityGuardTable({ id }: Props) {
  const [users, setUsers] = useState<Model[]>();
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
      .get(`admin/organizations-guards?id=${id}&size=${size}&page=${page}`)
      .then((response) => {
        console.log(response);
        setUsers((s: any) => response.data.data);
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
      {users && (
        <BasicCard title="Security Guard" titleSlot="center">
          <>
            <div className="text-end">
              <AddOrganizationSecurityModal
                id={id}
                isModalOpen={showAddSecurityModal}
                onClose={toggleAddSecurityModal}
                onAddSuccess={() => {
                  toggleAddSecurityModal();
                  refreshData();
                }}
              />
              <IonButton
                color="success"
                size="small"
                className="mb-2"
                onClick={() => toggleAddSecurityModal()}
              >
                <IonIcon icon={add} className="me-1" />
                Add Security
              </IonButton>
            </div>
          </>

          <Table
            columnHeaders={[
              {
                header: "Security",
                field: "name",
                renderCell: (params) => {
                  return (
                    <div>
                      {params.row.firstname} {params.row.lastname}
                    </div>
                  );
                },
              },
              {
                header: "Type",
                field: "type",
                renderCell: (params: any) => {
                  return (
                    <p className="text-capitalize">
                      {params.row.security_guard?.type}
                    </p>
                  );
                },
              },
              {
                header: "Start",
                field: "start",
                renderCell: (params: any) => {
                  return <>{params.row.security_guard?.start}</>;
                },
              },
              {
                header: "End",
                field: "end",
                renderCell: (params: any) => {
                  return <>{params.row.security_guard?.end}</>;
                },
              },
              {
                header: "Contact",
                field: "contact",
              },
              {
                header: "Status",
                field: "active",
                renderCell: (params: any) => {
                  return renderCellStatus(params.value);
                },
              },
              {
                header: "Details",
                field: "id",
                renderCell: (params) => {
                  return (
                    <IonButton
                      size="small"
                      color="tertiary"
                      onClick={() => onViewDetailsClick(params.value)}
                    >
                      Details
                    </IonButton>
                  );
                },
              },
              {
                header: "Action",
                field: "",
                renderCell: (params) => {
                  return (
                    <IonButton
                      size="small"
                      color="danger"
                      onClick={() => onViewDetailsClick(params.row.id)}
                    >
                      Remove
                    </IonButton>
                  );
                },
              },
            ]}
            rowData={users == null ? [] : users}
            totalDataCount={totalDataCount}
            onPageSizeChanged={handlePageChange}
          />
        </BasicCard>
      )}
    </>
  );
}

export default OrganizationSecurityGuardTable;
