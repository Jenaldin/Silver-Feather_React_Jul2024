import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material';

import * as campaignsAPI from '../../api/campaigns-api';
import { useAuthContext } from "../../context/AuthContext";

export default function CampaignList() {
   const [campaigns, setCampaigns] = useState([]);
   const [visibleItems, setVisibleItems] = useState(3);
   const { username, userId } = useAuthContext();

   useEffect(() => {
      campaignsAPI.getAll(userId)
         .then(result => setCampaigns(result))
         .catch(err => console.log('Error fetching campaigns:', err.message));
   }, []);

   const loadMoreItems = () => {
      setVisibleItems(prevVisible => prevVisible + 3);
   };

   return (
      <section id="section-wrapper">
         <div id="title" className="main-titles">
            <h2>My Campaigns Catalogue</h2>
         </div>
         <Link to={`/my-boards/${username}/campaigns/new`} style={{ textDecoration: 'none' }}>
         <Button variant="contained" style={{ color: 'primary', fontWeight: 'bold', fontStyle: 'italic', margin: "20px" }}>
            Create New Campaign
         </Button>
         </Link>
         <div>
         <Divider variant="middle" />
         </div>
         
         <div id="title" className="heading-small">
            <h5>A list of the campaigns you have already created:</h5>
         </div>
         <div className="gallery" >
         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: '15px' }} >
            {campaigns.length === 0 ? (
               <Typography variant="h5">Unfortunately, we did not find any... Crate your first one!</Typography>
            ) : (
               campaigns.slice(0, visibleItems).map((item, index) => (
                  <Card key={index} sx={{ maxWidth: 500, margin: '1rem', height: "200px" }}>
                     <Link className="card-links" to={`/my-boards/${username}/campaigns/${item._id}`} style={{ textDecoration: 'none' }}>
                        <CardActionArea>
                           <CardMedia
                              component="img"
                              style={{height: '150px', width: '400px', objectFit: 'cover' }}
                              image={item.imageUrl ? item.imageUrl : "/images/logo.png"}
                              alt={item.title}
                           />
                           <Divider variant="middle" />
                           <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                 {item.title}
                              </Typography>
                           </CardContent>
                        </CardActionArea>
                     </Link>
                  </Card>
               ))
            )}
            </div>
            {visibleItems < campaigns.length && (
               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <Button variant="outlined" style={{ fontWeight: 'bold', fontStyle: 'italic' }} onClick={loadMoreItems}>
                     Show More
                  </Button>
               </div>
            )}
         </div>
      </section >
   )
}