import React, {
  FormEventHandler,
  ForwardedRef,
  Ref,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IonInput } from "@ionic/react";
import { useForm } from "../context/useForm";
import useUnmount from "../customHooks/useUnmount";
import useUpdateEffect from "../customHooks/useUpdateEffect";
interface Props {
  type:
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  ref: RefObject<HTMLIonInputElement>;
  label: string;
  required: boolean;
  email: boolean;
  value?: string;
  placeHolder: string;
  requiredAttr?: boolean;
  minAttr?: number;
  maxAttr?: number;
  minLengthAttr?: number;
  maxLengthAttr?: number;
  isSubmitClick?: boolean;
  hasError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputValidationComponent = React.forwardRef(
  (
    {
      type,
      label,
      required,
      email,
      placeHolder,
      isSubmitClick,
      minLengthAttr,
      maxLengthAttr,
      hasError,
    }: Props,
    ref: ForwardedRef<HTMLIonInputElement>
  ) => {
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
    const [errorMessageText, setErrorMessageText] = useState<
      string | undefined
    >();
    const [placeholderText, setPlaceholderText] = useState<string>(placeHolder);
    const [firstLoad, setFirstLoad] = useState(true);
    useEffect(() => {
      if (firstLoad) {
        setFirstLoad((s) => false);
        return;
      }
      if (isSubmitClick) {
        //require to call markTouched for the validation to work
        markTouched();
      }
    }, [isSubmitClick]);

    const validateEmail = (email: string | number) => {
      if (email == undefined) return false;
      if (typeof email == "number") return false;
      return (
        email.match(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ) ?? false
      );
    };
    const validateRequired = (input: string | number) => {
      if (input == undefined) return false;
      if (typeof input == "number") return false;
      return input.trim() != "";
    };
    const validateMaxLength = (input: string | undefined) => {
      if (maxLengthAttr == undefined) return true;
      if (input == undefined) return false;
      return input.length <= maxLengthAttr;
    };
    const validateMinLength = (input: string | undefined) => {
      if (minLengthAttr == undefined) return true;
      if (input == undefined) return false;
      return input.length >= minLengthAttr;
    };

    function validate() {
      let isPreValidated = false;
      let preValidateResult = false;
      const value = ref == null ? "" : ref.current?.value;
      setIsValid(undefined);
      let hasErrors = false;
      if (required) {
        const result = validateRequired(value);
        setErrorMessageText((s) =>
          !result ? `The ${label} is required.` : ""
        );
        hasErrors = !result && true;
        isPreValidated = true;
        preValidateResult = result;
      }
      if (email && isPreValidated && preValidateResult) {
        const result = validateEmail(value);
        setErrorMessageText((s) =>
          !result ? "Please provide a valid email address." : ""
        );
        hasErrors = !result && true;
      }
      if (minLengthAttr != undefined && isPreValidated && preValidateResult) {
        const result = validateMinLength(value);
        setErrorMessageText((s) =>
          !result ? `Please enter at least ${minLengthAttr} characters.` : ""
        );
        hasErrors = !result && true;
      }
      if (maxLengthAttr != undefined && isPreValidated && preValidateResult) {
        const result = validateMaxLength(value);
        setErrorMessageText((s) =>
          !result
            ? `Please limit your input to a maximum of ${maxLengthAttr} characters`
            : ""
        );
        hasErrors = !result && true;
      }
      hasErrors ? setIsValid(false) : setIsValid(true);
      if (hasError) hasError((s) => hasErrors);
    }

    function markTouched() {
      validate();
      setIsTouched(true);
    }
    return (
      <IonInput
        ref={ref}
        className={`${isValid && "ion-valid"} ${
          isValid === false && "ion-invalid"
        } ${isTouched && "ion-touched"}`}
        type={type}
        label={label}
        placeholder={placeholderText}
        labelPlacement="stacked"
        errorText={errorMessageText}
        onIonInput={(event) => validate()}
        onIonBlur={() => markTouched()}
      ></IonInput>
    );
  }
);
export default InputValidationComponent;
