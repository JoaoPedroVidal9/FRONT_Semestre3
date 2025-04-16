import * as React from "react";
import { useState } from "react";
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
import { Height } from "@mui/icons-material";

function ReservaSalas() {
  const [sala, setSala] = useState({
    dateStart: "",
    dateEnd: "",
    days: [],
    user: "",
    classroom: "",
    timeStart: "",
    timeEnd: "",
  });

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

  // Função para executar a request da API
  async function reserva() {
    await api.postReserva(sala).then(
      (response) => {
        alert(response.data.message);
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <Container
      component="main"
      maxWidth="xl"
      
    >
      <BarraLateral/>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3%",
        }}
      >
        {/* Logo do Senai */}
        <img
          style={{
            width: "300px",
            height: "75px",
          }}
          src={senai}
        />

        <Typography
          sx={{ marginTop: "40px", fontSize: "26px" }}
          component="h1"
          textAlign="center"
        >
          Reserva de salas
        </Typography>

        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite a data de inicio"
          name="dateStart"
          id="dateStart"
          value={sala.dateStart}
          onChange={onChange}
          variant="standard"
        />

        {/* Input para o E-mail */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite a data de fim"
          name="dateEnd"
          id="dateEnd"
          value={sala.dateEnd}
          onChange={onChange}
          variant="standard"
        />

        <FormControl fullWidth margin="normal" variant="standard">
          <InputLabel id="days-label">Selecione os dias da semana</InputLabel>
          <Select
            labelId="days-label"
            id="days"
            multiple
            value={sala.days}
            onChange={handleChangeDays}
            renderValue={(selected) => selected.join(", ")}
          >
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={sala.days.indexOf(day) > -1} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite o usuario"
          name="user"
          id="user"
          value={sala.user}
          onChange={onChange}
          variant="standard"
        />

        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite o número da sala"
          name="classroom"
          id="clasroom"
          value={sala.classroom}
          onChange={onChange}
          variant="standard"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite o horário de início"
          name="timeStart"
          id="timeStart"
          value={sala.timeStart}
          onChange={onChange}
          variant="standard"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite o horário de fim"
          name="timeEnd"
          id="timeEnd"
          value={sala.timeEnd}
          onChange={onChange}
          variant="standard"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "40%", marginTop: "12px", backgroundColor: "gray" }}
        >
          Reservar Sala
        </Button>
      </Box>
      </Box>
    </Container>
  );
}

export default ReservaSalas;
