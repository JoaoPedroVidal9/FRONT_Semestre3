import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RotasProtegidas from "./components/RotasProtegidas";
import SalasLista from "./pages/SalasLista";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import LayoutImagens from "./components/LayoutImagens";
import ReservaSalas from "./pages/ReservaSalas"
import ConsultarDisponibilidade from "./pages/ConsultarDisponibilidade";
import QuemSomos from "./pages/QuemSomos";

function App() {
  return (
    <Router sx={{ padding: "0px", margin: "0px" }}>
      <Routes sx={{ padding: "0px", margin: "0px" }}>
        <Route
          path="/"
          element={
            <LayoutImagens>
              <Login />
            </LayoutImagens>
          }
        />
        <Route
          path="/cadastro"
          element={
            <LayoutImagens>
              <Cadastro />
            </LayoutImagens>
          }
        />

        <Route
          path="/disponibilidade"
          element={
            <RotasProtegidas>
              <ConsultarDisponibilidade />
            </RotasProtegidas>
          }
        />
        <Route
          path="/salas"
          element={
            <RotasProtegidas>
              <SalasLista />
            </RotasProtegidas>
          }
        />
        <Route
          path="/reservar"
          element={
            <RotasProtegidas>
              <ReservaSalas />
            </RotasProtegidas>
          }
        />
        <Route
          path="/quemsomos"
          element={
            <RotasProtegidas>
              <QuemSomos />
            </RotasProtegidas>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
