import { IonIcon, IonItem } from "@ionic/react";
import React from "react";
import { Colors } from "../constants/Colors";
import { useHistory } from "react-router";
import { useAdminMenu } from "./Layout/AdminMenu";
interface Props {
  actualData: number;
  icon: string;
  iconColor?: Colors;
  color: Colors;
  label: string;
  routerLink?: string;
}
function DataReport({
  actualData,
  icon,
  color,
  iconColor,
  label,
  routerLink,
}: Props) {
  const history = useHistory();
  const adminMenu = useAdminMenu();

  function onClick() {
    adminMenu?.changePage(label);
    history.push(routerLink);
  }
  return (
    <IonItem onClick={onClick}>
      <div className="flex gap-1  align-center justify-between w-100">
        <div className="flex">
          <div className={"width-10px h-100 bg-" + color}></div>
          <h2 className="font-xl ms-1">{actualData}</h2>
        </div>
        <div className="flex justify-end flex-col align-end">
          <IonIcon
            icon={icon}
            className={"font-xl text-" + iconColor}
          ></IonIcon>
          <p className="font-default text-medium text-gray">{label}</p>
        </div>
      </div>
    </IonItem>
  );
}

export default DataReport;
