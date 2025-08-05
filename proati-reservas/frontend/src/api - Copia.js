// Defina o endereço base da API com variável de ambiente suportando fallback para IP
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://194.5.159.164:8000";

/**
 * Busca a lista de equipamentos do backend
 */
export async function fetchEquipamentos() {
  const response = await fetch(`${API_BASE_URL}/equipamentos`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar equipamentos: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Envia os dados para reservar um equipamento
 * @param {Object} dadosReserva Objeto com dados da reserva
 */
export async function reservarEquipamento(dadosReserva) {
  const response = await fetch(`${API_BASE_URL}/reservar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosReserva),
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`Erro na reserva: ${erro}`);
  }
  return response.json();
}
