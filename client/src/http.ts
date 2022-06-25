import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_API;

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  //validateStatus: () => true,
}); 

export default apiClient; 