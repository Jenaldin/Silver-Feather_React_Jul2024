import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/campaign';

export const getAll = async (userId) => {
   try {
     const result = await requester.get(`${BASE_URL}/${userId}`);;
     return result;
   } catch (error) {
     console.log('Error fetching campaigns:', error.message);
     throw new Error('Unable to fetch campaigns. Please try again later.');
   }
 };

export const createCampaign = async (data) => {
  const result = await requester.post(`${BASE_URL}/create`, data)
  return result;
}

export const updateCampaign = async (data, campaignId) => {
  const result = await requester.put(`${BASE_URL}/edit/${campaignId}`, data)
  return result;
}

export const getCampaign = async (campaignId) => {
  try {
    const result = await requester.get(`${BASE_URL}/details/${campaignId}`);
    return result;
  } catch (error) {
    console.log('Error fetching a campaign:', error.message);
    throw new Error('Unable to fetch campaign. Please try again later.');
  }
};

export const deleteCampaign = async (campaignId) => {
  try {
    const result = await requester.del(`${BASE_URL}/delete/${campaignId}`);
    return result;
  } catch (error) {
    console.log('Error delete a campaign:', error.message);
    throw new Error('Unable to delete campaign. Please try again later.');
  }
}