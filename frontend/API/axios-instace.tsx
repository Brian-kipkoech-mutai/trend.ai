import { envConfig } from "@/envConfig/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl, // Backend URL
  timeout: 10000,
  withCredentials: true,
});
