import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BarraLateral from "../components/BarraLateral";
import Typography from "@mui/material/Typography";
import senai from "../assets/logo_senai.png";

function QuemSomos() {
  const styles = getStyles();
  return (
    <>
      <BarraLateral />
      <Container component="main" maxWidth="xl" style={styles.container}>
        <Box style={styles.box}>
          {/* Logo do Senai */}
          <img
            style={{
              width: "300px",
            }}
            src={senai}
          />

          <Typography>QUEM SOMOS?</Typography>

          <Typography>
            Integrante do sistema industria ao lado da CNI, do SESI e do IEL, o
            Serviço Nacional de Aprendizagem Industrial (SENAI) é reconhecido
            como modelo de educação profissional e pela qualidade dos serviços
            tecnológicos que promovem a inovação na industria brasileira.
          </Typography>

          <Typography>
            A Agenda SENAI Virtual foi criada em busca de facilitar o
            agendamento de salas da unidade de Franca - SP, este site é
            exclusivo a funcionários e docentes da rede.
          </Typography>
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
    box: {
      width: "100%",
      maxWidth: "450px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: "20px",
    },
  };
}

export default QuemSomos;
