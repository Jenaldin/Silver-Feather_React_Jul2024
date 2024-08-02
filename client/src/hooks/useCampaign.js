import { createCampaign, updateCampaign } from "../api/campaigns-api";

export function useCreateCampaign(){
   const createCampaignHandler = async (data) => {
      await createCampaign(data);
   };

   return createCampaignHandler;
}

export function useUpdateCampaign(){
   const updateCampaignHandler = async (data) => {
      await updateCampaign(data);
   };

   return updateCampaignHandler;
}