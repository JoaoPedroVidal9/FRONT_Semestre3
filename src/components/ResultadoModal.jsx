import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const ResultadoModal = ({ open, handleClose, content }) => {
  const renderContent = () => {
    try {
      const parsed = typeof content === "string" ? JSON.parse(content) : content;

      return Object.entries(parsed).map(([dia, horarios]) => (
        <Box key={dia} sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "#4b5563",
              borderBottom: "1px solid #215299",
              pb: 0.5,
              mb: 1,
            }}
          >
            {dia}
          </Typography>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", listStyleType: "disc" }}>
            {horarios.map((hora, index) => (
              <li key={index}>
                <Typography
                  variant="body2"
                  sx={{ color: "#000000" }}
                >
                  {hora}
                </Typography>
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
          width: 480,
          maxHeight: "80vh",
          bgcolor: "#ffffff",
          boxShadow: 24,
          p: 4,
          borderRadius: "16px",
          overflowY: "auto",
          border: "2px solid #af2e2e",
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{
            mb: 3,
            color: "#215299",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Horários Disponíveis
        </Typography>

        {renderContent()}

        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            mt: 3,
            ml: "auto",
            display: "block",
            backgroundColor: "#af2e2e",
            color: "#ffffff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#991b1b",
            },
            borderRadius: "12px",
            px: 3,
            py: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default ResultadoModal;
