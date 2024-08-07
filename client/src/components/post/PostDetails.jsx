import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import { useAuthContext } from "../../context/AuthContext";
import * as postsAPI from "../../api/posts-api";
import CommentList from "./comment/CommentList";

export default function PostDetails() {
   const [postDetails, setPostDetails] = useState({});
   const [openDialog, setOpenDialog] = useState(false);
   const navigate = useNavigate();
   const { username, userId } = useAuthContext();
   const { id: postId } = useParams();

   useEffect(() => {
      postsAPI
         .getPost(postId)
         .then((result) => setPostDetails(result))
         .catch((err) => {
            console.log("Error fetching post: ", err);
            toast.error("Something went wrong. Please try again later.");
         });
   }, []);

   const handleDeleteConfirmed = () => {
      postsAPI
         .deletePost(postId)
         .then(() => {
            navigate(`/adventurers-board`);
         })
         .catch((err) => {
            console.log("Error deleting post:", err);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   const postDeleteHandler = async () => {
      setOpenDialog(true);
   };

   return (
      <section id="section-wrapper">
         <div id="title" className="main-titles">
            <h2>{postDetails.title}</h2>
         </div>
         <div
            className="cards-container-profile-section"
            style={{ width: "100%", justifyContent: "center" }}
         >
            <div className="card-profile-section" style={{ flexGrow: "1.5" }}>
               {userId === postDetails.owner?._id && (
                  <div
                     className="buttons-details-item"
                     style={{
                        marginLeft: "25px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <Link
                        to={`/adventurers-board/posts/edit/${postId}`}
                        style={{ textDecoration: "none" }}
                     >
                        <Button
                           variant="contained"
                           style={{
                              color: "primary",
                              fontWeight: "bold",
                              fontStyle: "italic",
                              margin: "10px",
                           }}
                        >
                           Edit quest
                        </Button>
                     </Link>
                     <Button
                        onClick={postDeleteHandler}
                        variant="contained"
                        color="error"
                        style={{
                           fontWeight: "bold",
                           fontStyle: "italic",
                           margin: "10px",
                        }}
                     >
                        Delete quest
                     </Button>
                  </div>
               )}
               <div id="one-row-quest-info" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                  <div className="text-card-profile-section">
                     <h6 className="details-label">Created on:</h6>
                     <p className="details-item-content">
                        {new Date(postDetails.createdAt).toLocaleDateString("en-US", {
                           day: "numeric",
                           month: "long",
                           year: "numeric",
                        })}
                     </p>
                  </div>
                  <div className="text-card-profile-section">
                     <h6 className="details-label">Created by:</h6>
                     <p className="details-item-content">
                        {postDetails.owner?.username}
                     </p>
                  </div>
                  <div className="text-card-profile-section">
                  
                     <h6 className="details-label">Quest for:</h6>
                     {postDetails.type === "Campaign" ? (
                        <p className="details-item-content">
                           DM looking for adventurers (players)
                        </p>
                     ) : (
                        <p className="details-item-content">
                           Adventurer looking for a party (campaign and DM)
                        </p>
                     )}
                  </div>
                  <div className="text-card-profile-section">
                     {postDetails.type === "Campaign" ? (
                        <>
                        <h6 className="details-label"> Link to campaign: </h6>
                        <Link
                           to={`/my-boards/${username}/campaigns/${postDetails.campaign?._id}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="card-links"
                           style={{
                              textDecoration: "none",
                              fontFamily: "Georgia, serif",
                              fontSize: "1.2em",
                           }}
                        >
                           {postDetails.campaign?.title}
                        </Link>
                        </>
                     ) : (
                        <>
                        <h6 className="details-label"> Link to character: </h6>
                        <Link
                           to={`/my-boards/${username}/characters/${postDetails.character?._id}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="card-links"
                           style={{
                              textDecoration: "none",
                              fontFamily: "Georgia, serif",
                              fontSize: "1.2em",
                           }}
                        >
                           {postDetails.character?.name}
                        </Link>
                        </>
                     )}
                  </div>
               </div>
               <div className="text-card-profile-section">
                  <h6 className="details-label">Details:</h6>
                  <p className="details-item-content">{postDetails.body}</p>
               </div>
            </div>
         </div>

         <CommentList />

         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle
               className="title-card-profile-section"
               style={{ fontWeight: "bold", textAlign: "center" }}
            >
               Confirm Deletion of "{postDetails.title}" Quest
            </DialogTitle>
            <DialogContent>
               <DialogContentText
                  style={{ fontWeight: "bold", textAlign: "center" }}
               >
                  Are you sure you want to delete this quest?
               </DialogContentText>
               <DialogContentText
                  style={{ fontWeight: "bold", textAlign: "center" }}
               >
                  This action cannot be reversed and the information will be lost.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  variant="outlined"
                  onClick={() => setOpenDialog(false)}
                  color="secondary"
                  style={{ fontWeight: "bold", fontStyle: "italic", margin: "10px" }}
               >
                  Cancel
               </Button>
               <Button
                  variant="contained"
                  onClick={handleDeleteConfirmed}
                  color="error"
                  style={{ fontWeight: "bold", fontStyle: "italic", margin: "10px" }}
               >
                  Confirm and Delete
               </Button>
            </DialogActions>
         </Dialog>
         
         <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ fontWeight: "bold", width: "400px" }}
         />
      </section>
   );
}
