import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import BaseModal from "../BaseModal";
import ButtonSpinner from "../ButtonSpinner";
import TextInput from "../Inputs/TextInput";
import { OrganizationModel } from "../../pages/Administrator/ViewOrganization";
import AxiosInstance from "../../Http/AxiosInstance";
import getResponseErrors from "../../helpers/getResponseErrors";

interface Props {
  model: OrganizationModel | undefined;
  isModalOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (model: OrganizationModel) => void;
  onUpdateFailed?: () => void;
}
function UpdateOrganizationModal({
  model,
  isModalOpen,
  onClose,
  onUpdateSuccess,
  onUpdateFailed,
}: Props) {
  const [orgModel, setOrgModel] = useState<OrganizationModel | undefined>({
    id: model?.id ?? 0,
    name: model?.name ?? "",
    description: model?.description ?? "",
    street: model?.street,
    barangay: model?.barangay ?? "",
    city: model?.city ?? "",
    zip_code: model?.zip_code ?? 0,
    address: model?.address ?? "",
    active: model?.active ?? true,
    created: model?.created ?? "",
    security_guard: model?.security_guard ?? 0,
    active_guard: model?.active_guard ?? 0,
    inactive_guard: model?.inactive_guard ?? 0,
  });
  const [showUpdateOrgLoading, setShowUpdateOrgLoading] = useState(false);
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    setOrgModel(JSON.parse(JSON.stringify(model)));
  }, [model]);

  async function updateOrganization() {
    if (
      orgModel?.name &&
      orgModel?.description &&
      orgModel?.active &&
      orgModel.street &&
      orgModel.barangay &&
      orgModel.city &&
      orgModel.zip_code
    ) {
      setShowUpdateOrgLoading((s) => true);
      try {
        await AxiosInstance().post("admin/update-organization", {
          id: orgModel.id,
          name: orgModel.name,
          description: orgModel.description,
          street: orgModel.street,
          barangay: orgModel.barangay,
          city: orgModel.city,
          zip_code: orgModel.zip_code,
          status: orgModel.active,
        });
        setOrgModel((m) => {
          if (m)
            m.address = `${m.street}, ${m.barangay}, ${m.city} ${m.zip_code}`;
          return m;
        });
        onUpdateSuccess(orgModel);
      } catch (error: any) {
        if (error.response.status == 403) {
          alert("You do not have permission to perform this action.");
        } else {
          setResponseError((s) => getResponseErrors(error));
          setShowUpdateOrgLoading((s) => false);
          if (onUpdateFailed) onUpdateFailed();
        }
      }
    }
  }
  function handleOnClose() {
    setOrgModel((s) => JSON.parse(JSON.stringify(model)));
    onClose();
  }
  return (
    <BaseModal
      isOpen={isModalOpen}
      title="Update Organization"
      onClose={handleOnClose}
    >
      <div className="spacing-y-2">
        <TextInput
          required={true}
          label="Organization"
          value={orgModel?.name}
          onChange={(v) =>
            setOrgModel((s) => {
              if (s) {
                s.name = v;
              }
              return s;
            })
          }
        />
        <TextInput
          required={true}
          label="Description"
          value={orgModel?.description}
          onChange={(v) =>
            setOrgModel((s) => {
              if (s) {
                s.description = v;
              }
              return s;
            })
          }
        />
        <TextInput
          required={false}
          label="Street"
          value={orgModel?.street}
          onChange={(v) =>
            setOrgModel((s) => {
              if (s) {
                s.street = v;
              }
              return s;
            })
          }
        />
        <TextInput
          required={true}
          label="Barangay"
          value={orgModel?.barangay}
          onChange={(v) =>
            setOrgModel((s) => {
              if (s) {
                s.barangay = v;
              }
              return s;
            })
          }
        />
        <TextInput
          required={true}
          label="City"
          value={orgModel?.city}
          onChange={(v) =>
            setOrgModel((s) => {
              if (s) {
                s.city = v;
              }
              return s;
            })
          }
        />
        <TextInput
          type="number"
          required={true}
          label="Zip Code"
          value={orgModel?.zip_code?.toString() ?? ""}
          onChange={(v) =>
            setOrgModel((s) => {
              if (s) {
                s.zip_code = v;
              }
              return s;
            })
          }
        />
        <IonItem>
          <IonSelect
            aria-label="Status"
            placeholder="Select Status"
            onIonChange={(e) =>
              setOrgModel((s) => {
                if (s) {
                  s.active = e.target.value;
                }
                return s;
              })
            }
            value={orgModel?.active?.toString()}
          >
            <IonSelectOption value="1">Active</IonSelectOption>
            <IonSelectOption value="0">Inactive</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Created Date</IonLabel>
          <h5>{orgModel?.created}</h5>
        </IonItem>
        <p className="text-danger ws-pre">{responseError}</p>
        <div className="text-center mt-2">
          <ButtonSpinner
            textSize="sm"
            text="Update"
            showSpinner={showUpdateOrgLoading}
            onClick={updateOrganization}
          />
        </div>
      </div>
    </BaseModal>
  );
}

export default UpdateOrganizationModal;
