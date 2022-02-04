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
      main: "hsl(120, 75%, 50%)",
      light: "hsl(120, 75%, 75%)",
    },
    error: {
      main: "hsl(0, 75%, 50%)",
      light: "hsl(0, 75%, 75%)",
    },
  },
};

export default lightThemeOptions;
