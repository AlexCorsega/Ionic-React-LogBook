import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BaseModal from "../BaseModal";
import ButtonSpinner from "../ButtonSpinner";
import InputValidationComponent from "../InputValidationComponent";
import { SecurityGuardModel } from "../../pages/Administrator/ViewSecurityGuard";
import TextInput from "../Inputs/TextInput";
import AxiosInstance from "../../Http/AxiosInstance";

interface Props {
  model?: SecurityGuardModel;
  isModalOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (model: SecurityGuardModel) => void;
  onUpdateFailed?: () => void;
}
export interface AvailableOrganizationModel {
  id: number;
  name: string;
}

function UpdateSecurityGuardModal({
  isModalOpen,
  model,
  onClose,
  onUpdateSuccess,
  onUpdateFailed,
}: Props) {
  const [securityModel, setSecurityModel] = useState(model);
  const [updateSpinner, setUpdateSpinner] = useState(false);
  function handleOnClose() {
    setSecurityModel((s) => model);
    onClose();
  }
  async function updateSecurityGuard() {
    if (securityModel) {
      if (
        securityModel.firstname &&
        securityModel.lastname &&
        securityModel.contact &&
        securityModel.active
      ) {
        setUpdateSpinner((s) => true);
        try {
          const response = await AxiosInstance().post(
            "admin/security-guards/update",
            {
              id: securityModel.id,
              firstname: securityModel.firstname,
              lastname: securityModel.lastname,
              contact: securityModel.contact,
              status: securityModel.active,
            }
          );
          onUpdateSuccess(securityModel);
        } catch (error: any) {
          if (error.response.status == 403) {
            alert("You do not have permission to perform this action.");
          }
        }
        setUpdateSpinner((s) => false);
      }
    }
  }
  return (
    <BaseModal
      isOpen={isModalOpen}
      title="Update Security"
      onClose={handleOnClose}
    >
      <div className="spacing-y-2">
        <TextInput
          required={true}
          label="Firstname"
          value={securityModel?.firstname}
          onChange={(v) =>
            setSecurityModel((s) => {
              if (s) {
                s.firstname = v;
              }
              return s;
            })
          }
        />
        <TextInput
          required={true}
          label="Lastname"
          value={securityModel?.lastname}
          onChange={(v) =>
            setSecurityModel((s) => {
              if (s) s.lastname = v;
              return s;
            })
          }
        />
        <TextInput
          required={true}
          label="Contact"
          value={securityModel?.contact}
          onChange={(v) =>
            setSecurityModel((s) => {
              if (s) s.contact = v;
              return s;
            })
          }
        />
        <IonSelect
          aria-label="Status"
          label="Status"
          placeholder="Select Status"
          onIonChange={(e) =>
            setSecurityModel((s) => {
              if (s) s.active = e.target.value;
              return s;
            })
          }
          value={securityModel?.active.toString()}
        >
          <IonSelectOption value="1">Active</IonSelectOption>
          <IonSelectOption value="0">Inactive</IonSelectOption>
        </IonSelect>
        <div className="text-center">
          <ButtonSpinner
            text="Update"
            showSpinner={updateSpinner}
            onClick={updateSecurityGuard}
            textSize="sm"
          />
        </div>
      </div>
    </BaseModal>
  );
}

export default UpdateSecurityGuardModal;
