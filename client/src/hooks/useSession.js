import { createSession, updateSession } from "../api/sessions-api";

export function useCreateSession(){
   const createSessionHandler = async (campaignId, formData) => {
      await createSession(campaignId, formData);
   };
   return createSessionHandler;
}

export function useUpdateSession(){
   const updateSessionHandler = async (sessionId, formData) => {
      await updateSession(sessionId, formData);
   };
   return updateSessionHandler;
}