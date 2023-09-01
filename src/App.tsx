import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
// import "./theme/variables.css";
import Login from "./pages/Login";

/*My Custom CSS */
import "./styles/basic-style.css";
import "./styles/animation.css";
import "./styles/custom-component-animation.css";
import "./styles/ionic-component.css";
import { AuthProvider, useAuth } from "./authentication/auth";
import Register from "./pages/Register";
import GuardRouter from "./pages/Routers/GuardRouter";
import AdminRouter from "./pages/Routers/AdminRouter";
import { LoadingProvider } from "./context/useLoading";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import ResetChangePassword from "./components/ResetChangePassword";
import RoleAuth, { AuthenticatedPage } from "./authentication/RoleAuth";
import { App as CapacitorApp } from "@capacitor/app";
import GlobalState from "./context/GlobalState";

setupIonicReact({
  animated: !isPlatform("mobileweb"),
});
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
// document.addEventListener("ionBackButton", (ev: any) => {
//   // ev.detail.register(10, (processNextHandler: any) => {
//   //   historyStack.pop();
//   //   // processNextHandler();
//   //   // if (router.canGoBack()) {
//   //   //   router.goBack();
//   //   // }
//   // });
//   // history.back();
// });
// document.removeEventListener("ionBackButton", (ev: any) => {
//   alert("test");
// });
let backCount = 1;
const App: React.FC = () => {
  const ionRouter = useIonRouter();
  const auth = useAuth();
  document.addEventListener("ionBackButton", (ev: any) => {
    // alert(`Can back: ${ionRouter.canGoBack()}`);
    if (backCount == 2) {
      ev.preventDefault();
      backCount = 0;
    } else {
      ev.detail.register(10, () => {
        if (!ionRouter.canGoBack()) {
          auth?.logout();
          CapacitorApp.exitApp();
        }
      });
    }
    backCount++;
  });
  return (
    <GlobalState>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/">
              <Redirect exact to="/login" />
            </Route>
            <Route exact={true} path="/register" component={Register} />
            <Route path="/reset-change-password">
              <AuthenticatedPage>
                <IonPage>
                  <IonContent>
                    <ResetChangePassword />
                  </IonContent>
                </IonPage>
              </AuthenticatedPage>
            </Route>
            <Route exact={true} path="/guard" component={GuardRouter} />
            <Route exact={true} path="/admin" component={AdminRouter} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </GlobalState>
  );
};

export default App;
