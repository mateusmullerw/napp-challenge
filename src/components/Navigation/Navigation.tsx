import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavigationItem, { INavigationItem } from "./NavigationItem";
import Logo from "../Logo/Logo";
import ROUTES from "../../constants/routes";
import { Box, Paper } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

interface INavigationProps {
  items: INavigationItem[];
}

const Navigation = (props: INavigationProps) => {
  const { items } = props;
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const [activeItem, setActiveItem] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes(`/${ROUTES.PRODUCTS}`)) {
      setActiveItem(0);
    } else if (location.pathname === `/${ROUTES.REGISTER}`) {
      setActiveItem(1);
    } else if (location.pathname === `/${ROUTES.COMPONENTS}`) {
      setActiveItem(2);
    } else navigate(ROUTES.PRODUCTS);
  }, [location.pathname, navigate]);

  return (
    <Container isMobile={isMobile}>
      <LogoContainer isMobile={isMobile}>
        <Logo />
      </LogoContainer>
      {items.map((page, index) => {
        return (
          <NavigationItem
            isMobile={isMobile}
            key={page.to}
            to={page.to}
            label={page.label}
            icon={page.icon}
            active={activeItem === index}
            onClick={() => setActiveItem(index)}
          />
        );
      })}
    </Container>
  );
};

export default Navigation;

interface IContainerProps {
  isMobile: boolean;
}

const Container = styled(Paper)`
  position: ${({ isMobile }: IContainerProps) =>
    isMobile ? "fixed" : "relative"};
  bottom: 0;
  display: flex;
  flex: 1 1 50%;
  flex-direction: ${({ isMobile }: IContainerProps) =>
    isMobile ? "row" : "column"};
  align-items: center;
  justify-content: flex-start;
  min-height: ${({ isMobile }: IContainerProps) =>
    isMobile ? "70px" : "100%"};
  min-width: ${({ isMobile }: IContainerProps) =>
    isMobile ? "100%" : "10rem"};
  max-width: ${({ isMobile }: IContainerProps) =>
    isMobile ? "100%" : "16rem"};
  padding: ${({ isMobile }: IContainerProps) => (isMobile ? "0.5rem" : "1rem")};
  border-radius: 0;
  gap: 0.5rem;
  z-index: 1000;
`;

const LogoContainer = styled(Box)`
  max-width: ${({ isMobile }: IContainerProps) =>
    isMobile ? "100px" : "150px"};
  padding: ${({ isMobile }: IContainerProps) =>
    isMobile ? "0 0.5rem" : "0 1rem 1rem 1rem"};
`;
