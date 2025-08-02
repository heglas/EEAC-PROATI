import React from "react";
import { Typography, Box } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Bem-vindo ao Proati Reservas</Typography>
      <Typography variant="body1">
        Use o menu acima para consultar o catálogo de equipamentos ou realizar reservas.
        O dashboard pode ser expandido com gráficos e indicadores no futuro.
      </Typography>
    </Box>
  );
}

export default Dashboard;
