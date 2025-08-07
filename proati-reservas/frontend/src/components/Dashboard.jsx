import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

import EquipamentosList from "./EquipamentosList";
import ReservasList from "./ReservasList";
import FormAgendamento from "./FormAgendamento";

function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("equipamentos"); // ou "agendamento"
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  function handleSelecionarEquipamento(equipamento) {
    setEquipamentoSelecionado(equipamento);
    setAbaAtiva("agendamento");
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Proati Reservas
      </Typography>
      <Typography paragraph>
        Use o menu acima para consultar o catálogo de equipamentos ou realizar reservas.
      </Typography>

      {abaAtiva === "equipamentos" && (
        <EquipamentosList onSelecionar={handleSelecionarEquipamento} />
      )}

      {abaAtiva === "agendamento" && (
        <>
          <Button variant="outlined" sx={{ mb: 2 }} onClick={() => setAbaAtiva("equipamentos")}>
            &lt; Voltar para equipamentos
          </Button>
          <FormAgendamento equipamento={equipamentoSelecionado} />
          <ReservasList />
        </>
      )}
    </Box>
  );
}

export default Dashboard;
