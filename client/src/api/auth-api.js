import requester from "./requester";

const BASE_URL = 'http://localhost:3000/api/user';

export const login = async (username, password) =>  {
   const authData = requester.post(`${BASE_URL}/login`, {username, password});
   return authData
};

export const register = async (username, email, password, rePass) =>  {
   const authData = requester.post(`${BASE_URL}/register`, {username, email, password, rePass});
   return authData
};

export const logout = () => requester.get(`${BASE_URL}/logout`);