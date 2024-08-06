import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
   Button,
   CssBaseline,
   Grid,
   Box,
   Container,
   TextField,
} from "@mui/material";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import { useAuthContext } from "../../context/AuthContext";
import * as postsAPI from "../../api/posts-api";

export default function PostEdit() {
   const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      watch,
      trigger,
   } = useForm();
   const [post, setPost] = useState({
      title: "",
      body: "",
   });
   const { id: postId } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      postsAPI
         .getPost(postId)
         .then((result) => {
            setPost(result);
            setValue("title", result.title);
            setValue("body", result.body);})
         .catch((error) => {
            console.log("Error fetching post: ", error);
            toast.error("Something went wrong. Please try again later.");
         });
   }, [setValue]);

   const onSubmit = (data) => {
      postsAPI
         .updatePost(postId, data)
         .then(() => {
            navigate(`/adventurers-board`);
         })
         .catch((error) => {
            console.log("Create post error: ", error);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   return (
      <section id="section-wrapper">
         <div id="title" className="main-titles">
            <h2>Edit your Quest:</h2>
         </div>
         <div
            id="campaign-form"
            className="card-players"
            style={{ width: "auto", padding: "10px" }}
         >
            <Container component="main" maxWidth="md">
               <CssBaseline />
               <Box
                  sx={{
                     margin: 0,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     maxWidth: "600px",
                  }}
               >
                  <Box
                     component="form"
                     noValidate
                     onSubmit={handleSubmit(onSubmit)}
                     sx={{ mt: 3 }}
                  >
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                           <TextField
                              {...register("title", {
                                 required: "Title is required",
                                 minLength: {
                                    value: 10,
                                    message: "Title must be at least 5 characters",
                                 },
                                 maxLength: {
                                    value: 100,
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
                              onBlur={() => trigger("title")
                              }
                              value={watch("title") || post.title || ""}
                              onChange={(e) => {
                                 setValue("title", e.target.value);
                                 setPost({
                                    ...post,
                                    title: e.target.value,
                                 });
                              }}
                           />
                        </Grid>
                        <Grid item xs={12} md={12}>
                           <TextField
                              {...register("body", {
                                 required: "Quest Details is required",
                                 minLength: {
                                    value: 10,
                                    message: "Quest Details must be at least 10 characters",
                                 },
                                 maxLength: {
                                    value: 1000,
                                    message: "Quest Details must be at most 1000 characters",
                                 },
                              })}
                              fullWidth
                              name="body"
                              id="body"
                              label="Quest Details *"
                              multiline
                              minRows={4}
                              maxRows={5}
                              error={!!errors.body}
                              helperText={errors.body?.message}
                              onBlur={() => trigger("body")}
                              value={watch("body") || post.body || ""}
                              onChange={(e) => {
                                 setValue("body", e.target.value);
                                 setPost({
                                    ...post,
                                    body: e.target.value,
                                 });
                              }}
                           />
                        </Grid>
                     </Grid>
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ fontWeight: "bold", fontStyle: "italic" }}
                     >
                        Submit 
                     </Button>
                  </Box>
               </Box>
            </Container>
         </div>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ fontWeight: "bold", width: "400px" }}
         />
      </section>
   );
}