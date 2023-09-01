import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import AxiosInstance from "../../Http/AxiosInstance";
import TextInput from "../Inputs/TextInput";

interface Props {
  id: number;
  isModalOpen: boolean;
  onClose: () => void;
}
function SecurityGuardDetailsModal({ id, isModalOpen, onClose }: Props) {
  const [details, setDetails] = useState<any>();

  useEffect(() => {
    queryData();
  }, [id]);
  async function queryData() {
    const response = await AxiosInstance().get(
      `admin/security-guard-details/${id}`
    );
  }

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={onClose}
      title="Security Guard Details"
    >
      <div className="spacing-y-2">
        <TextInput
          required={false}
          label="Firstname"
          value={details?.firstname}
          readonly
        />
        <TextInput
          required={false}
          readonly
          label="Lastname"
          value={details?.lastname}
        />
        <TextInput
          required={false}
          readonly
          label="Contact"
          value={details?.contact}
        />
        <TextInput
          required={false}
          readonly
          label="Contact"
          value={details?.email}
        />
      </div>
    </BaseModal>
  );
}

export default SecurityGuardDetailsModal;
