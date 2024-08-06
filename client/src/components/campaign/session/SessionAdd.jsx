import { useForm } from "react-hook-form";

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
   IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

import { useCreateSession } from "../../../hooks/useSession";

export default function SessionAdd(data) {
   const {
      handleSubmit,
      register,
      formState: { errors },
      trigger,
   } = useForm();

   const createSessionHandler = useCreateSession();

   const onSubmit = (formData) => {
      createSessionHandler(data.campaignId, formData)
         .then(() => {
            data.onClose();
            data.onSessionUpdated();
         })
         .catch((error) => {
            console.log("Create session error: ", error);
            toast.error("Something went wrong. Please try again later.");
         });
   };

   return (
      <div id="section-wrapper-edit-dialog">
         <DialogTitle
            className="main-titles"
            style={{
               textAlign: "center",
               fontStyle: "italic",
               fontWeight: "bold",
               fontFamily: "Georgia, serif",
               fontSize: "2.2rem",
            }}
         >
            Create new Session
            <IconButton
               aria-label="close"
               onClick={data.onClose}
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
                              onBlur={() => trigger("antagonist")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControlLabel
                              control={
                                 <Tooltip title="Once you click this box and save, you will no longer be able to uncheck it">
                                    <Checkbox
                                       {...register("antagonistVisible")}
                                       name="antagonistVisible"
                                       defaultChecked={false}
                                       color="primary"
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
                              onBlur={() => trigger("loot")}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControlLabel
                              control={
                                 <Tooltip title="Once you click this box and save, you will no longer be able to uncheck it">
                                    <Checkbox
                                       {...register("lootVisible")}
                                       name="lootVisible"
                                       defaultChecked={false}
                                       color="primary"
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
                              type="input"
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
         <DialogActions></DialogActions>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ fontWeight: "bold", width: "400px" }}
         />
      </div>
   );
}
