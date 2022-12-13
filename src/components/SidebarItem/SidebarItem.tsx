import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export interface ISidebarItem {
  to: string;
  label: string;
  active: boolean;
}

interface ISidebarItemProps extends ISidebarItem {
  onClick: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SidebarItem = (props: ISidebarItemProps) => {
  const { to, label, active, onClick } = props;

  return (
    <StyledLink to={to} onClick={onClick}>
      {label}
    </StyledLink>
  );
};

export default SidebarItem;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  width: 100%;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: text-secondary;
`;
