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

function Cadastro() {
  // Definição da constante dos dados do usuário
  const [user, setUser] = useState({
    cpf: "",
    name: "",
    email: "",
    password: "",
    password2: "",
    showPassword: false,
  });

  // Função para ativar a segurança da senha (showPassword)
  function isOn() {
    if (user.showPassword) {
      return "text";
    } else {
      return "password";
    }
  }

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
    cadastro();
  };

  // Função para executar a request da API
  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("authorization", response.data.token);
        localStorage.setItem("id_usuario", user.cpf);
        navigate("/salas");
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
      {/* Caixa de formulário de cadastro */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
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
          Cadastre-se e usufrua de nossa plataforma.
        </Typography>

        {/* Input para o Nome */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite seu Nome"
          name="name"
          id="name"
          value={user.name}
          onChange={onChange}
          variant="standard"
          slotProps={{
            htmlInput: {
              maxLength: 255,
            },
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            paddingBottom: "10px",
            marginTop: "12px",
            border: "1px solid black",
            borderRadius: "15px",
            ".MuiInputLabel-root": {
              paddingLeft: "5px",
            },
          }}
        />

        {/* Input para o E-mail */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite seu E-mail"
          name="email"
          id="email"
          value={user.email}
          onChange={onChange}
          variant="standard"
          slotProps={{
            htmlInput: {
              maxLength: 255,
            },
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            paddingBottom: "10px",
            marginTop: "12px",
            border: "1px solid black",
            borderRadius: "15px",
            ".MuiInputLabel-root": {
              paddingLeft: "5px",
            },
          }}
        />

        {/* Input para o CPF */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Digite seu CPF"
          name="cpf"
          id="cpf"
          type="number"
          value={user.cpf}
          onChange={onChange}
          variant="standard"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 11);
          }}
          min={0}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            paddingBottom: "10px",
            marginTop: "12px",
            border: "1px solid black",
            borderRadius: "15px",
            ".MuiInputLabel-root": {
              paddingLeft: "5px",
            },
          }}
        />

        {/* Caixa para estilização do input da senha */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            marginY: "15px",
            borderRadius: "15px",
            width:"100%"
          }}
        >
          {/* Input para a senha */}
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

        {/* Caixa para estilização do input da confirmação da senha */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            marginY: "15px",
            borderRadius: "15px",
            width:"100%"
          }}
        >
          {/* Input para a senha */}
          <TextField
            required
            fullWidth
            margin="normal"
            label="Confirme sua senha"
            name="password2"
            id="password2"
            type={isOn()}
            value={user.password2}
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

        {/* Div para organizar botões Horizontalmente */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width:"100%"
          }}
        >

          {/* Botão de Retorno */}
          <Button
            component={Link}
            to="/"
            fullWidth
            variant="contained"
            sx={{
              width: "20%",
              marginTop: "12px",
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
            }}
          >
            Voltar
          </Button>

          {/* Botão de Cadastro */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: "20%", marginTop: "12px", backgroundColor: "#215299" }}
          >
            Cadastro
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default Cadastro;
