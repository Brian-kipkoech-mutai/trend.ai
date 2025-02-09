import { apiEndpoints } from "@/API/api-enpoints";
import { axiosInstance } from "@/API/axios-instace";

   
interface Campaign{
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    
}

export const createCampaign = async (campaign: Campaign) =>
    await axiosInstance.post(apiEndpoints.CREATE_CAMPAIGN, campaign);
    
