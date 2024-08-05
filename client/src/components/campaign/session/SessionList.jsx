import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
   Button,
   Typography,
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import * as sessionsAPI from "../../../api/sessions-api";
import { useAuthContext } from "../../../context/AuthContext";
import SessionEdit from "./SessionEdit";
import SessionAdd from "./SessionAdd";

export default function SessionList() {
   const [sessions, setSessions] = useState([]);
   const [expanded, setExpanded] = useState();
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
   const [openEditDialog, setOpenEditDialog] = useState(false);
   const [sessionUpdated, setSessionUpdated] = useState(false);
   const [openNewItemDialog, setOpenNewItemDialog] = useState(false);
   const [sessionOwner, setSessionOwner] = useState("");
   const [selectedSessionId, setSelectedSessionId] = useState("");
   const { userId } = useAuthContext();
   const { id: campaignId} = useParams();

   useEffect(() => {
      if(sessionUpdated){
         sessionsAPI
         .getAll(campaignId)
         .then((result) => {
            setSessions(result);
            setSessionOwner(result[0]?.owner);
         })
         .catch((err) => {
            console.log("Error fetching sessions: ", err.message);
            toast.error("Something went wrong. Please try again later.");
         });
         setSessionUpdated(false);
      } else {
         sessionsAPI
         .getAll(campaignId)
         .then((result) => {
            setSessions(result);
            setSessionOwner(result[0]?.owner);
         })
         .catch((err) => {
            console.log("Error fetching sessions: ", err.message);
            toast.error("Something went wrong. Please try again later.");
         });
      }
   }, [sessionUpdated]);

   const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : null);
   };

   const sessionDeleteHandler = async () => {
      setOpenDeleteDialog(true);
   };

   const handleDeleteConfirmed = (sessionId) => {
      sessionsAPI
         .deleteSession(sessionId)
         .then(() => {
            setOpenDeleteDialog(false);
            setSessions((prevSessions) =>
               prevSessions.filter((session) => session._id !== sessionId)
            );
         })
         .catch((err) => {
            console.log("Error deleting campaign:", err.message);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   const handleEditButton = (sessionId) => {
      setSelectedSessionId(sessionId);
      setOpenEditDialog(true);
    };
   
   const handleNewItemButton = () => {
      setOpenNewItemDialog(true);
    };

    const handleSessionCreated = () => {
      setSessionUpdated(true);
    };

   return (
      <section id="section-wrapper-nested">
         {sessionOwner === userId && (
            <Button
               variant="contained"
               style={{
                  color: "primary",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginTop: "auto",
                  marginBottom: "25px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
               }}
               onClick={() => handleNewItemButton()}
            >
               Create New Session
            </Button>
         )}
         <div className="accordion-list" style={{width: "100%"}}>
            {sessions.length === 0 ? (
               <Typography variant="h5">
                  Unfortunately, we did not find any... Crate your first one!
               </Typography>
            ) : (
               sessions.map((session, index) => (
                  
                  <Accordion
                     key={index}
                     expanded={expanded === `panel-${index}`}
                     onChange={handleChange(`panel-${index}`)}
                  >
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <h6 className="details-label">{session.title}</h6>
                     </AccordionSummary>
                     <AccordionDetails >
                        <p className="details-item-content">
                           <strong>Created on:</strong>{" "}
                           {new Date(session.createdAt).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                           })}
                        </p>
                        <p className="details-item-content">
                           <strong>Description:</strong> {session.description}
                        </p>
                        <p className="details-item-content">
                           <strong>Map Link:</strong>{" "}
                           <Link
                              to={session.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="card-links"
                              style={{ textDecoration: "none", wordWrap: "break-word" }}
                           >
                              {session.mapUrl}
                           </Link>
                        </p>
                        {(session.owner === userId || session.antagonistVisible) && (
                           <p className="details-item-content">
                              <strong>Antagonist:</strong> {session.antagonist}
                           </p>
                        )}
                        {(session.owner === userId || session.lootVisible) && (
                           <p className="details-item-content">
                              <strong>Loot:</strong> {session.loot}
                           </p>
                        )}
                        <div
                           className="buttons-details-item"
                           style={{ margin: "25px" }}
                        >
                           {session.owner === userId && (
                              <Button
                                 variant="contained"
                                 style={{
                                    color: "primary",
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                    margin: "5px",
                                 }}
                                 onClick={() => handleEditButton(session._id)}
                              >
                                 Edit Session
                              </Button>
                           )}

                           {session.owner === userId && (
                              <Button
                                 onClick={() => {
                                    const sessionId = session._id;
                                    setSelectedSessionId(sessionId);
                                    sessionDeleteHandler();
                                 }}
                                 variant="contained"
                                 color="error"
                                 style={{
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                    margin: "5px",
                                 }}
                              >
                                 Delete Session
                              </Button>
                           )}
                        </div>
                     </AccordionDetails>
                  </Accordion>
               ))
            )}
         </div>
         <div id="delete-warning">
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
               <DialogTitle
                  className="title-card-profile-section"
                  style={{ fontWeight: "bold", textAlign: "center" }}
               >
                  Confirm Deletion of the session
               </DialogTitle>
               <DialogContent>
                  <DialogContentText
                     style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                     Are you sure you want to proceed?
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
                     onClick={() => setOpenDeleteDialog(false)}
                     color="secondary"
                     style={{
                        fontWeight: "bold",
                        fontStyle: "italic",
                        margin: "10px",
                     }}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="contained"
                     onClick={() => handleDeleteConfirmed(selectedSessionId)}
                     color="error"
                     style={{
                        fontWeight: "bold",
                        fontStyle: "italic",
                        margin: "10px",
                     }}
                  >
                     Confirm and Delete
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
         <div id="new-dialog">
            <Dialog open={openNewItemDialog} onClose={() => setOpenNewItemDialog(false)} >
               <SessionAdd
               campaignId={campaignId} 
               onClose={() => setOpenNewItemDialog(false)}
               onSessionUpdated={handleSessionCreated}/>
            </Dialog>
         </div>
         <div id="edit-dialog">
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
               <SessionEdit 
               sessionId={selectedSessionId}
               campaignId={campaignId} 
               onClose={() => setOpenEditDialog(false)}
               onSessionUpdated={handleSessionCreated}/>
            </Dialog>
         </div>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ fontWeight: "bold", width: "400px" }}
          />
      </section>
   );
}