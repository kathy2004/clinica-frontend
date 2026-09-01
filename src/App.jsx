import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profissionais from './pages/Profissionais';
import ProfissionalDetalhe from './pages/ProfissionalDetalhe';
import FichaDetalhe from './pages/FichaDetalhe';
import AgendaDia from './pages/AgendaDia';
import Pacientes from './pages/Pacientes';
import PacienteDetalhe from './pages/PacienteDetalhe';
import RotaProtegida from './components/RotaProtegida';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>
          }
        />
        <Route
          path="/profissionais"
          element={
            <RotaProtegida>
              <Profissionais />
            </RotaProtegida>
          }
        />
        <Route
          path="/agenda"
          element={
            <RotaProtegida>
              <AgendaDia />
            </RotaProtegida>
          }
        />
        <Route
          path="/pacientes"
          element={
            <RotaProtegida>
              <Pacientes />
            </RotaProtegida>
          }
        />
        <Route
          path="/pacientes/:id"
          element={
            <RotaProtegida>
              <PacienteDetalhe />
            </RotaProtegida>
          }
        />
        <Route
          path="/profissionais/:id"
          element={
            <RotaProtegida>
              <ProfissionalDetalhe />
            </RotaProtegida>
          }
        />
        <Route
          path="/fichas/:id"
          element={
            <RotaProtegida>
              <FichaDetalhe />
            </RotaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}