import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/session';

export const getAll = async (campaignId) => {
  try {
    const result = await requester.get(`${BASE_URL}/${campaignId}`);;
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSession = async (sessionId) => {
   try {
     const result = await requester.get(`${BASE_URL}/details/${sessionId}`);
     return result;
   } catch (error) {
     throw new Error(error.message);
   }
 };

export const createSession = async (sessionId, campaignId, formData) => {
  try {
   const data = {campaignId, ...formData}
    const result = await requester.post(`${BASE_URL}/create`, data)
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const updateSession = async (sessionId, formData) => {
  try {
    const result = await requester.put(`${BASE_URL}/edit/${sessionId}`, formData);
  return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteSession = async (sessionId) => {
  try {
    const result = await requester.del(`${BASE_URL}/delete/${sessionId}`);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};