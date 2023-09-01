import axios, { AxiosRequestConfig } from "axios";
import AxiosInstance from "./AxiosInstance";

function AxiosAPI(url: string | undefined, config: AxiosRequestConfig) {
  return axios.get(url ?? "", config);
}
export default AxiosAPI;
