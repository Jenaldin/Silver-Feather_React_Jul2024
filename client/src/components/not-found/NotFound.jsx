import React from 'react';
import { Link } from 'react-router-dom';

import { theme } from '../common/muiTheme';

export default function NotFound() {
   return (
      <section id="home" className='main-content'>
         <div id="titles" className='home-titles'>
            <h1>This path in the Tavern does not exist yet!</h1>
            <h4>If you think it should exist, contact the administrators to create it.</h4>
         </div>
         <div id='img-logo'><img src="/images/not-found.png" style={{ height: '350px', width: '350px' }} ></img></div>

         <h5 style={{ textAlign: 'center', margin: '10px', color: theme.palette.secondary.main }}>
            Return to <Link to="/" className='card-links'>Home page from here</Link> or use the navigation on top.
         </h5>
      </section>
   )
}