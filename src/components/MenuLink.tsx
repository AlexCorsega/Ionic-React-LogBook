import {
  IonMenuToggle,
  IonRouterLink,
  IonRippleEffect,
  IonItem,
} from "@ionic/react";
import React, { useState } from "react";

interface Props {
  content: string;
  routerLink: string;
  onClick?: () => void;
  isActive?: boolean;
}

function MenuLink({ content, onClick, routerLink, isActive }: Props) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  return (
    <IonMenuToggle>
      <IonItem
        color={isActive ? "tertiary" : ""}
        onClick={onClick}
        routerLink={routerLink}
        // className={
        //   `${
        //     currentPath == routerLink
        //       ? "text-light bg-primary "
        //       : "bg-transparent "
        //   }` +
        //   "ion-no-padding text-dark py-1 fw-semibold  fs-md text-decoration-none d-block w-100 "
        // }
      >
        <div className="ion-activatable ripple-parent rounded-rectangle bg-transparent">
          {content}
          <IonRippleEffect></IonRippleEffect>
        </div>
      </IonItem>
    </IonMenuToggle>
  );
}

export default MenuLink;
