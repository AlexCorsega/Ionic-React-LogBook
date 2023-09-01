import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonMenuToggle,
  IonRippleEffect,
  IonRouterLink,
  IonAccordion,
  IonItem,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import MenuLink from "../MenuLink";
import Administrators from "../../pages/Administrator/Administrators";
import { useUser } from "../../context/useUser";
import { useAuth } from "../../authentication/auth";
import { ROLES } from "../../pages/Login";
export const ADMINPAGES = {
  DASHBOARD: "Dashboard",
  ORGANIZATION: "Organizations",
  GUARD: "Security Guards",
  ADMIN: "Administrators",
  PENDINGACCOUNTS: "Pending Accounts",
  DENIEDACCOUNTS: "Denied Accounts",
  REPORTS: "Reports",
  EMPLOYEELOGS: "Employee Logs",
  LOGS: "My Activity Logs",
};
interface Props {
  children: React.ReactNode;
}

const AdminMenuContext = createContext<{
  getCurrentPage: () => string;
  changePage: (page: string) => void;
  // getTotalStack: () => number;
  // canGoBack: () => boolean;
  // goBack: () => void;
} | null>(null);

const navigationStack: any[] = [];

function AdminMenu({ children }: Props) {
  const [currentPage, setCurrentPage] = useState(ADMINPAGES.DASHBOARD);
  const user = useAuth();
  function changePage(page: string) {
    navigationStack.push(page);
    setCurrentPage((s) => page);
  }
  function getTotalStack() {
    return navigationStack.length;
  }
  function getCurrentPage() {
    return currentPage ?? "Dashboard";
  }
  function goBack() {
    navigationStack.pop();
  }

  return (
    <AdminMenuContext.Provider value={{ getCurrentPage, changePage }}>
      <IonMenu contentId="main-content">
        <IonHeader className="ion-no-border">
          <IonToolbar color="primary">
            <IonTitle className="text-center">Administrator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" className="">
                <MenuLink
                  content={ADMINPAGES.DASHBOARD}
                  onClick={() => changePage(ADMINPAGES.DASHBOARD)}
                  routerLink="/admin/dashboard"
                  isActive={currentPage == ADMINPAGES.DASHBOARD ? true : false}
                />
                <MenuLink
                  content={ADMINPAGES.ORGANIZATION}
                  onClick={() => changePage(ADMINPAGES.ORGANIZATION)}
                  routerLink="/admin/organizations"
                  isActive={
                    currentPage == ADMINPAGES.ORGANIZATION ? true : false
                  }
                />
                {user?.getRole() == ROLES.SUPERADMIN && (
                  <MenuLink
                    content={ADMINPAGES.ADMIN}
                    onClick={() => changePage(ADMINPAGES.ADMIN)}
                    routerLink="/admin/administrators"
                    isActive={currentPage == ADMINPAGES.ADMIN ? true : false}
                  />
                )}
                <MenuLink
                  content={ADMINPAGES.GUARD}
                  onClick={() => changePage(ADMINPAGES.GUARD)}
                  routerLink="/admin/guards"
                  isActive={currentPage == ADMINPAGES.GUARD ? true : false}
                />
                <MenuLink
                  content={ADMINPAGES.PENDINGACCOUNTS}
                  onClick={() => changePage(ADMINPAGES.PENDINGACCOUNTS)}
                  routerLink="/admin/users/pending"
                  isActive={
                    currentPage == ADMINPAGES.PENDINGACCOUNTS ? true : false
                  }
                />
                <MenuLink
                  content={ADMINPAGES.DENIEDACCOUNTS}
                  onClick={() => changePage(ADMINPAGES.DENIEDACCOUNTS)}
                  routerLink="/admin/users/denied"
                  isActive={
                    currentPage == ADMINPAGES.DENIEDACCOUNTS ? true : false
                  }
                />
                {user?.getRole() == ROLES.SUPERADMIN && (
                  <>
                    <MenuLink
                      content={ADMINPAGES.REPORTS}
                      onClick={() => changePage(ADMINPAGES.REPORTS)}
                      routerLink="/admin/reports"
                      isActive={
                        currentPage == ADMINPAGES.REPORTS ? true : false
                      }
                    />
                    <MenuLink
                      content={ADMINPAGES.EMPLOYEELOGS}
                      onClick={() => changePage(ADMINPAGES.EMPLOYEELOGS)}
                      routerLink="/admin/employeelogs"
                      isActive={
                        currentPage == ADMINPAGES.EMPLOYEELOGS ? true : false
                      }
                    />
                  </>
                )}
                <MenuLink
                  content={ADMINPAGES.LOGS}
                  onClick={() => changePage(ADMINPAGES.LOGS)}
                  routerLink="/admin/logs"
                  isActive={currentPage == ADMINPAGES.LOGS ? true : false}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonMenu>
      {children}
    </AdminMenuContext.Provider>
  );
}
export const useAdminMenu = () => {
  return useContext(AdminMenuContext);
};

export default AdminMenu;
