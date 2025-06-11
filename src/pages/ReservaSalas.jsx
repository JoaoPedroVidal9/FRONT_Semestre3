import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import api from "../axios/axios";
import senai from "../assets/logo_senai.png";
import BarraLateral from "../components/BarraLateral";

function ReservaSalas() {
  const [sala, setSala] = useState({
    dateStart: "",
    dateEnd: "",
    days: [],
    daysWeek: [],
    user: "",
    classroom: "",
    timeStart: "",
    timeEnd: "",
  });
  const [listClassroom, setListClassroom] = useState([]);

  useEffect(() => {
    const idUsuario = localStorage.getItem("id_usuario");
    if (idUsuario) {
      setSala((prevSala) => ({
        ...prevSala,
        user: idUsuario,
      }));
    }
    getAllClassrooms();
  }, []);

  useEffect( ()=> {
    if(sala.dateStart && sala.dateEnd) {
      postDaysForSchedule()
      setSala((sala) => ({...sala, days: [] }))
    }
  }, [sala.dateStart, sala.dateEnd])

  async function postDaysForSchedule() {
    try {
      const response = await api.postDaysWeekSchedule(sala)
      setSala((salas) => ({
        ...salas,
        daysWeek: response.data.days
      }))
    } catch (error){
      console.log("Erro", error);
      alert(error.response.data.error);
    }
  }

  async function getAllClassrooms() {
    try {
      const response = await api.getSalas();
      setListClassroom(response.data.classrooms.map((sala) => sala.number));
    } catch (error) {
      console.log("Erro", error);
      alert(error.response.data.error);
    }
  }

  async function reserva() {
    await api.postReserva(sala).then(
      (response) => {
        alert(response.data.message);
      },
      (error) => {
        alert(error.response.data.error);
      }
    );
  }

  const onChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "days") {
      setSala((prevSala) => {
        let updatedDays = [...prevSala.days];
        if (checked) {
          // Adiciona o dia ao array se o checkbox for marcado
          updatedDays.push(value);
        } else {
          // Remove o dia do array se o checkbox for desmarcado
          updatedDays = updatedDays.filter((day) => day !== value);
        }
        return { ...prevSala, days: updatedDays };
      });
    } else {
      // Atualiza outros campos (como dateStart, dateEnd, etc)
      setSala({ ...sala, [name]: value });
    }
  };

  const handleChangeDays = (event) => {
    const {
      target: { value },
    } = event;
    // O value é um array com os dias selecionados
    setSala({
      ...sala,
      days: typeof value === "string" ? value.split(",") : value,
    });
  };

  // Função para lidar com a ação do submit
  const handleSubmit = (event) => {
    event.preventDefault();
    reserva();
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
            padding: 0,
            margin: 0,
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
            {/* Logo do Senai */}
            <img
              style={{
                width: "300px",
              }}
              src={senai}
            />

            <Typography
              sx={{ marginTop: 1, fontSize: 20 }}
              component="h1"
              textAlign="center"
            >
              Reserva de salas
            </Typography>

            <TextField
              required
              fullWidth
              margin="dense"
              label="Selecione a data de início"
              name="dateStart"
              id="dateStart"
              type="date"
              value={sala.dateStart}
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
              label="Selecione a data de fim"
              name="dateEnd"
              id="dateEnd"
              type="date"
              value={sala.dateEnd}
              onChange={onChange}
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              inputProps={{ min: getTodayDate() }}
              sx={{ width: 500 }}
            />

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="days-label" shrink={true}>
                Selecione os dias da semana
              </InputLabel>

              <Select
                labelId="days-label"
                id="days"
                multiple
                value={sala.days}
                size="small"
                label="Selecione os dias da semana"
                onChange={handleChangeDays}
                renderValue={(selected) =>
                  selected.length === 0 ? "" : selected.join(", ")
                }
                displayEmpty
                sx={{ width: 500 }}
              >
                {sala.daysWeek.map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox checked={sala.days.includes(day)} />
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="classroom-label" shrink={true}>
                Número da sala
              </InputLabel>

              <Select
                labelId="classroom-label"
                id="classroom"
                value={sala.classroom}
                size="small"
                label="Número da sala"
                onChange={(e) =>
                  setSala((prev) => ({ ...prev, classroom: e.target.value }))
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

            <TextField
              required
              fullWidth
              margin="dense"
              label="Selecione o horário de início"
              name="timeStart"
              id="timeStart"
              type="time"
              size="small"
              value={sala.timeStart}
              onChange={onChange}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ width: 500 }}
            />
            <TextField
              required
              fullWidth
              margin="dense"
              label="Selecione o horário de fim"
              name="timeEnd"
              id="timeEnd"
              type="time"
              size="small"
              value={sala.timeEnd}
              onChange={onChange}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ width: 500 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ width: "40%", marginTop: "12px", backgroundColor: "#215299" }}
            >
              Reservar Sala
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ReservaSalas;
