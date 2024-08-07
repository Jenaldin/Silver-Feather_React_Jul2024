import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
   Button,
   Divider,
   List,
   ListItem,
   ListItemText,
   TablePagination,
   Typography,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Box,
   Container,
   CssBaseline,
   Grid,
   TextField,
   IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import * as commentsAPI from "../../../api/comments-api";
import { useAuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";

export default function CommentList() {
   const [comments, setComments] = useState([]);
   const [page, setPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [currentCommentId, setCurrentCommentId] = useState("");
   const [openDialog, setOpenDialog] = useState(false);
   const [openAddDialog, setOpenAddDialog] = useState(false);
   const [updatedComments, setUpdatedComments] = useState(false);

   const { userId } = useAuthContext();
   const { id: postId } = useParams();

   const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
      trigger,
   } = useForm();

   useEffect(() => {
      if (updatedComments) {
         commentsAPI
            .getAll(postId)
            .then((result) => setComments(result))
            .catch((err) => {
               console.log("Error fetching comments: ", err);
               toast.error("Something went wrong. Please try again later.");
            });
         setUpdatedComments(false);
      } else {
         commentsAPI
            .getAll(postId)
            .then((result) => setComments(result))
            .catch((err) => {
               console.log("Error fetching comments: ", err);
               toast.error("Something went wrong. Please try again later.");
            });
      }
   }, [updatedComments]);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 5));
      setPage(1);
   };

   const handleDelete = async () => {
      setOpenDialog(true);
   };

   const handleAdd = async () => {
      setOpenAddDialog(true);
   };

   const handleDeleteConfirmed = (commentId) => {
      commentsAPI
         .deleteComment(commentId)
         .then(() => {
            setOpenDialog(false);
            setComments((prevComments) =>
               prevComments.filter((comment) => comment._id !== commentId)
            );
         })
         .catch((err) => {
            console.log("Error deleting comment:", err);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   const onSubmit = (formData) => {
      commentsAPI
         .createComment(postId, formData)
         .then(() => {
            setOpenAddDialog(false);
            reset();
            setUpdatedComments(true);
         })
         .catch((err) => {
            console.log("Create comment error: ", err);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   const paginatedComments = comments.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
   );

   return (
      <section
         id="section-wrapper"
         style={{
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
         }}
      >
         <Divider />
         <div id="title" className="main-titles">
            <h4>Replies:</h4>
         </div>
         {userId && (
            <Button
               variant="contained"
               color="primary"
               onClick={() => handleAdd()}
               sx={{ fontWeight: "bold", fontStyle: "italic", margin: "10px" }}
            >
               Add a Reply Note
            </Button>
         )}
         {comments.length === 0 ? (
            <Typography
               variant="h5"
               color="textSecondary"
               sx={{ margin: "30px", width: "100%" }}
            >
               Unfortunately, we did not find any replies yet... Be the first to
               leave a note!
            </Typography>
         ) : (
            <List sx={{ margin: 0, width: "100%" }}>
               {paginatedComments.map((comment) => (
                  <React.Fragment key={comment._id}>
                     <ListItem
                        alignItems="flex-start"
                        sx={{ margin: 0, width: "850px" }}
                     >
                        <ListItemText
                           sx={{ paddingLeft: "16px", paddingRight: "16px", margin: 0 }}
                           primary={
                              <Typography
                                 component="span"
                                 variant="h5"
                                 color="primary"
                                 sx={{ fontWeight: "bold", fontStyle: "italic" }}
                              >
                                 {comment.title}
                              </Typography>
                           }
                           secondary={
                              <>
                                 <Typography
                                    component="span"
                                    color="textPrimary"
                                    sx={{ fontStyle: "italic", fontSize: "1.3rem" }}
                                 >
                                    {" — " + comment.body}
                                 </Typography>
                                 <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{ fontStyle: "italic", display: "block" }}
                                 >
                                    {comment.owner.username} on{" "}
                                    {new Date(comment.createdAt).toLocaleString("en-US", {
                                       day: "numeric",
                                       month: "long",
                                       year: "numeric",
                                    })}
                                 </Typography>
                              </>
                           }
                        />
                        {comment.owner._id === userId ? (
                           <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                 const commentId = comment._id;
                                 setCurrentCommentId(commentId);
                                 handleDelete();
                              }}
                              sx={{
                                 fontWeight: "bold",
                                 fontStyle: "italic",
                                 margin: "20px",
                              }}
                           >
                              Delete
                           </Button>
                        ) : (
                           ""
                        )}
                     </ListItem>
                     <Divider sx={{ marginBottom: "20px" }} />
                  </React.Fragment>
               ))}
            </List>
         )}
         <TablePagination
            component="div"
            count={comments.length}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />

         <div id="del-comment">
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
               <DialogTitle
                  className="title-card-profile-section"
                  style={{ fontWeight: "bold", textAlign: "center" }}
               >
                  Confirm Deletion of Reply
               </DialogTitle>
               <DialogContent>
                  <DialogContentText
                     style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                     Are you sure you want to delete this note?
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
                     onClick={() => {
                        handleDeleteConfirmed(currentCommentId);
                        setOpenDialog(false);
                     }}
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

         <div id="add-comment" style={{width: "200px", height: "200px"}}>
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
               <DialogTitle
                  className="main-titles"
                  style={{
                     textAlign: "center",
                     fontStyle: "italic",
                     fontWeight: "bold",
                     fontFamily: "Georgia, serif",
                     fontSize: "1.8rem",
                  }}
               >
                  Add new Reply
                  <IconButton
                     aria-label="close"
                     onClick={() => setOpenAddDialog(false)}
                     style={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                     }}
                  >
                     <CloseIcon color="secondary" />
                  </IconButton>
               </DialogTitle>
               <DialogContent>
                  <Container component="main" maxWidth="lg">
                     <CssBaseline />
                     <Box
                        sx={{
                           marginTop: 0,
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                        }}
                     >
                        <Box
                           component="form"
                           noValidate
                           onSubmit={handleSubmit(onSubmit)}
                           sx={{ mt: 4 }}
                        >
                           <Grid container spacing={1} style={{width: "550px", marginBottom: "25px" }}>
                              <Grid item xs={12} md={12} >
                                 <TextField
                                    {...register("title", {
                                       required: "Title is required",
                                       minLength: {
                                          value: 5,
                                          message: "Title must be at least 5 characters",
                                       },
                                       maxLength: {
                                          value: 35,
                                          message: "Title must be at most 35 characters",
                                       },
                                    })}
                                    fullWidth
                                    name="title"
                                    id="title"
                                    label="Title *"
                                    type="input"
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    onBlur={() => trigger("title")}
                                 />
                              </Grid>
                           </Grid>
                           <Grid container spacing={1} style={{width: "550px", marginBottom: "25px" }}>
                              <Grid item xs={12} md={12}>
                                 <TextField
                                    {...register("body", {
                                       required: "Note is required",
                                       minLength: {
                                          value: 10,
                                          message: "Note must be at least 10 characters",
                                       },
                                       maxLength: {
                                          value: 100,
                                          message: "Note must be at most 100 characters",
                                       },
                                    })}
                                    fullWidth
                                    name="body"
                                    id="body"
                                    label="Note *"
                                    type="input"
                                    multiline
                                    minRows={4}
                                    maxRows={5}
                                    error={!!errors.body}
                                    helperText={errors.body?.message}
                                    onBlur={() => trigger("body")}
                                 />
                              </Grid>
                           </Grid>
                           <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              sx={{ mt: 2, mb: 2 }}
                              style={{ fontWeight: "bold", fontStyle: "italic" }}
                           >
                              Submit
                           </Button>
                        </Box>
                     </Box>
                  </Container>
               </DialogContent>
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
