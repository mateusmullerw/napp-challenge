import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import SidebarItem, { ISidebarItem } from "./BottomNavigationItem";
import Logo from "../Logo/Logo";
import ROUTES from "../../constants/routes";
import { COLORS } from "../../constants/styles";

interface ISidebarProps {
  items: ISidebarItem[];
}

const Sidebar = (props: ISidebarProps) => {
  const { items } = props;
  const [activeItem, setActiveItem] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes(`/${ROUTES.PRODUCTS}`)) {
      setActiveItem(0);
    } else if (location.pathname === `/${ROUTES.REGISTER}`) {
      setActiveItem(1);
    } else navigate(ROUTES.PRODUCTS);
  }, [location.pathname, navigate]);

  return (
    <Container>
      {/* <Logo /> */}
      <ItemList>
        <Logo />
        {items.map((page, index) => {
          return (
            <SidebarItem
              key={page.to}
              to={page.to}
              label={page.label}
              icon={page.icon}
              active={activeItem === index}
              onClick={() => setActiveItem(index)}
            />
          );
        })}
      </ItemList>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
  min-width: 100%;
  padding: 0.5rem;
  gap: 1rem;
  background-color: ${COLORS.background};
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  margin: 0;
  padding: 0;
`;
