import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/posts';

export const getAll = async () => {
  try {
    const result = await requester.get(`${BASE_URL}/`);;
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

