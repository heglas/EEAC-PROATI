import React, { useState } from "react";
import { reservarEquipamento } from "../api";

function ReservaForm({ equipamento, onSucesso, onCancelar }) {
  const [usuario, setUsuario] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    const dados = {
      equipamento_id: equipamento.id,
      usuario,
      inicio,
      fim,
    };

    try {
      await reservarEquipamento(dados);
      setLoading(false);
      onSucesso();
    } catch (e) {
      setErro(e.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Reservar: {equipamento.tipo} - {equipamento.modelo}</h3>
      <div>
        <label>Usuário:</label>
        <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      </div>
      <div>
        <label>Início:</label>
        <input type="datetime-local" value={inicio} onChange={(e) => setInicio(e.target.value)} required />
      </div>
      <div>
        <label>Fim:</label>
        <input type="datetime-local" value={fim} onChange={(e) => setFim(e.target.value)} required />
      </div>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Reservando..." : "Reservar"}
      </button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}

export default ReservaForm;
