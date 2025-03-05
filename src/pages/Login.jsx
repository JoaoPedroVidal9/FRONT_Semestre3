import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Login() {
  //Falta implementar a lógica do login, aqui é apenas o layout visual.
  //Atenção ao axios, Configs do TextField (onchange e values) e o useState

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">

        <Typography component="h1" variant="h5">
          PROJETO BASE - Login
        </Typography>

        <Box component="form" onSubmit={() => {console.log('Ainda não faz nada')}} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="number"
            name="cpf"
            id="cpf"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Button fullWidth variant="contained">
            <Link to="/cadastro">Cadastro</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
