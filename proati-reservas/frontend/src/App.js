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

function App() {
  // Estado para armazenar o equipamento selecionado para reservar
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  // Callback enviado para EquipamentosList para controlar seleção
  const handleSelecionarEquipamento = (equip) => {
    setEquipamentoSelecionado(equip);
  };

  // Callbacks para fechar o formulário reserva
  const handleCancelarReserva = () => {
    setEquipamentoSelecionado(null);
  };

  const handleSucessoReserva = () => {
    setEquipamentoSelecionado(null);
    // Aqui você pode adicionar lógica extra, como atualizar lista ou mostrar mensagem
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Passa callback onSelecionar */}
              <Route path="/equipamentos" element={<EquipamentosList onSelecionar={handleSelecionarEquipamento} />} />
              {/* Não utilize essa rota para reserva, pois agora ReservaForm é renderizado condicionalmente */}
              {/* <Route path="/reservar" element={<ReservaForm />} /> */}
            </Routes>

            {/* Renderiza formulário de reserva ao selecionar equipamento */}
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
