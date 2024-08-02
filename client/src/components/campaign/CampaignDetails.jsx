import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useAuthContext } from "../../context/AuthContext";
import * as campaignsAPI from '../../api/campaigns-api';
import SessionList from "./session/SessionList";

export default function CampaignDetails() {
   const [campaignDetails, setCampaignDetails] = useState({});
   const [openDialog, setOpenDialog] = useState(false);
   const navigate = useNavigate()
   const { username, userId } = useAuthContext();
   const { id } = useParams();

   useEffect(() => {
      campaignsAPI.getCampaign(id)
         .then(result => setCampaignDetails(result))
         .catch(err => console.error('Error fetching campaigns:', err.message));
   }, []);

   const handleDeleteConfirmed = async () => {
      try {
         campaignsAPI.deleteCampaign(id).then(() => navigate(`/my-boards/${username}/campaigns`));
      } catch (err) {
         console.log(err.message);
      }
   };

   const campaignDeleteHandler = async () => {
      setOpenDialog(true);
   };

   return (
      <section id="section-wrapper">
         <Link to={`/my-boards/${username}/campaigns`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
               Back to DM's Layer
            </Button>
         </Link>
         <div id="title" className="main-titles">
            <h2>The "{campaignDetails.title}" information:</h2>
         </div>
         <div id="subtitle-profile-section" className="subtitle-profile-section">
            <Link to={campaignDetails.imageUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} >
               <img src={campaignDetails.imageUrl} alt="Photo" style={{ maxWidth: "450px", maxHeight: "350px" }} />
            </Link>
         </div>
         <div className="cards-container-profile-section" style={{ width: "100%", justifyContent: "center" }}>
            <div className="card-profile-section" style={{ flexGrow: "1.5" }}>
               <div className="title-card-profile-section" style={{ margin: "0" }}>
                  <h4 style={{ marginBottom: "0" }}>Campaign details:</h4>
               </div>
               {userId === campaignDetails?.owner?._id && (
                  <>
                     <div className="buttons-details-item" style={{ margin: "25px" }} >
                        <Link to={`/my-boards/${username}/campaigns/edit/${id}`} style={{ textDecoration: 'none' }}>
                           <Button variant="contained" style={{ color: 'primary', fontWeight: 'bold', fontStyle: 'italic', margin: "10px" }}>
                              Edit Campaign
                           </Button>
                        </Link>
                        <Button onClick={campaignDeleteHandler} variant="contained" color="error" style={{ fontWeight: 'bold', fontStyle: 'italic', margin: "10px" }}>
                           Delete Campaign
                        </Button>
                     </div>
                  </>
               )}
               <div className="text-card-profile-section">
                  <h6 className="details-label">
                     Created on:
                  </h6>
                  <p className="details-item-content">
                     {new Date(campaignDetails.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                     })}
                  </p>
                  <h6 className="details-label">
                     Setting:
                  </h6>
                  <p className="details-item-content">
                     {campaignDetails.setting}
                  </p>
               </div>
               <div className="text-card-profile-section">
                  <h6 className="details-label">
                     Language:
                  </h6>
                  <p className="details-item-content">
                     Sessions held in {campaignDetails.language} language
                  </p>
               </div>
               <div className="text-card-profile-section">
                  <h6 className="details-label">
                     Party size:
                  </h6>
                  <p className="details-item-content">
                     For {campaignDetails.partySize} players
                  </p>
               </div>
               <div className="text-card-profile-section">
                  <h6 className="details-label">
                     Shared with players?
                  </h6>
                  <p className="details-item-content">
                     {campaignDetails.isPublic === false ? "No, not yet" : "Yes, it is shared with the public"}
                  </p>
               </div>
               <div className="text-card-profile-section">
                  <h6 className="details-label">
                     Description:
                  </h6>
                  <p className="details-item-content">
                     {campaignDetails.description}
                  </p>
               </div>
               {userId === campaignDetails?.owner?._id && (
                  <>
                     <div className="text-card-profile-section">
                        <h6 className="details-label">
                           DM's Notes - visible only to the DM:
                        </h6>
                        {campaignDetails.dmNotes && campaignDetails.dmNotes.length > 0 ? (
                           campaignDetails.dmNotes.map((noteObj, index) => (
                              <div key={index}>
                                 <p className="details-item-content">
                                    From Date: {new Date(noteObj.addedDate).toLocaleDateString('en-US', {
                                       day: 'numeric',
                                       month: 'long',
                                       year: 'numeric',
                                    })}
                                 </p>
                                 <p className="details-item-content">
                                    Note: {noteObj.note}
                                 </p>
                              </div>
                           ))
                        ) : (
                           <p className="details-item-content">No notes available</p>
                        )}
                     </div>
                  </>
               )}
            </div>
            <div className="card-profile-section" style={{ flexGrow: "1" }}>
               <div className="title-card-profile-section" style={{ margin: "0" }}>
                  <h4 style={{ marginBottom: "0" }}>Campaign Sessions list:</h4>
               </div>
               <div className="text-card-profile-section">
                  <SessionList />
               </div>
            </div>
         </div>

         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
            <DialogTitle className="title-card-profile-section" style={{ fontWeight: 'bold', textAlign: 'center' }}>Confirm Deletion of "{campaignDetails.title}" Campaign</DialogTitle>
            <DialogContent>
               <DialogContentText style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Are you sure you want to delete this campaign?
               </DialogContentText>
               <DialogContentText style={{ fontWeight: 'bold', textAlign: 'center'}}>
                  This action cannot be reversed and the information will be lost.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" onClick={() => setOpenDialog(false)} color="secondary" style={{ fontWeight: 'bold', fontStyle: 'italic', margin: "10px" }}>
                  Cancel
               </Button>
               <Button variant="contained" onClick={handleDeleteConfirmed} color="error" style={{ fontWeight: 'bold', fontStyle: 'italic', margin: "10px" }}>
                  Confirm and Delete
               </Button>
            </DialogActions>
         </Dialog>
      </section>
   )
}