import { IonContent, IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import RoleAuth from "../../authentication/RoleAuth";
import Dashboard from "../Administrator/Dashboard";
import DeniedAccounts from "../Administrator/DeniedAccounts";
import Organization from "../Administrator/Organization";
import PendingAccounts from "../Administrator/PendingAccounts";
import SecurityGuard from "../Administrator/SecurityGuard";
import ViewOrganization from "../Administrator/ViewOrganization";
import ViewPendingAccount from "../Administrator/ViewPendingAccount";
import ViewSecurityGuard from "../Administrator/ViewSecurityGuard";
import OrganizationLogbook from "../Administrator/OrganizationLogbook";
import Administrators from "../Administrator/Administrators";
import ViewAdministrator from "../Administrator/ViewAdministrator";
import EmployeeLogs from "../Administrator/EmployeeLogs";
import Logs from "../Administrator/Logs";
import Reports from "../Administrator/Reports";
import AccountSettings from "../Account/AccountSettings";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminAccountSettings from "../Administrator/AdminAccountSettings";

function AdminRoutings() {
  return (
    <RoleAuth roles={["admin", "super-admin"]}>
      <IonRouterOutlet id="main-content">
        <Route exact={true} path={`/admin`}>
          <Redirect exact to="/admin/dashboard" />
        </Route>
        <Route
          exact={true}
          path={`/admin/dashboard`}
          render={() => <Dashboard />}
        />
        <Route
          exact={true}
          path={`/admin/administrators`}
          render={() => <Administrators />}
        />
        <Route
          exact={true}
          path={`/admin/administrators/:id`}
          render={() => <ViewAdministrator />}
        />
        <Route
          exact={true}
          path={`/admin/administrators/:id/account-settings`}
          render={() => <AdminAccountSettings />}
        />
        <Route
          exact={true}
          path={`/admin/organizations`}
          render={() => <Organization />}
        />
        <Route
          exact={true}
          path="/admin/organizations/:id"
          component={ViewOrganization}
        />
        <Route
          exact={true}
          path="/admin/organizations/:id/logbook"
          render={() => <OrganizationLogbook />}
        />
        <Route exact={true} path="/admin/guards" component={SecurityGuard} />
        <Route
          exact={true}
          path="/admin/guards/:id"
          component={ViewSecurityGuard}
        />
        <Route
          exact={true}
          path="/admin/users/pending"
          component={PendingAccounts}
        />
        <Route
          exact={true}
          path="/admin/users/pending/:id"
          component={ViewPendingAccount}
        />
        <Route
          exact={true}
          path="/admin/users/denied"
          component={DeniedAccounts}
        />
        <Route exact={true} path="/admin/reports" component={Reports} />
        <Route exact={true} path="/admin/account/settings">
          <AdminHeader>
            <IonContent>
              <AccountSettings />
            </IonContent>
          </AdminHeader>
        </Route>
        <Route
          exact={true}
          path="/admin/employeelogs"
          component={EmployeeLogs}
        />
        <Route exact={true} path="/admin/logs" component={Logs} />
        {/* <Route path="/settings">
                <AccountSettings />
              </Route> */}
      </IonRouterOutlet>
    </RoleAuth>
  );
}

export default AdminRoutings;
