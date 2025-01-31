import { login, register, logout } from "../api/auth-api"
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
   const { changeAuthState } = useAuthContext();

   const loginHandler = async (username, password) => {
      const result = await login(username, password);
      changeAuthState(result);
      return result;
   };

   return loginHandler
};

export const useRegister = () => {
   const { changeAuthState } = useAuthContext();

   const registerHandler = async (username, email, password, rePass) => {
      const result = await register(username, email, password, rePass);
      changeAuthState(result);
      return result;
   };

   return registerHandler
};

export const useLogout = () => {
   const { logout: localLogout } = useAuthContext();

   const logoutHandler = () => {
      return logout()
        .then((result) => {
          localLogout();
          return result;
        })
        .catch((error) => {
          throw new Error(error.message)
        });
    };

   return logoutHandler
}