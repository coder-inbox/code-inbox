import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@app/store/authReducer/actions";
import LockIcon from "@mui/icons-material/Lock";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useNylas } from "@nylas/nylas-react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nylas = useNylas();
  const { loading, currentUser, auth_url, error, message } = useSelector(
    (state) => state.auth
  );
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const loginUser = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      return;
    }
    dispatch(userLogin({ email: email, nylas: nylas }));
  };

  useEffect(() => {
    if (currentUser?.userId?.length) {
      navigate(`/?userId=${currentUser?.userId}`);
      getEmails();
    } else {
      navigate(`/login`);
    }
  }, [currentUser]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: theme.spacing(24),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              margin: theme.spacing(1),
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <LockIcon sx={{ color: theme.palette.text.main }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form
            style={{ width: "100%", marginTop: theme.spacing(1) }}
            onSubmit={loginUser}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!emailRegex.test(email)}
              helperText={!emailRegex.test(email) ? "Invalid email" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress /> ' Connecting...'
                </Box>
              ) : (
                "Connect email"
              )}
            </Button>
          </form>
          <Box
            component="footer"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: theme.palette.text.secondary,
              padding: theme.spacing(2),
              marginTop: theme.spacing(12),
            }}
          >
            <Typography variant="body2">
              POWERED BY{" "}
              <img
                src="/nylas-logo.svg"
                alt="Nylas Logo"
                style={{ marginLeft: theme.spacing(1), width: "60px" }}
              />
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
