import { IonPage, IonApp } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { UserProvider } from "../../context/useUser";
import GuardRoutings from "./GuardRoutings";
import GuardMenu from "../../components/Layout/GuardMenu";

// const DashboardPage: React.FC<RouteComponentProps> = ({ match }) => {
//   return (
//     <IonRouterOutlet>
//       <Route exact path={match.url} component={UsersListPage} />
//       <Route path={`${match.url}/users/:id`} component={UserDetailPage} />
//       <Route render={() => <Redirect to={match.url} />} />
//     </IonRouterOutlet>
//   );
// };
const GuardRouter: React.FC<RouteComponentProps> = ({ match }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  if (!show) {
    return (
      <IonPage>
        <UserProvider>
          <GuardMenu>
            <GuardRoutings />
          </GuardMenu>
        </UserProvider>
      </IonPage>
    );
  }
  return (
    <IonApp>
      <UserProvider>
        <GuardMenu>
          <GuardRoutings />
        </GuardMenu>
      </UserProvider>
    </IonApp>
  );
};
export default GuardRouter;
