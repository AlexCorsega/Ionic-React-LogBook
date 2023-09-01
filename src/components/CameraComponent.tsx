import { Camera, CameraResultType } from "@capacitor/camera";
import { IonImg, IonButton } from "@ionic/react";
import { image } from "ionicons/icons";
import React, { MouseEventHandler, useState } from "react";
import AxiosAPI from "../Http/AxiosAPI";
import { Colors } from "../constants/Colors";

interface Props {
  imageAlt: string;
  disabled: boolean;
  buttonText: string;
  color?: Colors;
  showImage?: boolean;
  textSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  onCameraCaptureCallback: (
    imageBlob: Blob,
    fileName: string,
    imageUrl?: string
  ) => void;
}

function CameraComponent({
  imageAlt,
  disabled,
  buttonText,
  color,
  showImage,
  textSize,
  onCameraCaptureCallback,
}: Props) {
  const [image, setImage] = useState("");
  async function handleOnClick(
    onCameraCaptureCallback: (
      imageBlob: Blob,
      fileName: string,
      imageUrl?: string
    ) => void
  ) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    var imageUrl = image.webPath;
    const request = await AxiosAPI(imageUrl, {
      responseType: "blob",
    });
    onCameraCaptureCallback(
      request.data,
      request.data.type.split("/")[1],
      imageUrl
    );
    setImage((s) => imageUrl ?? "");
  }
  return (
    <>
      <IonImg
        className={
          image === ""
            ? "d-none"
            : showImage == null || showImage
            ? "d-block"
            : "d-none"
        }
        src={image}
        alt={imageAlt}
      ></IonImg>
      <IonButton
        expand="block"
        color={color == null ? "medium" : color}
        className={"ion-text-center fs-" + `${!textSize ? "normal" : textSize}`}
        disabled={disabled}
        onClick={() => handleOnClick(onCameraCaptureCallback)}
      >
        {buttonText}
      </IonButton>
    </>
  );
}

export default CameraComponent;
