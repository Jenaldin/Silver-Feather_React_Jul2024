import React from "react";
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
import { useCreateCampaign } from "../../hooks/useCampaign";

export default function CampaignAdd() {
   const {
      handleSubmit,
      register,
      formState: { errors },
      watch,
      trigger,
   } = useForm();
   const { username } = useAuthContext();

   const navigate = useNavigate();
   const createCampaignHandler = useCreateCampaign();

   const onSubmit = (data) => {
      createCampaignHandler(data)
         .then(() => {
            navigate(`/my-boards/${username}/campaigns`);
         })
         .catch((error) => {
            console.log("Create game error: ", error.message);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   return (
      <section id="section-wrapper">
         <div id="title" className="main-titles">
            <h2>Create new Campaign:</h2>
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
                     sx={{ mt: 3 }}
                  >
                     <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("title", {
                                 required: "Title is required",
                                 minLength: {
                                    value: 10,
                                    message: "Title must be at least 10 characters",
                                 },
                                 maxLength: {
                                    value: 256,
                                    message: "Title must be at most 256 characters",
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
                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth error={!!errors.setting}>
                              <InputLabel id="setting-label" shrink={!!watch("setting")}>
                                 Campaign Setting *
                              </InputLabel>
                              <Select
                                 {...register("setting", {
                                    required: "Campaign setting is required",
                                 })}
                                 labelId="setting-label"
                                 name="setting"
                                 id="setting"
                                 onBlur={() => trigger("setting")}
                                 value={watch("setting") || ""}
                              >
                                 <MenuItem value="Homebrew">Homebrew</MenuItem>
                                 <MenuItem value="Avernus">Avernus</MenuItem>
                                 <MenuItem value="Eberron">Eberron</MenuItem>
                                 <MenuItem value="Forgotten Realms">
                                    Forgotten Realms
                                 </MenuItem>
                                 <MenuItem value="Greyhawk">Greyhawk</MenuItem>
                                 <MenuItem value="Ravenloft">Ravenloft</MenuItem>
                                 <MenuItem value="Ravnica">Ravnica</MenuItem>
                                 <MenuItem value="Spelljammer">Spelljammer</MenuItem>
                                 <MenuItem value="Strixhaven">Strixhaven</MenuItem>
                                 <MenuItem value="Theros">Theros</MenuItem>
                                 <MenuItem value="Wildemount">Wildemount</MenuItem>
                                 <MenuItem value="Other">Other</MenuItem>
                              </Select>
                              <FormHelperText>{errors.setting?.message}</FormHelperText>
                           </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("language", {
                                 required: "Title is required",
                                 minLength: {
                                    value: 2,
                                    message:
                                       "Campaign Language must be at least 2 characters",
                                 },
                                 maxLength: {
                                    value: 10,
                                    message:
                                       "Campaign Language must be at most 10 characters",
                                 },
                                 pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: "Invalid Language",
                                 },
                              })}
                              fullWidth
                              name="language"
                              id="language"
                              label="Campaign Language *"
                              type="input"
                              error={!!errors.language}
                              helperText={errors.language?.message}
                              onBlur={() => trigger("language")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("partySize", {
                                 required: "Party Size is required",
                                 min: {
                                    value: 2,
                                    message: "Party Size must be at least 2 people",
                                 },
                                 max: {
                                    value: 8,
                                    message: "Party Size must be at most 8 people",
                                 },
                              })}
                              fullWidth
                              name="partySize"
                              id="partySize"
                              label="Party Size *"
                              type="number"
                              error={!!errors.partySize}
                              helperText={errors.partySize?.message}
                              onBlur={() => trigger("partySize")}
                           />
                        </Grid>
                        <Grid item xs={12} md={12}>
                           <TextField
                              {...register("imageUrl", {
                                 required: "Cover image link is required",
                                 pattern: {
                                    value: /^https:\/\/.+\.(jpg|jpeg|png|gif)$/i,
                                    message: "Invalid image link",
                                 },
                              })}
                              fullWidth
                              name="imageUrl"
                              id="imageUrl"
                              label="Cover image link *"
                              error={!!errors.imageUrl}
                              helperText={errors.imageUrl?.message}
                              onBlur={() => trigger("imageUrl")}
                           />
                        </Grid>
                        <Grid item xs={12} md={12}>
                           <TextField
                              {...register("description", {
                                 required: "Description is required",
                                 minLength: {
                                    value: 100,
                                    message: "Description must be at least 100 characters",
                                 },
                                 maxLength: {
                                    value: 2000,
                                    message: "Description must be at most 2000 characters",
                                 },
                              })}
                              fullWidth
                              name="description"
                              id="description"
                              label="Description *"
                              multiline
                              minRows={4}
                              maxRows={5}
                              error={!!errors.description}
                              helperText={errors.description?.message}
                              onBlur={() => trigger("description")}
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
