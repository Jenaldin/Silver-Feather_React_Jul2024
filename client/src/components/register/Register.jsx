import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, CssBaseline, TextField, Grid, Box, Container } from "@mui/material";
import { toast, ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css'; 
import { theme } from '../common/muiTheme';

import { useRegister } from "../../hooks/useAuth";

export default function Register() {
   const { handleSubmit, register, formState: { errors }, watch, trigger } = useForm();

   const navigate = useNavigate();
   const registerHandler = useRegister();

   const onSubmit = async (data) => {
      try {
         const { username, email, password, rePass } = data;
         await registerHandler(username, email, password, rePass);
         navigate('/');
      } catch (error) {
         console.log('Register error: ', error);
         if (error.error === "Error registering a user: Already exists!"){
            toast.error('We already have this person in the register.');
         } else {
            toast.error('Something went wrong. Please try again later.');
         }
      }
   };

   const password = watch('password');
   const rePass = watch('rePass');

   return (
      <section id="section-wrapper">
      <Container component="main" maxWidth="xs" className="card-players">
         <CssBaseline />
         <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <img src="/images/register.png" alt="register" height="250px"/>
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
                           minLength: {
                              value: 3,
                              message: 'Username must be at least 3 characters',
                           },
                           maxLength: {
                              value: 10,
                              message: 'Username must be at most 10 characters',
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
                        {...register('email', {
                           required: 'Email is required',
                           pattern: {
                              value: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                              message: 'Invalid email',
                           },
                           minLength: {
                              value: 10,
                              message: 'Email must be at least 10 characters',
                           },
                           maxLength: {
                              value: 50,
                              message: 'Email must be at most 50 characters',
                           },
                           validate: value => !/\s/.test(value) || 'No spaces allowed',
                        })}
                        fullWidth
                        name="email"
                        id="email"
                        label="Email *"
                        type="input"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onBlur={() => trigger('email')}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        {...register('password', {
                           required: 'Password is required',
                           minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                           },
                           maxLength: {
                              value: 12,
                              message: 'Password must be at most 12 characters',
                           },
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
                  <Grid item xs={12}>
                     <TextField
                        {...register('rePass', {
                           required: 'Repeat Password is required',
                           validate: value => value === password || 'Passwords must match',
                        })}
                        fullWidth
                        name="rePass"
                        label="Repeat Password *"
                        type="password"
                        id="rePass"
                        error={!!errors.rePass}
                        helperText={errors.rePass?.message}
                        onBlur={() => trigger('rePass')}
                     />
                  </Grid>
               </Grid>
               <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                  Register
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link to="/sign-in" style={{ textDecoration: 'none', color: theme.palette.primary.dark }}>
                        Already a member of the Tavern? Then sign-in!
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