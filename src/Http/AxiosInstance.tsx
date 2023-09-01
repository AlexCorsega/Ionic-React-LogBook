import axios from "axios";

const AxiosUri = "https://2ee5-143-44-191-101.ngrok-free.app/api/";
function AxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: AxiosUri,
  });
  axiosInstance.defaults.headers.common["ngrok-skip-browser-warning"] = "any";
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      try {
        if (error.response.status == 401) {
          history.replaceState(null, "", "/");
          window.location.assign("/");
        }
      } catch (error) {}

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.request.use((config) => {
    console.log(axiosInstance.getUri());
    if (!config.headers["Content-Type"])
      config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  return axiosInstance;
}
export const getAxiosUri = () => AxiosUri;
export const AxiosNoHeaders = () => {
  const axiosInstance = axios.create({
    baseURL: AxiosUri,
    headers: {},
  });
  return axiosInstance;
};
export default AxiosInstance;
