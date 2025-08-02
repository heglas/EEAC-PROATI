import React, { useState } from "react";
import EquipamentosList from "./components/EquipamentosList";
import ReservaForm from "./components/ReservaForm";

function App() {
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [sucessoReserva, setSucessoReserva] = useState(false);

  const handleSelecionar = (eq) => {
    setEquipamentoSelecionado(eq);
    setSucessoReserva(false);
  };

  const handleReservaSucesso = () => {
    setSucessoReserva(true);
    setEquipamentoSelecionado(null);
  };

  const handleCancelar = () => {
    setEquipamentoSelecionado(null);
  };

  return (
    <div>
      <h1>Proati Reservas</h1>
      {sucessoReserva && <p style={{ color: "green" }}>Reserva efetuada com sucesso!</p>}
      {!equipamentoSelecionado ? (
        <EquipamentosList onSelecionar={handleSelecionar} />
      ) : (
        <ReservaForm equipamento={equipamentoSelecionado} onSucesso={handleReservaSucesso} onCancelar={handleCancelar} />
      )}
    </div>
  );
}

export default App;
