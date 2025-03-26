import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import senai from "../assets/logo_senai.png";
import BarraLateral from "../components/BarraLateral";

function listRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  async function getRooms() {
    // Chamada da Api
    await api.getSalas().then(
      (response) => {
        console.log(response.data.classrooms);
        setRooms(response.data.classrooms);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

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

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <BarraLateral sx={{ width: "15%", Height: "100%" }} />
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
          <img
            style={{
              width: "300px",
              height: "75px",
            }}
            src={senai}
          />

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
              <TableBody>{listRooms}</TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
export default listRooms;
