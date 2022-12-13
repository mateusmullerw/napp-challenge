import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { COLORS } from "../../constants/styles";

export interface ISidebarItem {
  to: string;
  label: string;
  icon: React.ReactElement;
  active: boolean;
}

interface ISidebarItemProps extends ISidebarItem {
  onClick: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SidebarItem = (props: ISidebarItemProps) => {
  const { to, label, icon, active, onClick } = props;

  return (
    <Container active={active}>
      <Link to={to} onClick={onClick}>
        {icon}
        {label}
      </Link>
    </Container>
  );
};

export default SidebarItem;
interface IContainerProps {
  active: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  line-height: 2rem;
  border-radius: 0.5rem;
  background-color: ${(props: IContainerProps) =>
    props.active ? COLORS.primary.default : COLORS.transparent};

  :hover {
    background-color: ${(props: IContainerProps) =>
      props.active ? COLORS.primary.default : COLORS.hover};
  }

  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${(props: IContainerProps) =>
      props.active ? COLORS.text.white : COLORS.text.primary};
    width: 100%;
    height: 100%;
  }

  transition-duration: 150ms;
`;
