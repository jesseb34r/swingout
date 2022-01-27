import { ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "hsl(30, 75%, 50%)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "hsl(210, 75%, 50%)",
    },
    success: {
      main: "#4caf50",
    },
  },
};

export default lightThemeOptions;
