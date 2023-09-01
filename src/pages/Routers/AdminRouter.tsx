import { IonApp, IonPage } from "@ionic/react";
import { UserProvider } from "../../context/useUser";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import AdminRoutings from "./AdminRoutings";

const AdminRouter: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  if (!show) {
    return (
      <IonPage>
        <UserProvider>
          <AdminMenu>
            <AdminRoutings />
          </AdminMenu>
        </UserProvider>
      </IonPage>
    );
  }
  return (
    <IonApp>
      <UserProvider>
        <AdminMenu>
          <AdminRoutings />
        </AdminMenu>
      </UserProvider>
    </IonApp>
  );
};

export default AdminRouter;
