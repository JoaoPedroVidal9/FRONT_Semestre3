import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import api from "../axios/axios";
import senai from "../assets/logo_senai.png";
import BarraLateral from "../components/BarraLateral";
import ResultadoModal from "../components/ModalConsultarDisponibilidade"

function ConsultarDisponibilidade() {
  const [week, setWeek] = useState({
    weekStart: "",
    weekEnd: "",
    classroomID: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setWeek({ ...week, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSchedulePorSemana();
  };

  async function getSchedulePorSemana() {
    try {
      const response = await api.getScheduleByWeek(week);
      setModalContent(response.data.available);
      handleOpenModal();
    } catch (error) {
      console.log(error);
      setModalContent(error.response.data.error);
      handleOpenModal();
    }
  }

  return (
    <Container component="main" maxWidth="xl">
      <BarraLateral />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1%",
          }}
        >
          <img
            style={{ width: "300px" }}
            src={senai}
            alt="Logo Senai"
          />

          <Typography
            sx={{ marginTop: 1, fontSize: 20 }}
            component="h1"
            textAlign="center"
          >
            Consultar Disponibilidade
          </Typography>

          <TextField
            required
            fullWidth
            margin="dense"
            label="Data de Início"
            name="weekStart"
            type="date"
            value={week.weekStart}
            onChange={onChange}
            variant="outlined"
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ width: 500 }}
          />

          <TextField
            required
            fullWidth
            margin="dense"
            label="Data de Fim"
            name="weekEnd"
            type="date"
            value={week.weekEnd}
            onChange={onChange}
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ width: 500 }}
          />

          <TextField
            required
            fullWidth
            margin="dense"
            label="Número da Sala"
            name="classroomID"
            value={week.classroomID}
            onChange={onChange}
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ width: 500 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: "40%", marginTop: "12px", backgroundColor: "gray" }}
          >
            Consultar
          </Button>
        </Box>
      </Box>

      <ResultadoModal
        open={openModal}
        handleClose={handleCloseModal}
        content={modalContent}
      />
    </Container>
  );
}

export default ConsultarDisponibilidade;
