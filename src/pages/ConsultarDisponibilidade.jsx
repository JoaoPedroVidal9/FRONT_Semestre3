import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import api from "../axios/axios";
import senai from "../assets/logo_senai.png";
import BarraLateral from "../components/BarraLateral";
import ResultadoModal from "../components/ResultadoModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function ConsultarDisponibilidade() {
  const [week, setWeek] = useState({
    weekStart: "",
    weekEnd: "",
    classroomID: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [listClassroom, setListClassroom] = useState([]);

  useEffect(() => {
    getAllClassrooms();
  }, []);

  async function getAllClassrooms() {
    try {
      const response = await api.getSalas();
      setListClassroom(response.data.classrooms.map((sala) => sala.number));
    } catch (error) {
      console.log("Erro", error);
      alert(error.response.data.error);
    }
  }

  async function getSchedulePorSemana() {
    try {
      const response = await api.getScheduleByWeek(week);
      setModalContent(response.data.available);
      handleOpenModal();
    } catch (error) {
      setModalContent(error.response.data.error);
      handleOpenModal();
    }
  }

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

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <BarraLateral />
      <Container component="main" maxWidth="xl">
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
            <img style={{ width: "300px" }} src={senai} alt="Logo Senai" />

            <Typography
              sx={{ marginTop: 1, fontSize: 20 }}
              component="h1"
              textAlign="center"
            >
              Consultar disponibilidade de um sala por semana
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
              inputProps={{ min: getTodayDate() }}
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
              inputProps={{ min: getTodayDate() }}
              sx={{ width: 500 }}
            />

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="classroom-label" shrink={true}>
                Número da sala
              </InputLabel>

              <Select
                labelId="classroom-label"
                id="classroomID"
                value={week.classroomID}
                size="small"
                label="Número da sala"
                onChange={(e) =>
                  setWeek((prev) => ({ ...prev, classroomID: e.target.value }))
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300, // define a altura máxima do dropdown
                    },
                  },
                }}
                displayEmpty
                sx={{ width: 500 }}
              >
                {listClassroom.map((numero) => (
                  <MenuItem key={numero} value={numero}>
                    {numero}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: "40%",
                marginTop: "12px",
                backgroundColor: "#215299",
              }}
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
    </>
  );
}

export default ConsultarDisponibilidade;
