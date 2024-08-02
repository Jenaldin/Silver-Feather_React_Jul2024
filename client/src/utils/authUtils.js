export const getAccessToken = () => {
   const authJson = localStorage.getItem('auth');

   if(!authJson){
       return ''; 
   }

   const authData = JSON.parse(authJson);

   return authData?.token;
};