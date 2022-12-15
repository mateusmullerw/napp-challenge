import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";
type SnackType = {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  open: boolean;
};

type SnackbarContextType = {
  snack: SnackType;
  setSnack: Function;
};

const initialValue: SnackType = {
  message: "",
  severity: "success",
  open: false,
};

const initialContextValue: SnackbarContextType = {
  snack: initialValue,
  setSnack: () => {},
};
export const SnackbarContext =
  createContext<SnackbarContextType>(initialContextValue);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

const SnackbarProvider = (props: SnackbarProviderProps) => {
  const [snack, setSnack] = useState(initialValue);

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <>
        {props.children}
        <Snackbar
          open={snack.open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert>{snack.message}</Alert>
        </Snackbar>
      </>
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
