import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonAvatar,
  IonImg,
  IonCol,
  IonMenuToggle,
  IonRouterLink,
  IonRippleEffect,
  IonPage,
  IonMenuButton,
  IonIcon,
  IonLoading,
  IonSplitPane,
  useIonRouter,
} from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BasePaths from "../../Http/BasePaths";
import CameraComponent from "../CameraComponent";
import { useAuth } from "../../authentication/auth";
import { useUser } from "../../context/useUser";
import AxiosFormData from "../../Http/AxiosFormData";
import MenuLink from "../MenuLink";

const GUARDROUTES = {
  HOME: "/guard",
  REPORTS: "/guard/reports",
  ACCOUNTSETTINGS: "/settings",
};
interface Props {
  children: React.ReactNode;
}
const GUARDPAGES = {
  HOME: "Home",
  REPORTS: "Reports",
  ACCOUNTSETTINGS: "AccountSettings",
};
const GuardMenuContext = createContext<{ getCurrentPage: () => string } | null>(
  null
);
const historyStack: string[] = [];

function GuardMenu({ children }: Props) {
  const [isLogout, setIsLogout] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const auth = useAuth();
  const userContext = useUser();

  useEffect(() => {
    changeUrlPath();
  }, []);
  function getCurrentPage() {
    // return historyStack.length == 0
    //   ? GUARDPAGES.HOME
    //   : historyStack[historyStack.length - 1];
    return currentPage ?? GUARDPAGES.HOME;
  }
  function changeUrlPath(urlPath: string = "") {
    setCurrentPage(urlPath);
  }
  function onChangedProfile(
    imageBlob: Blob,
    fileName: string,
    imageUrl?: string
  ) {
    const formData = new FormData();
    formData.append("profile", imageBlob);
    AxiosFormData({ url: "user/change-profile", formData: formData })
      .then((s) => {
        const userData = JSON.parse(localStorage.getItem("user") ?? "");
        userData.profile = s.data.profile;
        userContext?.setNewUser(userData);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function onLogout() {
    setIsLogout((s) => true);
    auth?.logout();
  }
  return (
    <GuardMenuContext.Provider value={{ getCurrentPage }}>
      <IonMenu contentId="main">
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
            <IonButton
              slot="end"
              fill="clear"
              color="danger"
              onClick={onLogout}
            >
              Logout
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonAvatar className="h-150px w-150px bg-gray d-flex items-center justify-center">
                {userContext?.user?.profile && (
                  <IonImg
                    src={BasePaths.Images + userContext?.user?.profile}
                    alt="Profile Picture"
                  />
                )}
                {!userContext?.user?.profile && (
                  <p className="ion-text-center text- ion-text-uppercase fs-5xl ion-no-padding">
                    {userContext?.user?.firstname[0]}
                  </p>
                )}
              </IonAvatar>
            </IonRow>
            <IonRow className="mt-1 ion-justify-content-center">
              <CameraComponent
                imageAlt="PROFILE PICTURE"
                disabled={false}
                showImage={false}
                color="light"
                textSize="xs"
                buttonText="CHANGE PROFILE"
                onCameraCaptureCallback={onChangedProfile}
              />
            </IonRow>
            <IonRow className="mt-4 ion-justify-content-center">
              <IonCol size="12" className="ion-no-padding">
                <MenuLink
                  content={GUARDPAGES.HOME}
                  onClick={() => changeUrlPath(GUARDPAGES.HOME)}
                  routerLink="/guard/home"
                />
              </IonCol>
              <IonCol size="12" className="ion-no-padding">
                <IonMenuToggle>
                  <MenuLink
                    content={GUARDPAGES.REPORTS}
                    onClick={() => changeUrlPath(GUARDPAGES.REPORTS)}
                    routerLink="/guard/reports"
                  />
                </IonMenuToggle>
              </IonCol>
              <IonCol size="12" className="ion-no-padding">
                <MenuLink
                  content={GUARDPAGES.ACCOUNTSETTINGS}
                  onClick={() => changeUrlPath(GUARDPAGES.ACCOUNTSETTINGS)}
                  routerLink="/guard/settings"
                />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonLoading
            // trigger="addLog"
            message="Logout..."
            isOpen={auth?.isLoggingOut}
            duration={1500}
            spinner="circular"
            className="text-danger"
          />
        </IonContent>
      </IonMenu>
      {children}
    </GuardMenuContext.Provider>
  );
}
export const useGuardMenu = () => {
  return useContext(GuardMenuContext);
};

export default GuardMenu;
