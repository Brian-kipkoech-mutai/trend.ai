import { apiEndpoints } from "@/API/api-enpoints";
import { axiosInstance } from "@/API/axios-instace";

interface UserData {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export const registerUser = async (userData: UserData) =>
  await axiosInstance.post(apiEndpoints.REGISTER, userData);

export const userLogin = async (userData: UserData) =>
  await axiosInstance.post(apiEndpoints.LOGIN, userData);

export const getUser = async () =>
  await axiosInstance.get(apiEndpoints.USER);
