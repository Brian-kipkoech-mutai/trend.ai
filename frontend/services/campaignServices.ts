 
import { apiEndpoints } from "@/API/api-enpoints";
import { axiosInstance } from "@/API/axios-instace";

interface Campaign {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export const createCampaign = async (campaign: Campaign) =>
  await axiosInstance.post(apiEndpoints.CREATE_CAMPAIGN, campaign);

export const getAllCampaignsForBrand = async () =>
  await axiosInstance.get(apiEndpoints.GET_CAMPAIGNS_FOR_BRAND);

export const getAllCampaignsForInfluencer = async () =>
  await axiosInstance.get(apiEndpoints.GET_ALL_CAMPAIGNS);

export const getCampaignById = async (id: string) =>
  await axiosInstance.get(apiEndpoints.GET_CAMPAIGN_BY_ID(id));

export  const submitCampaignApplication = async (campaignData:{}) =>
  await axiosInstance.post(apiEndpoints.SUBMIT_CAMPAIGN_APPLICATION, campaignData);
export   const getAcceptedCampaigns = async () =>
  await axiosInstance.get(apiEndpoints.GET_ACCEPTED_SUBMISSION);
