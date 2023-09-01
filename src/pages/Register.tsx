import {
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonText,
  IonItem,
  IonGrid,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import BasePageLayout from "../components/Layout/BasePageLayout";
import InputValidationComponent from "../components/InputValidationComponent";
import { Link } from "react-router-dom";
import AxiosInstance from "../Http/AxiosInstance";
import ButtonSpinner from "../components/ButtonSpinner";
import getResponseErrors from "../helpers/getResponseErrors";

function Register() {
  //Use State
  const [isFirstRegistration, setIsFirstRegistration] = useState(false);
  const [showLoginSpinner, setShowLoginSpinner] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //Validation state
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [contactError, setContactError] = useState(false);
  // const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [retypePasswordError, setRetypePasswordError] = useState(false);

  //Use Ref
  const firstnameRef = useRef<HTMLIonInputElement>(null);
  const lastnameRef = useRef<HTMLIonInputElement>(null);
  const contactRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const positionRef = useRef<HTMLIonSelectElement>(null);
  // const usernameRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const retypePasswordRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    AxiosInstance()
      .get("checkFirstRegistration")
      .then((res: any) => {
        setIsFirstRegistration((s) => res.data.message == "true");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function onRegisterClicked() {
    setIsSubmitClicked((s) => true);
    //Validations
    if (!positionRef.current?.value && !isFirstRegistration) {
      return;
    }
    if (
      !firstnameError &&
      !lastnameError &&
      !contactError &&
      !passwordError &&
      !retypePasswordError
    ) {
      setShowLoginSpinner((s) => !s);
      AxiosInstance()
        .post("register", {
          firstname: firstnameRef.current?.value,
          lastname: lastnameRef.current?.value,
          contact: contactRef.current?.value,
          role: positionRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          confirm_password: retypePasswordRef.current?.value,
        })
        .then((s) => {
          setShowLoginSpinner((s) => !s);
          setErrorMessage((s) => "");
          setSuccessMessage((s) => "Registered Successfully!\nRedirecting...");
          setTimeout(() => {
            history.replaceState(null, "", "/");
            window.location.assign("/");
          }, 3000);
        })
        .catch((err: any) => {
          setShowLoginSpinner((s) => !s);
          setErrorMessage((s) => {
            return getResponseErrors(err);
          });
        });
    }
  }
  return (
    <BasePageLayout>
      <IonGrid>
        <h2 className="ion-text-center">Register</h2>
        <IonRow>
          <IonCol>
            <InputValidationComponent
              ref={firstnameRef}
              type="text"
              required={true}
              email={false}
              label="Firstname"
              placeHolder=""
              hasError={setFirstnameError}
              isSubmitClick={isSubmitClicked}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <InputValidationComponent
              ref={lastnameRef}
              type="text"
              required={true}
              email={false}
              label="Lastname"
              placeHolder=""
              hasError={setLastnameError}
              isSubmitClick={isSubmitClicked}
            />
          </IonCol>
        </IonRow>
        {!isFirstRegistration && (
          <IonRow>
            <IonCol>
              <IonSelect placeholder="Select a role" ref={positionRef}>
                <div slot="label">
                  Position<IonText color="danger">(Required)</IonText>
                </div>
                <IonSelectOption value="guard">Guard</IonSelectOption>
                <IonSelectOption value="admin">Admin</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
        )}

        <IonRow>
          <IonCol>
            <InputValidationComponent
              ref={contactRef}
              type="number"
              required={true}
              email={false}
              label="Contact"
              placeHolder=""
              hasError={setContactError}
              isSubmitClick={isSubmitClicked}
              minLengthAttr={11}
              maxLengthAttr={11}
            />
          </IonCol>
        </IonRow>
        {/* <IonRow>
        <IonCol>
        <InputValidationComponent
        ref={usernameRef}
        type="text"
        required={true}
        email={false}
        label="Username"
        placeHolder=""
        hasError={setUsernameError}
        isSubmitClick={isSubmitClicked}
        minLengthAttr={6}
        />
        </IonCol>
      </IonRow> */}
        <IonRow>
          <IonCol>
            <InputValidationComponent
              ref={emailRef}
              type="email"
              required={true}
              email={true}
              label="Email"
              placeHolder=""
              isSubmitClick={isSubmitClicked}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <InputValidationComponent
              ref={passwordRef}
              type="password"
              required={true}
              email={false}
              label="Password"
              placeHolder=""
              hasError={setPasswordError}
              isSubmitClick={isSubmitClicked}
              minLengthAttr={6}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <InputValidationComponent
              ref={retypePasswordRef}
              type="password"
              required={true}
              email={false}
              label="Retype Password"
              placeHolder=""
              hasError={setRetypePasswordError}
              isSubmitClick={isSubmitClicked}
              minLengthAttr={6}
            />
          </IonCol>
        </IonRow>
        <h6 className="ion-text-end">
          <Link
            to="/"
            className="ion-padding text-decoration-none ion-margin-top"
          >
            Already have an account
          </Link>
        </h6>
        <p className="text-danger ws-pre">{errorMessage}</p>
        <p className="text-success ws-pre">{successMessage}</p>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto">
            <ButtonSpinner
              showSpinner={showLoginSpinner}
              text="Register"
              onClick={onRegisterClicked}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </BasePageLayout>
  );
}

export default Register;
