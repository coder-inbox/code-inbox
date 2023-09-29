import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import GridContainer from "@app/components/GridContainer";
import Grid from "@mui/material/Grid";
import AppTextInput from "@app/components/AppTextInput";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import ThreePIcon from "@mui/icons-material/ThreeP";
import { useTheme } from "@mui/material/styles";
import { programmingLanguages } from "@app/pages/ProgrammingLanguages";
import { SetPersonalInfo } from "@app/store/authReducer/actions";

const EditInfo = ({ open, onCloseDialog }) => {
  const theme = useTheme();
  const [personalInfoValues, setPersonalInfoValues] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    programmingLanguage: "",
  });

  const [errorValues, setErrorValues] = useState({
    firstNameError: "",
    lastNameError: "",
    bioError: "",
    programmingLanguageError: "",
  });

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, bio, programmingLanguage } = personalInfoValues;

    if (!firstName) {
      setErrorValues({
        ...errorValues,
        firstNameError: "This field is required!",
      });
    } else if (!lastName) {
      setErrorValues({
        ...errorValues,
        lastNameError: "This field is required!",
      });
    } else if (!bio) {
      setErrorValues({
        ...errorValues,
        bioError: "This field is required!",
      });
    } else if (!programmingLanguage) {
      setErrorValues({
        ...errorValues,
        programmingLanguageError: "This field is required!",
      });
    } else {
      dispatch(
        SetPersonalInfo({ firstName, lastName, bio, programmingLanguage })
      );
      onCloseDialog()
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle
        sx={{
          fontSize: "16px",
          color: "common.white",
          backgroundColor: "grey",
          border: `3px solid ${theme.palette.primary.main}`,
        }}
      >
        Edit Personal Information.
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={onSubmit}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            mb={{ xs: 6, md: 5 }}
            mt={{ xs: 2, md: 2 }}
          >
            <GridContainer>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(1),
                    mb: 0,
                  }}
                >
                  First Name
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <AppTextInput
                  fullWidth
                  value={personalInfoValues.firstName}
                  onChange={(e) => {
                    setPersonalInfoValues({
                      ...personalInfoValues,
                      firstName: e.target.value,
                    });
                    setErrorValues({ ...errorValues, firstNameError: "" });
                  }}
                  helperText={errorValues.firstNameError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" variant="standard">
                        <IconButton aria-label="First Name" edge="end" disabled>
                          <PermIdentityIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.text.primary,
                    fontSize: "16px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(1),
                    mb: 0,
                    mt: { md: 0, sm: theme.spacing(-3), xs: theme.spacing(-3) },
                  }}
                >
                  Last Name
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  value={personalInfoValues.lastName}
                  onChange={(e) => {
                    setPersonalInfoValues({
                      ...personalInfoValues,
                      lastName: e.target.value,
                    });
                    setErrorValues({ ...errorValues, lastNameError: "" });
                  }}
                  helperText={errorValues.lastNameError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" variant="standard">
                        <IconButton aria-label="Last Name" edge="end" disabled>
                          <PersonIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    marginRight: theme.spacing(2),
                    backgroundColor: theme.palette.background.paper,
                    fontSize: "16px",
                  }}
                />
              </Grid>
            </GridContainer>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            mb={{ xs: 6, md: 5 }}
          >
            <GridContainer>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(1),
                    mb: 0,
                    mt: { md: 0, sm: theme.spacing(-3), xs: theme.spacing(-3) },
                  }}
                >
                  Bio
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <AppTextInput
                  fullWidth
                  value={personalInfoValues.bio}
                  onChange={(e) => {
                    setPersonalInfoValues({
                      ...personalInfoValues,
                      bio: e.target.value,
                    });
                    setErrorValues({ ...errorValues, bioError: "" });
                  }}
                  helperText={errorValues.bioError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" variant="standard">
                        <IconButton aria-label="Bio" edge="end" disabled>
                          <ThreePIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    marginRight: theme.spacing(2),
                    backgroundColor: theme.palette.background.paper,
                    fontSize: "16px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(7),
                    mb: 0,
                    mt: { md: 0, sm: theme.spacing(-3), xs: theme.spacing(-3) },
                  }}
                >
                  Programming Language
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <Select
                  labelId="language-label"
                  label="language-label"
                  value={personalInfoValues.programmingLanguage}
                  onChange={(e) => {
                    setPersonalInfoValues({
                      ...personalInfoValues,
                      programmingLanguage: e.target.value,
                    });
                    setErrorValues({ ...errorValues, programmingLanguageError: "" });
                  }}
                  require
                >
                  {programmingLanguages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </GridContainer>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={0}>
            <Button onClick={onCloseDialog} color="secondary">
              Cancel
            </Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};

export default EditInfo;
