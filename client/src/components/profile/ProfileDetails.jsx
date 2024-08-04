import React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { Button } from "@mui/material";

export default function ProfileDetails() {
   const { username } = useAuthContext();

   return (
      <section id="profile-section">
         <div id="title-profile-section" className="title-profile-section">
            <h2>Hello {username}, are you ready for an adventure? </h2>
         </div>
         <div id="subtitle-profile-section" className="subtitle-profile-section">
            <h5>
               Choose below which path are you willing to take today - of a player or
               a dungeon master
            </h5>
         </div>
         <div className="cards-container-profile-section">
            <div className="card-profile-section">
            <Link to={`/my-boards/${username}/characters`} style={{ textDecoration: 'none' }}>
               <div className="title-card-profile-section">
                  <h6>Player Characters's Vault</h6>
               </div>
               <div className="img-card-profile-section">
                  <img
                     className="photo-profile-section"
                     src="/images/player.png"
                     alt="player sigil"
                  />
               </div>
               <div className="button-div-card-profile-section">
                  <Button variant="contained" style={{ fontWeight: 'bold', fontStyle: 'italic'}}>
                     ENTER
                  </Button>
               </div>
               </Link>
               <div className="text-card-profile-section">
                  <p>
                     In this location you will find gathered all your personalities and
                     disguises, past and present. You can edit them, in case they are
                     not published or you can create new identities for your alter
                     egos. Keep in mind the rules for creation are using "Dungeons &
                     Dragons" 5e OGL content only.
                  </p>
               </div>
            </div>
            <div className="card-profile-section">
            <Link to={`/my-boards/${username}/campaigns`} style={{ textDecoration: 'none' }}>
               <div className="title-card-profile-section">
                  <h6>Dungeon Master's Layer</h6>
               </div>
               <div className="img-card-profile-section">
                  <img
                     className="photo-profile-section"
                     src="/images/dm.png"
                     alt="dm sigil"
                  />
               </div>
               <div className="button-div-card-profile-section">
                  <Button variant="contained" style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                     ENTER
                  </Button>
               </div>
               </Link>
               <div className="text-card-profile-section">
                  <p>
                     The layer will provide for you the tools to create simple, but
                     interesting campaigns, either following "Dungeons & Dragons" 5e
                     OGL or pouring out of your imagination as Homebrew. It will help
                     you keep track of who is roaming the roads of said campaigns and
                     even help plan sessions for each campaign.
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}
