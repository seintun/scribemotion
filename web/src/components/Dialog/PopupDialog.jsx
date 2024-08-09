import React, { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupDialog = ({ title, component, open, onClose }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContent id="alert-dialog-description">{component}</DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
