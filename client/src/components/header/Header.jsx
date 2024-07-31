import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../../public/styles/muiTheme';
import { useAuthContext } from '../../context/AuthContext';

export default function Header() {
   const location = useLocation();

   const buttonStyle = (path) => ({
      fontStyle: 'italic',
      fontWeight: 'bold',
      margin: '0 10px',
      color: location.pathname === path ? theme.palette.primary.contrastText : theme.palette.primary.darker,
      '&:hover': {
         backgroundColor: theme.palette.primary.light,
         color: theme.palette.background.default,
      },
   });

   const {isAuthenticated, username} = useAuthContext();

   return (
      <div>
         {isAuthenticated
         ? (
            <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
            <Toolbar style={{ minHeight: '50px', paddingLeft: '0px', paddingRight: '0px' }}>
               <Link to="/" style={{ padding: '0', margin: '0' }}>
                  <img src="/images/favicon.png" alt="Logo"
                     style={{ height: '50px', width: '50px', marginRight: '16px', objectFit: 'cover' }} />
               </Link>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/"
                     style={{ textDecoration: 'none', color: theme.palette.background.paper, fontWeight: 'bold', fontStyle: 'italic' }}>
                     Silver Feather Tavern
                  </Link>
               </Typography>
               <Link to="/adventurers-board" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/adventurers-board')}>Adventurers Guild Board</Button>
               </Link>
               <Link to="/my-boards" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/my-boards')} > {username}'s Boards and Profile</Button>
               </Link>
               <Link to="/sign-out" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/sign-out')}>Sign out</Button>
               </Link>
               <Link to="/about" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/about')}>About</Button>
               </Link>
            </Toolbar>
         </AppBar>
         )
         : (
            <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
            <Toolbar style={{ minHeight: '50px', paddingLeft: '0px', paddingRight: '0px' }}>
               <Link to="/" style={{ padding: '0', margin: '0' }}>
                  <img src="/images/favicon.png" alt="Logo"
                     style={{ height: '50px', width: '50px', marginRight: '16px', objectFit: 'cover' }} />
               </Link>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/"
                     style={{ textDecoration: 'none', color: theme.palette.background.paper, fontWeight: 'bold', fontStyle: 'italic' }}>
                     Silver Feather Tavern
                  </Link>
               </Typography>
               <Link to="/adventurers-board" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/adventurers-board')}>Adventurers Gild Board</Button>
               </Link>
               <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/register')}>Register</Button>
               </Link>
               <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/sign-in')}>Sign in</Button>
               </Link>
               <Link to="/about" style={{ textDecoration: 'none' }}>
                  <Button sx={buttonStyle('/about')}>About</Button>
               </Link>
            </Toolbar>
         </AppBar>
         )
         }
      </div>
   );
}