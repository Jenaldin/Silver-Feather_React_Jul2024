import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   Typography,
   Button,
   Divider,
} from "@mui/material";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import * as postsAPI from "../../api/posts-api";
import { useAuthContext } from "../../context/AuthContext";

export default function PostList() {
   const [posts, setPosts] = useState([]);
   const [visibleItems, setVisibleItems] = useState(3);
   const { username, userId } = useAuthContext();

   useEffect(() => {
      postsAPI
         .getAll()
         .then((result) => setPosts(result))
         .catch((error) => {
            console.log("Error fetching posts: ", error);
            toast.error("Something went wrong. Please try again later.");
         });
   }, []);

   const loadMoreItems = () => {
      setVisibleItems((prevVisible) => prevVisible + 3);
   };

   return (
      <section id="section-wrapper">
         <div id="title" className="main-titles">
            <h2>Guild Board</h2>
         </div>
         <div className="img-card-profile-section">
            <img
               className="photo-profile-section"
               src="/images/guild.png"
               alt="adventurers guild"
            />
         </div>
         <div
            id="title"
            className="heading-small"
            style={{ textAlign: "center", color: "#2D543A" }}
         >
            <h5>
               Welcome to the board with quests, where adventurers look for a new
               party and dungeon masters look for adventurers
            </h5>
         </div>

         <Link
            to={`/adventurers-board/posts/new`}
            style={{ textDecoration: "none" }}
         >
            {userId && (<Button
               variant="contained"
               style={{
                  color: "primary",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  margin: "20px",
               }}
            >
               Create New Quest
            </Button>)}
         </Link>
         <div>
            <Divider variant="middle" />
         </div>

         <div className="gallery">
            <div
               style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  margin: "15px",
               }}
            >
               {posts.length === 0 ? (
                  <Typography variant="h5">
                     Unfortunately, we did not find any quests... Crate the first one!
                  </Typography>
               ) : (
                  posts.slice(0, visibleItems).map((item, index) => (
                     <Card
                        key={index}
                        sx={{ maxWidth: 500, margin: "1rem", height: "170px", width: "270px" }}
                     >
                        <Link
                           className="card-links"
                           to={`/adventurers-board/posts/${item._id}`}
                           style={{ textDecoration: "none" }}
                        >
                           <CardActionArea>
                              <CardMedia
                                 component="img"
                                 style={{
                                    height: "75px",
                                    width: "75px",
                                    objectFit: "cover",
                                 }}
                                 image={item.type === "Campaign" ? "/images/dm.png" : "/images/player.png"}
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
            {visibleItems < posts.length && (
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     marginTop: "1rem",
                  }}
               >
                  <Button
                     variant="outlined"
                     style={{ fontWeight: "bold", fontStyle: "italic" }}
                     onClick={loadMoreItems}
                  >
                     Show More
                  </Button>
               </div>
            )}
         </div>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ fontWeight: "bold", width: "400px" }}
         />
      </section>
   );
}
