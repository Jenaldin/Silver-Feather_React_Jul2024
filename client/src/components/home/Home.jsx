import React from "react";
import { Link } from "react-router-dom";

import "../../../public/styles/styles.css";

export default function Home() {
   return (
      <section id="home" className="main-content">
         <div id="titles" className="home-titles">
            <h1>Welcome to the Silver Feather Tavern!</h1>
            <h4>Find like-minded companions and go on adventures together!</h4>
         </div>
         <div id="img-logo">
            <img
               src="/images/logo.png"
               style={{ height: "150px", width: "150px" }}
            ></img>
         </div>
         <div id="text">
            <h6 className="heading-small">
               Here at the Silver Feather Tavern we provide travelers with access to
               the following services, based the "Dungeons and Dragons" 5th edition
               rules under the OGL
            </h6>
         </div>
         <div className="cards-container">
            <div className="card-players">
               <h6>For Players:</h6>
               <ul>
                  <li>
                     A place to create your personas, then join campaigns with them. Or
                     not, you can keep them as draft till you polish your disguise.
                  </li>
                  <li>
                     Look-up the Adventurers Guild Board and choose an interesting party to
                     join. Just be aware, you need approval once you apply to join.
                  </li>
                  <li>
                     Post your own notice on the Adventurers Guild Board and announce to the community
                     you are looking for a group to join.
                  </li>
               </ul>
               <p style={{ textAlign: "center" }}>
                  <Link to="/register" className="card-links">
                     Register
                  </Link>{" "}
                  or{" "}
                  <Link to="/sign-in" className="card-links">
                     Sign in
                  </Link>{" "}
                  at the front desk to access
               </p>
            </div>
            <div className="card-dms">
               <h6>For Dungeon Masters:</h6>
               <ul>
                  <li>
                     Option to create your campaigns and keep notes on them, invite
                     players from your friends list or wait for them to join your
                     announced campaign.
                  </li>
                  <li>
                     Possibility to create sessions for each of your campaigns to keep
                     track where you've been, who you fought, what you earned and where
                     you're headed.
                  </li>
                  <li>
                     For your public campaigns, notify the community on the
                     Adventurers Guild Board that you are looking for party members.
                  </li>
               </ul>
               <p style={{ textAlign: "center" }}>
                  <Link to="/register" className="card-links">
                     Register
                  </Link>{" "}
                  or{" "}
                  <Link to="/sign-in" className="card-links">
                     Sign in
                  </Link>{" "}
                  at the front desk to access
               </p>
            </div>
         </div>
         <div id="text-2">
            <h6 className="heading-small">
               Not decided if you are going to join us and become a member of our
               fine establishment? Browse below our latest from the Adventurer's
               Board. Enjoy!
            </h6>
         </div>
      </section>
   );
}
