// src/presentation/molecules/FeedbackModal/FeedbackModal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
// Iconos para cada estado
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

// Definición de tipos permitidos
export enum ModalType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  type: ModalType;
  title: string;
  message: string;
  buttonText?: string;
}

// Mapeo de configuración visual por tipo
const typeConfig = {
  [ModalType.SUCCESS]: {
    icon: (
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
    ),
    buttonColor: "#EC6608", // Tu color de acento primario
  },
  [ModalType.ERROR]: {
    icon: <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />,
    buttonColor: "#d32f2f",
  },
  [ModalType.INFO]: {
    icon: <InfoOutlinedIcon sx={{ fontSize: 60, color: "info.main" }} />,
    buttonColor: "#0288d1",
  },
  [ModalType.WARNING]: {
    icon: (
      <ReportProblemOutlinedIcon sx={{ fontSize: 60, color: "warning.main" }} />
    ),
    buttonColor: "#ed6c02",
  },
};

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  type,
  title,
  message,
  buttonText = "Continuar",
}) => {
  const config = typeConfig[type];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: "12px" } }}
    >
      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <Stack alignItems="center" spacing={2}>
          {config.icon}
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: config.buttonColor,
            px: 4,
            "&:hover": { opacity: 0.9, bgcolor: config.buttonColor },
          }}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
