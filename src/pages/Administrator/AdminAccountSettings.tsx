import {
  IonContent,
  IonItem,
  IonList,
  IonToggle,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import AxiosInstance from "../../Http/AxiosInstance";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";

function AdminAccountSettings() {
  const [id, setId] = useState<number>(history.state?.usr?.data);
  const [permissions, setPermissions] = useState<any>();
  const [userPermissions, setUserPermissions] = useState<any>();
  const loading = useLoading();

  useEffect(() => {
    const get = async () => {
      loading?.setPageLoading();
      await allUserPermission();
      await queryPermissions();
      loading?.pageLoaded();
    };
    get();
  }, []);
  useIonViewWillEnter(() => {
    setId((s) => history.state?.usr?.data);
  });
  async function queryPermissions() {
    try {
      const response = await AxiosInstance().get("admin/permission/all");
      setPermissions((s: any) => response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function allUserPermission() {
    try {
      const response = await AxiosInstance().get(
        `admin/permission/user-permission/${id}`
      );
      setUserPermissions((s: any) => response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function onTogglePermission(permissionId: number, value: boolean) {
    try {
      if (value) {
        const pms = permissions.find((p: any) => p.id == permissionId);
        setUserPermissions((up: any) => {
          return [...up, pms];
        });
      } else {
        setUserPermissions((up: any) => {
          const ups = up.filter((p: any) => p.id != permissionId);
          return [...ups];
        });
      }
      const response = await AxiosInstance().post(
        "admin/permission/add-permission-to-admin",
        {
          user_id: id,
          permission_id: permissionId,
          permission_value: value,
        }
      );
    } catch (error) {
      alert(error);
    }
  }
  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={loading?.isPageLoading}>
          <h5 className="text-center">Admin Permissions</h5>
          <IonList>
            {permissions &&
              permissions.map((p: any, index: number) => {
                const format = p.name.replace("-", " ");
                return (
                  <IonItem key={index}>
                    <IonToggle
                      className="text-capitalize"
                      onIonChange={(e) =>
                        onTogglePermission(p.id, e.target?.checked)
                      }
                      checked={
                        userPermissions
                          ? userPermissions.some((up: any) => up.id == p.id)
                          : undefined
                      }
                    >
                      {format}
                    </IonToggle>
                  </IonItem>
                );
              })}
          </IonList>
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default AdminAccountSettings;
