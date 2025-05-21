import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BarraLateral from "../components/BarraLateral";
import senai from "../assets/logo_senai.png";
import Typography from "@mui/material/Typography";
import api from "../axios/axios";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function PerfilUser() {
  const styles = getStyles();

  const [perfilUser, setPerfilUser] = useState([
    
  ])

  useEffect(() => {
    async function GetUserByCPF() {
      try {
        const cpf = localStorage.getItem("id_usuario")
        const response = await api.getUser(cpf)
        setPerfilUser(response.data.results)
        set
      } catch (error) {
        console.log("Erro", error)
      }
    }

    GetUserByCPF()
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target;
    setWeek({ ...week, [name]: value });
  };

  return (
    <>
      <BarraLateral />
      <Container component="main" maxWidth="xl" style={styles.container}>
        <Box style={styles.boxMain}>

          {/* Logo do Senai */}
          <img
            style={{
              width: "300px",
            }}
            src={senai}
          />

          <Box style={styles.box01}>
            <Typography>TESTE</Typography>
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
      backgroundColor: "red"
    },
    boxMain: {
      width: "70%",
      height: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "blue"
    },
    box01: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      backgroundColor: "green"
    },
  };
}

export default PerfilUser;