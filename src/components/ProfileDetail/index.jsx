import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import DialpadIcon from "@mui/icons-material/Dialpad";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";

const ProfileDetail = ({ currentUser, user }) => {
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 1,
          textTransform: "uppercase",
          fontSize: "10px",
          letterSpacing: "1.5px",
          color: theme.palette.text.primary,
        }}
      >
        Personal Information
      </Typography>

      <List dense sx={{ paddingY: 0, color: theme.palette.text.primary }}>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <PermIdentityIcon
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="First Name"
            secondary={user?.full_name?.split(" ").slice(0, 1).pop()}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <PersonIcon
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Last Name"
            secondary={user?.full_name?.split(" ").slice(1, 2).pop()}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <EmailIcon
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Email Address"
            secondary={user?.email}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <DialpadIcon
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Phone Number"
            secondary={user?.phone_number}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileDetail;
