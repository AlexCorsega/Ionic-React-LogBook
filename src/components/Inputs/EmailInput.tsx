import { IonInput, IonItem } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  required: boolean;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}
function EmailInput({ required, label, value, onChange }: Props) {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [inputValue, setInputValue] = useState(value);
  const [firstLoad, setFirstload] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstload((s) => false);
      return;
    }
    markTouched();
  }, [inputValue]);

  const validateEmail = () => {
    return inputValue?.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  function validate() {
    setIsValid((s) => undefined);
    if (inputValue === "" && required) {
      setIsValid((s) => false);
      return;
    } else if (inputValue === "") return;
    validateEmail() !== null ? setIsValid(true) : setIsValid(false);
  }
  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonItem lines="none">
      <IonInput
        className={`${isValid && "ion-valid"} ${
          isValid === false && "ion-invalid"
        } ${isTouched && "ion-touched"}`}
        type="email"
        label={label}
        labelPlacement="floating"
        helperText="Enter a valid email"
        errorText="Invalid email"
        onIonInput={(event) => {
          if (onChange) {
            onChange(event.target?.value?.toString() ?? "");
          }
        }}
        onIonBlur={() => markTouched()}
      ></IonInput>
    </IonItem>
  );
}

export default EmailInput;
