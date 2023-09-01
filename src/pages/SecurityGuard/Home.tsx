import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";

import { LogTypeDTO } from "../../DTO/LogTypeDTO";
import AxiosInstance from "../../Http/AxiosInstance";
import { VisitorModel } from "../../Models/VisitorModel";
import AddLogbookModal from "../../components/AddLogbookModal";
import AlertLogType from "../../components/Home/AlertLogType";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import Logbooks from "../../components/Admin/Logbooks";
import useGetDate from "../../customHooks/useGetDate";
import GuardHeader from "../../components/Layout/GuardHeader";
import LogtypeSelect from "../../components/Selects/LogtypeSelect";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import Refresh from "../../components/Refresh";
import { useLoading } from "../../context/useLoading";
import ChangePasswordAlert from "../../components/ChangePasswordAlert";
import { useAuth } from "../../authentication/auth";

interface GuardModel {
  date: string;
  organization: string;
}
const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCountPerPage, setDataCountPerPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const date = useGetDate("mm/dd/yyyy");
  const [data, setData] = useState<VisitorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [logTypeDTO, setLogTypeDTO] = useState<LogTypeDTO>({ id: 0, name: "" });
  const [guardModel, setGuardModel] = useState<GuardModel>();
  const [logtypeId, setLogTypeId] = useState<number>();
  const [logbookDataLoading, setLogbookDataLoading] = useState(false);
  const loading = useLoading();
  const auth = useAuth();

  useEffect(() => {
    setIsLoading((s) => true);
    getDashboard();
    queryData();
    setIsLoading((s) => false);
  }, []);
  useUpdateEffect(() => {
    queryData();
  }, [logtypeId]);
  function onPageClicked(pagenumber: number) {
    if (pagenumber == currentPage && pagenumber < 1) return;
    queryData(pagenumber);
    setCurrentPage((s) => pagenumber);
  }
  function onAddLogs(data: VisitorModel) {
    console.log(data);
    data.logtype = { name: data.logtype };
    data.created = useGetDate("mm/dd/yyyy");
    setData((d) => [data, ...d]);
    toggleModal();
  }
  function getDashboard() {
    AxiosInstance()
      .get<any>(`guard/dashboard`)
      .then((s) => {
        setGuardModel((x) => s.data);
        return JSON.stringify(s);
      })
      .catch((err) => {
        return err;
      });
  }
  async function queryData(page = 1) {
    try {
      setLogbookDataLoading((s) => true);
      const response = await AxiosInstance().get<any>(
        `guard/logbook/all?page=${page}&logtype_id=${
          logtypeId != undefined ? logtypeId : ""
        }`
      );
      setData((d) => response.data.data);
      setDataCountPerPage((d) => response.data.per_page);
      setTotalData((d) => response.data.total);
      setLogbookDataLoading((s) => false);
    } catch (error) {
      setLogbookDataLoading((s) => false);
    }
  }
  function handleRefresh() {
    queryData(currentPage);
  }
  function toggleModal() {
    if (isModalOpen) setIsModalOpen((m) => false);
    else setIsModalOpen((m) => true);
  }
  return (
    <GuardHeader>
      <IonContent>
        <Refresh onRefresh={handleRefresh} />
        <Loading isLoading={isLoading}>
          <IonGrid fixed={true}>
            <IonRow>
              <IonCol>
                <IonItem lines="none">
                  <div>
                    <h1>
                      {" "}
                      {guardModel?.organization
                        ? guardModel?.organization
                        : "No Organization"}
                    </h1>
                    <div>{guardModel?.date}</div>
                  </div>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="flex  justify-between align-center mt-2">
            <LogtypeSelect onChange={(value) => setLogTypeId(value)} />
            <Pagination
              className="ion-no-padding"
              currentPage={currentPage}
              totalDataCount={totalData}
              dataCountPerPage={dataCountPerPage}
              onPageClick={onPageClicked}
            />
          </div>
          <Loading isLoading={logbookDataLoading}>
            <Logbooks data={data} />
          </Loading>
        </Loading>

        <AlertLogType
          onDidDismissCallback={(s) => {
            if (
              s.detail.data.values != null &&
              s.detail.data.values != undefined
            ) {
              setLogTypeDTO((d) => s.detail.data.values);
              toggleModal();
            }
          }}
        />
        {/* <IonRouterLink routerLink="/home/reports">Test </IonRouterLink> */}
        {/* <FabComponent X="end" Y="bottom" size="small" /> */}
        {/* <FabComponent X="end" Y="bottom" size="small" onClick={toggleModal} /> */}
      </IonContent>
      <AddLogbookModal
        title="Add Log"
        isOpen={isModalOpen}
        onClose={toggleModal}
        onAddLogClick={onAddLogs}
        logtypeDTO={logTypeDTO}
      />
    </GuardHeader>
  );
};

export default Home;
