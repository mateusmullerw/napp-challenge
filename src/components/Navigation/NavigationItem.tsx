import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Theme, useTheme } from "@mui/material";

export interface INavigationItem {
  to: string;
  label: string;
  icon: React.ReactElement;
  active: boolean;
}

interface INavigationItemProps extends INavigationItem {
  onClick: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
  isMobile: boolean;
}

const NavigationItem = (props: INavigationItemProps) => {
  const { to, label, icon, active, onClick, isMobile } = props;
  const theme = useTheme();

  return (
    <Container active={active} theme={theme} isMobile={isMobile}>
      <Link to={to} onClick={onClick}>
        {icon}
        {label}
      </Link>
    </Container>
  );
};

export default NavigationItem;
interface IContainerProps {
  active: boolean;
  theme: Theme;
  isMobile: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  line-height: 2rem;
  border-radius: 0.5rem;
  background-color: ${(props: IContainerProps) =>
    props.active ? props.theme.palette.action.selected : "transparent"};

  :hover {
    background-color: ${(props: IContainerProps) =>
      props.active
        ? props.theme.palette.action.selected
        : props.theme.palette.action.hover};
  }

  a {
    display: flex;
    justify-content: ${({ isMobile }: IContainerProps) =>
      isMobile ? "center" : "flex-start"};
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${(props: IContainerProps) => props.theme.palette.text.primary};
    width: 100%;
    height: 100%;
  }

  transition-duration: 150ms;
`;
