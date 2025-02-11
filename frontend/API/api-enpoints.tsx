export const apiEndpoints = {
  // auth
  LOGIN: "api/auth/login",
  LOGOUT: "api/auth/logout",
  REGISTER: "api/auth/register",
  FORGOT_PASSWORD: "api/auth/forgot-password",
  USER: "api/auth/user",

  //  campaign
  CREATE_CAMPAIGN: "api/campaigns/create",
  GET_CAMPAIGNS_FOR_BRAND: "api/campaigns/brand",
  GET_ALL_CAMPAIGNS: "api/campaigns/all",
  GET_CAMPAIGN_BY_ID: (id: string) => `api/campaigns/${id}`,
  SUBMIT_CAMPAIGN_APPLICATION: "api/campaigns/submit-application",

  // submission
  GET_ALL_USER_SUBMISSIONS: "api/submissions/all-user-submissions",
  GET_ACCEPTED_SUBMISSION: "api/submissions/accepted",
  GET_ALL_SUBMISSIONS: "api/submissions/all",
  PROCESS_SUBMISSION: "api/submissions/process",
};