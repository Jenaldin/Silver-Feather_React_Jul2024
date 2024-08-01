import React from 'react';
import { Link } from 'react-router-dom';

import { theme } from '../common/muiTheme';

export default function NotFound() {
   return (
      <section id="home" className='main-content'>
         <div id="titles" className='home-titles'>
            <h1>The path you are looking for does not exist!</h1>
            <h4>You might have lost yourself in the labyrinth, adventurer...</h4>
         </div>
         <div id='img-logo'><img src="/images/not-found.png" style={{ height: '350px', width: '350px' }} ></img></div>

         <h5 style={{ textAlign: 'center', margin: '25px', color: theme.palette.secondary.main }}>
            Return to <Link to="/" className='card-links'>The Entrance hall (home page)</Link> or use the signs at the top.
         </h5>
      </section>
   )
}