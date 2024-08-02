import { login, register, logout } from "../api/auth-api"
import { AuthContext, useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
   const {changeAuthState} = useAuthContext();
   
   const loginHandler = async (username, password) => {
      try {
         const result = await login(username, password);
         changeAuthState(result);
         return result;
      } catch (err) {
         console.log("Error in loginHelper: ", err.message);
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
         console.log("Error in registerHelper: ", err.message);
      };
   };

   return registerHandler
};

export const useLogout = () => {
   const { logout: localLogout } = useAuthContext();

   const logoutHandler = async () => {
      try {
         localLogout()
         await logout();
      } catch (err) {
         console.log("Error in logoutHelper: ",err.message);
      };
   };

   return logoutHandler
}