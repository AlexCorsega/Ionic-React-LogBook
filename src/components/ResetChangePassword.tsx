import { IonGrid, IonRow, IonCol, IonItem, IonLoading } from "@ionic/react";
import React, { useRef, useState } from "react";
import AxiosInstance from "../Http/AxiosInstance";
import ButtonSpinner from "./ButtonSpinner";
import InputValidationComponent from "./InputValidationComponent";
import { useAuth } from "../authentication/auth";
import { useHistory } from "react-router";
import { ROLES } from "../pages/Login";

function ResetChangePassword() {
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const newPasswordRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordRef = useRef<HTMLIonInputElement>(null);
  const auth = useAuth();
  const history = useHistory();
  function onChangePasswordClicked() {
    setShowSpinner((s) => !s);
    if (!newPasswordError && !confirmPasswordError) {
      setErrors((s) => "");
      setSuccessMessage((s) => "");
      if (newPasswordRef.current?.value !== confirmPasswordRef.current?.value) {
        setErrors((s) => "The password did not match.");
        setShowSpinner((s) => !s);
      } else {
        AxiosInstance()
          .post("user/reset-change-password", {
            new_password: newPasswordRef.current?.value,
            confirm_password: confirmPasswordRef.current?.value,
          })
          .then((s: any) => {
            setSuccessMessage((x) => s.data.message);
            setShowSpinner((s) => !s);
            if (newPasswordRef.current) newPasswordRef.current.value = "";
            if (confirmPasswordRef.current)
              confirmPasswordRef.current.value = "";

            if (
              auth?.getRole() == ROLES.ADMIN ||
              auth?.getRole() == ROLES.SUPERADMIN
            ) {
              history.replace("/admin");
            } else if (auth?.getRole() == ROLES.GUARD) {
              history.replace("/guard");
            }
          })
          .catch((err: any) => {
            console.log(err);
            setErrors(err.response.data.message);
            setShowSpinner((s) => !s);
          });
      }
    } else {
      setShowSpinner((s) => !s);
    }
  }
  return (
    <IonGrid className="w-100">
      <IonLoading isOpen={showSpinner} />
      <h5 className="text-center">Change Password</h5>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" sizeMd="6">
          <IonItem lines={newPasswordError ? "none" : "full"}>
            <InputValidationComponent
              ref={newPasswordRef}
              type="password"
              required={true}
              email={false}
              label="New Password"
              placeHolder=""
              isSubmitClick={isSubmitClicked}
              hasError={setNewPasswordError}
              minLengthAttr={6}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" sizeMd="6">
          <IonItem lines={confirmPasswordError ? "none" : "full"}>
            <InputValidationComponent
              ref={confirmPasswordRef}
              type="password"
              required={true}
              email={false}
              label="Confirm Password"
              placeHolder=""
              isSubmitClick={isSubmitClicked}
              hasError={setConfirmPasswordError}
              minLengthAttr={6}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol>
          <p className="text-danger">{errors}</p>
          <p className="text-success">{successMessage}</p>
          <div className="flex justify-center mt-2">
            <ButtonSpinner
              textSize="sm"
              text="Change Password"
              onClick={onChangePasswordClicked}
            />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default ResetChangePassword;
