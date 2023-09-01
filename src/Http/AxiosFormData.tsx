import React from "react";
import AxiosInstance from "./AxiosInstance";
interface Props {
  url: string;
  formData: FormData | null;
}
async function AxiosFormData({ formData, url }: Props) {
  return await AxiosInstance().post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // .then((s) => {
  //   successCallback(s);
  //   return s;
  // })
  // .catch((s) => {
  //   errorCallback(s);
  //   return s;
  // });
}
export default AxiosFormData;
