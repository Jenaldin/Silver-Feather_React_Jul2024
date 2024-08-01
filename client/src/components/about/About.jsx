import React from "react";
import { Email, LinkedIn, GitHub, Tag } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function About() {
   return (
      <section id="about-me">
         <div id="greetings">
            <h2>Hello and greetings, traveler! </h2>
         </div>
         <div id="text-intro">
            <h5>
               My name is Jenny Guteva and I am the creator of the Silver Feather
               Tavern!
            </h5>
         </div>
         <div className="cards-container">
            <div className="card">
               <img src="/images/app-maker.jpg" alt="Photo" className="photo" />
            </div>
            <div className="card">
               <div className="card-content">
                  <p>
                     I am happy you took interest in this web app. It is a student
                     project, you most probably are either a fellow colleague or one of
                     our teachers. Or you are just a traveler in the world wide web
                     sea. A warm welcome in either case!
                  </p>
                  <p>
                     This web app is academic and not intended for commercial use. A
                     big portion of it is still under construction, so if you stumble
                     on a page with that sign, expect Tavern 2.0 in the future.
                  </p>
                  <p>
                     The Silver Feather Tavern
                     represents my React beginner level proficiency and skills, and
                     will serve for my course defense. It is inspired by other web and
                     desktop apps used for playing Dungeons and Dragons such as D&D
                     Beyond, Roll20 and Fantasy Grounds. Although the Silver Feather
                     Tavern is not yet at their level, it is a solid base that can grow
                     with more functionalities in the future (probably as a passion
                     project for me, depending on my free time and other commitments).
                     Think of it as the humble beginnings of a grand adventure!
                  </p>
                  <p>
                     If you're here to evaluate my work, thank you! I hope your
                     experience has been positive. And if you'd like to share your
                     thoughts, feel free to reach out via the social links below. Let's
                     chat over a virtual mug of mead!
                  </p>
                  <div className="social-icons">
                     <IconButton href="mailto:jenny.guteva@gmail.com">
                        <Email />
                     </IconButton>
                     <IconButton
                        href="https://www.linkedin.com/in/jenny-guteva-0978bba5/"
                        target="_blank"
                     >
                        <LinkedIn />
                     </IconButton>
                     <IconButton href="https://github.com/Jenaldin" target="_blank">
                        <GitHub />
                     </IconButton>
                     <IconButton href="#">
                        <Tag />
                        <span>Jenaldin</span>
                     </IconButton>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
