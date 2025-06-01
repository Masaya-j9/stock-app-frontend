import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { ErrorMessage } from "@/components/ErrorMessage";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  errorMessage?: string | null;
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  errorMessage,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {errorMessage && (
          <Box mt={3} mb={2}>
            <ErrorMessage type="delete" message={errorMessage} />
          </Box>
        )}
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            削除
          </Button>
          <Button variant="outlined" onClick={onClose}>
            キャンセル
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
