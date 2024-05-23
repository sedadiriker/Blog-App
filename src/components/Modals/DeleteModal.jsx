import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const DeleteModal = ({ open, onClose, confirm, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
     
        <Typography id="confirm-modal-description" variant="body1" textAlign={"center"} gutterBottom>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={onClose} sx={{color:"green"}}>No</Button>
          <Button onClick={confirm} sx={{color:"brown"}} >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
