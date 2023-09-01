import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import VisitorDetailsModel from "../Models/VisitorDetailsModel";
import { useParams } from "react-router";
import AxiosInstance from "../Http/AxiosInstance";
import BasePaths from "../Http/BasePaths";
import Loading from "./Loading";
import GuardHeader from "./Layout/GuardHeader";
// interface VisitoryDetailPageProps
//   extends RouteComponentProps<{
//     id: string;
//   }> {}
function Logbook() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<VisitorDetailsModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState("");
  useEffect(() => {
    const url = `guard/logbook/log?id=${id}`;
    const request = AxiosInstance()
      .get(url)
      .then((s) => {
        setData((d) => s.data.data);
        setNote((x) => s.data.data.note ?? "");
        setIsLoading((s) => false);
        return JSON.stringify(s);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading((s) => false);
        return err;
      });
  }, []);
  return (
    <GuardHeader>
      <IonContent>
        <Loading isLoading={isLoading}>
          <IonGrid fixed={true}>
            <IonRow>
              <IonCol>
                <h2>{BasePaths.Images + data?.signature}</h2>
                <IonImg
                  src={BasePaths.Images + data?.signature}
                  alt="Signature Image"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {note && <IonImg src={BasePaths.Images + data?.note} />}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Name</IonLabel>
                  <h5>
                    {data?.firstname} {data?.lastname}
                  </h5>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Description</IonLabel>
                  <h5>{data?.description}</h5>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Type</IonLabel>
                  <h5>{data?.logtype}</h5>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked">Date & Time</IonLabel>
                  <h5>{data?.created}</h5>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Loading>
      </IonContent>
    </GuardHeader>
  );
}

export default Logbook;
