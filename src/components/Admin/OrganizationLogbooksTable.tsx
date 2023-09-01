import { GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import Table from "../Table";
import { useParams } from "react-router";
import { IonButton, useIonViewWillEnter } from "@ionic/react";
import formatDate from "../../helpers/formatDate";
import DateFilter from "../DateFilter";
import OrganizationSecurityGuards from "./OrganizationSecurityGuards";
import { useLoading } from "../../context/useLoading";
import Loading from "../Loading";
import useUpdateEffect from "../../customHooks/useUpdateEffect";

interface Props {
  onLogbookDetailsClick?: (id: number) => void;
}
const INITIAL_DATA = {
  size: "",
  page: "",
  date_from: "",
  date_to: "",
  guard: "",
};

function OrganizationLogbooksTable({ onLogbookDetailsClick }: Props) {
  const [id, setId] = useState<number>(history.state?.usr?.data);

  const [organizationLogbooks, setOrganizationLogbooks] = useState<any>(null);
  const [queryModel, setQueryModel] = useState<any>(INITIAL_DATA);
  const [dataLoading, setDataLoading] = useState(false);
  const [securityGuards, setSecurityGuards] = useState<any>();

  const loading = useLoading();

  useIonViewWillEnter(() => {
    setId(history.state?.usr?.data);
  });

  useEffect(() => {
    queryData();
    querySecurityGuards();
  }, [id]);
  useUpdateEffect(() => {
    queryData();
  }, [
    queryModel.size,
    queryModel.page,
    queryModel.date_from,
    queryModel.date_to,
    queryModel.guard,
  ]);
  useIonViewWillEnter(async () => {
    loading?.setPageLoading();
    await queryData();
    loading?.pageLoaded();
  });

  async function queryData() {
    try {
      setDataLoading((s) => true);
      const response = await AxiosInstance().get(
        `admin/organizations/logbooks?id=${id}&size=${queryModel.size}&page=${queryModel.page}&date_from=${queryModel.date_from}&date_to=${queryModel.date_to}&guard_id=${queryModel.guard}`
      );
      setOrganizationLogbooks((s: any) => response.data);
      setDataLoading((s) => false);
    } catch (error) {
      console.error(error);
      setDataLoading((s) => false);
    }
  }
  async function querySecurityGuards() {
    try {
      const response = await AxiosInstance().get(
        `admin/organizations/${id}/security-guards`
      );
      setSecurityGuards(response.data);
    } catch (error) {}
  }
  function handlePageChange(model: GridPaginationModel) {
    setQueryModel((s: any) => {
      if (s) {
        s.size = model.pageSize;
        s.page = model.page;
      }
      return { ...s };
    });
  }
  function onFromSelected(date: string) {
    console.log(date);
    setQueryModel((s: any) => {
      if (s) {
        s.date_from = date;
      }
      return { ...s };
    });
  }
  function onToSelected(date: string) {
    setQueryModel((s: any) => {
      if (s) {
        s.date_to = date;
      }
      return { ...s };
    });
  }
  function onSecurityGuardsChange(id: number) {
    if (id != undefined) {
      setQueryModel((s: any) => {
        if (s) {
          s.guard = id;
        }
        return { ...s };
      });
    }
  }
  return (
    <div>
      <Loading isLoading={loading?.isPageLoading}>
        <div className="flex gap-3 justify-between">
          <OrganizationSecurityGuards
            securityGuards={securityGuards}
            onChange={onSecurityGuardsChange}
          />
          <DateFilter
            onFromDateSelected={onFromSelected}
            onToDateSelected={onToSelected}
          />
        </div>
        <Loading isLoading={dataLoading}>
          {organizationLogbooks && (
            <Table
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
                  header: "Type",
                  field: "logtype",
                  renderCell: (params) => {
                    return <p>{params.row.logtype.name}</p>;
                  },
                },
                {
                  header: "Description",
                  field: "description",
                },
                {
                  header: "Created",
                  field: "created_at",
                  renderCell: (params) => {
                    return <p>{formatDate(params.value)}</p>;
                  },
                },
                {
                  header: "",
                  field: "id",
                  renderCell: (params) => {
                    return (
                      <IonButton
                        size="small"
                        color="tertiary"
                        onClick={() => {
                          if (onLogbookDetailsClick)
                            onLogbookDetailsClick(params.value);
                        }}
                      >
                        Details
                      </IonButton>
                    );
                  },
                },
              ]}
              rowData={
                organizationLogbooks == null ? [] : organizationLogbooks.data
              }
              totalDataCount={
                organizationLogbooks == null ? 0 : organizationLogbooks.total
              }
              onPageSizeChanged={handlePageChange}
            />
          )}
        </Loading>
      </Loading>
    </div>
  );
}

export default OrganizationLogbooksTable;
