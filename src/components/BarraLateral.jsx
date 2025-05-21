import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReorderIcon from '@mui/icons-material/Reorder';

const BarraLateral = () => {

    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authorization');
        localStorage.removeItem('id_usuario');
        navigate('/');
      }

    function reserva(){
      navigate('/reservar')
    }

    function salas(){
      navigate('/salas')
    }
    
    function disponibilidade(){
      navigate('/disponibilidade')
    }

    function quemSomos() {
      navigate('/quemsomos')
    }

    function PerfilUser() {
      navigate('/perfil')
    }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
        marginLeft: "3%",
        position: "fixed",
      }}
    >
        <IconButton>
            <ReorderIcon sx={{ width: 40, height: 40, color:"#000000" }} />
        </IconButton>
      <IconButton sx={{ backgroundColor: "#ff0002" }}>
        <CalendarTodayIcon sx={{ width: 40, height: 40, color:"#ffffff" }} onClick={reserva}/>
      </IconButton>
      <IconButton sx={{ backgroundColor: "#ff0002" }}>
        <SearchIcon sx={{ width: 40, height: 40, color:"#ffffff" }} onClick={disponibilidade}/>
      </IconButton>
      <IconButton sx={{ backgroundColor: "#ff0002" }}>
        <GroupIcon sx={{ width: 40, height: 40, color:"#ffffff" }} onClick={quemSomos}/>
      </IconButton>
      <IconButton sx={{ backgroundColor: "#ff0002" }}>
        <SettingsIcon sx={{ width: 40, height: 40, color:"#ffffff" }} onClick={PerfilUser}/>
      </IconButton>
      <IconButton sx={{ backgroundColor: "#ff0002" }}>
        <FormatListBulletedIcon sx={{ width: 40, height: 40, color:"#ffffff" }} onClick={salas}/>
      </IconButton>

      <IconButton sx={{ backgroundColor: "#ff0002", marginTop:"200%" }}>
        <PersonIcon sx={{ width: 40, height: 40, color:"#ffffff" }} onClick={logout} />
      </IconButton>
    </Box>
  );
};

export default BarraLateral;
