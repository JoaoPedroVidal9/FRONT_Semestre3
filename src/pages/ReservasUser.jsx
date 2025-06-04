import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BarraLateral from "../components/BarraLateral";
import senai from "../assets/logo_senai.png";
import Typography from "@mui/material/Typography";
import api from "../axios/axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

function ReservasUser() {
  const styles = getStyles();

  const [reservasUser, setReservasUser] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

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
      );
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

  const handleOpenModal = (reserva) => {
    setReservaSelecionada(reserva);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setReservaSelecionada(null);
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
                    onClick={() => handleOpenModal(sala)}
                    style={styles.botao}
                  >
                    DELETAR
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
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
                borderRadius: 2,
                width: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                textAlign="center"
              >
                Deseja realmente excluir a reserva?
              </Typography>
              <Typography variant="body2" textAlign="center">
                Sala: {reservaSelecionada?.classroom}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                <Typography
                  onClick={handleCloseModal}
                  sx={{
                    cursor: "pointer",
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "#ff0002",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Cancelar
                </Typography>
                <Typography
                  onClick={() => {
                    deleteScheduleUser(reservaSelecionada.id);
                    handleCloseModal();
                  }}
                  sx={{
                    cursor: "pointer",
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "#215299",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Confirmar
                </Typography>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Container>
    </>
  );
}

function getStyles() {
  return {
    container: {
      width: "100%",
      minHeight: "100vh",
      paddingTop: "30px",
      paddingBottom: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    boxMain: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    box01: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      marginTop: "40px",
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: "20px",
      borderRadius: "12px",
      border: "2px solid #215299",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "280px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      transition: "transform 0.2s ease-in-out",
    },
    cardHover: {
      transform: "scale(1.03)",
    },
    botao: {
      cursor: "pointer",
      backgroundColor: "#ff0002",
      width: "100px",
      textAlign: "center",
      borderRadius: "8px",
      padding: "8px 0",
      marginTop: "10px",
      color: "#FFFFFF",
      fontWeight: "bold",
      transition: "background-color 0.5s",
    },
    botaoHover: {
      backgroundColor: "#cc0000",
    },
    boxBotao: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  };
}

export default ReservasUser;
