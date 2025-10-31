import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7C4DFF" },
    secondary: { main: "#00BFA6" },
    background: { default: "#0b0f14", paper: "#121821" },
    text: { primary: "#e7eaf0", secondary: "#a7b0bf" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export default theme;
