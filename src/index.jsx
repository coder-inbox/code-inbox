import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NylasProvider } from "@nylas/nylas-react";
import { store, persistor } from "@app/store/root";
import App from "./App.jsx";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 2,
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#F50057",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F4F4F7",
    },
    common: {
      dark: "#080808",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.3)",
      white: "#fff",
    },
    btn: {
      hover: "rgba(0, 0, 0, 0.08)",
    },
    lightBtn: {
      bgColor: "#F5F5F5",
      textColor: "rgba(0, 0, 0, 0.54)",
    },
    borderColor: {
      main: "rgba(0, 0, 0, 0.06)",
      dark: "rgba(0, 0, 0, 0.12)",
    },
    popupColor: {
      main: "#F9F9F9",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 24,
          fontWeight: "bold",
          "@media (min-width: 960px)": {
            fontSize: 28,
          },
        },
        h2: {
          fontSize: 20,
          fontWeight: "bold",
          "@media (min-width: 960px)": {
            fontSize: 24,
          },
        },
        h3: {
          fontSize: 18,
          fontWeight: "bold",
          "@media (min-width: 960px)": {
            fontSize: 20,
          },
        },
        h4: {
          fontSize: 16,
          fontWeight: "bold",
        },
        h5: {
          fontSize: 14,
          fontWeight: 500,
        },
        h6: {
          fontSize: 14,
          fontWeight: "bold",
          letterSpacing: "0.5px",
        },
        subtitle1: {
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: "0.15px",
        },
        subtitle2: {
          fontSize: 14,
          fontWeight: "bold",
          letterSpacing: "0.1px",
        },
        body1: {
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: "0.5px",
        },
        body2: {
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: "0.25px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          letterSpacing: "1px",
          fontSize: 14,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCardLg: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        textColorPrimary: {
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
  typography: {
    fontWeightExtraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: "bold",
    fontWeightExtraBold: 800,
  },
  status: {
    danger: "red",
  },
});

const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    common: {
      dark: "#080808",
    },
    mode: "dark",
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#F50057",
    },
    background: {
      paper: "#121212",
      default: "#080808",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.6)",
      disabled: "rgba(255, 255, 255, 0.38)",
      hint: "rgba(255, 255, 255, 0.3)",
      white: "#fff",
    },
    btn: {
      hover: "rgba(255, 255, 255, 0.08)",
    },
    lightBtn: {
      bgColor: "#212121",
      textColor: "rgba(255, 255, 255, 0.6)",
    },
    borderColor: {
      main: "rgba(255, 255, 255, 0.12)",
      dark: "rgba(255, 255, 255, 0.2)",
    },
    popupColor: {
      main: "#121212",
    },
  },
});

const SERVER_URL =
  process.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NylasProvider serverBaseUrl={SERVER_URL}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </NylasProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
