import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import { COLORS } from "../../constants/styles";
import TextField from "@mui/material/TextField";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { ProductsContext } from "../../contexts/ProductsContext";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteItems: React.MouseEventHandler<HTMLButtonElement>;
}

const TableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleDeleteItems } = props;
  const { filters, setFilters } = React.useContext(ProductsContext);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilters({ ...filters, name: newValue });
  };

  const handleFilterSku = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilters({ ...filters, sku: newValue });
  };

  const handleClearFilters = () => {
    setFilters({ name: "", sku: "" });
  };

  const hasItemSelected = numSelected > 0;

  return (
    <Container selected={hasItemSelected}>
      <Toolbar
        sx={{
          "&.MuiToolbar-root": {
            padding: hasItemSelected ? "0 1.5rem" : 0,
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          },
        }}
      >
        {hasItemSelected ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <TextField
              sx={{ flex: "2 1 10%" }}
              id="name-search"
              label="Nome"
              variant="outlined"
              value={filters.name}
              onChange={handleFilterName}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ flex: "1 1 10%" }}
              id="sku-search"
              label="SKU"
              type={"number"}
              variant="outlined"
              value={filters.sku}
              onChange={handleFilterSku}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
        {hasItemSelected ? (
          <Tooltip title="Deletar">
            <IconButton onClick={handleDeleteItems}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Limpar pesquisa">
            <IconButton onClick={handleClearFilters}>
              <ClearRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </Container>
  );
};

export default TableToolbar;

interface IContainerProps {
  selected: boolean;
}
const Container = styled.div`
  background-color: ${(props: IContainerProps) =>
    props.selected ? COLORS.primary.selected : COLORS.transparent};
  border-radius: 1rem;
`;

const Search = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0;
`;
