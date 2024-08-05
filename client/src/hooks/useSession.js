import { createSession, updateSession } from "../api/sessions-api";

export function useCreateSession(){
   const createSessionHandler = async (data) => {
      await createSession(data);
   };
   return createSessionHandler;
}

export function useUpdateSession(){
   const updateSessionHandler = async (campaignId, data) => {
      await updateSession(campaignId, data);
   };
   return updateSessionHandler;
}