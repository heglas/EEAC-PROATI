import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

import EquipamentosList from "./EquipamentosList";
import ReservasList from "./ReservasList"; // Se ainda não criou, posso ajudar a gerar
import ReservaForm from "./ReservaForm";  // Seu formulário de agendamento real

function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("equipamentos");
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  // Ao selecionar um equipamento, muda para aba agendamento
  function handleSelecionarEquipamento(equipamento) {
    setEquipamentoSelecionado(equipamento);
    setAbaAtiva("agendamento");
  }

  // Callback para voltar para a lista de equipamentos após agendar
  function handleReservaSucesso() {
    setEquipamentoSelecionado(null);
    setAbaAtiva("equipamentos");
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
          <ReservaForm
            equipamento={equipamentoSelecionado}
            onSucesso={handleReservaSucesso}
            onCancelar={() => setAbaAtiva("equipamentos")}
          />
          <ReservasList />
        </>
      )}
    </Box>
  );
}

export default Dashboard;
