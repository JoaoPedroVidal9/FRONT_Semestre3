import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import api from "../axios/axios";
import senai from "../assets/logo_senai.png";

function Login() {
  const [user, setUser] = useState({
    cpf: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  function isOn() {
    if (user.showPassword) {
      return "text";
    } else {
      return "password";
    }
  }

  async function login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        navigate("salas/");
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
      style={{ display: "flex", padding: "0", margin: "0" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "3%",
        }}
      >
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
          Seja bem-vindo(a). Faça o login para acessar a Agenda Senai ou
          cadastre-se como novo usuário.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ marginTop: "15px", fontSize: "20px" }}>
            Usuário
          </Typography>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Digite seu CPF"
            name="cpf"
            id="cpf"
            value={user.cpf}
            onChange={onChange}
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
            sx={{
              paddingBottom: "10px",
              marginTop: "15px",
              border: "1px solid black",
              borderRadius: "15px",
              ".MuiInputLabel-root": {
                paddingLeft: "5px",
              },
            }}
          />

          <Typography sx={{ marginTop: "15px", fontSize: "20px" }}>
            Senha
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",

              borderRadius: "15px",
            }}
          >
            <TextField
              required
              fullWidth
              margin="normal"
              label="Digite sua senha"
              name="password"
              id="password"
              type={isOn()}
              value={user.password}
              onChange={onChange}
              variant="standard"
              slotProps={{
                input: {
                  disableUnderline: true,
                },
              }}
            />
            <IconButton
              sx={{width:"10px", height:"10px", paddingTop:"10px",paddingRight:"20px"}}
              onClick={() =>
                setUser({ ...user, showPassword: !user.showPassword })
              }
            >
              {user.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              width: "90%",
              marginTop: "15px",
              backgroundColor: "#215299",
              alignSelf: "center",
            }}
          >
            Entrar
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ margin: "5px" }}>Não possui conta? </p>
            <Link to="/cadastro" sx={{ margin: "5px", marginTop: "15px" }}>
              {" "}
              Cadastre-se{" "}
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
