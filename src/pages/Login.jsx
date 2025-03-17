import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import senai from "../assets/logo_senai.png";

function Login() {
  //Falta implementar a lógica do login, aqui é apenas o layout visual.
  //Atenção ao axios, Configs do TextField (onchange e values) e o useState


  return (
    <Container component="main" maxWidth="xs" >
      <Box  sx ={{display:"flex", flexDirection:"column" ,alignItems:"center" , justifyContent:"space-evenly"}}>
        <Typography component="p" sx ={{marginTop:"17px"}}>Página Login</Typography>

        <img style={{ width: "200px", height: "51px" , marginTop:"50px"}} src={senai} />

        <Box 
          component="form"
          onSubmit={() => {
            console.log("Ainda não faz nada");
          }}
          noValidate
        >
          <Typography sx ={{marginTop:"40px"}} component="h3" textAlign="center">Seja bem-vindo(a). Faça o login para acessar a Agenda Senai ou cadastre-se como novo usuário.</Typography>
          <TextField
          sx ={{marginTop:"15px"}}
            margin="normal"
            required
            fullWidth
            label="Usuário (CPF)"
            name="cpf"
            id="cpf"
          />
          <TextField
          sx ={{marginTop:"15px"}}
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <Button sx ={{marginTop:"15px"}} type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Button sx ={{marginTop:"15px"}} fullWidth variant="contained">
            <Link to="/cadastro">Cadastro</Link>
          </Button>
          
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
