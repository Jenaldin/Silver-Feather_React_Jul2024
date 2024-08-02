import { createContext, useContext } from 'react';

import usePersistedState from '../hooks/usePersistedState';

export const AuthContext = createContext({
   userId: '',
   email: '',
   username: '',
   token: '',
   isAuthenticated: false,
   changeAuthState: (authState = {}) => null,
   logout: () => null,
});

export function AuthContextProvider(props) {
   const [authState, setAuthState] = usePersistedState('auth', {});

   const changeAuthState = (state) => {
      //localStorage.setItem('token', state.token);

      setAuthState(state);
   }

   const logout = () => {
      setAuthState(null)
   }

   const contextData = {
      userId: authState?.id,
      email: authState?.email,
      username: authState?.username,
      token: authState?.token,
      isAuthenticated: !!authState?.username,
      changeAuthState,
      logout,
   };

   return (
      <AuthContext.Provider value={contextData}>
         {props.children}
      </AuthContext.Provider>
   )
};

export function useAuthContext() {
   const authData = useContext(AuthContext);
   return authData;
}