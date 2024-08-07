import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/comment';

export const getAll = async (postId) => {
  try {
    const result = await requester.get(`${BASE_URL}/${postId}`);;
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createComment = async (postId, formData) => {
  const data = {postId, ...formData}
   try {
     const result = await requester.post(`${BASE_URL}/create`, data)
     return result;
   } catch (error) {
     throw new Error(error.message);
   }
};
 
export const deleteComment = async (commentId) => {
   try {
     const result = await requester.del(`${BASE_URL}/delete/${commentId}`);
     return result;
   } catch (error) {
     throw new Error(error.message);
   }
};