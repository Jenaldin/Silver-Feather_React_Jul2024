import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
   Button,
   DialogActions,
   DialogContent,
   DialogTitle,
   Box,
   Checkbox,
   Container,
   CssBaseline,
   FormControlLabel,
   Grid,
   TextField,
   Tooltip,
} from "@mui/material";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import * as sessionsAPI from "../../../api/sessions-api";
import { useAuthContext } from "../../../context/AuthContext";
import { useUpdateSession } from "../../../hooks/useSession";

export default function SessionEdit(data) {
   const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      watch,
      trigger,
   } = useForm();

   const [sessionDetails, setSessionDetails] = useState({
      title: "",
      description: "",
      mapUrl: "",
      antagonist: "",
      loot: "",
      antagonistVisible: false,
      lootVisible: false,
   });

   const navigate = useNavigate();
   const updateSessionHandler = useUpdateSession();
   const { username } = useAuthContext();

   useEffect(() => {
      sessionsAPI
         .getSession (data.sessionId)
         .then((result) => {
            setSessionDetails(result);
            setValue("title", result.title);
            setValue("description", result.description);
            setValue("mapUrl", result.mapUrl);
            setValue("antagonist", result.antagonist);
            setValue("loot", result.loot);
            setValue("antagonistVisible", result.antagonistVisible);
            setValue("lootVisible", result.lootVisible);
         })
         .catch((err) => {
            console.log("Error fetching session: ", err.message);
            toast.error("Something went wrong. Please try again later.");
         });
   }, [data.sessionId, setValue]);

   const onSubmit = (formData) => {
      updateSessionHandler(data.sessionId, formData )
         .then(() => {
            data.onClose();
            data.onSessionUpdated();
         })
         .catch((error) => {
            console.log("Create session error: ", error.message);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   return (
      <div id="section-wrapper-edit-dialog">
         <DialogTitle
            className="main-titles"
            style={{ textAlign: "center", fontStyle:"italic", fontWeight: "bold", fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
         >
            Edit Session Information
         </DialogTitle>
         <DialogContent>
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
                     sx={{ mt: 4 }}
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
                              value={watch("title") || sessionDetails.title || ""}
                              onChange={(e) => {
                                 setValue("title", e.target.value);
                                 setSessionDetails({
                                    ...sessionDetails,
                                    title: e.target.value,
                                 });
                              }}
                              error={!!errors.title}
                              helperText={errors.title?.message}
                              onBlur={() => trigger("title")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("mapUrl", {
                                 pattern: {
                                    value: /^https:\/\/.+\.(jpg|jpeg|png|gif)$/i,
                                    message: "Invalid map link",
                                 },
                              })}
                              fullWidth
                              name="mapUrl"
                              id="mapUrl"
                              label="Map image link "
                              value={watch("mapUrl") || sessionDetails.mapUrl || ""}
                              onChange={(e) => {
                                 setValue("mapUrl", e.target.value);
                                 setSessionDetails({
                                    ...sessionDetails,
                                    mapUrl: e.target.value,
                                 });
                              }}
                              error={!!errors.mapUrl}
                              helperText={errors.mapUrl?.message}
                              onBlur={() => trigger("mapUrl")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("antagonist")}
                              fullWidth
                              name="antagonist"
                              id="antagonist"
                              label="Session antagonist"
                              type="input"
                              value={watch("antagonist") || sessionDetails.antagonist || ""}
                              onChange={(e) => {
                                 setValue("antagonist", e.target.value);
                                 setSessionDetails({
                                    ...sessionDetails,
                                    antagonist: e.target.value,
                                 });
                              }}
                              error={!!errors.antagonist}
                              helperText={errors.antagonist?.message}
                              onBlur={() => trigger("antagonist")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControlLabel
                              control={
                                 <Tooltip
                                    title={
                                       sessionDetails.antagonistVisible
                                          ? ""
                                          : "Once you click this box and save, you will no longer be able to uncheck it"
                                    }
                                 >
                                    <Checkbox
                                       name="antagonistVisible"
                                       checked={sessionDetails.antagonistVisible}
                                       color="primary"
                                       disabled={sessionDetails.antagonistVisible}
                                       onChange={(e) => {
                                          setValue("antagonistVisible", e.target.checked);
                                          setSessionDetails({
                                             ...sessionDetails,
                                             antagonistVisible: e.target.checked,
                                          });
                                       }}
                                    />
                                 </Tooltip>
                              }
                              label="Antagonist visible to players?"
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <TextField
                              {...register("loot")}
                              fullWidth
                              name="loot"
                              id="loot"
                              label="Loot"
                              type="input"
                              value={
                                 watch("loot") || sessionDetails.loot || ""
                              }
                              onChange={(e) => {
                                 setValue("loot", e.target.value);
                                 setSessionDetails({
                                    ...sessionDetails,
                                    loot: e.target.value,
                                 });
                              }}
                              error={!!errors.loot}
                              helperText={errors.loot?.message}
                              onBlur={() => trigger("loot")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControlLabel
                              control={
                                 <Tooltip
                                    title={
                                       sessionDetails.lootVisible
                                          ? ""
                                          : "Once you click this box and save, you will no longer be able to uncheck it"
                                    }
                                 >
                                    <Checkbox
                                       name="lootVisible"
                                       checked={sessionDetails.lootVisible}
                                       color="primary"
                                       disabled={sessionDetails.lootVisible}
                                       onChange={(e) => {
                                          setValue("lootVisible", e.target.checked);
                                          setSessionDetails({
                                             ...sessionDetails,
                                             lootVisible: e.target.checked,
                                          });
                                       }}
                                    />
                                 </Tooltip>
                              }
                              label="Loot visible to players?"
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
                                 watch("description") || sessionDetails.description || ""
                              }
                              onChange={(e) => {
                                 setValue("description", e.target.value);
                                 setSessionDetails({
                                    ...sessionDetails,
                                    description: e.target.value,
                                 });
                              }}
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
                        color="primary"
                        sx={{ mt: 2, mb: 2 }}
                        style={{ fontWeight: "bold", fontStyle: "italic" }}
                     >
                        Submit Changes
                     </Button>
                  </Box>
               </Box>
            </Container>
         </DialogContent>
         <DialogActions>
         </DialogActions>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ fontWeight: "bold", width: "400px" }}
         />
      </div>
   );
}