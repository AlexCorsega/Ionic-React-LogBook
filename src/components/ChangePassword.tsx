import { IonCol, IonGrid, IonItem, IonRow } from "@ionic/react";
import React, { useRef, useState } from "react";
import InputValidationComponent from "./InputValidationComponent";
import ButtonSpinner from "./ButtonSpinner";
import AxiosInstance from "../Http/AxiosInstance";

function ChangePassword() {
  const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const oldPasswordRef = useRef<HTMLIonInputElement>(null);
  const newPasswordRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordRef = useRef<HTMLIonInputElement>(null);

  function onChangePasswordClicked() {
    setShowSpinner((s) => !s);
    if (!oldPasswordError && !newPasswordError && !confirmPasswordError) {
      setErrors((s) => "");
      setSuccessMessage((s) => "");
      if (newPasswordRef.current?.value !== confirmPasswordRef.current?.value) {
        setErrors((s) => "The password did not match.");
        setShowSpinner((s) => !s);
      } else {
        AxiosInstance()
          .post("user/change-password", {
            old_password: oldPasswordRef.current?.value,
            new_password: newPasswordRef.current?.value,
            confirm_password: confirmPasswordRef.current?.value,
          })
          .then((s: any) => {
            setSuccessMessage((x) => s.data.message);
            setShowSpinner((s) => !s);
            if (oldPasswordRef.current) oldPasswordRef.current.value = "";
            if (newPasswordRef.current) newPasswordRef.current.value = "";
            if (confirmPasswordRef.current)
              confirmPasswordRef.current.value = "";
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
      <h5 className="text-center">Change Password</h5>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" sizeMd="6">
          <IonItem lines={oldPasswordError ? "none" : "full"}>
            <InputValidationComponent
              ref={oldPasswordRef}
              type="password"
              required={true}
              email={false}
              label="Old Password"
              placeHolder=""
              isSubmitClick={isSubmitClicked}
              hasError={setOldPasswordError}
              minLengthAttr={6}
            />
          </IonItem>
        </IonCol>
      </IonRow>
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
              showSpinner={showSpinner}
              onClick={onChangePasswordClicked}
            />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default ChangePassword;
