import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RotasProtegidas from "./components/RotasProtegidas";
import SalasLista from "./pages/SalasLista";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <Router sx={{padding:"0px", margin:"0px"}}>
      <Routes sx={{padding:"0px", margin:"0px"}}>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/salas" element={
          <RotasProtegidas>
            <SalasLista/>
        </RotasProtegidas>
        } />
      </Routes>
    </Router>
  );
}

export default App;
