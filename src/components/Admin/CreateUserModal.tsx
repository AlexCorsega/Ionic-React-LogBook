import { IonItem, IonList } from "@ionic/react";
import React, { useState } from "react";
import BaseModal from "../BaseModal";
import ButtonSpinner from "../ButtonSpinner";
import InputValidationComponent from "../InputValidationComponent";
import TextInput from "../Inputs/TextInput";
import EmailInput from "../Inputs/EmailInput";
import AxiosInstance from "../../Http/AxiosInstance";
import { BasicValidation } from "../../validations/BasicValidation";
import getResponseErrors from "../../helpers/getResponseErrors";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  onCreateSuccess: (data: any) => void;
  onCreateFailed?: () => void;
  role: "admin" | "guard";
}
function CreateUserModal({
  isModalOpen,
  onClose,
  onCreateSuccess,
  onCreateFailed,
  role,
}: Props) {
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [contact, setContact] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [retypePassword, setRetypePassword] = useState<string>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [responseError, setResponseError] = useState<string>();

  async function handleSubmit() {
    if (
      firstname &&
      lastname &&
      contact &&
      email &&
      password &&
      retypePassword &&
      BasicValidation.isValidEmail(email) &&
      BasicValidation.isEqualLength(contact, 11) &&
      BasicValidation.isEqual(password, retypePassword)
    ) {
      setShowSpinner((s) => true);
      try {
        const response = await AxiosInstance().post("admin/create-user", {
          firstname: firstname,
          lastname: lastname,
          contact: contact,
          email: email,
          password: password,
          confirm_password: retypePassword,
          role: role,
        });
        onCreateSuccess(response.data);
      } catch (error: any) {
        if (error.response.status == 403) {
          alert("You do not have permission to perform this action.");
        }
      }
      setShowSpinner((s) => false);
    }
  }
  function clearFields() {
    setFirstname((s) => "");
    setLastname((s) => "");
    setContact((s) => "");
    setEmail((s) => "");
    setPassword((s) => "");
    setRetypePassword((s) => "");
  }
  return (
    <BaseModal
      isOpen={isModalOpen}
      title={role == "admin" ? "Create Administrator" : "Create Security"}
      onClose={onClose}
    >
      <div className="spacing-y-2">
        <TextInput
          type="text"
          label="Firstname"
          value={firstname}
          onChange={(e) => setFirstname((s) => e)}
          required={true}
        />
        <TextInput
          type="text"
          label="Lastname"
          value={lastname}
          onChange={(e) => setLastname((s) => e)}
          required={true}
        />
        <TextInput
          type="number"
          label="contact"
          value={contact}
          minLength={11}
          maxLength={11}
          onChange={(e) => setContact((s) => e)}
          required={true}
        />
        <EmailInput
          label="Email"
          value={email}
          onChange={(e) => setEmail((s) => e)}
          required={true}
        />
        <TextInput
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword((s) => e)}
          required={true}
        />
        <TextInput
          type="password"
          label="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword((s) => e)}
          required={true}
        />
        <p className="text-danger ws-pre">{responseError}</p>
        <div className="text-center">
          <ButtonSpinner
            text={role == "admin" ? "Add Administrator" : "Add Security"}
            showSpinner={showSpinner}
            onClick={handleSubmit}
            textSize="sm"
          />
        </div>
      </div>
    </BaseModal>
  );
}

export default CreateUserModal;
