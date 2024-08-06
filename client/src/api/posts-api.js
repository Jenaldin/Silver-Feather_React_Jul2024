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

export const getPost = async (postId) => {
   try {
     const result = await requester.get(`${BASE_URL}/details/${postId}`);
     return result;
   } catch (error) {
     throw new Error(error.message);
   }
 };

export const createPost = async (data) => {
   try {
     const result = await requester.post(`${BASE_URL}/create`, data)
     return result;
   } catch (error) {
     throw new Error(error.message);
   }
 }
 
 export const updatePost = async (postId, data) => {
   try {
     const result = await requester.put(`${BASE_URL}/edit/${postId}`, data);
   return result;
   } catch (error) {
     throw new Error(error.message);
   }
 }
 
 export const deletePost = async (postId) => {
   try {
     const result = await requester.del(`${BASE_URL}/delete/${postId}`);
     return result;
   } catch (error) {
     throw new Error(error.message);
   }
 };