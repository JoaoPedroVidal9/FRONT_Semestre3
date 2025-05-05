import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const ResultadoModal = ({ open, handleClose, content }) => {
  const renderContent = () => {
    try {
      const parsed = typeof content === "string" ? JSON.parse(content) : content;

      return Object.entries(parsed).map(([dia, horarios]) => (
        <Box key={dia} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {dia}
          </Typography>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {horarios.map((hora, index) => (
              <li key={index}>
                <Typography variant="body2">{hora}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      ));
    } catch (error) {
      return (
        <Typography variant="body2" color="error">
          {content}
        </Typography>
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "70vh",
          bgcolor:"white",
          boxShadow: 12,
          p: 3,
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Horários Disponíveis
        </Typography>
        {renderContent()}
        <Button
          variant="contained"
          size="small"
          onClick={handleClose}
          sx={{
            display: "block",
            marginTop: 2,
            marginLeft: "auto",
            backgroundColor: "#1976d2",
          }}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default ResultadoModal;
