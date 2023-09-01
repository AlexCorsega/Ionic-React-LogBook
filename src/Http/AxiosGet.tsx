import React from "react";
import AxiosInstance from "./AxiosInstance";

interface Props {
  url: string | undefined;
  data: any;
}
async function AxiosGet({ data, url }: Props) {
  return await AxiosInstance()
    .get(url ?? "", data)
    .then((s) => s)
    .catch((s) => s);
}

export default AxiosGet;
