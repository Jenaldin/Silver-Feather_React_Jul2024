import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
   Box,
   Button,
   Checkbox,
   Container,
   CssBaseline,
   FormControl,
   FormControlLabel,
   FormHelperText,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Tooltip,
} from "@mui/material";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import * as campaignsAPI from "../../api/campaigns-api";
import { useAuthContext } from "../../context/AuthContext";
import { useUpdateCampaign } from "../../hooks/useCampaign";

export default function CampaignEdit() {
   const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      watch,
      trigger,
   } = useForm();

   const [campaignDetails, setCampaignDetails] = useState({
      title: "",
      setting: "",
      language: "",
      partySize: "",
      imageUrl: "",
      isPublic: false,
      description: "",
   });
   const { username } = useAuthContext();
   const { id } = useParams();
   const campaignId = useRef(id);

   const navigate = useNavigate();
   const updateCampaignHandler = useUpdateCampaign();

   useEffect(() => {
      campaignsAPI
         .getCampaign(id)
         .then((result) => {
            setCampaignDetails(result);
            setValue("title", result.title);
            setValue("setting", result.setting);
            setValue("language", result.language);
            setValue("partySize", result.partySize);
            setValue("imageUrl", result.imageUrl);
            setValue("isPublic", result.isPublic);
            setValue("description", result.description);
         })
         .catch((err) => {
            console.log("Error fetching campaign: ", err.message);
            toast.error("Something went wrong. Please try again later.");
         });
   }, [id, setValue]);

   const onSubmit = (data) => {
      updateCampaignHandler(campaignId.current, data)
         .then(() => {
            navigate(`/my-boards/${username}/campaigns/${campaignId.current}`);
         })
         .catch((error) => {
            console.log("Create game error: ", error.message);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   return (
      <section id="section-wrapper">
         <div id="title" className="main-titles">
            <h2>Edit Your Campaign:</h2>
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
                              value={watch("title") || campaignDetails.title || ""}
                              onChange={(e) => {
                                 setValue("title", e.target.value);
                                 setCampaignDetails({
                                    ...campaignDetails,
                                    title: e.target.value,
                                 });
                              }}
                              error={!!errors.title}
                              helperText={errors.title?.message}
                              onBlur={() => trigger("title")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth error={!!errors.setting}>
                              <InputLabel
                                 id="setting-label"
                                 shrink={!!watch("setting") || !!campaignDetails.setting}
                              >
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
                                 value={watch("setting") || campaignDetails.setting || ""}
                                 onChange={(e) => {
                                    setValue("setting", e.target.value);
                                    setCampaignDetails({
                                       ...campaignDetails,
                                       setting: e.target.value,
                                    });
                                 }}
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
                              value={watch("language") || campaignDetails.language || ""}
                              onChange={(e) => {
                                 setValue("language", e.target.value);
                                 setCampaignDetails({
                                    ...campaignDetails,
                                    language: e.target.value,
                                 });
                              }}
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
                              value={
                                 watch("partySize") || campaignDetails.partySize || ""
                              }
                              onChange={(e) => {
                                 setValue("partySize", e.target.value);
                                 setCampaignDetails({
                                    ...campaignDetails,
                                    partySize: e.target.value,
                                 });
                              }}
                              error={!!errors.partySize}
                              helperText={errors.partySize?.message}
                              onBlur={() => trigger("partySize")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                              value={watch("imageUrl") || campaignDetails.imageUrl || ""}
                              onChange={(e) => {
                                 setValue("imageUrl", e.target.value);
                                 setCampaignDetails({
                                    ...campaignDetails,
                                    imageUrl: e.target.value,
                                 });
                              }}
                              error={!!errors.imageUrl}
                              helperText={errors.imageUrl?.message}
                              onBlur={() => trigger("imageUrl")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControlLabel
                              control={
                                 <Tooltip
                                    title={
                                       campaignDetails.isPublic
                                          ? ""
                                          : "Once you click this box and save, you will no longer be able to uncheck it"
                                    }
                                 >
                                    <Checkbox
                                       name="isPublic"
                                       checked={campaignDetails.isPublic}
                                       color="primary"
                                       disabled={campaignDetails.isPublic}
                                       onChange={(e) => {
                                          setValue("isPublic", e.target.checked);
                                          setCampaignDetails({
                                             ...campaignDetails,
                                             isPublic: e.target.checked,
                                          });
                                       }}
                                    />
                                 </Tooltip>
                              }
                              label="Shared with players?"
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("description", {
                                 required: "Description is required",
                                 minLength: {
                                    value: 100,
                                    message: "Description must be at least 100 characters",
                                 },
                                 maxLength: {
                                    value: 1000,
                                    message: "Description must be at most 1000 characters",
                                 },
                              })}
                              fullWidth
                              name="description"
                              id="description"
                              label="Description *"
                              multiline
                              minRows={4}
                              maxRows={5}
                              value={
                                 watch("description") || campaignDetails.description || ""
                              }
                              onChange={(e) => {
                                 setValue("description", e.target.value);
                                 setCampaignDetails({
                                    ...campaignDetails,
                                    description: e.target.value,
                                 });
                              }}
                              error={!!errors.description}
                              helperText={errors.description?.message}
                              onBlur={() => trigger("description")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("dmNotes", {
                                 maxLength: {
                                    value: 1000,
                                    message: "One DM note can be up to 1000 characters",
                                 },
                              })}
                              fullWidth
                              name="dmNotes"
                              id="dmNotes"
                              label="Add a new DM note"
                              multiline
                              minRows={4}
                              maxRows={5}
                              error={!!errors.dmNotes}
                              helperText={errors.dmNotes?.message}
                              onBlur={() => trigger("dmNotes")}
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
                        Submit Changes
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