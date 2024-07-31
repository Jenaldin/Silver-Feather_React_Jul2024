import { createContext } from 'react';

export const AuthContext = createContext({
   userId: '',
   email: '',
   username: '',
   accessToken: '',
   isAuthenticated: false,
   changeAuthState: (authState = {}) => null,
});