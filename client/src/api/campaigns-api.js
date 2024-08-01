import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/campaign';

export const getAll = async (userId) => {
   try {
     const result = await requester.get(`${BASE_URL}/${userId}`);;
     //const campaigns = Object.values(result)
     return result;
   } catch (error) {
     console.log('Error fetching campaigns:', error.message);
     throw new Error('Unable to fetch campaigns. Please try again later.');
   }
 };