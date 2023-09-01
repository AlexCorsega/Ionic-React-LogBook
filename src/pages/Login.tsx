import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonRouterLink,
  IonRow,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircleSharp } from "ionicons/icons";
import AxiosInstance, { getAxiosUri } from "../Http/AxiosInstance";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../authentication/auth";
import { Link, useHistory } from "react-router-dom";
import BasePageLayout from "../components/Layout/BasePageLayout";
import InputValidationComponent from "../components/InputValidationComponent";
import ButtonSpinner from "../components/ButtonSpinner";
import getResponseErrors from "../helpers/getResponseErrors";
import { IonReactRouter } from "@ionic/react-router";
import PasswordInput from "../components/Inputs/PasswordInput";
import ChangePasswordAlert from "../components/ChangePasswordAlert";
export const ROLES = {
  GUARD: "guard",
  ADMIN: "admin",
  SUPERADMIN: "super-admin",
};

const Login = () => {
  const [loginError, setLoginError] = useState<string>("");
  const [showLoginSpinner, setShowLoginSpinner] = useState<boolean>(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState<string>("");

  const [showResetPassword, setShowResetPassword] = useState(false);

  const emailRef = useRef<HTMLIonInputElement>(null);
  const auth = useAuth();
  const ionHistory = useHistory();

  useEffect(() => {
    console.log("login");
  }, []);
  useIonViewWillEnter(() => {
    setShowResetPassword((s) => false);
  });
  async function onLoginClicked() {
    setIsSubmitClicked((s) => !s);
    setLoginError((s) => "");
    //Validations
    if (
      emailRef.current?.value &&
      emailRef.current.value.toString().length > 5 &&
      password &&
      password.length > 5
    ) {
      setShowLoginSpinner((s) => true);
      const requestData = {
        email: emailRef.current?.value,
        password: password,
      };
      setShowLoginSpinner((s) => true);
      setIsSubmitClicked((s) => !s);
      try {
        const response = await AxiosInstance().post("login", requestData);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem(
          "isChangePasswordRequired",
          response.data.user.isChangePasswordRequired
        );
        auth?.login(response.data.user);
        if (Boolean(response.data.user.isChangePasswordRequired)) {
          setShowResetPassword((s) => true);
        } else {
          redirectUser(response.data.role);
        }
      } catch (error) {
        setLoginError((s) => getResponseErrors(error));
      }
      setShowLoginSpinner((s) => false);
      setIsSubmitClicked((s) => !s);
    }
  }
  function redirectUser(role: string) {
    if (role == ROLES.GUARD) {
      ionHistory.replace("/guard");
      history.replaceState(null, "", "/guard");
      window.location.assign("/guard");
    } else if (role == ROLES.ADMIN || role == ROLES.SUPERADMIN) {
      // ionHistory.replace("/admin");
      history.replaceState(null, "", "/admin");
      window.location.assign("/admin");
    }
  }
  return (
    <BasePageLayout>
      <ChangePasswordAlert
        redirectionLink="/reset-change-password"
        isOpen={showResetPassword}
        onDismiss={() => setShowResetPassword((s) => false)}
      />
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto">
            <IonIcon
              icon={personCircleSharp}
              className="font-4xl"
              color="primary"
            />
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto">
            <h1>Welcome Back</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-justify-items-center">
            <div className="spacing-y-2">
              <IonList>
                <IonItem lines={"none"}>
                  <InputValidationComponent
                    ref={emailRef}
                    type="email"
                    required={true}
                    email={true}
                    label="Email"
                    placeHolder=""
                    hasError={setEmailError}
                    isSubmitClick={isSubmitClicked}
                    minLengthAttr={6}
                  />
                </IonItem>
                <IonItem lines={"none"}>
                  <PasswordInput
                    label="Password"
                    minLength={6}
                    required
                    value={password}
                    onChange={(value) => setPassword((s) => value)}
                  />
                  {/* <InputValidationComponent
                  ref={passwordRef}
                  type="password"
                  required={true}
                  email={false}
                  label="Password"
                  placeHolder=""
                  isSubmitClick={isSubmitClicked}
                  hasError={setPasswordError}
                  minLengthAttr={6}
                /> */}
                </IonItem>
              </IonList>
              <h6 className="ion-text-end">
                <IonRouterLink
                  tabIndex={5}
                  routerLink="/register"
                  className="ion-padding text-decoration-none ion-margin-top"
                >
                  Register Here
                </IonRouterLink>
              </h6>
              {/* <h6 className="ion-text-end">
                <IonItem
                  routerLink="/example1"
                  className="ion-padding text-decoration-none ion-margin-top"
                >
                  go to Example 1
                </IonItem>
              </h6> */}
              <p className="text-danger ws-pre">{loginError}</p>
              <IonGrid>
                <IonRow className="ion-justify-content-center">
                  <IonCol size="auto">
                    <ButtonSpinner
                      text="Login"
                      showSpinner={showLoginSpinner}
                      onClick={onLoginClicked}
                      textSize="md"
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </BasePageLayout>
  );
};

export default Login;
