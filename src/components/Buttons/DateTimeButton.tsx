import {
  IonAlert,
  IonButton,
  IonButtons,
  IonDatetime,
  IonModal,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import generateGuid from "../../helpers/generateGuid";
import useGetDate from "../../customHooks/useGetDate";

interface Props {
  buttonText: string | undefined;
  min?: string;
  onCancel?: () => void;
  onDateSelected?: (selectedDateTime: string) => void;
}

function DateTimeButton({ onCancel, min, buttonText, onDateSelected }: Props) {
  const date = useGetDate("yyyy-mm-dd").replace(" ", "T");
  const [value, setValue] = useState<string>(
    `${date.substring(0, date.length - 3)}:00`
  );
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = `${date.substring(0, date.length - 3)}:00`;
  const guid = generateGuid();
  const modal = useRef<null | HTMLIonModalElement>(null);
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  function onDateTimeSelected(e: any) {
    const selectedDateTime: string =
      e.target.value?.toString() ?? `${date.substring(0, date.length - 3)}:00`;
    setValue(selectedDateTime);
    if (onDateSelected) onDateSelected(selectedDateTime);
  }

  const reset = () => {
    datetime.current?.reset();
  };
  const cancel = () => {
    datetime.current?.cancel();
    if (onCancel) onCancel();
    modal.current?.dismiss();
  };
  const confirm = () => {
    datetime.current?.confirm();
    modal.current?.dismiss();
    const selectedDateTime: string = datetime.current?.value?.toString() ?? "";
    if (onDateSelected) onDateSelected(selectedDateTime);
  };

  return (
    <>
      <IonButton
        id={guid}
        expand="block"
        color="light"
        onClick={() => modal.current?.present()}
      >
        {buttonText}
      </IonButton>
      <IonModal className="backdrop-modal" ref={modal}>
        {/* <IonDatetime
          showDefaultButtons={true}
          value={value}
          onIonChange={onDateTimeSelected}
          onIonCancel={onCancel}
          doneText="Done"
          max={currentDate}
          min={min}
        >
        </IonDatetime> */}
        <IonDatetime ref={datetime} value={value} max={currentDate} min={min}>
          <IonButtons slot="buttons">
            <IonButton color="danger" onClick={reset}>
              Reset
            </IonButton>
            <IonButton color="primary" onClick={cancel}>
              Cancel
            </IonButton>
            <IonButton color="primary" onClick={confirm}>
              Done
            </IonButton>
          </IonButtons>
        </IonDatetime>
      </IonModal>
    </>
  );
}

export default DateTimeButton;
