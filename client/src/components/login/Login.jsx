import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, CssBaseline, TextField, Grid, Box, Container } from "@mui/material";
import { toast, ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css'; 
import { theme } from '../common/muiTheme';

import { useLogin } from "../../hooks/useAuth";

export default function Login() {
   const { handleSubmit, register, formState: { errors }, trigger } = useForm();

   const navigate = useNavigate();
   const loginHandler = useLogin();

   const onSubmit = async (data) => {
      try {
         const { username, password } = data;
         await loginHandler(username, password);
         navigate('/');
      } catch (error) {
         console.log('Login error: ', error);
         if (error.error === "Error logging in a user: Login or password is invalid"){
            toast.error('Invalid sign-in information.');
         } else {
            toast.error('Something went wrong. Please try again later.');
         }
      }
   };

   return (
      <section id="section-wrapper">
      <Container component="main" maxWidth="xs" className="card-players">
         <CssBaseline />
         <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/sign-in.png" alt="sign-in" height="250px"/>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        {...register('username', {
                           required: 'Username is required',
                           pattern: {
                              value: /^[a-zA-Z0-9_-]+$/,
                              message: 'Invalid username',
                           },
                           validate: value => !/\s/.test(value) || 'No spaces allowed',
                        })}
                        fullWidth
                        name="username"
                        id="username"
                        label="Username *"
                        type="input"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        onBlur={() => trigger('username')}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        {...register('password', {
                           required: 'Password is required',
                           validate: value => !/\s/.test(value) || 'No spaces allowed',
                        })}
                        fullWidth
                        name="password"
                        label="Password *"
                        type="password"
                        id="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        onBlur={() => trigger('password')}
                     />
                  </Grid>
               </Grid>
               <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                  Sign-in
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link to="/register" style={{ textDecoration: 'none', color: theme.palette.primary.dark }}>
                        Not a member of the Tavern? Join us and register!
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
      <ToastContainer position="top-center" autoClose={5000} style={{ fontWeight: 'bold', width: "400px" }} />
      </section>
   );
}