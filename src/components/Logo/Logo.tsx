import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <StyledLink to={"products"}>
      <LogoImage src={require("../../assets/logo.png")} alt={"NAPP"} />
    </StyledLink>
  );
};

export default Logo;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 1rem;
`;

const LogoImage = styled.img`
  max-width: 100px;
`;
