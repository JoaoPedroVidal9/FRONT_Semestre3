// Importação dos componentes react
import { useState, useEffect } from "react";
// Importação dos componentes MUI
import Paper from "@mui/material/Paper";
// Importação para criação de tabela do MUI
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// Importação da função da API
import api from "../axios/axios";
// Importação de imagens
import senai from "../assets/logo_senai.png";
// Importação do componente personalizado BarraLateral
import BarraLateral from "../components/BarraLateral";

function listRooms() {
  // Definição da constante dos dados da Sala
  const [rooms, setRooms] = useState([]);

  // Função para executar a request da API
  async function getRooms() {
    // Chamada da Api
    await api.getSalas().then(
      (response) => {
        setRooms(response.data.classrooms);
      },
      (error) => {
        alert(error.response.data.error)
      }
    );
  }

  // Função para organizar os dados das salas em uma tabela
  const listRooms = rooms.map((sala) => {
    return (
      <TableRow
        sx={{
          padding: "55px",
          marginBottom: "40px",
          borderRadius: "5px",
          backgroundColor: "#d9d9d9",
        }}
        key={sala.number}
      >
        <TableCell
          sx={{
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
          }}
          align="center"
        >
          {sala.number}
        </TableCell>
        <TableCell sx={{ borderBottom: "1px solid black" }} align="center">
          {sala.description}
        </TableCell>
        <TableCell
          sx={{
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
          }}
          align="center"
        >
          {sala.capacity}
        </TableCell>
      </TableRow>
    );
  });

  // Função para ativar a request ao carregar a página
  useEffect(() => {
    getRooms();
  }, []);

  // Início da Definição Gráfica
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Chamada da BarraLateral em flexDirection:'row' */}
      <BarraLateral sx={{ width: "15%", Height: "100%" }} />
      {/* Prevenção de tabela vazia, substituida por mensagem */}
      {rooms.lenght === 0 ? (
        <h1>Carregando Salas</h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "3%",
            width: "85%",
            paddingLeft: "150px",
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

          {/* Título e tabela listando as salas */}
          <h1>Lista de Salas</h1>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{
                  backgroundColor: "#ff0002",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: "#ffffff" }} align="center">
                    Número
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }} align="center">
                    Descrição
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }} align="center">
                    Capacidade
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Chamada da função de Listagem das salas na tabela */}
              <TableBody>{listRooms}</TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
export default listRooms;
