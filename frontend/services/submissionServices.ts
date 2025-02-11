
import { apiEndpoints } from "@/API/api-enpoints";
import { axiosInstance } from "@/API/axios-instace";



export const getAllUserSubmission = async () =>
    await axiosInstance.get(apiEndpoints.GET_ALL_USER_SUBMISSIONS);

export const getAllsubmissions = async () =>
    await axiosInstance.get(apiEndpoints.GET_ALL_SUBMISSIONS);

export const processSubmission = async (submissionData: {}) =>
    await axiosInstance.post(apiEndpoints.PROCESS_SUBMISSION, submissionData);
