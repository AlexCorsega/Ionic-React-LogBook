import { IonButton, IonSpinner } from "@ionic/react";
import React from "react";
interface Props {
  text: string;
  showSpinner?: boolean;
  onClick: () => void;
  className?: string;
  color?: string;
  disabled?: boolean;
  textSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
}
function ButtonSpinner({
  text,
  showSpinner,
  onClick,
  className,
  textSize,
  color,
  disabled,
}: Props) {
  return (
    <IonButton
      color={color}
      disabled={disabled ?? showSpinner}
      className={"ion-text-center " + className}
      onClick={onClick}
    >
      <IonSpinner
        className={`me-1 ${showSpinner ? "" : "ion-hide"} `}
      ></IonSpinner>
      <h5 className={"m-0 fs-" + textSize}>{text}</h5>
    </IonButton>
  );
}

export default ButtonSpinner;
