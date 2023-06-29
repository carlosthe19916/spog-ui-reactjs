import axios from "axios";

export const iniAxios = () => {
  axios.defaults.baseURL = "http://localhost:8083/api/v1";
};
