import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/campaign';

export const getAll = async (userId) => {
  try {
    const result = await requester.get(`${BASE_URL}/${userId}`);;
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCampaign = async (data) => {
  try {
    const result = await requester.post(`${BASE_URL}/create`, data)
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const updateCampaign = async (campaignId, data) => {
  try {
    const result = await requester.put(`${BASE_URL}/edit/${campaignId}`, data);
  return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getCampaign = async (campaignId) => {
  try {
    const result = await requester.get(`${BASE_URL}/details/${campaignId}`);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCampaign = async (campaignId) => {
  try {
    const result = await requester.del(`${BASE_URL}/delete/${campaignId}`);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};