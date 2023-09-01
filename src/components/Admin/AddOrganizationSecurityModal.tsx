import React, { useEffect, useRef, useState } from "react";
import BaseModal from "../BaseModal";
import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonLoading,
  IonModal,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter,
} from "@ionic/react";
import AxiosInstance from "../../Http/AxiosInstance";
import { getCurrentDate, getNextDayDate } from "../../helpers/formatDate";

interface Props {
  id: number;
  isModalOpen: boolean;
  onClose: () => void;
  onAddSuccess?: () => void;
  onAddFailed?: () => void;
}
function AddOrganizationSecurityModal({
  id,
  isModalOpen,
  onClose,
  onAddSuccess,
  onAddFailed,
}: Props) {
  const [availableGuards, setAvailableGuards] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const securityGuardRef = useRef<HTMLIonSelectElement>(null);
  const guardTypeRef = useRef<HTMLIonSelectElement>(null);
  const startDateRef = useRef<HTMLIonDatetimeElement>(null);
  const endDateRef = useRef<HTMLIonDatetimeElement>(null);
  const [guardType, setGuardType] = useState<string | null>(null);
  const [errors, setErrors] = useState<string>();

  useIonViewWillEnter(() => {
    queryAvailableGuards();
  });
  useEffect(() => {
    queryAvailableGuards();
  }, []);

  function queryAvailableGuards() {
    AxiosInstance()
      .get(`admin/available-guards`)
      .then((response) => {
        setAvailableGuards((s: any) => response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async function onAssignGuard() {
    setErrors((s) => "");
    if (securityGuardRef.current?.value == undefined) {
      setErrors((s) => "Please select a security guard.\n\n");
    }
    if (guardTypeRef.current?.value == undefined) {
      setErrors((s) => s + "Please select the guard type.\n\n");
    }
    if (guardType == "temporary") {
      if (startDateRef.current?.value == undefined) {
        setErrors((s) => s + "Please select a start date.\n\n");
      }
      if (endDateRef.current?.value == undefined) {
        setErrors((s) => s + "Please select a end date.\n\n");
      }
    }
    if (securityGuardRef.current?.value && guardTypeRef.current?.value) {
      setIsLoading((s) => true);
      try {
        await AxiosInstance().post("admin/assign-guard", {
          organization_id: id,
          user_id: securityGuardRef.current.value,
          type: guardTypeRef.current.value,
          start_date: startDateRef.current?.value,
          end_date: endDateRef.current?.value,
        });
        await queryAvailableGuards();
        if (onAddSuccess) onAddSuccess();
      } catch (error: any) {
        setIsLoading((s) => false);
        if (onAddFailed) onAddFailed();
        if (error.response.status == 403) {
          alert("You do not have permission to perform this action.");
        } else {
          alert(error);
        }
      }
      setIsLoading((s) => false);
    }
  }
  return (
    <>
      <BaseModal
        isOpen={isModalOpen}
        title="Update Organization"
        onClose={onClose}
      >
        <IonSelect label="Select Available Guard" ref={securityGuardRef}>
          {availableGuards && availableGuards.length == 0 && (
            <h5 className="text-center">No Available Guards</h5>
          )}
          {availableGuards &&
            availableGuards.length != 0 &&
            availableGuards.map((guard: any) => {
              return (
                <IonSelectOption key={guard?.id} value={guard?.id}>
                  {guard?.firstname} {guard?.lastname}
                </IonSelectOption>
              );
            })}
        </IonSelect>
        <IonSelect
          label="Select Type"
          ref={guardTypeRef}
          onIonChange={(e) => setGuardType((s) => e.target.value)}
        >
          <IonSelectOption value="permanent">Permanent</IonSelectOption>
          <IonSelectOption value="temporary">Temporary</IonSelectOption>
        </IonSelect>
        {guardType == "temporary" && (
          <div className="flex justify-between">
            <div>
              <h5>Start Date</h5>
              <IonDatetime
                ref={startDateRef}
                presentation="date"
                min={getNextDayDate()}
                value={getNextDayDate()}
              ></IonDatetime>
            </div>
            <div>
              <h5>End date</h5>
              <IonDatetime
                ref={endDateRef}
                presentation="date"
                min={getNextDayDate()}
                value={getNextDayDate()}
              ></IonDatetime>
            </div>
          </div>
        )}
        <p className="text-danger ws-pre">{errors}</p>
        <div className="text-center mt-3">
          <IonButton onClick={() => onAssignGuard()}>Add Security</IonButton>
        </div>
      </BaseModal>
      <IonLoading isOpen={isLoading} />
    </>
  );
}

export default AddOrganizationSecurityModal;
