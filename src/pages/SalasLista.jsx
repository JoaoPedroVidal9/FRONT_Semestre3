import { useState, useEffect } from 'react'
// Imports para criação de tabela
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
// TableHead é onde colocamos os titulos
import TableHead from '@mui/material/TableHead';
// TableBody é onde colocamos o conteúdo
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import api from '../axios/axios'
import { Button } from '@mui/material';
import {useNavigate } from 'react-router-dom';

function listRooms() {
  const [rooms,setRooms] = useState([]);
  const navigate = useNavigate();

  

  async function getRooms(){
    // Chamada da Api
    await api.getSalas().then(
      (response)=>{
        console.log(response.data.classrooms)
        setRooms(response.data.classrooms)
      },(error)=>{
        console.log("Erro ",error)
      }
    )
  }

  const listRooms = rooms.map((sala)=>{
    return(
      <TableRow key={sala.number}>
        <TableCell align='center'>{sala.number}</TableCell>
        <TableCell align="center">{sala.description}</TableCell>
        <TableCell align="center">{sala.capacity}</TableCell>
      </TableRow>
    )
  })

  function logout(){
    localStorage.removeItem('authenticated');
    navigate('/');
  }

  useEffect(()=>{
    getRooms();
  },[]);


  return (
    <div>
      {rooms.lenght === 0 ?(<h1>Carregando Salas</h1>):
    <div>
        <h5>Lista de Salas</h5>
        <TableContainer component={Paper} style={{margin:"2px"}}>
          <Table size="small">
            <TableHead style={{backgroundColor: "brown", borderStyle:"solid"}}>
              <TableRow>
                <TableCell align="center">
                  Número
                </TableCell>
                <TableCell align="center">
                  Descrição
                </TableCell>
                <TableCell align="center">
                  Capacidade
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listRooms}</TableBody>
          </Table>
        </TableContainer>
      <Button 
      fullWidth
      variant='contained'
      onClick={logout}
      >
        SAIR
      </Button>
      </div>
      }
    </div>
  )
}
export default listRooms
