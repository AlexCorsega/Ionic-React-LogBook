import {
  IonAlert,
  IonButton,
  IonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import generateGuid from "../../helpers/generateGuid";
import AxiosInstance from "../../Http/AxiosInstance";

interface Props {
  id: number;
  onResetSuccess?: () => void;
  onResetFailed?: () => void;
}
function ResetEmployeePassword({ id, onResetFailed, onResetSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const guid = generateGuid();

  useIonViewWillEnter(() => {
    setShowReset((s) => true);
    setShowSuccess((s) => false);
  });
  async function onYesClick() {
    await postData();
    setShowSuccess((s) => true);
  }
  async function postData() {
    try {
      setIsLoading((s) => true);
      const response = await AxiosInstance().post(
        "admin/employee/reset-password",
        {
          id: id,
        }
      );
      setIsLoading((s) => false);
      if (onResetSuccess) onResetSuccess();
    } catch (error) {
      if (onResetFailed) onResetFailed();
      setIsLoading((s) => false);
      console.error(error);
    }
  }
  return (
    <>
      <IonButton id={guid} color={"danger"}>
        Reset Password
      </IonButton>
      <IonAlert
        isOpen={showReset}
        trigger={guid}
        header="Are you sure to reset employee's password?"
        message="Password will be set to its email."
        buttons={[
          {
            text: "No",
            cssClass: "alert-button-cancel",
          },
          {
            text: "Yes",
            cssClass: "bg-danger",
            handler: onYesClick,
          },
        ]}
      ></IonAlert>
      <IonAlert
        isOpen={showSuccess}
        header="Password successfully set to default."
        buttons={[
          {
            text: "OK",
            handler: () => setShowSuccess((s) => false),
          },
        ]}
      />
      <IonLoading isOpen={isLoading} />
    </>
  );
}

export default ResetEmployeePassword;
