import React, { Suspense } from 'react';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Container maxWidth="md">
          <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/equipamentos" element={<EquipamentosList />} />
              <Route path="/reservar" element={<ReservaForm />} />
            </Routes>
          </Suspense>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
