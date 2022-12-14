import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import styled from "@emotion/styled";
import ROUTES from "./constants/routes";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { ProductsProvider } from "./contexts/ProductsContext";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";

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
  return (
    <Container>
      <Sidebar items={sidebarItems} />
      <ProductsProvider>
        <Outlet />
      </ProductsProvider>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;
