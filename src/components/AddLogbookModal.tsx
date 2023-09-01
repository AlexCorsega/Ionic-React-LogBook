import React, { useState, useRef, MouseEventHandler, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption,
  IonImg,
  IonLoading,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { caretDownOutline } from "ionicons/icons";
import useGetDate from "../customHooks/useGetDate";
import { Camera, CameraResultType } from "@capacitor/camera";
import AxiosFormData from "../Http/AxiosFormData";
import AxiosGet from "../Http/AxiosGet";
import AxiosAPI from "../Http/AxiosAPI";
import generateGuid from "../helpers/generateGuid";
import CameraComponent from "./CameraComponent";
import InputValidationComponent from "./InputValidationComponent";
import AppErrorMessage from "./AppErrorMessage";
import { VisitorModel } from "../Models/VisitorModel";
import { LogTypeDTO } from "../DTO/LogTypeDTO";
import useUpdateEffect from "../customHooks/useUpdateEffect";
interface Props {
  isOpen: boolean;
  title: string;
  onClose: MouseEventHandler<HTMLIonButtonElement>;
  onAddLogClick: (data: VisitorModel) => void;
  logtypeDTO: LogTypeDTO;
}

export const TIMEFORMAT = {
  MMDDYYYY: "mm/dd/yyyy",
  DDMMYYYY: "dd/mm/yyyy",
  YYYYDDMM: "yyyy/dd/mm",
} as const;
export type TimeFormats = keyof typeof TIMEFORMAT;
const LOGBOOKTYPE = {
  ATTENDANCE: "ATTENDANCE",
  NOTE: "NOTE",
};
function AddLogbookModal({
  isOpen,
  title,
  onClose,
  onAddLogClick,
  logtypeDTO,
}: Props) {
  const [errors, setErrors] = useState<string[]>([]);
  const [signatureCameraText, setSignatureCameraText] =
    useState("Capure Signature");
  const [buttonText, setButtonText] = useState("Capture Note");
  const [loading, setLoading] = useState(false);
  const firstnameRef = useRef<HTMLIonInputElement>(null);
  const lastnameRef = useRef<HTMLIonInputElement>(null);
  const descriptionRef = useRef<HTMLIonInputElement>(null);
  const logTypeRef = useRef<HTMLIonSelectElement>(null);
  let noteSignatureRef = useRef<Blob>(new Blob());
  let noteFilename = useRef("");
  let signatureBlobRef = useRef<Blob>(new Blob());
  let signatureFilename = useRef("");
  async function handleAddLog() {
    let hasErrors = false;
    setErrors((s) => []);
    const data: VisitorModel = {
      id: 0,
      firstname: firstnameRef.current?.value,
      lastname: lastnameRef.current?.value,
      logtype: logTypeRef.current?.value,
      description: descriptionRef.current?.value,
      created: "",
    };

    if (logtypeDTO.name == LOGBOOKTYPE.ATTENDANCE) {
      if (!data.firstname) {
        setErrors((s) => [...s, "Firstname field is required."]);
        hasErrors = true;
      }
      if (!data.lastname) {
        setErrors((s) => [...s, "Lastname field is required."]);
        hasErrors = true;
      }
      if (!signatureFilename.current) {
        setErrors((s) => [...s, "Please provide a signature."]);
        hasErrors = true;
      }
    } else {
      if (!noteFilename.current) {
        setErrors((s) => [...s, "Please provide a file for the note."]);
        hasErrors = true;
      }
    }
    if (!data.description) {
      setErrors((s) => [...s, "Desctiption field is required."]);
      hasErrors = true;
    }
    if (!hasErrors) {
      setLoading((s) => !s);
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("description", data.description);
      formData.append("logtype_id", logtypeDTO.id.toString());
      if (logtypeDTO.name == LOGBOOKTYPE.ATTENDANCE) {
        formData.append(
          "signature",
          signatureBlobRef.current,
          signatureFilename.current
        );
      } else {
        formData.append("note", noteSignatureRef.current, noteFilename.current);
      }
      const result = await AxiosFormData({
        url: "guard/logbook/create",
        formData: formData,
      })
        .then((s) => {
          onAddLogClick(s.data.data);
          resetProperties();
          return s;
        })
        .catch((error) => {
          console.log(error);
          setErrors((s) => [...s, error.response.data.message]);
        });
      setLoading((s) => !s);
    }
  }
  function resetProperties() {
    setSignatureCameraText("Capture Signature");
    setButtonText("Capture Note");
  }
  async function onCameraSuccessCallback(imageblob: Blob, filename: string) {
    setButtonText((s) => "Change Image");
    noteSignatureRef.current = imageblob;
    noteFilename.current = filename;
  }
  async function onSignatureSuccessCallback(imageblob: Blob, filename: string) {
    setSignatureCameraText((s) => "Change");
    signatureBlobRef.current = imageblob;
    signatureFilename.current = filename;
  }
  return (
    <IonModal isOpen={isOpen} className="full-modal">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={onClose}>
              <h4>Exit</h4>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding full-modal">
        <IonLabel className="ion-text-center ion-text-xl">
          <h1>{logtypeDTO.name}</h1>
        </IonLabel>
        <IonItem lines="none">
          <InputValidationComponent
            ref={firstnameRef}
            type="text"
            required={logtypeDTO.name == LOGBOOKTYPE.ATTENDANCE}
            email={false}
            label="Firstname"
            placeHolder=""
          />
        </IonItem>
        <IonItem lines="none">
          <InputValidationComponent
            ref={lastnameRef}
            type="text"
            required={logtypeDTO.name == LOGBOOKTYPE.ATTENDANCE}
            email={false}
            label="Lastname"
            placeHolder=""
          />
        </IonItem>
        <IonItem lines="none">
          <InputValidationComponent
            ref={descriptionRef}
            type="text"
            required={true}
            email={false}
            label="Description"
            placeHolder=""
          />
        </IonItem>
        <IonList>
          <div className="spacing-y-2">
            <CameraComponent
              buttonText={signatureCameraText}
              imageAlt="Signature Photo"
              disabled={logtypeDTO.name != LOGBOOKTYPE.ATTENDANCE}
              onCameraCaptureCallback={onSignatureSuccessCallback}
            />
            <CameraComponent
              buttonText={buttonText}
              imageAlt="Delivery Photo"
              disabled={logtypeDTO.name != LOGBOOKTYPE.NOTE}
              onCameraCaptureCallback={onCameraSuccessCallback}
            />

            <IonItem>
              <IonLabel position="stacked">Date</IonLabel>
              <p>{useGetDate(TIMEFORMAT.MMDDYYYY)}</p>
            </IonItem>
          </div>
        </IonList>
        {errors.map((s, index) => {
          return (
            <p key={index} className="text-danger">
              {s}
            </p>
          );
        })}
        <IonItem lines="none" className="mt-3">
          <div className="flex justify-center w-100">
            <IonButton id="addLog" size="default" onClick={handleAddLog}>
              Add Log
            </IonButton>
            <IonLoading
              // trigger="addLog"
              message="Loading..."
              isOpen={loading}
              spinner="circles"
            />
          </div>
        </IonItem>
      </IonContent>
    </IonModal>
  );
}

export default AddLogbookModal;
