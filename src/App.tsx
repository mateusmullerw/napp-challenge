import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import styled from "@emotion/styled";

const sidebarItems = [
  {
    to: "products",
    label: "Produtos",
    active: true,
  },
  {
    to: "register",
    label: "Cadastrar",
    active: false,
  },
];

function App() {
  return (
    <Container>
      <Sidebar items={sidebarItems} />
      <Outlet />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;
