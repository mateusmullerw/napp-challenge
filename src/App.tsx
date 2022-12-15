import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import styled from "@emotion/styled";
import ROUTES from "./constants/routes";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { ProductsProvider } from "./contexts/ProductsContext";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#276663",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#2b223d",
      secondary: "#80798b",
      disabled: "rgba(128,121,139,0.6)",
    },
    success: {
      main: "#159570",
    },
    error: {
      main: "#f4365d",
    },
    background: {
      default: "#f1f5f8",
    },
    divider: "rgba(43,34,61,0.15)",
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
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {isLargeDisplay ? (
          <Sidebar items={sidebarItems} />
        ) : (
          <BottomNavigation items={sidebarItems} />
        )}
        <ProductsProvider>
          <Outlet />
        </ProductsProvider>
      </ThemeProvider>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;
