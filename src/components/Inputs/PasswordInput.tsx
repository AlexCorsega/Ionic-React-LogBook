import React, { useEffect, useState } from "react";
import { IonInput, IonIcon, IonItem, IonRippleEffect } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import useUpdateEffect from "../../customHooks/useUpdateEffect";

interface Props {
  required: boolean;
  label: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
  onChange?: (value: string) => void;
}

const PasswordInput = ({
  required,
  label,
  value,
  minLength,
  maxLength,
  onChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [errorText, setErrorText] = useState<string | undefined>();

  useUpdateEffect(() => {
    validate();
  }, [password]);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const validate = () => {
    console.log("validate hit");
    setIsValid(undefined);
    var isValid = true;
    if (password === "" && !required) return;
    if (required) {
      isValid = password?.trim() != "";
      !isValid ? setErrorText(`${label} is required.`) : "";
    }
    if (minLength && isValid) {
      isValid = (password?.length ?? 0) >= minLength;
      !isValid
        ? setErrorText(`Please enter atleast ${minLength} characters.`)
        : "";
    }
    if (maxLength && isValid) {
      isValid = (password?.length ?? 0) <= maxLength;
      !isValid ? setErrorText(`Maximum of ${minLength} characters.`) : "";
    }
    setIsValid((s) => isValid);
  };

  const markTouched = () => {
    validate();
    setIsTouched(true);
  };

  return (
    <>
      <IonInput
        className={`nolines ${isValid && "ion-valid"} ${
          isValid != undefined && isValid === false && "ion-invalid"
        } ${isTouched && "ion-touched"}`}
        value={password}
        errorText={errorText}
        onIonInput={(event) => {
          setPassword(event.target.value?.toString() ?? "");
          if (onChange) onChange(event.target.value?.toString() ?? "");
        }}
        onIonBlur={() => markTouched()}
        label={label}
        labelPlacement="stacked"
        type={showPassword ? "text" : "password"}
      />
      <IonIcon
        slot="end"
        icon={showPassword ? eyeOff : eye}
        onClick={toggleShowPassword}
      >
        <div className="ion-activatable ripple-parent">
          <IonRippleEffect></IonRippleEffect>
        </div>
      </IonIcon>
    </>
  );
};

export default PasswordInput;
