import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import styled from "@emotion/styled";
import ROUTES from "./constants/routes";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

const sidebarItems = [
  {
    to: ROUTES.PRODUCTS,
    label: "Produtos",
    icon: <InventoryRoundedIcon />,
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
