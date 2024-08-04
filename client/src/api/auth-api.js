import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/user';

export const login = async (username, password) =>  {
   try {
      const authData = requester.post(`${BASE_URL}/login`, {username, password});
      return authData
   } catch (error) {
      throw new Error(error.message);
   }
};

export const register = async (username, email, password, rePass) =>  {
   try {
      const authData = requester.post(`${BASE_URL}/register`, {username, email, password, rePass});
      return authData
   } catch (error) {
      throw new Error(error.message);
   }
};

export const logout = async () => {
   try {
      const bye = requester.get(`${BASE_URL}/logout/`);
      return bye;
   } catch (error) {
    throw new Error(error.message);
   }
}