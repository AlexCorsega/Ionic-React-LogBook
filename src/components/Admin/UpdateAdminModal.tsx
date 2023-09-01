import React, { useState } from "react";
import { AdminModel } from "../../pages/Administrator/ViewAdministrator";
import { IonSelect, IonSelectOption } from "@ionic/react";
import AxiosInstance from "../../Http/AxiosInstance";
import BaseModal from "../BaseModal";
import ButtonSpinner from "../ButtonSpinner";
import TextInput from "../Inputs/TextInput";

interface Props {
  model?: AdminModel;
  isModalOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (model: AdminModel) => void;
  onUpdateFailed?: () => void;
}

function UpdateAdminModal({
  isModalOpen,
  model,
  onClose,
  onUpdateSuccess,
  onUpdateFailed,
}: Props) {
  const [AdminModel, setSecurityModel] = useState(model);
  const [updateSpinner, setUpdateSpinner] = useState(false);
  function handleOnClose() {
    setSecurityModel((s) => model);
    onClose();
  }
  function updateSecurityGuard() {
    if (AdminModel) {
      if (AdminModel.firstname && AdminModel.lastname && AdminModel.contact) {
        setUpdateSpinner((s) => true);
        AxiosInstance()
          .post("admin/update-user", {
            id: AdminModel.id,
            firstname: AdminModel.firstname,
            lastname: AdminModel.lastname,
            contact: AdminModel.contact,
          })
          .then((response) => {
            setUpdateSpinner((s) => false);
            onUpdateSuccess(AdminModel);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  return (
    <BaseModal
      isOpen={isModalOpen}
      title="Update Administrator"
      onClose={handleOnClose}
    >
      <div className="spacing-y-2">
        <TextInput
          required={true}
          label="Firstname"
          value={AdminModel?.firstname}
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
          value={AdminModel?.lastname}
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
          value={AdminModel?.contact}
          onChange={(v) =>
            setSecurityModel((s) => {
              if (s) s.contact = v;
              return s;
            })
          }
        />
        <div className="mx-2">
          <IonSelect
            aria-label="Status"
            label="Status"
            placeholder="Select Status"
            onIonChange={(e) =>
              setSecurityModel((s) => {
                if (s) s.is_active = e.target.value;
                return s;
              })
            }
            value={AdminModel?.is_active.toString()}
          >
            <IonSelectOption value="1">Active</IonSelectOption>
            <IonSelectOption value="0">Inactive</IonSelectOption>
          </IonSelect>
        </div>
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

export default UpdateAdminModal;
