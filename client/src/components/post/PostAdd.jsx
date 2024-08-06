import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
   Button,
   CssBaseline,
   Grid,
   Box,
   Container,
   TextField,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
   FormHelperText,
} from "@mui/material";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import { useAuthContext } from "../../context/AuthContext";
import * as campaignsAPI from "../../api/campaigns-api";
import * as postsAPI from "../../api/posts-api";

export default function PostAdd() {
   const {
      handleSubmit,
      register,
      formState: { errors },
      watch,
      trigger,
   } = useForm();
   const [campaigns, setCampaigns] = useState([]);
   const { userId } = useAuthContext();
   const navigate = useNavigate();

   useEffect(() => {
      campaignsAPI
         .getAll(userId)
         .then((result) => {
            const filteredResults = result.filter(
               (campaign) => campaign.isPublic === true
            );
            setCampaigns(filteredResults);
         })
         .catch((error) => {
            console.log("Error fetching campaigns: ", error);
            toast.error("Something went wrong. Please try again later.");
         });
   }, []);

   const onSubmit = (data) => {
      postsAPI
         .createPost(data)
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
            <h2>Create new Quest:</h2>
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
                        <Grid item xs={12} md={6}>
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
                              style={{width: "100%", maxWidth: "300px"}}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth error={!!errors.type} style={{width: "100%", maxWidth: "300px"}}>
                              <InputLabel id="type-label" shrink={!!watch("type")}>
                                 You are posting about? *
                              </InputLabel>
                              <Select
                                 {...register("type", {
                                    required: "This choice is required",
                                 })}
                                 labelId="type-label"
                                 name="type"
                                 id="type"
                                 onBlur={() => trigger("type")}
                                 value={watch("type") || ""}
                                 error={!!errors.type}
                              >
                                 <MenuItem value="Campaign">Campaign</MenuItem>
                                 {/* {<MenuItem value="Avernus">Character</MenuItem>} */}
                              </Select>
                              <FormHelperText>{errors.type?.message}</FormHelperText>
                           </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                           <FormControl fullWidth error={!!errors.campaign} style={{width: "100%", maxWidth: "600px"}}>
                              <InputLabel
                                 id="campaign-label"
                                 shrink={!!watch("campaign")}
                              >
                                 Campaign *
                              </InputLabel>
                              <Select
                                 {...register("campaign", {
                                    required: "Campaign is required",
                                 })}
                                 labelId="campaign-label"
                                 name="campaign"
                                 id="campaign"
                                 onBlur={() => trigger("campaign")}
                                 value={watch("campaign") || ""}
                                 error={!!errors.campaign}
                              >
                                 {campaigns.map((campaign) => (
                                    <MenuItem key={campaign._id} value={campaign._id}>
                                       {campaign.title}
                                    </MenuItem>
                                 ))}
                              </Select>
                              <FormHelperText>{errors.campaign?.message}</FormHelperText>
                           </FormControl>
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
                              style={{width: "100%", maxWidth: "600px"}}
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
