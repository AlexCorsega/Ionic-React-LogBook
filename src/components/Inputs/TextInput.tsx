import { IonInput, IonItem } from "@ionic/react";
import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useUpdateEffect from "../../customHooks/useUpdateEffect";
import { useForm } from "../../context/useForm";

interface Props {
  required: boolean;
  label: string;
  value?: string;
  onChange?: (value: any) => void;
  helperText?: string;
  placeholder?: string;
  submitListener?: boolean;
  type?: "password" | "text" | "number";
  min?: number;
  minLength?: number;
  max?: number;
  maxLength?: number;
  disabled?: boolean;
  readonly?: boolean;
  submitClickValidation?: (isValid: boolean) => void;
}
function TextInput(
  {
    required,
    label,
    helperText,
    placeholder,
    value,
    onChange,
    submitListener,
    submitClickValidation,
    type,
    min,
    minLength,
    max,
    maxLength,
    disabled,
    readonly,
  }: Props,
  ref?: ForwardedRef<HTMLIonInputElement>
) {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [initialValue, setInitialValue] = useState(value);

  useEffect(() => {
    if (submitClickValidation) submitClickValidation(isValid ?? true);
  }, [submitListener]);
  useEffect(() => {
    validate();
  }, [initialValue]);

  const validateMaxLength = () => {
    if (maxLength && initialValue) return initialValue.length <= maxLength;
    return true;
  };
  const validateMinLength = () => {
    if (minLength && initialValue) return initialValue.length >= minLength;
    return true;
  };
  function validate() {
    setIsValid((s) => undefined);
    if ((initialValue === "" || initialValue == undefined) && required) {
      setIsValid((s) => false);
      setErrorMessage((s) => `${label} is required.`);
      return;
    } else if (minLength) {
      const result = validateMinLength();
      if (!result) {
        setErrorMessage(
          (s) => `Please enter at least ${minLength} characters.`
        );
      }
      setIsValid((s) => result);
      return;
    } else if (maxLength) {
      const result = validateMaxLength();
      if (!result) {
        setErrorMessage(
          (s) =>
            `Please limit your input to a maximum of ${maxLength} characters`
        );
      }
      setIsValid((s) => result);
      return;
    } else if (initialValue === "") return;
    setIsValid((s) => true);
  }
  const markTouched = () => {
    validate();
    setIsTouched(true);
  };
  function handleOnChange(event: any) {
    var updatedValue: string;
    if (type == "number") updatedValue = event.target?.value;
    else updatedValue = event.target?.value?.toString();
    setInitialValue((s) => updatedValue.toString());
    if (onChange) {
      onChange(updatedValue);
    }
  }

  return (
    <IonItem lines={isValid == undefined ? "inset" : "none"}>
      <IonInput
        className={`${isValid && "ion-valid"} ${
          isValid === false && "ion-invalid"
        } ${isTouched && "ion-touched"}`}
        type={type ?? "text"}
        label={label}
        labelPlacement="floating"
        helperText={helperText}
        placeholder={placeholder}
        errorText={errorMessage}
        onIonInput={handleOnChange}
        onIonBlur={() => markTouched()}
        value={initialValue}
        min={min}
        minlength={minLength}
        max={max}
        maxlength={maxLength}
        disabled={disabled}
        readonly={readonly}
      ></IonInput>
    </IonItem>
  );
}

export default TextInput;
