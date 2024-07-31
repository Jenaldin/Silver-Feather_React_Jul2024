import { login, register } from "../api/auth-api"
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
   const {changeAuthState} = useAuthContext();
   
   const loginHandler = async (username, password) => {
      try {
         const result = await login(username, password);
         changeAuthState(result);
         return result;
      } catch (err) {
         console.log(err.message);
      };
   };

   return loginHandler
};

export const useRegister = () => {
   const {changeAuthState} = useAuthContext();

   const registerHandler = async (username, email, password, rePass) => {
      try {
         const result = await register(username, email, password, rePass);
         changeAuthState(result);
         return result;
      } catch (err) {
         console.log(err.message);
      };
   };

   return registerHandler
}