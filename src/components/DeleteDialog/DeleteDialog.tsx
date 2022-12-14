import React from "react";
import { IProduct } from "../../contexts/ProductsContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export interface IDeleteDialog {
  items: IProduct[];
  open: boolean;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteDialog = (props: IDeleteDialog) => {
  const { items, open, handleClose, handleDelete } = props;

  const itemCount = items.length;
  const plural = itemCount > 1;

  const title = plural
    ? `Deletar ${itemCount} produtos?`
    : "Deletar este produto?";
  const content = plural
    ? `Você tem certeza que deseja deletar os produtos a seguir?`
    : "Você tem certeza que deseja deletar este produto?";

  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
        {items.map((item) => (
          <Typography>{`${item.sku} - ${item.name}`}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
