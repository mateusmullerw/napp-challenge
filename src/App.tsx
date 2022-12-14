import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Navigation/Navigation";
import styled from "@emotion/styled";
import ROUTES from "./constants/routes";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { ProductsProvider } from "./contexts/ProductsContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 995,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  palette: {
    primary: {
      main: "#0A9FBF",
    },
    secondary: {
      main: "#3E2B78",
    },
    text: {
      primary: "#2b223d",
      secondary: "#80798b",
      disabled: "rgba(128,121,139,0.6)",
    },
    success: {
      main: "#009D9F",
    },
    error: {
      main: "#ba1a1a",
    },
    background: {
      default: "#F7F9FA",
      paper: "#FFFFFF",
    },
    action: {
      hover: "#F7F9FA",
      selected: "#EDE8FD",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const sidebarItems = [
  {
    to: ROUTES.PRODUCTS,
    label: "Produtos",
    icon: <ContentPasteSearchRoundedIcon />,
    active: true,
  },
  {
    to: ROUTES.REGISTER,
    label: "Cadastrar",
    icon: <PostAddRoundedIcon />,
    active: false,
  },
];

function App() {
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container
      isMobile={isMobile}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <ThemeProvider theme={theme}>
        <Sidebar items={sidebarItems} />
        <ProductsProvider>
          <SnackbarProvider>
            <Outlet />
          </SnackbarProvider>
        </ProductsProvider>
      </ThemeProvider>
    </Container>
  );
}

export default App;

interface IContainerProps {
  isMobile: boolean;
}
const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin-bottom: ${(props: IContainerProps) =>
    props.isMobile ? "70px" : "0px"};
`;
