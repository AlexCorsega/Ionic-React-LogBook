import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import { personCircleSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";
import DataReport from "../../components/DataReport";
import Loading from "../../components/Loading";
import { useLoading } from "../../context/useLoading";
import GuardHeader from "../../components/Layout/GuardHeader";

interface Props {
  visitors: number;
  attendance: number;
  note: number;
}
interface Model {
  name: string;
  count: number;
}

function Reports() {
  const loader = useLoading();
  const [data, setData] = useState<Model[]>();
  const [date, setDate] = useState<string>();
  useEffect(() => {
    AxiosInstance()
      .get("guard/logbook/reports")
      .then((s) => {
        loader?.loaded();
        setData((x) => s.data.reports);
        setDate((x) => s.data.date);
      })
      .catch((err) => {
        loader?.loaded();
      });
  }, []);
  return (
    <GuardHeader>
      <IonContent>
        <Loading isLoading={loader?.isLoading ?? false}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <h1 className="ion-text-center fs-xl">Reports</h1>
                <p className="ion-text-center text-gray">{date}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              {data?.map((d, index) => {
                const color = index % 2 == 0 ? "primary" : "tertiary";
                return (
                  <IonCol key={d.name} size="12" sizeSm="4">
                    <DataReport
                      actualData={d.count}
                      icon={personCircleSharp}
                      color={color}
                      iconColor={color}
                      label={d.name}
                    />
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        </Loading>
      </IonContent>
    </GuardHeader>
  );
}

export default Reports;
