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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

function PerfilUser() {
  const styles = getStyles();

  const navigate = useNavigate();

  function ReservasUser() {
    navigate("/reservasuser");
  }

  const [perfilUser, setPerfilUser] = useState({
    cpf: "",
    password: "",
    password2: "",
    email: "",
    name: "",
    contagem: "0",
    showPassword: false,
    showPassword2: false,
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setPerfilUser({ ...perfilUser, [name]: value });
  };

  useEffect(() => {
    async function GetUserByCPF() {
      try {
        const cpf = localStorage.getItem("id_usuario");
        await api.getUserById(cpf).then(
          (response) => {
            const userData = response.data.user;
            setPerfilUser((user) => ({
              ...user,
              cpf: userData.cpf,
              password: userData.password,
              email: userData.email,
              name: userData.name,
            }));
          },
          (error) => {
            alert(error.response.data.error);
          }
        );
      } catch (error) {
        console.log("Erro", error);
      }
    }

    async function getScheduleByUserID() {
      try {
        const cpf = localStorage.getItem("id_usuario");
        await api.getUserSchedules(cpf).then(
          (response) => {
            const numeroReservas = response.data.contagem;
            setPerfilUser((user) => ({
              ...user,
              contagem: String(numeroReservas),
            }));
          },
          (error) => {
            console.log(error.response.data.error);
          }
        );
      } catch (error) {
        console.log("Erro", error);
      }
    }

    GetUserByCPF();
    getScheduleByUserID();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    update();
  };

  async function update() {
    const cpf = localStorage.getItem("id_usuario");
    await api.updateUser(perfilUser, cpf).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("id_usuario", perfilUser.cpf);
      },
      (error) => {
        alert(error.response.data.error);
      }
    );
  }

  return (
    <>
      <BarraLateral />
      <Container component="main" maxWidth="xl" style={styles.container}>
        <Box style={styles.boxMain}>
          {/* Logo do Senai */}
          <img style={{ width: "300px" }} src={senai} />

          <Box style={styles.box01} component="form" onSubmit={handleSubmit}>
            <Box style={styles.boxDelete}>
              <Typography variant="h5">Perfil do Usuário</Typography>
              <RemoveCircleIcon style={styles.icon} onClick=/>
            </Box>

            <TextField
              required
              fullWidth
              margin="normal"
              label="Nome"
              name="name"
              value={perfilUser.name}
              onChange={onChange}
              variant="standard"
            />

            <TextField
              required
              fullWidth
              margin="normal"
              label="E-mail"
              name="email"
              value={perfilUser.email}
              onChange={onChange}
              variant="standard"
            />

            {/* Caixa para estilização do input da senha */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                required
                fullWidth
                margin="normal"
                label="Digite sua senha"
                name="password"
                id="password"
                type={perfilUser.showPassword ? "text" : "password"}
                value={perfilUser.password}
                onChange={onChange}
                variant="standard"
              />
              <IconButton
                onClick={() =>
                  setPerfilUser({
                    ...perfilUser,
                    showPassword: !perfilUser.showPassword,
                  })
                }
              >
                {perfilUser.showPassword ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </Box>

            {/* Caixa para estilização do input de confirmar senha */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                required
                fullWidth
                margin="normal"
                label="Confirme sua senha"
                name="password2"
                id="password2"
                type={perfilUser.showPassword2 ? "text" : "password"}
                value={perfilUser.password2}
                onChange={onChange}
                variant="standard"
              />
              <IconButton
                onClick={() =>
                  setPerfilUser({
                    ...perfilUser,
                    showPassword2: !perfilUser.showPassword2,
                  })
                }
              >
                {perfilUser.showPassword2 ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </Box>

            <TextField
              required
              fullWidth
              margin="normal"
              label="CPF"
              name="cpf"
              value={perfilUser.cpf}
              onChange={onChange}
              variant="standard"
            />

            <Box style={styles.box02}>
              <Typography>Número de reservas: {perfilUser.contagem}</Typography>
              <Typography
                onClick={ReservasUser}
                sx={{
                  cursor: "pointer",
                  color: "#42a5f5",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#215299", // azul claro
                  },
                  textDecoration: "underline",
                }}
              >
                detalhes
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "20%",
                marginTop: "15px",
                backgroundColor: "#215299",
                alignSelf: "center",
              }}
            >
              Atualizar
            </Button>
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
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    },
    boxMain: {
      width: "100%",
      maxWidth: "700px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "30px",
    },
    box01: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginTop: "20px",
    },
    box02: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
      padding: "0 4px",
    },
    icon: {
      color: "#ff0002",
      cursor: "pointer"
    },
    boxDelete: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
  };
}

export default PerfilUser;
