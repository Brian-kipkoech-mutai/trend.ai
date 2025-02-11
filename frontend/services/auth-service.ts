import { apiEndpoints } from "@/API/api-enpoints";
import { axiosInstance } from "@/API/axios-instace";
import { Interface } from "readline";

 
interface RegisterData{
  email?: string;
  password?: string;
  name?: string;
  role?: string;
}
interface LoginData{
  email?: string;
  password?: string;
 }

export const registerUser = async (userData: RegisterData) =>
  await axiosInstance.post(apiEndpoints.REGISTER, userData);

export const userLogin = async (userData: LoginData) =>
  await axiosInstance.post(apiEndpoints.LOGIN, userData);

export const getUser = async () =>
  await axiosInstance.get(apiEndpoints.USER);
