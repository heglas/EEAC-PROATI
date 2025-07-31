import React, { useEffect, useState } from "react";
import { fetchEquipamentos } from "../api";

function EquipamentosList({ onSelecionar }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchEquipamentos()
      .then((data) => {
        setEquipamentos(data);
        setLoading(false);
      })
      .catch((e) => {
        setErro(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando equipamentos...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <ul>
      {equipamentos.map((eq) => (
        <li key={eq.id}>
          {eq.tipo} - {eq.modelo} ({eq.disponiveis} disponíveis){" "}
          <button onClick={() => onSelecionar(eq)}>Reservar</button>
        </li>
      ))}
    </ul>
  );
}

export default EquipamentosList;
