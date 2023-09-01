import {
  IonApp,
  IonButton,
  IonContent,
  IonItem,
  IonPage,
  IonRouterLink,
  IonRouterOutlet,
} from "@ionic/react";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import GuardRouter from "../Routers/GuardRouter";
import Home from "../SecurityGuard/Home";
import Reports from "../SecurityGuard/Reports";
import GuardLayout from "../../components/Layout/GuardLayout";
import Example2 from "./Example2";
import { useEffect } from "react";
import { IonReactRouter } from "@ionic/react-router";

const Example1: React.FC = () => {
  console.log("Example 1");
  return (
    <IonPage>
      <IonContent>
        <IonItem routerLink="/example2">Go to Example2</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Example1;
