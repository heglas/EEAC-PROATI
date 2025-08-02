import React, { useState, Suspense } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import EquipamentosList from './components/EquipamentosList';
import ReservaForm from './components/ReservaForm';

const theme = createTheme({
  palette: { mode: 'light' }
});

// Detecta o ambiente para definir o basename adequado
const basename =
  process.env.NODE_ENV === 'development' ? '/' : '/proati-reservas';

function App() {
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  const handleSelecionarEquipamento = (equip) => {
    setEquipamentoSelecionado(equip);
  };

  const handleCancelarReserva = () => {
    setEquipamentoSelecionado(null);
  };

  const handleSucessoReserva = () => {
    setEquipamentoSelecionado(null);
    // Outras ações pós-reserva
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <NavBar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/equipamentos"
                element={
                  <EquipamentosList onSelecionar={handleSelecionarEquipamento} />
                }
              />
            </Routes>

            {equipamentoSelecionado && (
              <ReservaForm
                equipamento={equipamentoSelecionado}
                onCancelar={handleCancelarReserva}
                onSucesso={handleSucessoReserva}
              />
            )}
          </Suspense>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
