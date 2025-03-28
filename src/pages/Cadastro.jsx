import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import senai from "../assets/logo_senai.png";

function Cadastro() {
  const [user, setUser] = useState({
    cpf: "",
    name: "",
    email: "",
    password: "",
    password2: "",
    showPassword: false,
  });

  {/*Função pra trocar o texto para senha */}
  function isOn() {
    if (user.showPassword) {
      return "text";
    } else {
      return "password";
    }
  }

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        navigate("/salas");
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
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
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
          Cadastre-se e usufrua de nossa plataforma.
        </Typography>

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
            marginTop: "12px",
            border: "1px solid black",
            borderRadius: "15px",
            ".MuiInputLabel-root": {
              paddingLeft: "5px",
            },
          }}
        />

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
            sx={{
              margin: 0,
              paddingBottom: "10px",
              ".MuiInputLabel-root": {
                paddingLeft: "5px",
              },
            }}
          />
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
