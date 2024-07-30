import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { theme } from '../../../public/styles/muiTheme';

export default function Register() {
   const { handleSubmit, register, formState: { errors }, watch, trigger } = useForm();

   const onSubmit = (data) => {
      console.log(data);
   };

   const password = watch('password');
   const rePass = watch('rePass');

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <Box sx={{ marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Register
            </Typography>
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
                        label="Username"
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
                        label="Email"
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
                        label="Password"
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
                        label="Repeat Password"
                        type="password"
                        id="rePass"
                        error={!!errors.rePass}
                        helperText={errors.rePass?.message}
                        onBlur={() => trigger('rePass')}
                     />
                  </Grid>
               </Grid>
               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Register
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link to="/sign-in" style={{ textDecoration: 'none', color: theme.palette.primary.dark }}>
                        Already a member of the Tavern? Sign in!
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
}

// export default function Register() {
//    const handleSubmit = (ev) => {
//       ev.preventDefault();
//       const data = new FormData(ev.currentTarget);
//       console.log({
//          username: data.get('username'),
//          email: data.get('email'),
//          password: data.get('password'),
//          rePassword: data.get('rePass'),
//       });
//    };

//    return (
//       <Container component="main" maxWidth="xs">
//          <CssBaseline />
//          <Box
//             sx={{
//                marginTop: 15,
//                display: 'flex',
//                flexDirection: 'column',
//                alignItems: 'center',
//             }}
//          >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//                Register
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                      <TextField
//                         autoComplete="user-name"
//                         name="username"
//                         required
//                         fullWidth
//                         id="username"
//                         label="User Name"
//                         autoFocus
//                      />
//                   </Grid>
//                   <Grid item xs={12}>
//                      <TextField
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                      />
//                   </Grid>
//                   <Grid item xs={12}>
//                      <TextField
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="new-password"
//                      />
//                   </Grid>
//                   <Grid item xs={12}>
//                      <TextField
//                         required
//                         fullWidth
//                         name="rePass"
//                         label="Repeat Password"
//                         type="password"
//                         id="rePass"
//                         autoComplete="re-pass"
//                      />
//                   </Grid>
//                </Grid>
//                <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                >
//                   Register
//                </Button>
//                <Grid container justifyContent="flex-end">
//                   <Grid item>
//                      <Link to="/sign-in" style={{ textDecoration: 'none', color: theme.palette.primary.dark }}>
//                         Already a member of the Tavern? Sign in!
//                      </Link>
//                   </Grid>
//                </Grid>
//             </Box>
//          </Box>
//       </Container>
//    );
// }