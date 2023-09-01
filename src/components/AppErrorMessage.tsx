import { IonLabel } from "@ionic/react";
import React from "react";
interface Props {
  error: string;
}

function AppErrorMessage({ error }: Props) {
  return <p className="text-danger pb-0 mb-0">{error}</p>;
}

export default AppErrorMessage;
