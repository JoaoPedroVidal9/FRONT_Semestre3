// Importação dos componentes react
import * as React from "react";
import { useState } from "react";
// Importação dos componentes MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// Importação dos componentes MUI icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Importação dos componentes do Roteador
import { Link, useNavigate } from "react-router-dom";
// Importação da função da API
import api from "../axios/axios";
// Importação de imagens
import senai from "../assets/logo_senai.png";

function Login() {
  // Definição da constante dos dados do usuário
  const [user, setUser] = useState({
    cpf: "",
    password: "",
    showPassword: false,
  });

  // Definição da função de navegação
  const navigate = useNavigate();

  // Definição da função de sincronização entre input e dados do usuário
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Função para lidar com a ação do submit
  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  // Função para ativar a segurança da senha (showPassword)
  function isOn() {
    if (user.showPassword) {
      return "text";
    } else {
      return "password";
    }
  }

  // Função para executar a request da API
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

  // Início da Definição Gráfica
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
        {/* Logo do Senai */}
        <img
          style={{
            width: "300px",
            height: "75px",
          }}
          src={senai}
        />

        {/* Texto introdutório à página */}
        <Typography
          sx={{ marginTop: "40px", fontSize: "26px" }}
          component="h1"
          textAlign="center"
        >
          Seja bem-vindo(a). Faça o login para acessar a Agenda Senai ou
          cadastre-se como novo usuário.
        </Typography>

        {/* Caixa de formulário de login */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Título e Input do CPF */}
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
              htmlInput: {
                maxLength: 11,
              },
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

          {/* Título e Input da Senha */}
          <Typography sx={{ marginTop: "15px", fontSize: "20px" }}>
            Senha
          </Typography>

          {/* Caixa para estilização do Input da Senha */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              marginY: "15px",
              borderRadius: "15px",
            }}
          >
            {/* Input da senha */}
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
                htmlInput: {
                  maxLength: 50,
                },
                input: {
                  disableUnderline: true,
                },
              }}
              sx={{
                margin: 0,
                paddingBottom: "10px",
                ".MuiInputLabel-root": {
                  paddingLeft: "5px",
                },
              }}
            />
            {/* Icone de Olho */}
            <IconButton
              sx={{
                width: "10px",
                height: "10px",
                paddingTop: "10px",
                paddingRight: "20px",
              }}
              onClick={() =>
                setUser({ ...user, showPassword: !user.showPassword })
              }
            >
              {user.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>

          {/* Botão de Cadastro */}
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

          {/* Div para texto de redirecionamento para página de cadastro */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ margin: "5px" }}>Não possui conta? </p>
            <Link
              to="/cadastro"
              style={{ fontFamily: "sans-serif", textDecoration: "none" }}
              sx={{ margin: "5px", marginTop: "15px" }}
            >
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
