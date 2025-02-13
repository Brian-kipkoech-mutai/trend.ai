import { envConfig } from "@/envConfig/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl, // Backend URL
  timeout: 300000,
  withCredentials: true,
});
