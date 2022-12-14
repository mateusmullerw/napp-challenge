import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Typography, TextFieldProps, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export type InputProps = TextFieldProps & {
  title: string;
  showBackArrow?: boolean;
};

const Input = (props: InputProps) => {
  const { title, showBackArrow } = props;
  const navigate = useNavigate();

  return (
    <Container>
      {showBackArrow && (
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRoundedIcon />
        </IconButton>
      )}
      <Typography variant="h5">{title}</Typography>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  height: 40px;
`;
