import { createSession, updateSession } from "../api/sessions-api";

export function useCreateSession(){
   const createSessionHandler = async (data) => {
      await createSession(data);
   };
   return createSessionHandler;
}

export function useUpdateSession(){
   const updateSessionHandler = async (sessionId, formData) => {
      await updateSession(sessionId, formData);
   };
   return updateSessionHandler;
}