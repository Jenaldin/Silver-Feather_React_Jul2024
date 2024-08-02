import { createCampaign } from "../api/campaigns-api";


export function useCreateCampaign(){
   const createCampaignHandler = async (data) => {
      await createCampaign(data);
   };

   return createCampaignHandler;
}