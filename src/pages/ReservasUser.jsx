import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BarraLateral from "../components/BarraLateral";
import senai from "../assets/logo_senai.png";
import Typography from "@mui/material/Typography";
import api from "../axios/axios";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function ReservasUser() {
  const styles = getStyles();

  const [reservasUser, setReservasUser] = useState([]);

  useEffect(() => {
    async function getScheduleByUserID() {
      try {
        const cpf = localStorage.getItem("id_usuario");
        await api.getUserSchedules(cpf).then(
          (response) => {
            const reservas = response.data.results;
            setReservasUser(reservas);
          },
          (error) => {
            alert(error.response.data.error);
          }
        );
      } catch (error) {
        console.log("Erro", error);
      }
    }

    getScheduleByUserID();
  }, []);

  async function deleteScheduleUser(idReserva) {
    try {
      const response = await api.deleteSchedule(idReserva);
      alert(response.data.message);

      // Remove do estado local, a reserva deletada
      setReservasUser((prev) =>
        prev.filter((reserva) => reserva.id !== idReserva)
      )

    } catch (error) {
      alert(error.response.data.error);
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <BarraLateral />
      <Container component="main" maxWidth="xl" style={styles.container}>
        <Box style={styles.boxMain}>
          {/* Logo do Senai */}
          <img style={{ width: "300px" }} src={senai} />
          <Box style={styles.box01}>
            {reservasUser.map((sala, index) => (
              <Box key={index} style={styles.card}>
                <Typography variant="h5">Sala: {sala.classroom}</Typography>
                <Typography>
                  Data de Início: {formatDate(sala.dateStart)}
                </Typography>
                <Typography>
                  Data de Término: {formatDate(sala.dateEnd)}
                </Typography>
                <Typography>
                  Horário: {sala.timeStart} - {sala.timeEnd}
                </Typography>
                <Box style={styles.boxBotao}>
                  <Typography
                    onClick={() => deleteScheduleUser(sala.id)}
                    style={styles.botao}
                  >
                    DELETAR
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

function getStyles() {
  return {
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    boxMain: {
      width: "80%",
      height: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
    },
    box01: {
      width: "70%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "start",
      justifyContent: "space-between",
      gap: "20px",
      padding: "30px",
      borderRadius: "8px",
      marginTop: "20px",
    },
    box02: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: "#d9d9d9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "250px",
    },
    botao: {
      cursor: "pointer",
      backgroundColor: "#ff0002",
      width: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "7px",
      padding: "2px",
      marginTop: "7px",
      color: "white",
    },
    boxBotao: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  };
}

export default ReservasUser;
